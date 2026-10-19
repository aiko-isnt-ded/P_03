let nextTagID = 1;

function getNextTagID() {
    return nextTagID++;
}

class TagException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Tag {

    // ====================
    // Attributes
    // ====================
    #id;
    #name;
    #color;

    // ====================
    // Constructor
    // ====================
    constructor(name, color) {
        this.name = name;
        this.color = color;   
        this.#id = getNextTagID();                 // Auto-generated & unmodifiable                     
    }

    // ====================
    // Setters
    // ====================
    set id(value) {
        throw new TagException("IDs are auto-generated.")
    }

    // NOT empty
    set name(name) {
        if (!name || name.trim() === "") {
            throw new TagException("Name CANNOT be empty.")
        }

        this.#name = name;
    }

    // NOT empty & hexadecimal
    set color(color) {
        if (!color || color.trim() === "") {
            throw new TagException("Color CANNOT be empty.")
        }

        // Check if RGB is correct using regex
        let hex = /^#[0-9a-fA-F]{6}$/;
        if (!hex.test(color)) {
            throw new TagException("Color must be hexadecimal.")
        }

        this.#color = color;
    }

    // ====================
    // Getters
    // ====================

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get color() {
        return this.#color;
    }
}