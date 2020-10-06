//bring in file for Employee class
const Employee = require("./Employee");

//create Manager class by extending Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

}

//Export the file
module.exports = Manager;