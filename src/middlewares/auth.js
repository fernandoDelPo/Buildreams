const path = require('path');
const fs = require('fs');

const userFilePath = path.join(__dirname, '../data/userDB.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userLoginInfoFilePath = path.join(__dirname, '../data/userLoginInfo.json');
const usersLoginInfo = JSON.parse(fs.readFileSync(userLoginInfoFilePath, 'utf-8'));


module.exports = (req, res, next) => {
    
    res.locals.user = false;
    
    if (req.session.user) {
        
        res.locals.user = req.session.user;
        next();
        
    } else if (req.cookies.remember) {     
        
        const userToken = usersLoginInfo.find(user => user.token == req.cookies.remember);
        
        if (userToken) {       
            let user = users.find(user => user.id == userToken.id)
            
            if(user) {
                delete user.password;
                
                req.session.user = user;
                res.locals.user = user;
            }
        }
    }
    
    next();
}