const handleregister= (req,res,db,bcrypt)=>{
    const {name,email,password}=req.body
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login')
            .returning('email')
            .then(loginEmail=>{
              return  trx('users').returning('*').insert({
                    name: name ,
                     email:loginEmail[0],
                     joined:new Date()
                 }).then(response=>{
                     res.json(response[0])
                 })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    
}
module.exports={
    handleregister 
}