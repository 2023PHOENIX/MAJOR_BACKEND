const { default: mongoose } = require("mongoose");


const superagent = require("superagent");
const userDetailController = (req, res) => {
  res.send({
    message: "yellow world",
  });
};

// const fetchData = async (data) => {
//   try {
//     const { body } = await superagent
//       .post("https://jogi-api.herokuapp.com/predict")
//       .send(data);

//     console.log(body);
//   } catch (e) {
//     console.log(e);
//   }
// };

const loanDetailController =async (req, res) => {
  let data = req.body;

  // will get load details .
   let {body} =  await superagent
   .post("https://jogi-api.herokuapp.com/predict")
   .send(data);


   console.log(body)

   
  res.send({
    message: "successfully recieved your application information api hit",
    data,
    body,
  
  });
};

module.exports = { userDetailController, loanDetailController };
