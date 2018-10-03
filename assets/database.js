// Roger's functions - for now just calls and comments

function addImage (employee, fileName) {
    // Puts the image pointed to by the file name into storage
    // for future use in identifying somebody.  And stores the image
    // URL as part of the employee record.
}

function getImages () {
    // gets all the images from storage, so we can pass them to
    // face++ for comparison with the current camera picture.
    // May want to do getImage instead, to get them one at a tim
    // Either way, this will have to return an object with the
    // employee id and the image, so that we can get the employee
    // id out of the comparison.
}

function setEmotions (employee, emotionsObject) {
    // we'll have a defintion of the emotionsObject
    // This will put each emotion's "score" into an
    // array (discarding the oldest if there are n stored
    // already).
}

function compareEmotions (employee, emotionsOject) {
    // returns a score, calculated by comparing (in some way)
    // the current score with the stored ones
}

function newEmployee (employeeInfo) {
    // takes an object (to be defined) that has all the
    // employee info (name, id, manager, ...)
}
