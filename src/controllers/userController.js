const user = require('../models/user')

module.exports.mostrar = (req,res)=>{
    user.find({}, (error, users)=>{
        if(error){
            return res.status(500).json({
                message: 'error mostrando los usuarios'
            })
            
        }
        console.log(users)
    })
}