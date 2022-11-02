const User = require("../models/user");
const jwt = require("jsonwebtoken");

// SignUp
const registerUser = async (req, res) => {
  let data = req.body;
  // console.log(data);
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






// login 
const loginUser = async (req,res)=>{
  let {email , password} = req.body;

  try{
    let user = await User.findOne({email : email}).exec();
    
    if(!user)res.status(400).send({ message: "User not found" });
    // res.send({
    //   message : "ok"
    // })

    user.comparePassword(password,function(matchError,isMatch){
      if(!isMatch || matchError){
        return res.status(200).send({message : "Not matched successfully."});
      }
      // generate the token and send to the user.
      // jwt.token({_id : user._id},process.env.jwt_secret,{
      //   expiresIn: "7d",
      // });


      
      const token = jwt.sign({_id : user._id},process.env.jwt_secret,{expiresIn:'7d'});

      return res.json({token,user : {
        _id : user._id,
        name : user.name,
        email : user.email
      },message : "successfully signed in"});
    })

  
  }catch(e){
    return res.send({message : "error in comparing the paasword"})
  }
}


module.exports = {registerUser,loginUser};


/*

{
    "firstName" : "abhishek",
    "lastName" : "shrivastava",
    "email" : "abhishekshrivastav1920@gmail.com",
    "password" : "loremipsum",
    "confirmPassword" : "loremipsum1",
    "As" : "lander"
}

*/