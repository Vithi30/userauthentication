const User =require('../models/user')
const auth = require('../helpers/auth')

const test=(req,res)=>{
    res.json('test is running')
}
//register endpoint
const registerUser =async (req,res)=>{
    try {

        const{name,email,password}=req.body;
        //check if name is entered 
        if(!name){
            return res.json({
                error:'name is required'
            })

        };
        //check password is correct
        if(!password || password.length <6){
            return res.json({
                error:'password is requird and should be atleast  6 character long'
            })
        };
        //check email
        const exist =await User.findOne({email});
        if(!email){
            return res.json({
                error:'please enter your  email id'
            })
        }
        if(exist){
            return res.json({
                error:'Email is taken already'
            })



        }
        
        const hashedPassword = await auth.hashpassword(password)



        const user= await User.create({
            name,email,password:hashedPassword,
        });

        return res.json(user);

    } catch (error) {
        console.log(error)
        
    }

};
//login endpoint
const loginUser= async (req,res) =>{
    try {
        const{email,password}=req.body;
        //check if use exist
        const user =await User.findOne({email});
        if (!user) {
            return res.json({
                error:'No user  found'
            })
        };
        //check if password match
        const match =await auth.comparePassword(password,user.password)
        if(match){
            res.json('password match')
        };
        if(!match){
            res.json({
                error: 'Password do not match'
            })
         }
         
    } catch (error) {
        console.log(error)
        
    }

}

module.exports ={
    test,
    registerUser,
    loginUser
};
