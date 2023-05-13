const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const isValid = function (value) {
  if (typeof value === "string" && value.trim().length === 0) return false
  if (typeof value === "undefined" || value === null) return false
  return true
}
const createUser=async function (req, res) {
  const data = req.body;
  const {name,email,password}=data
  if(!isValid(name)){
    return res.status(400).send({ status: false, message: "name is required" })
  }
  if(!isValid(email)){
    return res.status(400).send({ status: false, message: "email is required" })
  }
  if(!isValid(password)){
    return res.status(400).send({ status: false, message: "password is required" })
  }
  if (! (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/).test(email))
  return res.status(400).send({ status: false, message: "Please provide valid email" })

  let uniqueEmail = await userModel.find({ email:email });
  if (uniqueEmail.length!==0) {
    return res.status(400).send({ status: false, data: "Email already exist" });
  }
 
  const salt = await bcrypt.genSalt(10);
  const createPassword = await bcrypt.hash(password, salt);
  data.password = createPassword;
  const savedData = await userModel.create(data);
  return res.status(201).send({ status: true, data: savedData });

};

 const userLogin=async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;
    if(!isValid(email)){
      return res.status(400).send({ status: false, message: "email is required" })
    }
    if(!isValid(password)){
      return res.status(400).send({ status: false, message: "password is required" })
    }
    let findPassword = await userModel.findOne({ email: email });
    let decryptPassword = await bcrypt.compare(password, findPassword.password);
    if (!decryptPassword) {
      return res.status(400).send({ status: false, message: "Invalid Password" });
    }
    findUserId = await userModel.findOne({
      email: email,
      password: findPassword.password,
    });
    // token
    let token = await jwt.sign(
      {
        userId: findUserId._id,
        //time expiry after 1 hour
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      "secret_key"
    );
    // let output={ 
    //   token,
    //   userId: findUserId._id,
    //   email:findUserId.email
    //  }

    return res.status(200).send({ status: true, message: "login successful" ,data:findUserId });
  } catch (error) {
    console.log("error",error.message)
    res.status(500).send({ status: false, error: error.message });
  }
};

const getUser= async function(req,res){
try {
  let id=req.params.id
  const data= await userModel.findOne({_id:id});
  res.status(200).send({status:true,data:data})
} catch (error) {
  res.status(500).send({ status: false, error: error.message });
}
}


module.exports={createUser,userLogin, getUser};
