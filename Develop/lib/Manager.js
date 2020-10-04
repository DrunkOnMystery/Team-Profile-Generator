// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");


// class Employee {

//     constructor(name, id, email) {
//         this.name = name;
//         this.id = id;
//         this.email = email;
//     }


//     getName() {
//         return this.name;
//     }

//     getId() {
//         return this.id;
//     }

//     getEmail() {
//         return this.email;
//     }

//     getRole() {
//         return "Employee"
//     }
// }

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

manager1 = new Manager("Ben", 101, "ben@fakeemail.com", "102");
console.log(manager1);
module.export = Manager;