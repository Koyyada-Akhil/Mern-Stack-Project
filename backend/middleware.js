const jwt = require("jsonwebtoken")

module.exports=function(req,res,next){
    let token=req.header("x-token")
    try{
        if (!token){
            return res.status(400).send("Token not found")
        }
        let decode=jwt.verify (token,"jwtScret")
        req.user=decode.user
        next()

    }
    catch(error){
        console.log(error)
        return res.status(401).send({ msg: "Token is not valid" })

    }
}