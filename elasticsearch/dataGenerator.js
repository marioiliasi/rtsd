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

    user["givenName"] = uuid();
    user["lastName"] = uuid();
    user["middleName"] = uuid();
    user["identifier"] = uuid();
    user["primaryLanguage"] = uuid();
    user["role"] = uuid();
    user["sms"] = uuid();
    user["phone"] = uuid();
    user["email"] = uuid();
    user["grades"] = [Math.floor(Math.random() * 10)];
    user["timestampLastModifiedInMilliseconds"] = new Date().getTime();

    return user;
  }
}

module.exports = func;
