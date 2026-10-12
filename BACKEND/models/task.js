let nextTaskID = 1;

function getNextTaskID() {
    return nextTaskID++;
}

class TaskException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Task {
    
    // ====================
    // Attributes
    // ====================
    #id;
    #title;
    #description;
    #due_date;
    #owner;
    #status;
    #tags;

    // ====================
    // Constructor
    // ====================
    constructor(title, due_date, description, owner, status, tags = []) {
        this.title = title;
        this.due_date = due_date;
        this.description = description;
        this.owner = owner;
        this.status = status;
        this.tags = tags;
        this.#id = getNextTaskID();
    }

    // Setters
    set id(value) {
        throw new TaskException("IDs are auto-generated.")
    }

    set title(title) {
        if (!title || title.trim() === "") {
            throw new TaskException("Title CANNOT be empty.")
        }

        this.#title = title;
    }

    set due_date(due_date) {
        if (isNaN(new Date(due_date).getTime())) {
            throw new TaskException("Due Date is NOT valid (must be yyyy/mm/dd).")
        }

        this.#due_date = due_date;
    }

    set description(description) {
        this.#description = description;    
    }

    set owner(owner) {
        // Check if user exists
        if (!data.users.some(user => user.id == owner)) {
            throw new TaskException(`User with ID ${owner} does NOT exist.`);
        }

        this.#owner = owner;
    }

    set status(status) {
        // Ensure valid values are entered
        if (!["A", "F", "C"].includes(status)) {
            throw new TaskException("Status MUST be either A/F/C");
        }

        this.#status = status;
    }

    set tags(tags) {
        // Convert empty values to an array
        if (tags == "" || tags == null) {
            tags = [];
        }

        // Check that tag is an array
        if (!Array.isArray(tags)) {
            throw new TaskException("Tags MUST be an array.");
        }

        // Check that tag exists
        for (let i = 0; i < tags.length; i++) {
            // Match a tag with the id
            let tagExists = data.tags.some(tag => tag.id == tags[i]);

            // Case: Tag doesn't exist
            if (!tagExists) {
                throw new TaskException(`Tag with ID ${tags[i]} does NOT exist.`);
            }
        }

        this.#tags = tags;
    }

    // ====================
    // Getters
    // ====================

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get due_date() {
        return this.#due_date;
    }

    get owner() {
        return this.#owner;
    }

    get status() {
        return this.#status;
    }

    get tags() {
        return this.#tags;
    }
}