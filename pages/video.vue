<template>
  <div>
    <div view="hHh Lpr lFf" class="bg-grey-10 text-white">
      <div class="flex">
        <div class="">
          <div class="grid grid-cols-2">
            <div class="">
              <VideoFeedback
                ref="trainerfeed"
                type="trainer"
                :video-options="trainerOptions"
                @loadedmetadata="onVideoMetaLoaded"
                @timeupdate="onTrainerUpdate"
                @ended="onVideoEnd"
              >
              </VideoFeedback>
            </div>
            <div class="">
              <VideoFeedback
                v-if="mode !== 'off'"
                ref="learnerfeed"
                type="learner"
                :video-options="learnerOptions"
              >
              </VideoFeedback>
            </div>
          </div>
          <div>
            <span class="time"
              >{{ toMS(currentTime) }} / {{ toMS(duration) }}</span
            >
            <div class="flex">
              <record-button
                v-if="mode === 'on' && recordedMimeTypes"
                ref="recordbutton"
                :mimetype="recordedMimeTypes"
                @click="playToggle"
              />
              <v-btn
                v-else
                class="ma-2"
                icon
                outlined
                large
                fab
                color="white"
                @click="playToggle"
              >
                <v-icon>{{ isPlaying ? "mdi-pause" : "mdi-play" }}</v-icon>
              </v-btn>

              <div class="col">
                <div
                  class="seekbar text-secondary"
                  ref="seekbar"
                  @click="onSeekbarClick($event)"
                >
                  <span
                    class="progress"
                    :style="{ width: percentPlay + '%' }"
                  ></span>
                </div>
              </div>
              <v-menu
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="ma-2"
                    icon
                    outlined
                    large
                    fab
                    color="white"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-cog</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list flat subheader>
                    <v-subheader header>ตั้งค่าวิดีโอผู้สอน</v-subheader>
                    <v-list-item>
                      <v-slider
                        v-model="trainerOptions.audio"
                        label="ระดับเสียง"
                        max="1"
                        min="0"
                        step="0.1"
                      ></v-slider>
                    </v-list-item>
                    <v-list-item>
                      <v-slider
                        v-model="trainerOptions.opacity"
                        label="ความโปร่งใส"
                        max="1"
                        min="0"
                        step="0.1"
                      ></v-slider>
                    </v-list-item>
                    <v-list-item>
                      <v-switch
                        class="p-0 mt-0"
                        v-model="trainerOptions.showSkeleton"
                        label="โครงร่าง"
                      ></v-switch>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-subheader header>ตั้งค่าวิดีโอผู้เรียน</v-subheader>
                    <v-list-item>
                      <v-slider
                        v-model="learnerOptions.opacity"
                        label="ความโปร่งใส"
                        max="1"
                        min="0"
                        step="0.1"
                      ></v-slider>
                    </v-list-item>
                    <v-list-item>
                      <v-switch
                        class="p-0 mt-0"
                        v-model="learnerOptions.showSkeleton"
                        label="โครงร่าง"
                      ></v-switch>
                    </v-list-item>
                    <v-list-item>
                      <v-checkbox
                        class="col"
                        v-model="learnerOptions.drawFeedbackBody"
                        label="ตัว"
                      ></v-checkbox>
                      <v-checkbox
                        class="col"
                        v-model="learnerOptions.drawFeedbackArms"
                        label="แขน"
                      ></v-checkbox>
                      <v-checkbox
                        class="col"
                        v-model="learnerOptions.drawFeedbackLegs"
                        label="ขา"
                      ></v-checkbox>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-subheader header>วิธีชี้แนะ</v-subheader>
                    <v-autocomplete
                      v-model="learnerOptions.feedbackType"
                      :items="feedbackOptions.label"
                      label="เลือกวิธีชี้แนะ"
                    ></v-autocomplete>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </div>
      </div>

      <v-dialog v-model="alert" persistent>
        <v-card>
          <v-card-section align="center">
            <div class="text-h6">ฝึกเสร็จแล้ว</div>
            <v-btn
              v-if="mode === 'on' && recordedMimeTypes"
              label="ดาวน์โหลดวิดีโอการฝึก"
              color="primary"
              @click="download"
            />
          </v-card-section>

          <v-card-actions align="center">
            <v-btn label="ฝีกอีกรอบ" @click="clear" v-close-popup />
            <v-btn label="จบการฝึก" :to="'/'" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { Loading, Notify, SessionStorage } from "quasar";
import * as poseDetection from "@tensorflow-models/pose-detection/dist/index.js"; // Need to import index.js to make patch work

import Util from "@/lib/util";

const CAM_WIDTH = 1024;
const CAM_HEIGHT = 600;

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
  name: "FollowMe",
  components: {},
  props: {
    /**
     * Mode of learner's video camera.
     * @values on, off, recorded
     */
  },
  data() {
    return {
      testVideo:
        "https://admin.nectec-followme.tk/videos/courses/Easy_TaiChi_-_join_in_-_a_9-minute_Daily_Practice.mp4?fbclid=IwAR0T4IhK2OxkYh7kEcX0CKhtJYmsRzsaptI_SZGMKg4fjy3tLMUMlejGN9A",
      appmode: "",
      alert: false,
      mode: "on",
      recordedMimeTypes: false,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      percentPlay: 0,
      videoWidth: 640,
      videoHeight: 360,
      videoSrc:
        "https://admin.nectec-followme.tk/videos/courses/Easy_TaiChi_-_join_in_-_a_9-minute_Daily_Practice.mp4?fbclid=IwAR0T4IhK2OxkYh7kEcX0CKhtJYmsRzsaptI_SZGMKg4fjy3tLMUMlejGN9A",
      cameraSrc:
        "https://admin.nectec-followme.tk/videos/courses/Easy_TaiChi_-_join_in_-_a_9-minute_Daily_Practice.mp4?fbclid=IwAR0T4IhK2OxkYh7kEcX0CKhtJYmsRzsaptI_SZGMKg4fjy3tLMUMlejGN9A",
      trainerOptions: {
        loadPose: true,
        showSkeleton: false,
        audio: 1,
        opacity: 1,
        mirror: false,
      },
      learnerOptions: {
        loadPose: true,
        showSkeleton: true,
        audio: 0,
        opacity: 0.8,
        mirror: true,
        drawFeedbackBody: true,
        drawFeedbackArms: true,
        drawFeedbackLegs: true,
        feedbackType: null,
      },
      feedbackOptions: [
        {
          label: "แสดงตำแหน่งที่ผิด",
          value: 3,
        },
        {
          label: "แสดงตำแหน่งที่ถูกต้อง",
          value: 4,
        },
        {
          label: "แสดงความต่างระหว่างตำแหน่ง",
          value: 6,
        },
      ],
    };
  },
  async mounted() {
    /**
     * Load trainer' video and learner' video/camera.
     */

    await this.setup();
  },
  methods: {
    async loadVideos() {
      //   Loading.show({
      //     message: 'Loading video information...'
      //   })

      // Load trainer video
      // TODO The video is async but I don't know how to wait for loading
      this.$refs.trainerfeed.setSrc(this.videoSrc);

      // Load learner's video/camera
      if (this.mode === "recorded") {
        this.$refs.learnerfeed.setSrc(this.cameraSrc);
      } else if (this.mode === "on") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              audio: false,
              width: CAM_WIDTH,
              height: CAM_HEIGHT,
            },
          });
          this.$refs.learnerfeed.setSrcObject(stream);
          // this.$refs.recordbutton.setStream(stream)
        } catch (err) {
          Notify.create({
            type: "negative",
            message: "ไม่สามารถเข้าถึงกล้องได้",
          });
          this.mode = "off";
          console.error(err);
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
        poseDetection.SupportedModels.BlazePose,
        {
          runtime: "mediapipe",
          enableSegmentation: true,
          // modelType: (this.$route.query.architecture === 'accurate') ? poseDetection.movenet.modelType.SINGLEPOSE_THUNDER : poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
        }
      );

      this.$refs.trainerfeed.setEstimators(detector);
      if (this.mode !== "off") this.$refs.learnerfeed.setEstimators(detector);
    },

    /**
     * Set up the followme player.
     */
    async setup() {
      //   Loading.show()

      // Get MIME type for learner's recording
      // this.recordedMimeTypes = SessionStorage.getItem('recordedMimeTypes')
      //   if (!this.recordedMimeTypes) {
      //     this.recordedMimeTypes = Util.getSupportedMimeTypes()
      //     SessionStorage.set('recordedMimeTypes', this.recordedMimeTypes)
      //   }

      // Load videos and detector
      await this.loadVideos();
      await this.loadDetector();

      // Set up feedback
      this.learnerOptions.feedbackType = this.$route.query.feedback
        ? this.feedbackOptions[parseInt(this.$route.query.feedback)]
        : null;

      this.requestPoseDetectionFrame();
      Loading.hide();
    },
    playToggle() {
      if (this.isPlaying) {
        this.$refs.trainerfeed.pause();
        if (this.$refs.recordbutton) this.$refs.recordbutton.pause();
        if (this.mode === "recorded") this.$refs.learnerfeed.pause();
        this.isPlaying = false;
      } else {
        this.$refs.trainerfeed.play();
        if (this.$refs.recordbutton) this.$refs.recordbutton.play();
        if (this.mode === "recorded") this.$refs.learnerfeed.play();
        this.isPlaying = true;
      }
    },

    /**
     * Update progress of trainer's video.
     * @param {number} currentTime The current time of the trainer video
     */
    onTrainerUpdate(currentTime) {
      this.currentTime = currentTime;
      this.percentPlay = (currentTime / this.duration) * 100;
    },

    /**
     * Handle event when the seekbar is clicked.
     * @param {object} event Click event information
     */
    onSeekbarClick(event) {
      var percentage = event.offsetX / this.$refs.seekbar.offsetWidth;
      this.currentTime = this.duration * percentage;
      this.$refs.trainerfeed.setCurrentTime(this.currentTime);
      if (this.mode === "recorded")
        this.$refs.learnerfeed.setCurrentTime(this.currentTime);
    },

    /**
     * Handle event when trainer' video metadata is loaded.
     * @param {number} duration Duration of the trainer video
     */
    onVideoMetaLoaded(duration) {
      this.duration = duration;
    },

    /**
     * Handle event when trainer' video is ended.
     */
    onVideoEnd() {
      this.isPlaying = false;
      if (this.$refs.recordbutton) this.$refs.recordbutton.stop();

      if (this.mode !== "recorded") this.alert = true;
    },

    // Pose estimation //////////////////

    /**
     * Continuously detect poses in video frames.
     */
    async requestPoseDetectionFrame() {
      if (this.$refs.trainerfeed)
        await this.$refs.trainerfeed.poseDetectionFrame();
      if (this.$refs.learnerfeed)
        await this.$refs.learnerfeed.poseDetectionFrame();
      requestAnimationFrame(this.requestPoseDetectionFrame);
    },

    // Other //////////////////

    /**
     * Convert milliseconds to minute:second.
     * @param {number} ms Time in milliseconds
     * @returns {string} minute:second
     */
    toMS(ms) {
      var seconds = Math.floor(ms % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      var minutes = Math.floor((ms / 60) % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return minutes + ":" + seconds;
    },

    /**
     * Download learner video (in 'on' mode only).
     */
    download() {
      if (this.mode === "on") {
        this.$refs.recordbutton.download();
      }
    },

    /**
     * Reset everything.
     */
    clear() {
      this.$refs.trainerfeed.clear();
      if (this.$refs.learnerfeed) this.$refs.learnerfeed.clear();
      if (this.$refs.recordbutton) this.$refs.recordbutton.clear();
      this.onSeekbarClick({
        offsetX: 0,
      });
    },
  },
};
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
