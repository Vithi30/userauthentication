const  bcrypt = require('bcrypt');

const hashpassword =async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}



const  comparePassword =(password,hashed)=>{
    return bcrypt.compare(password,hashed)
}

module.exports ={
    hashpassword,
    comparePassword
}