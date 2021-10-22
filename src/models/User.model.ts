import * as Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  pseudo: {
    type: String,
    min: 4,
    max: 14,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default Mongoose.model("user", UserSchema);
