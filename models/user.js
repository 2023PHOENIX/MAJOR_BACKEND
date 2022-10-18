const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: "name is required",
    },
    lastName: {
      type : String,
      trim : true,
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 64,
    },
    As: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// before saving to database need to check some conditions

userSchema.pre("save", function (cb) {
  let user = this;
  // IMP: hash password only if user is not already registered.
  if (user.isModified(this.password)) {
    return bcrypt.hash(this.password, 12, function (err, hash) {
      if (err) {
        console.log("bcrypt error! " + err);
      } else {
        user.password = hash;

        return cb();
      }
    });
  } else {
    return cb();
  }
});

const User =  mongoose.model("MYBANKUSER", userSchema);


module.exports = User;