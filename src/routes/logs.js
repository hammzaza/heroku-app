UserLogs = require('../schemas/userlog');
module.exports = function(app,passport){
    app.get('/user-logs',function(req,res){
        UserLogs.find({userid:'hamza'},function(err,results){
            res.render('logs.ejs',{logs:results});
        });
    });
};
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
            return next();
    }
    else
        res.redirect('/');
}