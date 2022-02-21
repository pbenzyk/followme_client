import * as posedetection from '@tensorflow-models/pose-detection'

const MIN_CONFIDENT = 0.5

export default {  

  /**
   * Draw the skeleton of a body on the video.
   * 
   * @param {array} keypoints  A list of keypoints.
   * @param {string} color A color of skeleton.
   * @param {object} ctx Canvas to draw on.
   * @param {number} scale Scale of keypoints' position (to match the video).
   */
  drawSkeleton (keypoints, color, ctx, scale = 1) {
    if (!keypoints || keypoints.length < 17) return

    ctx.strokeStyle = color
    ctx.lineWidth = 3

    posedetection.util.getAdjacentPairs(posedetection.SupportedModels.MoveNet).forEach(([i, j]) => {
      const kp1 = keypoints[i]
      const kp2 = keypoints[j]

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1
      const score2 = kp2.score != null ? kp2.score : 1

      if (score1 >= MIN_CONFIDENT && score2 >= MIN_CONFIDENT) {
        ctx.beginPath()
        ctx.moveTo(kp1.x * scale, kp1.y * scale)
        ctx.lineTo(kp2.x * scale, kp2.y * scale)
        ctx.stroke()
      }
    })
  },

  /**
   * Draw the keypoints of a body on the video.
   * 
   * @param {array} keypoints  A list of keypoints.
   * @param {string} color A color of keypoints.
   * @param {object} ctx Canvas to draw on.
   * @param {number} scale Scale of keypoints' position (to match the video).
   */
  drawKeypoints (keypoints, color, ctx, scale = 1) {
    if (!keypoints || keypoints.length < 17) return
    
    const keypointInd = posedetection.util.getKeypointIndexBySide(posedetection.SupportedModels.MoveNet)
    ctx.fillStyle = color

    for (const i of keypointInd.middle) {
      this.drawKeypoint(keypoints[i], ctx, scale)
    }
    for (const i of keypointInd.left) {
      this.drawKeypoint(keypoints[i], ctx, scale)
    }
    for (const i of keypointInd.right) {
      this.drawKeypoint(keypoints[i], ctx, scale)
    }
  },

  /**
   * Draw a keypoint on the canvas.
   * 
   * @param {object} keypoint A keypoint.
   * @param {object} ctx Canvas to draw on.
   * @param {number} scale Scale of keypoints' position (to match the video).
   */
  drawKeypoint (keypoint, ctx, scale) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1
    const r = 5

    if (score >= MIN_CONFIDENT) {
      ctx.beginPath()
      ctx.arc(keypoint.x * scale, keypoint.y * scale, r, 0, 2 * Math.PI)
      ctx.fill()
    }
  },  

  /**
   * Convert keypoints from BlazePose format to COCO format.
   * 
   * BlazePose
   * 0: nose, 1: left_eye_inner, 2: left, 3: left_eye_outer, 4: right_eye_inner, 
   * 5: right_eye, 6: right_eye_outer, 7: left_ear, 8: right_ear, 
   * 9: mouth_left, 10: mouth_right, 11: left_shoulder, 12: right_shoulder, 
   * 13: left_elbow, 14: right_elbow, 15: left_wrist, 16: right_wrist, 
   * 17: left_pinky, 18: right_pinky, 19: left_index, 20: right_index, 
   * 21: left_thumb, 22: right_thumb, 23: left_hip, 24: right_hip, 
   * 25: left_knee, 26: right_knee, 27: left_ankle, 28: right_ankle, 
   * 29: left_heel, 30: right_heel, 31: left_foot_index, 32: right_foot_index
   * 
   * COCO 
   * 0: nose, 1: left_eye, 2: right_eye, 3: left_ear, 4: right_ear, 
   * 5: left_shoulder, 6: right_shoulder, 7: left_elbow, 8: right_elbow, 
   * 9: left_wrist, 10: right_wrist, 11: left_hip, 12: right_hip, 
   * 13: left_knee, 14: right_knee, 15: left_ankle, 16: right_ankle
   * 
   * @param {object} blaze keypoints in BlazePose format
   * @returns {object} keypoints in COCO format
   */
  toCOCO (blaze) {
    if (!blaze || !blaze.keypoints || blaze.keypoints.length !== 33) 
      return {keypoints: null}

    return {keypoints: [
      blaze.keypoints[0], blaze.keypoints[2], blaze.keypoints[5], blaze.keypoints[7], blaze.keypoints[8],
      blaze.keypoints[11], blaze.keypoints[12], blaze.keypoints[13], blaze.keypoints[14],
      blaze.keypoints[15], blaze.keypoints[16], blaze.keypoints[23], blaze.keypoints[24],
      blaze.keypoints[25], blaze.keypoints[26], blaze.keypoints[27], blaze.keypoints[28]
    ]}
  }
}
