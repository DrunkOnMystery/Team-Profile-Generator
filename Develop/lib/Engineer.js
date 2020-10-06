//bring in file for Employee class
const Employee = require("./Employee");

//create Engineer class by extending Employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }

}

//Export the file
module.exports = Engineer;