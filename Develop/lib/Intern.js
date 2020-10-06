//bring in file for Employee class
const Employee = require("./Employee");

//create Intern class by extending Employee class
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return "Intern"
    }

    getSchool() {
        return this.school
    }

}

//Export the file
module.exports = Intern;