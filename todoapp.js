const readline = require('readline');

// this array stores tasks
let tasks = [];

// setup readline interface for user interface
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

// fxn to display header
function displayHeader () {
    console.log("=====================");
    console.log("       Tasker        ")
    console.log("=====================");
}

// fxn to add a new task
function addTask(description) {
    console.log("Adding to database...");
    setTimeout(() => {
        tasks.push(description);
        console.log(`Task added: ${description}`);
        askNextAction(); // asks what to do next after adding task
    }, 2000); // simulating delay-2s
}

// fxn to view all tasks
function viewTask() {
    console.log("Retrieving from database...");
    setTimeout(() => {
        if (tasks.length === 0) {
            console.log("No tasks available");
        } else {
            console.log("Available tasks:");
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            }

            );
        }
        askNextAction(); // asks what to do next after viewing tasks
        

    }, 1000); // simulating delay-1s

}

// fxn to handle user input for what user wants to do next
function askNextAction() {
    rl.question("Do you want to (1) Add a task (2) View tasks (3 to Exit): ", (answer) => {
        if (answer === '1') {
            rl.question("Enter the task description: ", (taskDescription) => {
                addTask(taskDescription); // calls addTask with user input
            });
        } else if (answer === '2') {
            viewTask(); // call viewTask to display tasks
        } else if (answer === '3') {
            console.log("Exiting...");
            rl.close(); // closes the readline interface
        }  else {
            console.log("Invalid option. Choose 1,2 or 3.");
            askNextAction(); // ask again if input was invalid
        }
    });


}
   
// start program
displayHeader();
askNextAction();