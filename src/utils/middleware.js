const validateXApiKey=(req,res,next)=>{
    const apiKey=req.headers['x-api-key'];
    if(!apiKey){ 
        res.status(400).send({message: 'API Key is missing'})
    }else if(apiKey!=='DSC2020BACKEND'){ 
        res.status(401).send({message: 'API Key is invalid'});
    }else{
        next();
    }
}

module.exports={validateXApiKey}