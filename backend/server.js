require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
const middleware=require("./middleware")
const cors=require("cors")
const Registeruser=require("./model");

const app =express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend API is running on Render");
});

app.use(cors({origin:"*"}))

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("DB is Connected Succesfully")
})
.catch((error)=>{
  console.log("error",error)

})

app.use(express.json());
 
app.post("/register",async(req,res)=>{
  try{
    const {username,email,password,confirmpassword}=req.body;
    let exits= await Registeruser.findOne ({email})
    if(exits){
      return res.status(400).send("email alreay exits")
    }
    if(password !== confirmpassword){
      return res.status(400).send("Password not matching")
    }
    let newuser=Registeruser({
      username,
      email,
      password,
      confirmpassword
    })
    await newuser.save();
    res.status(200).send("Registerd Succesfully") 

  }
  catch(error){
    console.log("error",error)
    return res.status(500).send("Internel Server error")

  }

})
  
app.post("/login",async(req,res)=>{
  try {
  const {email,password}=req.body;
  let exist= await Registeruser.findOne({email})

  if (!exist){
    return res.status(400).send("User not found")
  }
  if (exist.password !== password){
    return res.status(400).send("Invalid cretdetails")
  }
  let payload={
    user:{
      id:exist.id
    }
  }
  jwt.sign(payload, "jwtScret", { expiresIn: "1h" },
     (err, token) => {
  if (err) throw err;
  return res.json({ token });

    })}
    catch(error){
      console.log(error);
      return res.status(500).send(error.message)
    }

  }
)
app.get("/myprofile",middleware,async(req,res)=>{
  try{
    let exist= await Registeruser.findById(req.user.id)
    if(!exist){
      return res.status(400).send("User not found")
    }
    res.json(exist)

  }
  catch(error){
    console.log(error)
  return res.status(500).send(error);
 } })



app.listen(5000, () => {
  console.log("Server is running...");
});
