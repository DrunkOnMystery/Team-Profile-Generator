// TODO: Write code to define and export the Employee class
class Employee {

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }


    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee"
    }
}
// var employee1 = new Employee("Bob", 10101, "bob@fakeemail.com");
// console.log(employee1);
module.export = Employee;