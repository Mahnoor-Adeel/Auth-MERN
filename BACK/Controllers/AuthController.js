const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkDate = (password) => {
    const currDate = new Date();
    console.log(currDate);
    const formattedDate = new Intl.DateTimeFormat('en-CA').format(currDate).replace(/-/g, '');    
    return (password.substring(password.length-8) === formattedDate);
   
    

};

const signup = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if (user){
            return res.status(409)
                .json({message: 'User already exists, You may login', success: false});
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup seccessful", 
                success: true
            })
    } catch(err){
        res.status(500)
            .json({
                message: "Internal server error", 
                success: true
            })
    }
}
const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth failed.';
        if (!user){
            return res.status(409)
                .json({message: errorMsg, success: false});
        }
        console.log(typeof password);
        if(password.length<=8){
            return res.status(409)
                .json({message: 'You must enter current date also', success: false});
        }
        const isCurrDate = checkDate(password);    
        if(!isCurrDate){
            return res.status(409)
                .json({message: 'You must enter current date also', success: false});
        }
        const basePassword = password.substring(0, password.length-8);
        const isPassEqual = await bcrypt.compare(basePassword, user.password);
        console.log(isPassEqual);
        if(!isPassEqual){
            return res.status(409)
                .json({message: 'Incorrect password', success: false});
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200)
            .json({
                message: "Login seccessful", 
                success: true,
                jwtToken,
                email, 
                name: user.name
            })

    } catch(err){
        console.log('mano')
        res.status(500)
            .json({
                message: "Internal server error", 
                success: false
            })
    }
}


module.exports = {
    signup,
    login
};