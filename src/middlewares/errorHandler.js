const  APIErrror = require('../utils/errors');

const errorHandlerMiddleware = (err, req, res, next)=>{

    if(err instanceof APIErrror){
        return res.status(err.statusCode || 400).json({success:false, message:err.message})
    }
    return res.status(500).json({success:false, message:"Sunucu hatası oluştu. Lütfen apinizi kontrol edin !"})
}

module.exports = errorHandlerMiddleware;