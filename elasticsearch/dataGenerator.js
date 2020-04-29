const { uuid } = require("uuidv4");

const func = {
  generateUsers: function (count) {
    let users = [];

    for(let i = 1; i <= count; i++){
      users.push(func.generateRandomUser());
    }

    return users;
  },
  generateRandomUser: function(){
    let user = {};

    user["firstName"] = uuid();
    user["lastName"] = uuid();
    user["age"] = Math.ceil(Math.random() * 100);

    return user;
  }
}

module.exports = func;
