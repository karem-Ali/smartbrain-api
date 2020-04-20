const updateentries=(req,res,db)=>{
    const {id}=req.body
  return  db('users')
  .where('id', '=', req.body.id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{
      res.json(entries)
  }).catch(error=> res.status(400).json('unable to get entries'))
}
module.exports={
    updateentries
}