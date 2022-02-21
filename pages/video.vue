<template>
  <div>
  <q-layout view="hHh Lpr lFf" class="bg-grey-10 text-white">

    <q-page-container>
      <q-page class="column">       
        <div class="video-wrapper col column">
          <div class="video-main col">
            <VideoFeedback ref="trainerfeed" type="trainer" :video-options="trainerOptions" @loadedmetadata="onVideoMetaLoaded" @timeupdate="onTrainerUpdate" @ended="onVideoEnd">              
            </VideoFeedback>
            <VideoFeedback v-if="mode !== 'off'" ref="learnerfeed" type="learner" :video-options="learnerOptions">
            </VideoFeedback>
          </div>

          <span class="time">{{ toMS(currentTime) }} / {{ toMS(duration) }}</span>
          <div class="video-control col-auto row bg-primary">
            <record-button v-if="mode === 'on'" ref="recordbutton" @click="playToggle" />
            <q-btn v-else :icon="(isPlaying) ? 'pause' : 'play_arrow'" @click="playToggle" />

            <div class="col">
              <div class="seekbar text-secondary" ref="seekbar" @click="onSeekbarClick($event)">
                <span class="progress" :style="{width: percentPlay + '%'}"></span>                
              </div>
            </div>

            <q-btn-dropdown dropdown-icon="settings_applications">
              <q-list class="q-pa-md" style="width: 350px">
                <q-item-label header>ตั้งค่าวิดีโอผู้สอน</q-item-label> 
                <q-item>
                  <q-item-section side>
                    ระดับเสียง
                  </q-item-section>
                  <q-item-section>
                    <q-slider v-model="trainerOptions.audio" :min="0" :max="1" :step="0.1" label />
                  </q-item-section>
                </q-item>   

                <q-item>
                  <q-item-section side>
                    ความโปร่งใส
                  </q-item-section>
                  <q-item-section>
                    <q-slider v-model="trainerOptions.opacity" :min="0" :max="1" :step="0.1" label />
                  </q-item-section>
                </q-item>

                 <q-item>
                  <q-item-section side>
                    <q-item-label>โครงร่าง</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-toggle v-model="trainerOptions.showSkeleton" />
                  </q-item-section>
                </q-item>
              
                <q-separator spaced />
                <q-item-label header>ตั้งค่าวิดีโอผู้เรียน</q-item-label>         

                <q-item>
                  <q-item-section side>
                    <q-item-label>ความโปร่งใส</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-slider v-model="learnerOptions.opacity" :min="0" :max="1" :step="0.1" label />                   
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section side>
                    <q-item-label>โครงร่าง</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-toggle v-model="learnerOptions.showSkeleton" />
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section side>
                    <q-item-label>คำชี้แนะ</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <div class="row">
                      <q-checkbox class="col" v-model="learnerOptions.drawFeedbackBody" label="ตัว" />
                      <q-checkbox class="col" v-model="learnerOptions.drawFeedbackArms" label="แขน" />
                      <q-checkbox class="col" v-model="learnerOptions.drawFeedbackLegs" label="ขา" />
                    </div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section side>
                    <q-item-label>วิธีชี้แนะ</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-select dense outlined style="min-width: 200px" v-model="learnerOptions.feedbackType" :options="feedbackOptions" />
                  </q-item-section>
                </q-item>
                
              </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown dropdown-icon="info" v-model="infopanel">
              <div v-if="this.lesson" class="q-pa-md" style="width: 350px; min-height: 360px;">
                <b class="q-pa-xs">{{ lesson.title }}</b>
              
                <div class="q-pa-xs">{{ lesson.desc }}
                วิดีโอนี้เป็นลิขสิทธิ์ของเจ้าของวิดีโอตามลิงค์วิดีโอต้นฉบับ</div>

                <div v-if="learnerOptions.feedbackType" class="q-pa-xs">
                  <div>
                    ระบบจะ{{ learnerOptions.feedbackType.label }}ด้วยสีแดง ดังภาพ
                  </div>
                  <img :src="'/feedback-' + learnerOptions.feedbackType.value + '.png'" style="max-width:100%;" />                
                </div>   
              </div>
            </q-btn-dropdown>       
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-dialog v-model="alert" persistent>
            <q-card>
                <q-card-section align="center">
                    <div class="text-h6">ฝึกเสร็จแล้ว</div>
                    <q-btn v-if="mode === 'on'" label="ดาวน์โหลดวิดีโอการฝึก" color="primary" @click="download" />
                </q-card-section>

                <q-card-actions align="center">
                    <q-btn label="ฝีกอีกรอบ" @click="clear" v-close-popup />
                    <q-btn label="จบการฝึก" :to="'/'" />
                </q-card-actions>
            </q-card>
        </q-dialog>
  </q-layout>
  </div>
</template>

<script>
import {
    Loading, 
    Notify, 
    SessionStorage, 
    AppFullscreen 
} from 'quasar'
import * as poseDetection from '@tensorflow-models/pose-detection/dist/index.js' // Need to import index.js to make patch work

const CAM_WIDTH = 1024
const CAM_HEIGHT = 600

/**
 * FollowMe page, showing trainer's video and learner's video/camera.
 *  
 * Route parameters
 * @param id ID of a trainer video
 * @param ext Extension of a trainer video
 * @param recid ID of a learner video (optional)
 * @param recext Extension of a learner video (optional)
 */
export default {
  name: 'FollowMe',
  components: {

  },
  props: {
    /**
     * Mode of learner's video camera.
     * @values on, off, recorded
     */
    appmode: {
      typs: String
    }
  },
  data () {
    return {
      lesson: null,
      infopanel: true,
      alert: false,
      mode: 'on', // TODO: This was previously passed using router 'appmode', hidden from users
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      percentPlay: 0,
      videoWidth: 640,
      videoHeight: 360,
      videoSrc: 'http://127.0.0.1:8000/videos/courses/Easy_TaiChi_-_join_in_-_a_9-minute_Daily_Practice_vbiVSRK.mp4', // TODO: Get videos location from database
      cameraSrc: 'http://127.0.0.1:8000/videos/courses/Easy_TaiChi_-_join_in_-_a_9-minute_Daily_Practice_vbiVSRK.mp4' ,
      trainerOptions: {
        loadPose: true,
        showSkeleton: false,
        audio: 1,
        opacity: 1,
        mirror: false
      },
      learnerOptions: {
        loadPose: false, // Should be disabled until server-side video processing is completed
        showSkeleton: true,
        audio: 0,
        opacity: 0.8,
        mirror: true,
        drawFeedbackBody: true,
        drawFeedbackArms: true,
        drawFeedbackLegs: true,
        feedbackType: null
      },
      feedbackOptions: [{
                label: 'แสดงตำแหน่งที่ผิด',
                value: 3
            },
            {
                label: 'แสดงตำแหน่งที่ถูกต้อง',
                value: 4
            },
            {
                label: 'แสดงความต่างระหว่างตำแหน่ง',
                value: 6
            }
      ]
    }
  },
  async mounted() {
        /**
         * Load trainer' video and learner' video/camera.
         */

        await this.setup()
    },
methods: {
    /**
     * Load a list of lessons
     */
    async getData() {
      try {      
        const response = await axios.get("api/lessons/" + this.$route.params.id + ".json")
        this.lesson = response.data
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'ไม่สามารถโหลดบทเรียนได้'
        })
        console.log(error)
      }
    },

    async loadVideos() {
            //   Loading.show({
            //     message: 'Loading video information...'
            //   })

      // Load trainer video
      // TODO The video is async but I don't know how to wait for loading
      this.$refs.trainerfeed.setSrc(this.videoSrc)

      // Load learner's video/camera
      if (this.mode === 'recorded') {
        this.$refs.learnerfeed.setSrc(this.cameraSrc)
      } else if (this.mode === 'on') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              'audio': false,
              'width': CAM_WIDTH,
              'height': CAM_HEIGHT
            }
          })
          this.$refs.learnerfeed.setSrcObject(stream)
          // this.$refs.recordbutton.setStream(stream)
        } catch (err) {
          Notify.create({
            type: 'negative',
            message: 'ไม่สามารถเข้าถึงกล้องได้'
          })
          this.mode = 'off'
          console.error(err)
        }
      }
      // await new Promise(resolve => setTimeout(resolve, 5000)) // Used to test long wait
    },

    /**
     * Load human pose detector.
     */
    async loadDetector() {
            //   Loading.show({
            //     message: 'Loading detector...'
            //   })

      // detector and segmenter must be non-reactive
      var detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose, {
          runtime: 'mediapipe',    
          enableSegmentation: true,
          smoothSegmentation: true,
          // modelType: (this.$route.query.architecture === 'accurate') ? poseDetection.movenet.modelType.SINGLEPOSE_THUNDER : poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
        }
      )

      this.$refs.trainerfeed.setEstimators(detector)
      if (this.mode !== 'off') this.$refs.learnerfeed.setEstimators(detector)
    },

    /**
     * Set up the followme player.
     */
    async setup() {
      await getData()
      if (!this.lesson) return

      //   Loading.show()

      // Load videos and detector
      await this.loadVideos()
      await this.loadDetector()

      // Set up feedback
      this.learnerOptions.feedbackType = (this.$route.query.feedback) ? this.feedbackOptions[parseInt(this.$route.query.feedback)] : null
      this.learnerOptions.showSkeleton = (this.$route.query.skeleton === "false") ? false : true
      
      this.requestPoseDetectionFrame()
      Loading.hide()
    },

    // Access and addon to native video functions //////////////////

    /**
     * Play/pause video.
     */
    playToggle() {
      if (this.isPlaying) {
        this.$refs.trainerfeed.pause()
        if (this.$refs.recordbutton) this.$refs.recordbutton.pause()
        if (this.mode === 'recorded') this.$refs.learnerfeed.pause()
        this.isPlaying = false
      } else {
        AppFullscreen.request()
        this.$refs.trainerfeed.play()
        if (this.$refs.recordbutton) this.$refs.recordbutton.play()
        if (this.mode === 'recorded') this.$refs.learnerfeed.play()
        this.isPlaying = true
      }
    },

    /**
     * Update progress of trainer's video.
     * @param {number} currentTime The current time of the trainer video
     */
    onTrainerUpdate(currentTime) {
      this.currentTime = currentTime
      this.percentPlay = (currentTime / this.duration) * 100
    },

    /**
     * Handle event when the seekbar is clicked.
     * @param {object} event Click event information
     */
    onSeekbarClick(event) {
      var percentage = (event.offsetX / this.$refs.seekbar.offsetWidth)
      this.currentTime = this.duration * percentage
      this.$refs.trainerfeed.setCurrentTime(this.currentTime)
      if (this.mode === 'recorded') this.$refs.learnerfeed.setCurrentTime(this.currentTime)
    },

    /**
     * Handle event when trainer' video metadata is loaded.
     * @param {number} duration Duration of the trainer video
     */
    onVideoMetaLoaded(duration) {
      this.duration = duration
    },

    /**
     * Handle event when trainer' video is ended.
     */
    onVideoEnd() {
      AppFullscreen.exit()
      this.isPlaying = false
      if (this.$refs.recordbutton) this.$refs.recordbutton.pause()

      if (this.mode !== 'recorded') this.alert = true
    },

    // Pose estimation //////////////////

    /**
     * Continuously detect poses in video frames.
     */
    async requestPoseDetectionFrame() {
      if (this.$refs.trainerfeed) await this.$refs.trainerfeed.poseDetectionFrame()
      if (this.$refs.learnerfeed) await this.$refs.learnerfeed.poseDetectionFrame()
      requestAnimationFrame(this.requestPoseDetectionFrame)
    },

    // Other //////////////////    

    /**
     * Convert milliseconds to minute:second.
     * @param {number} ms Time in milliseconds
     * @returns {string} minute:second
     */
    toMS(ms) {
      var seconds = Math.floor(ms % 60)
      seconds = seconds < 10 ? "0" + seconds : seconds
      var minutes = Math.floor((ms / 60) % 60)
      minutes = minutes < 10 ? "0" + minutes : minutes
      return minutes + ':' + seconds
    },

    /**
     * Download learner video (in 'on' mode only).
     */
    download() {
      if (this.mode === 'on') {
        this.$refs.recordbutton.download()
      }     
    },

    /**
     * Reset everything.
     */
    clear() {
            this.$refs.trainerfeed.clear()
            if (this.$refs.learnerfeed) this.$refs.learnerfeed.clear()
            if (this.$refs.recordbutton) this.$refs.recordbutton.clear()
            this.onSeekbarClick({
                offsetX: 0
            })
        }
  }
}
</script>

<style>
.video-main {
  position: relative;
  overflow: hidden;
}

.seekbar {
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

.seekbar .progress {
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
