import pkg from "jsonwebtoken";
const {verify}=pkg;
export default async function Auth(req,res,next){
    try {
        console.log(req.headers);
        const key=req.headers.authorization;
        console.log("key",key);
        if(!key) return res.status(404).send("Unauthorised access");
        const token = key.split(" ")[1];
        const auth=await verify(token,process.env.JWT_KEY);
        console.log('middleware' ,auth);
        req.user=auth;
        next();
    } catch (error) {
       res.status(404).send(error); 
    }
}