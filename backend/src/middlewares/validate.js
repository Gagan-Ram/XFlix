const validate =(schema)=>(req,res,next)=>{
    const{value,error}=schema.validate(req.body)
    if(error){
        console.log(error.details)
        return res.status(422).json({error:error.details})
    }
    else{
        return next();
    }
    
}

module.exports=validate