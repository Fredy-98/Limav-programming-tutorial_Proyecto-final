import mongoose,{ Schema } from 'mongoose';
const ListSchema = new Schema({
   title: [{ type: String }],
   tutorialVideo: [{ type: Schema.Types.ObjectId, ref: 'tutorialVideo'}] 
}, { versionKey: false })

const List = mongoose.model('List', ListSchema);
export default List;