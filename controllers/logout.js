const logoutController =function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) {
          console.log(err);
          return res.status(400).send(err);
        res.sendStatus(200);}
    });

};
module.exports = logoutController;

