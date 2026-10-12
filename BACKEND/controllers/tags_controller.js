// =======================
// Functions
// =======================

function createTag(name, color) {
    let obj = new Tag(name, color);
    data.tags.push(obj);
}

function getTagById(id) {
    let tag = data.tags.find(tag => tag.id == id);
    return tag || "404 - Tag not found.";
}

function searchTags(attribute, value) {
    if (!Tag.prototype.hasOwnProperty(attribute)) {
        throw new TagException(`Attribute ${attribute} does NOT exist.`)
    }

    return data.tags.filter(tag => {
        // Return filtered value
        return String(tag[attribute]).includes(String(value))
    });
}

function getAllTags() {
    return data.tags;
}

function updateTag(id, obj_new_info) {
    let updated = false;
    // Search Tag
    let tag = data.tags.find(tag => tag.id == id);

    // Check if tag exists
    if (!tag) {
        throw new TagException(`Tag with ID ${id} does NOT exist.`);
    }

    // Iterate through attributes until we find the correct one
    for (let attr in obj_new_info) {
        // Check if attribute exists and is not id
        if (Tag.prototype.hasOwnProperty(attr) && attr != "id") {
            tag[attr] = obj_new_info[attr];
            updated = true;
        }
    }

    // Exception if there was no update
    if (!updated) {
        throw new TagException("Invalid attribute.");
    }

    return updated;
}

function deleteTag(id) {
    let index = data.tags.findIndex(tag => tag.id == id);

    if (index == -1) {
        throw new TagException(`User with ID ${id} does NOT exist.`);
    }
    // Check all tasks on data
    for (let i = 0; i < data.tasks.length; i++) {
        // Check every tag in a task
        for (let j = 0; j < data.tasks[i].tags.length; j++) {
            // Check if tag is assigned
            if (data.tasks[i].tags[j] == id) {
                throw new TagException(`Tag with ID ${id} CANNOT be deleted because it is assigned to Task with ID ${data.tasks[i].id}.`);
            }
        }
    }

    // Delete record
    data.tags.splice(index, 1)

    return `Tag with ID ${id} was deleted successfully.`;
}