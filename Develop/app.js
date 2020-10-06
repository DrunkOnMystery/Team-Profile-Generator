//Declare constants for required files

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

//Declare constants for output for rendered file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


//create arrays for team member objects and for ID numbers
var teamMembers = [];
var idArray = [];


//create primary function
function mainMenu() {
    idArray = [];
    teamMembers = [];

    //create function for creating first team member, the manager, using inquirer prompts
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name."
            }
        },
        {
            type: "input",
            name: "managerID",
            message: "What is your manager's ID number?",
            validate: async answer => {
                if (isNaN(answer)) {
                    return "Please enter a number for your manager's ID number.";
                }
                return true
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's Email address?"
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is your manager's office number?",
            validate: async answer => {
                if (isNaN(answer)) {
                    return "Please enter a number for your manager's office.";
                }
                return true
            }

        },

        //Once the manager is done, push the Manager to the team member array, their ID number to the ID array, and start the nextTeamMember function
        ]).then(answer => {
            const manager = new Manager(answer.managerName, answer.managerID, answer.managerEmail, answer.managerOffice);
            teamMembers.push(manager);
            idArray.push(answer.managerID);
            nextTeamMember();

        })
    }

    //Prompt the user to choose the next team member they want to create, and call the appropriate function based on their choice
    {
        function nextTeamMember() {
            inquirer.prompt([{
                type: "list",
                name: "memberChoice",
                message: "Which team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want anymore team members"]
            }])
                .then(answer => {
                    console.log(answer.memberChoice);
                    if (answer.memberChoice === "Engineer") {
                        createEngineer();
                    }
                    if (answer.memberChoice === "Intern") {
                        createIntern();
                    }
                    if (answer.memberChoice === "I don't want anymore team members") {
                        console.log("Ok. We'll go ahead and finish up making your team!");
                        console.log(idArray);
                        console.log(teamMembers);
                        renderTeam();
                    }
                }
                )
        }
    }

    //show the function for creating an Engineer. Function ends by pushing the new object to the empty arrays, and then re-calling the nextTeamMember function
    function createEngineer() {
        console.log("Please describe your engineer");
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name."
            }
        },
        {
            type: "input",
            name: "engineerID",
            message: "What is your engineer's ID number?",
            validate: async answer => {
                if (isNaN(answer)) {
                    return "Please enter a number for your engineer's ID.";
                }
                return true
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's Email address?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's username on Github?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a Github username."
            }
        },
        ]).then(answer => {
            const engineer = new Engineer(answer.engineerName, answer.engineerID, answer.engineerEmail, answer.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answer.engineerID);
            nextTeamMember();

        })
    }

        //show the function for creating an Intern. Function ends by pushing the new object to the empty arrays, and then re-calling the nextTeamMember function
    function createIntern() {
        console.log("Please describe your intern");
        inquirer.prompt([{

            type: "input",
            name: "internName",
            message: "What's your intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name."
            }
        },
        {
            type: "input",
            name: "internID",
            message: "What is your intern's ID number?",
            validate: async answer => {
                if (isNaN(answer)) {
                    return "Please enter a number for your intern's ID.";
                }
                return true
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email address?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What school does your intern attend?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a school name."
            }
        }
        ]).then(answer => {
            const intern = new Intern(answer.internName, answer.internID, answer.internEmail, answer.internSchool);
            teamMembers.push(intern);
            idArray.push(answer.internID);
            nextTeamMember();

        })
    }

//Function for rendering the team to the output file, once the user prompts to do so    
    {
        function renderTeam() {
            const renderedTeam = render(teamMembers)
            fs.writeFile(outputPath, renderedTeam, function (err) {
                if (err) return console.log(err)
            });

            //console log notification to make once everything is rendered properly
            console.log("Successfully wrote to output path");
        }
    }


createManager();
}

mainMenu();