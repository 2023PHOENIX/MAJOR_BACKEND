const User = require("../models/user");

// SignUp
const registerUser = async (req, res) => {
  let data = req.body;
  console.log(data);
  if (!data.firstName) return res.status(400).send({ message: "Name is required" });
  if (!data.password || data.password.length < 6)
    return res
      .status(400)
      .send({ message: "password must be at least 6 characters" });

  if(data.password !== data.confirmPassword)return res.status(400).send({message : "password didnot match...!"});

  let userExist = await User.findOne({ email: data.email }).exec();

  if (userExist) {
    return res.status(400).send({ message: "email is already exists" });
  }

  // register the user

  const user = new User(req.body);
  try {
    await user.save();
    // console.log('created',user);
    return res.send({ message: "user created successfully" });
  } catch (e) {
    return res.status(400).send({ message: "Error registering user" + e });
  }

  res.send({ message: "new user found", data });
};

module.exports = registerUser;
