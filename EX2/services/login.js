const {readUsers} = require("../db/db")

const login = async (email, password) => {
    const users = await readUsers();
    var status = 1;
    
    // check if user is existed
    if (!email || !password){
        return {
            "Status": "false", "message": "Enter an email or passowrd"
        };
           // check if password matched
    } else{
        for(user in users){
            if(users[user].email == email || users[user].username == email && users[user].password == password){
                status = 0;
                return {"status": "true", "message": "login successfull", "data": users[user]};
            }
        }
        // return user's information
        if(status ==1 ){
            return {
                "status": "false", "message": "Email or Password is incorrect"};
        }
    }
}
module.exports = {
    login,
}