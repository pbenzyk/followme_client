<template>
  <q-btn
    :icon="(isPlaying) ? 'pause' : 'play_arrow'" />
</template>

<script>
// https://usefulangle.com/post/354/javascript-record-video-from-camera
// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
// Alternative: https://recordrtc.org/

var media_recorder = null
var blobs_recorded = []

/**
 * Video recorder component.
 */
export default {
  name: 'RecordButton',
  props: {
    /**
     * MIME type of the recorded video.
     */
    mimetype: {
      type: String
    }
  },
  data () {
    return {
      isPlaying: false,
      ext: '.webm'
    }
  },
  methods: {    
    /**
     * Set the stream to be recorded.
     * @param camera_stream Camera stream
     */
    setStream: function (camera_stream) {
      media_recorder = new MediaRecorder(camera_stream, { mimeType: this.mimetype })
      var typescodec = this.mimetype.split(";")
      if (typescodec.length > 0) {
        this.ext = "." + typescodec[0].substring(6) // video/{type};{codec}
      }

      media_recorder.addEventListener('dataavailable', function(e) {
        if (e.data && e.data.size > 0) {
          blobs_recorded.push(e.data)
        }
      })

      // event : recording stopped & all blobs sent
      media_recorder.addEventListener('stop', function() {
        if (this.downloadpending) this.download()
      })
    },

    /**
     * Play the recorder.
     */
    play: function () {
      this.isPlaying = true
      if (!media_recorder) return

      if (media_recorder.state === 'paused') {
        media_recorder.resume()
      } else {
        media_recorder.start(1000)        
      }
    },

    /**
     * Pause the recorder.
     */
    pause: function () {
      this.isPlaying = false
      if (!media_recorder || media_recorder.state === 'inactive') return

      media_recorder.pause()
    },

    /**
     * Stop the recorder.
     */
    stop: function () {
      this.isPlaying = false
      if (!media_recorder || media_recorder.state === 'inactive') return

      media_recorder.stop()
    },

    /**
     * Download the recorded video.
     */
    download: function () {
      if (!media_recorder) return      
      if (media_recorder.state !== 'inactive') {
        this.downloadpending = true
        media_recorder.stop()
      }
      
      // wait for recording stopped and all blobs sent, so we use event
      var a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      var url = URL.createObjectURL(new Blob(blobs_recorded, { type: this.mimetype }))
      a.href = url
      a.download = Date.now() + this.ext
      a.click()
      window.URL.revokeObjectURL(url)
      this.downloadpending = false    
    },
    clear: function () {
      blobs_recorded = []
    }
  },
  beforeUnmount () {
    media_recorder = null
    this.clear()
  }
}
</script>
