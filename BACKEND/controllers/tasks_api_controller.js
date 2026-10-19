// =======================
// API Imports
// =======================

// Import Library
const fs = require('fs');
// Import Task Model
const Task = require('../models/task');
// Load JSON DBs
let tasks = JSON.parse(fs.readFileSync('./database/tasks.json'));
let users = JSON.parse(fs.readFileSync('./database/users.json'));

// =======================
// API Functions
// =======================

exports.authTasksMiddleware = (req, res, next) => {
    try {
        // Check whether a password was entered
        let pwd = req.get('x-auth');
        if (!pwd) return res.status(401).send('Password is missing');

        // Task Authentification depends on User Existence
        let id_user = req.body.id_user;
        if (!id_user) return res.status(400).send('User ID is required');

        // Find user
        let user = users.find(i => String(i.id) === String(id_user));
        if (!user) return res.status(404).send('User Not Found');

        // Check whether password is valid
        if (user.password !== pwd) return res.status(401).send('Wrong password');

        // If everything's well
        req.user = user;
        next()
    } catch(err) {
        return res.status(400).send(err.message);
    }
}

// POST Method to Create Task
exports.registerTask = (req, res) => {
    try {
        // Get fields from JSON request
        let title = req.body.title;
        let description = req.body.description;
        let due_date = req.body.due_date;
        let status = req.body.status;
        let tags = req.body.tags;

        // Validate Fields
        if (!title) return res.status(400).send("Task must have a title");
        if (tags !== undefined && !Array.isArray(tags)) return res.status(400).send("Tags must be an array");

        // Populate fields if everything went well
        let new_description = description || "";
        let new_due_date = due_date ? new Date(due_date) : new Date();
        let new_status = status || 'A';
        let new_tags = tags || [];

        // Create new task
        let new_task = new Task(title, new_description, new_due_date, req.user.id, new_status, new_tags);
        tasks.push(new_task.toObj());

        fs.writeFileSync('./database/tasks.json', JSON.stringify(tasks, null, 2));
        res.send('New Task Added');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// =======================
// Functions
// =======================

function createTask(title, due_date, description, owner, status, tags = []) {
    let obj = new Task(title, due_date, description, owner, status, tags);
    data.tasks.push(obj);
}

function getTaskById(id) {
    let task = data.tasks.find(task => task.id == id);
    return task || "404 - Task not found.";
}

function searchTasks(attribute, value) {
    if (!Task.prototype.hasOwnProperty(attribute)) {
        throw new TaskException(`Attribute ${attribute} does NOT exist.`)
    }

    return data.tasks.filter(task => {
        // Handle dates
        if (attribute == "due_date") {
            return task.due_date.includes(value);
        }

        // Return filtered value
        return String(task[attribute]).includes(String(value))
    });
}

function getAllTasks() {
    return data.tasks;
}

function updateTask(id, obj_new_info) {
    let updated = false;
    // Search Task
    let task = data.tasks.find(task => task.id == id);

    // Check if task exists
    if (!task) {
        throw new TaskException(`Task with ID ${id} does NOT exist.`);
    }

    // Iterate through attributes until we find the correct one
    for (let attr in obj_new_info) {
        // Check if attribute exists and is not id nor due_date
        if (Task.prototype.hasOwnProperty(attr) && attr != "id") {
            task[attr] = obj_new_info[attr];
            updated = true;
        }
    }

    // Exception if there was no update
    if (!updated) {
        throw new TaskException("Invalid attribute.");
    }

    return updated;
}

function deleteTask(id) {
    let index = data.tasks.findIndex(task => task.id == id);

    if (index == -1) {
        throw new TaskException(`Task with ID ${id} does NOT exist.`);
    }
    
    // Delete record
    data.tasks.splice(index, 1)

    return `Tag with ID ${id} was deleted successfully.`;
}

function findTasksByTag(tags) {
    if (!Array.isArray(tags)) {
        throw new TaskException("Tags MUST be an array.");
    }

    return data.tasks.filter(task =>
        tags.every(tagID => task.tags.includes(tagID))
    );
}