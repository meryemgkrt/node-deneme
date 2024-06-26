const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'http://:localhost:5000'];

const corsOptions = (reg, callback)=>{
    let corsOptions;
    console.log(req.header("Origin"));
    if(whiteList.indexOf(req.header("Origin"))!== -1){
        console.log("if içerisindyim")
        corsOptions= {origin:true}
    }else{
        console.log("else içerisindyim")
        corsOptions= {origin:false}
    }

    callback(null, corsOptions);
}

module.exports= corsOptions