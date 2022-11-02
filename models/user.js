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
      type: String,
      trim: true,
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

const LoanSchema = new Schema(
  {
    email : {
      type : String,
      required : "Email is required",
      unique : true
    },
    balance : {
      type : Number ,
      required : "balance is required",
    },
    annualSalary : {
      type : Number ,
      required : "Annual Salary is required"
    },
    employed : {
      type : Boolean,
      required : "Employement is required"
    }
  }
);
// before saving to database need to check some conditions

// userSchema.pre('save', function (cb) {
//   let user = this;
//   // IMP: hash password only if user is not already registered.
//   if (user.isModified(this.password)) {
//     return bcrypt.hash(this.password, 12, function (err, hash) {
//       if (err) {
//         console.log("bcrypt error! " + err);
//       } else {
//         this.password = hash;
//         console.log(hash);
//         return cb();
//       }
//     });
//   } else {
//     return cb();
//   }

//   console.log(this);
//   // console.log("from pre");
// });

userSchema.pre('save', async function(next) {


  console.log('just before saving');

  const rounds = 10;

  const hash = await bcrypt.hash(this.password, rounds);
  this.password = hash;
  next();
});
// adding password methods

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (e, match) {
    if (e) {
      console.log("error from compare password");
      return next(e, false);
    }else{
      console.log(`matched password`);

      return next(null,match);
    }
  });
};

const User = mongoose.model("MYBANKUSER", userSchema);
const Loan = mongoose.model("LoanData",LoanSchema);
module.exports = {
  User, Loan
};
