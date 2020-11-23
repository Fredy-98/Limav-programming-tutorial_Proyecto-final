import mongoose,{ Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
// import TutorialVideo from './tutorialVideo';
const rolesValidos = {
   values: ['ADMIN','STUDENT'],
   message: '{VALUE} no es un rol válido'
}
const UserSchema = new Schema({
   name: {type: String},
   userName: {type: String},
   email: {type:String/* ,required:true */},
   password: {type:String},
   role: { type: String, default: 'STUDENT', enum: rolesValidos },
   /* Agregar la referencia a tutorialVideo
   */
   image: {type:String},
   list: [{ type: Schema.Types.ObjectId, ref: 'List'}], 
   // tutorialVideo: {type: Schema.Types.ObjectId, ref: 'tutorialVideo'} 
}, { versionKey: false })

UserSchema.plugin(uniqueValidator,{ message : '{PATH} debe de ser único '})
const User = mongoose.model('User', UserSchema);
export default User;