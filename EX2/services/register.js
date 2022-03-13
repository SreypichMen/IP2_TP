const { readUsers, writeUsers } = require("../db/db")

const register = async (params) => {
    const { email, username, firstname, lastname, password } = params;
    
    const users = await readUsers();
    var status = 1;

    // Read all users
    if (!email || !username || !firstname || !lastname || !password) {
        return { "status": "false", "message": "Enter all the info" };
    }
      else{
          // Check if the user existed
          for (user in users) {
            if (users[user].email == params.email) {
                status = 0;
                return { "status": "false", "message": "This email already existed!" };
            } else if (users[user].username == params.username) {
                status = 0;
                return { "status": "false", "message": "This username already existed!" };
            }
        } // Save to do
        if (status == 1) {
            const newUser = {
                "email": email,
                "username": username,
                "firstname": firstname,
                "lastname": lastname,
                "password": password
            }
            users.push(newUser);

            // Return a complete user's info
            await writeUsers(users);
            return { "status": "true", "message": "User create successfull", "data": newUser };
        }

      }

    

   

    
}
module.exports = {
    register,
}