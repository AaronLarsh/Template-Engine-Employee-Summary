const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function start(){
    let teamObj = [];
    await inquirer.prompt(
        {
            type: 'number',
            name: 'teamSize',
            message: 'How many people are on your team?',
            validate:  (value) => {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        }
    )
    .then((data) => {
        teamSize = data.teamSize;
        console.log(teamSize);
    });

    for(i = 0; i < teamSize; i++){
        let name;
        let id;
        let role;
        let email;
    
        await inquirer.prompt([ 
            {
                type: 'input',
                name: 'name',
                message: `Employee ${i+1}'s name?`,
            },
            {
                type: "input",
                name: "id",
                message: `Employee ${i+1}'s ID number?`
            },
            {
                type: "input",
                name: "email",
                message: `Employee ${i+1}'s Email address?`
            },
            {
                type: "list",
                name: "role",
                message: `Employee ${i+1}'s Role?`,
                choices: ['Manager', 'Engineer', 'Intern'],
            }
        ])
        .then((data) => {
    
            name = data.name;
            id = data.id;
            role = data.role;
            email = data.email;
        });
    
        // Switch based on employee's role
        switch (role){
            case "Manager":
            await inquirer.prompt([
            {
                type: "input",
                name: "oNum",
                message: "What's the office number?"
            }
            ])
            .then((data) => {
                    const manager = new Manager(name, id, email, data.oNum);
                    teamObj.push(manager);
                    console.log(manager);
            });
            break;

            case "Intern":
            await inquirer.prompt([
            {
                type: "input",
                name: "school",
                message: "Intern's School?"
            }
            ])
            .then((data) => {
                const intern = new Intern(name, id, email, data.school);
                teamObj.push(intern);
                console.log(intern);
            });
            break;
    
            case "Engineer":
            await inquirer.prompt([
            {
                type: "input",
                name: "github",
                message: "Engineer's GitHub?"
            }
            ])
            .then((data) => {
                const engineer = new Engineer(name, id, email, data.github);
                teamObj.push(engineer);
                console.log(engineer);
            });
            break;
        }
    } 
    console.log(teamObj)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
let htmlTeamList = render(teamObj);
console.log(htmlTeamList);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
fs.writeFile(outputPath, htmlTeamList, (err) => {
    if(err){
        console.log(err);
    }else {
        console.log('Finished.')
    }
});



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
}
start();


