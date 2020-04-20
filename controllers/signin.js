const handlesignin=(req,res,db,bcrypt)=>{
    return db.select('*').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isvalid=bcrypt.compareSync(req.body.password,data[0].hash)
        console.log(isvalid)
        if(isvalid){
           return  db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user=>{
                 res.json(user)
            }).catch(err=>res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('wrong password')
        }
    })
    .catch(err=>res.status(404).json('wrong cardentials'))
}
module.exports={
    handlesignin,
}