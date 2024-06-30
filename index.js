#! /usr/bin/env node
import inquirer from "inquirer";
console.log("WELCOME TO STUDENT MANAGEMENT SYSTEM");
// creating a class of student
class Student {
    name;
    //properties
    static idCounter = 0;
    studentID;
    courses = [];
    balance = 0;
    constructor(name) {
        this.name = name;
        Student.idCounter++;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return 10000 + Student.idCounter; // 10001, 10002 and so on
    }
    enrollCourse(course) {
        this.courses.push(course);
        this.balance += 1000; // each course fees is Rs. 1000
    }
    viewBalance() {
        return this.balance; // pending balance of a student
    }
    PayCoursesFee(amount) {
        this.balance -= amount; //this balance of student will be - amount paid by student
    }
    showStatus() {
        console.log(`
            Name: ${this.name}
            Student ID: ${this.studentID}
            course Enrolled: ${this.courses.join(" , ")} 
            Balance: ${this.balance}
            `);
    }
    getStudentID() {
        return this.studentID;
    }
    getName() {
        return this.name;
    }
}
// class ends here
const students = []; // students list will be stored here
// mainMenu start here
async function mainMenu() {
    const userInputMenu = await inquirer.prompt({
        type: `list`,
        name: `menu`,
        message: `Select your Menu!`,
        choices: [
            "1- Add New Student",
            "2- Enroll Student in a Course",
            "3- View Student Balance",
            "4- Pay course fees",
            "5- Show Student Status",
            "6- End Menu"
        ]
    });
    // destructuring
    const { menu } = userInputMenu;
    if (menu === "1- Add New Student")
        await addNewStudent();
    if (menu === "2- Enroll Student in a Course")
        await enrollStudent();
    if (menu === "3- View Student Balance")
        await viewBalance();
    if (menu === "4- Pay course fees")
        await payTuition();
    if (menu === "5- Show Student Status")
        await showStatus();
    if (menu === "6- End Menu") {
        console.log(`Thank you for using Student Management System\n`);
        process.exit();
    }
    mainMenu();
}
// mainMenu ends here
// Start creating functions
// addNewStudent start here
async function addNewStudent() {
    const userInput = await inquirer.prompt({
        type: `input`,
        name: `name`,
        message: `Enter Student Name`
    });
    const student = new Student(userInput.name);
    students.push(student);
    console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}\n`);
}
// addNewStudent ends here
//enrollStudent start here
async function enrollStudent() {
    const student = await selectStudent(); // we will create this function later on
    if (student) {
        const userInput = await inquirer.prompt({
            type: `list`,
            name: `course`,
            message: `Select courses to enroll`,
            choices: [`TypeScript`, "JavaScript", "Python", "Next.js"]
        });
        student.enrollCourse(userInput.course);
        console.log(`Enrolled in Courses: ${userInput.course}`);
    }
}
// enrollStudent ends here
// viewBalance start here
async function viewBalance() {
    const student = await selectStudent();
    if (student) {
        console.log(`Balance: ${student.viewBalance()}`);
    }
}
// viewBalance function ends here
// payTuition function start here
async function payTuition() {
    const student = await selectStudent();
    if (student) {
        const userInput = await inquirer.prompt({
            type: `input`,
            name: `amount`,
            message: `Enter amount you want to pay?`
        });
        student.PayCoursesFee(parseFloat(userInput.amount));
        console.log(`Paid ${userInput.amount}.Balance remaing ${student.viewBalance()}`);
    }
}
// payTuition function ends here
// showStatus function starts here
async function showStatus() {
    const student = await selectStudent();
    if (student) {
        student.showStatus();
    }
}
//showStatus ends here
// selectStudent() start here
async function selectStudent() {
    if (students.length === 0) {
        console.log(`No Student record available.\n`);
    }
    else {
        const stdSelect = await inquirer.prompt({
            type: `list`,
            name: `stdID`,
            message: `Select a student!`,
            choices: students.map((std) => ({
                name: std.getName(),
                value: std.getStudentID(),
            }))
        });
        return (students.find((std) => std.getStudentID() === stdSelect.stdID) || null);
    }
}
// selectStudent() ends here
mainMenu();
