<template>
  <q-btn
    :icon="(isPlaying) ? 'pause' : 'play_arrow'" />
</template>

<script>
// https://usefulangle.com/post/354/javascript-record-video-from-camera
// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
// Alternative: https://recordrtc.org/

import { Notify } from 'quasar'
var media_recorder = null
var blobs_recorded = []

/**
 * Video recorder component.
 */
export default {
  name: 'RecordButton',  
  data () {
    return {
      isPlaying: false,
      mimetype: false
    }
  },
  created() {
    this.setMimeTypes()
  },
  methods: {    
    /**
     * Set the stream to be recorded.
     * @param camera_stream Camera stream
     */
    setStream (camera_stream) {      
      if (!this.mimetype) return

      media_recorder = new MediaRecorder(camera_stream, { mimeType: this.mimetype })

      media_recorder.addEventListener('dataavailable', function(e) {
        if (e.data && e.data.size > 0) {
          blobs_recorded.push(e.data)
        }
      })

      // event : recording stopped & all blobs sent
      media_recorder.addEventListener('stop', this.download)

      media_recorder.addEventListener('warning', function(e) {
        console.warning(e)
      })
      
      media_recorder.addEventListener('error', function(e) {
        console.error(e)
      })
    },

    /**
     * Get browser's supported MIMEType.
     * 
     * @returns {string|false} MIMEType or false if the browser dose not support any type.
     */
    setMimeTypes () {
      var media = 'video'
      var types = ["webm", "ogg", "mp4", "x-matroska"]
      var codecs = ["vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"]

      for (var i in types) {
        const mimeType = `${media}/${types[i]}`
        for (var j in codecs) {
          const variations = [
            `${mimeType};codecs=${codecs[j]}`,
            `${mimeType};codecs:${codecs[j]}`,
            `${mimeType};codecs=${codecs[j].toUpperCase()}`,
            `${mimeType};codecs:${codecs[j].toUpperCase()}`
          ]
          for (var k in variations) {
            if(MediaRecorder.isTypeSupported(variations[k])) {
              this.mimetype = variations[k]
              return 
            }
          }
        }
        if (MediaRecorder.isTypeSupported(mimeType)) {
          this.mimetype = mimeType
          return
        }
      }

      Notify.create({
        type: 'negative',
        message: 'เครื่องของท่านไม่สามารถบันทึกวิดีโอได้'
      })
      return false
    },

    /**
     * Play the recorder.
     */
    play () {
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
    pause () {
      this.isPlaying = false
      if (!media_recorder || media_recorder.state === 'inactive') return

      media_recorder.pause()
    },

    /**
     * Download the recorded video.
     */
    download () {
      if (!this.mimetype) {
        Notify.create({
          type: 'negative',
          message: 'เครื่องของท่านไม่สามารถบันทึกวิดีโอได้'
        })
        return      
      } else if (!media_recorder) {
        return
      }

      if (media_recorder.state !== 'inactive') { // stop = inactive
        media_recorder.stop()
      } else {
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        var url = URL.createObjectURL(new Blob(blobs_recorded, { type: this.mimetype }))
        a.href = url
        a.download = Date.now()
        a.click()
        window.URL.revokeObjectURL(url)
      }   
    },
    clear () {
      blobs_recorded = []
    }
  },
  beforeUnmount () {
    media_recorder = null
    this.clear()
  }
}
</script>
