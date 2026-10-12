// =======================
// Functions
// =======================

function createUser(name, email, password) {
    let obj = new User(name, email, password);
    data.users.push(obj);
}

function getUserById(id) {
    let user = data.users.find(user => user.id == id);
    return user || "404 - User not found.";
}

function searchUsers(attribute, value) {
    if (!User.prototype.hasOwnProperty(attribute)) {
        throw new UserException(`Attribute ${attribute} does NOT exist.`)
    }

    return data.users.filter(user => {
        // Handle dates
        if (attribute == "joined_at") {
            return user.joined_at.toLocaleDateString("en-GB").includes(value);
        }

        // Return filtered value
        return String(user[attribute]).includes(String(value))
    });
}

function getAllUsers() {
    return data.users;
}

function updateUser(id, obj_new_info) {
    let updated = false;
    // Search User
    let user = data.users.find(user => user.id == id);

    // Check if user exists
    if (!user) {
        throw new UserException(`User with ID ${id} does NOT exist.`);
    }

    // Iterate through attributes until we find the correct one
    for (let attr in obj_new_info) {
        // Check if attribute exists and is not id nor joined_at
        if (User.prototype.hasOwnProperty(attr) && attr != "id" && attr != "joined_at") {
            user[attr] = obj_new_info[attr];
            updated = true;
        }
    }

    // Exception if there was no update
    if (!updated) {
        throw new UserException("Invalid attribute.");
    }

    return updated;
}

function deleteUser(id) {
    let index = data.users.findIndex(user => user.id == id);

    if (index == -1) {
        throw new UserException(`User with ID ${id} does NOT exist.`);
    }

    // Check if user has any task
    for (let i = 0; i < data.tasks.length; i++) {
        if (data.tasks[i].owner == id) {
            throw new UserException(`User with ID ${id} CANNOT be deleted because they have the task with ID ${data.tasks[i].id} assigned`)
        }
    }

    // Delete record
    data.users.splice(index, 1)

    return `User with ID ${id} was deleted successfully.`;
}