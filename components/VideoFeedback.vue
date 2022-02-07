<template>
  <div class="video-feedback" :class="type">
    <!-- TODO: Have resize observer to onResize() everytime the window is resized /-->

    <video ref="videoObj" class="hidden" playsinline preload
      :width="videoWidth" :height="videoHeight"
      v-audio-level = "videoOptions.audio"
      v-playback-rate = "(videoSrc) ? 1 : false"
      crossorigin="anonymous"
      @loadedmetadata = "onVideoMetaLoaded"
      @timeupdate="onTimeUpdate"
      @ended="$emit('ended')"></video>
    <canvas ref="videoOut" />
  </div>
</template>

<script>
import state from '@/lib/store'
import Feedback from '@/lib/feedback'
import Util from '@/lib/util'

import axios from '@/plugins/axios'
const CAM_WIDTH = 640
const CAM_HEIGHT = 360

/**
 * Video component with pose detection and visual feedback.
 */
export default {
  name: 'VideoFeedback',
  props: {
    /**
     * Type of this video (use as a key of pose variable in data store). 
     * Note that the current code supports only 1 instance of each type.
     * @values trainer, learner
     */
    type: {
      type: String
    },
    /**
     * Options for this video.
     */
    videoOptions: {
      type: Object,
      default () {
        return {          
          loadPose: true,
          showSkeleton: true,
          audio: 0,
          opacity: 1,
          mirror: false,
          drawFeedbackBody: true,
          drawFeedbackArms: true,
          drawFeedbackLegs: true,
          feedbackType: null
        }
      }
    }
  },
  data () {
    return {
      videoSrc: null,
      videoWidth: CAM_WIDTH,
      videoHeight: CAM_HEIGHT,
      ratio: CAM_HEIGHT / CAM_WIDTH,
      offscreenCanvas: null,
      poseVideoJson: null,
      timestamp: 0,
      fduration: 0,
      boneColor: (this.type === 'trainer') ? '#ff147a' : '#2babff',
      jointColor: (this.type === 'trainer') ? '#ff87ba' : '#D4E6F1'
    }
  },
  directives: {
    /**
     * Set or return the speed of the video playback.
     */
    playbackRate (el, binding) {
      if (typeof binding.value === 'number') el.playbackRate = binding.value
    },
    /**
     * Set or return the volume of this video.
     */
    audioLevel (el, binding) {
      el.volume = binding.value
    }
  },
  methods: {
    // Access and addon to native video functions //////////////////

    /**
     * Start playing this video.
     */
    play () {
      this.$refs.videoObj.play()
    },

    /**
     * Pause the currently playing video.
     */
    pause () {
      this.$refs.videoObj.pause()
    },

    /**
     * Set source of this video.
     * @param {string} url URL of the source
     */
    setSrc (url) {
      this.videoSrc = url
      this.$refs.videoObj.src = url
      this.loadPose()
    },

    /**
     * Set source object of this video.
     * @param {object} stream Source object, e.g., camera stream
     */
    setSrcObject (stream) {
      this.videoSrc = null
      this.$refs.videoObj.srcObject = stream
    },

    /**
     * Set current time of this video.
     * @param {number} time The time to set
     */
    setCurrentTime (time) {
      this.$refs.videoObj.currentTime = time
      if (this.poseVideoJson) {
        this.recordedVideoIndex = 0
        while (this.poseVideoJson.recorded[this.recordedVideoIndex] && time > this.poseVideoJson.recorded[this.recordedVideoIndex].time) {
          this.recordedVideoIndex++
        }
      }
    },

    // Pose estimation //////////////////

    /**
     * Set pose detector.
     * @param {object} detector The detector
     */
    setEstimators (detector) {
      this.detector = detector
    },

    /**
     * Load pose information from JSON file.
     */
    async loadPose () {
      try {
        var json = await axios.get(this.videoSrc + '.json')
        this.poseVideoJson = json.data
      } catch (err) {
        console.warn('Error loading recorded pose.')
      }
    },

    /**
     * Call the function to detect human pose and display the output.
     * @param {boolean} force True to run the detector even if the video is paused
     */
    async poseDetectionFrame (force = false) {
      if (!this.$refs.videoObj || !this.$refs.videoOut ||
        (!force && this.$refs.videoObj.paused)) return

      try {
        await this.poseDetectionVideo()
        
        if (this.type === 'learner') {
          Feedback.getFeedback(this.videoOptions.feedbackType, state.pose['trainer'], state.pose['learner'],
            this.videoOptions.drawFeedbackBody, this.videoOptions.drawFeedbackArms, this.videoOptions.drawFeedbackLegs, this.offscreenCanvas.getContext('2d'))
        }

        var ctxVideo = this.$refs.videoOut.getContext('2d')
        ctxVideo.clearRect(0, 0, this.$refs.videoOut.width, this.$refs.videoOut.height)
        ctxVideo.drawImage(this.offscreenCanvas, 0, 0, this.$refs.videoOut.width, this.$refs.videoOut.height)
      } catch (err) {
        console.error(err)
      }
    },

    /**
     * Detect human pose from the current frame offscreen.
     */
    async poseDetectionVideo () {
      // Prepare the video and canvas
      var ctx = this.offscreenCanvas.getContext('2d')
      ctx.clearRect(0, 0, this.videoWidth, this.videoHeight)
      ctx.save()
      ctx.globalAlpha = this.videoOptions.opacity
      if (this.videoOptions.mirror) {
        ctx.scale(-1, 1)
        ctx.translate(-this.videoWidth, 0)
      }
      ctx.drawImage(this.$refs.videoObj, 0, 0, this.videoWidth, this.videoHeight)
      ctx.restore()      
      
      this.timestamp = this.$refs.videoObj.currentTime

      // Get the pose
      var poseVideo = null
      var mask = null
      if (this.videoOptions.loadPose && this.poseVideoJson && this.poseVideoJson.recorded[this.recordedVideoIndex]) {
        // Recorded pose - may not completely sync but should be good enough
        while (this.poseVideoJson.recorded[this.recordedVideoIndex] && this.timestamp > this.poseVideoJson.recorded[this.recordedVideoIndex].time) {
          this.recordedVideoIndex++
        }

        if (this.poseVideoJson.recorded[this.recordedVideoIndex] &&
          this.poseVideoJson.recorded[this.recordedVideoIndex].time - this.timestamp < 0.2) {
          poseVideo = Util.toCOCO(this.poseVideoJson.recorded[this.recordedVideoIndex])
        }
      } else {
        // Realtime estimation
        var poses = await this.detector.estimatePoses(this.offscreenCanvas)
        if (poses[0]) {
          poseVideo = Util.toCOCO(poses[0])
          if (poses[0].segmentation) mask = await poses[0].segmentation.mask.toCanvasImageSource()
        }
      }

      if (this.videoOptions.opacity === 0) {
        ctx.clearRect(0, 0, this.videoWidth, this.videoHeight)
      } else if (this.type === 'learner' && mask) {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-in'
        ctx.drawImage(mask, 0, 0, this.videoWidth, this.videoHeight)
        ctx.restore()
      }

      // Visualization
      if (this.videoOptions.showSkeleton && poseVideo) {
        Util.drawSkeleton(poseVideo.keypoints, this.boneColor, ctx)
        Util.drawKeypoints(poseVideo.keypoints, this.jointColor, ctx)
      }      

      state.pose[this.type] = poseVideo
    },
    
    // Video size //////////////////

    /**
     * Called when video metadata is loaed to set up video and canvas size.
     */
    onVideoMetaLoaded () {
      this.videoWidth = this.$refs.videoObj.videoWidth
      this.videoHeight = this.$refs.videoObj.videoHeight
      this.ratio = this.videoHeight / this.videoWidth

      this.offscreenCanvas.width = this.videoWidth
      this.offscreenCanvas.height = this.videoHeight

      // Play the camera stream
      if (this.videoSrc === null) 
        this.$refs.videoObj.play()
      else
        this.fduration = Math.floor(this.$refs.videoObj.duration)

      /**
       * Fire when the browser has loaded metadata for this video
       * @event loadedmetadata
       * @property {number} duration The duration of this video
       */
      this.$emit('loadedmetadata', this.$refs.videoObj.duration)
    },

    /**
     * Called when the current video time is updated.
     */
    onTimeUpdate () {      
      if (this.videoSrc) {
        /**
         * Fire when the current playback position has changed.
         * @event timeupdate
         * @property {number} currentTime The current time of this video
         */
        this.$emit('timeupdate', this.$refs.videoObj.currentTime)

        // TODO: Test the ended event more and remove this dirty fix
        // Somehow sometime the ended event is not fired. This is a dirty fix.
        if (this.$refs.videoObj.currentTime >= this.fduration) {
          this.$emit('ended')
        }
      }
    },

    /**
     * Called when the component is resized.
     * @param {number} size The new size.
     */
    onResize (size) {
      this.$refs.videoOut.width = size.width
      this.$refs.videoOut.height = size.width * this.ratio

      this.$nextTick(function () {
        if (this.detector) this.poseDetectionFrame()
      })
    },

    // Other //////////////////

    /**
     * Reset everything.
     */
    clear () {
      this.recordedVideoIndex = 0
      state.pose[this.type] = null
    }
  },
  mounted () {
    this.offscreenCanvas = document.createElement('canvas')
    this.clear()
  },
  beforeUnmount () {
    this.clear()
    this.$refs.videoObj.pause()  

    var stream = this.$refs.videoObj.srcObject
    if (!stream) return
    
    var tracks = stream.getTracks()
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i]
        track.stop()
    }
  }
}
</script>

<style>
.video-feedback {
  position: absolute;
  width: 95%;
  overflow: hidden;
}
.video-feedback.learner {
  left: 20%;
}
</style>
