import mongoose,{ Schema } from 'mongoose';
const tutorialVideoSchema = new Schema({
   name: {type: String},
   resource: {type:String},
   description: {type: String}
}, { versionKey: false })

const TutorialVideo = mongoose.model('tutorialVideo', tutorialVideoSchema);
export default TutorialVideo;