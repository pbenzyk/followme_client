var Victor = require('victor')

const ERR_THRESHOLD = 0.18 // about 10 degree
const MIN_CONFIDENT = 0.5

export default {
  getFeedback (feedbackType, poseTrainer, poseLearner, drawFeedbackBody, drawFeedbackArms, drawFeedbackLegs, ctx) {    
    // TODO
    if (!poseTrainer || !poseTrainer.keypoints || !poseLearner || !poseLearner.keypoints) 
      console.error('Need pose information from trainer and learner.')
  }
}
