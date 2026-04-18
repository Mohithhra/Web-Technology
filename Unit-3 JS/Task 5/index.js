// Button click event
const clickbtn = document.getElementById("clickbtn");
const result = document.getElementById("clickresult");

clickbtn.addEventListener("click", function () {
    result.textContent = "Button was clicked!";
    console.log("clicked!");
});

// Form submit event
const form = document.getElementById("myForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    message.textContent = "Form submitted";
});

// Keyboard event
const input = document.getElementById("keyInput");
const keyresult = document.getElementById("keyresult");

input.addEventListener("keydown", function (event) {
    keyresult.textContent = "Key pressed: " + event.key;
});

// Mouse event
const box = document.getElementById("box");

box.addEventListener("mouseover", function () {
    box.textContent = "Mouse is over the box!";
});

// Input event
const nameInput = document.getElementById("nameInput");
const displayName = document.getElementById("displayName");

nameInput.addEventListener("input", function () {
    displayName.textContent = "You typed: " + nameInput.value;
});

// Event propagation
const parent = document.getElementById("parent");
const child = document.getElementById("child");

if (parent && child) {

    // Capturing phase
    parent.addEventListener("click", () => {
        console.log("Parent capturing");
    }, true);

    // Target phase
    child.addEventListener("click", () => {
        console.log("Child clicked (target phase)");
    });

    // Bubbling phase
    parent.addEventListener("click", () => {
        console.log("Parent clicked (bubbling)");
    });
}

// Additional click event
clickbtn.addEventListener("click", () => {
    console.log("clicked again!");
});

// Function handler
function handleClick() {
    console.log("Button clicked using function");
}

clickbtn.addEventListener("click", handleClick);

// Remove event example
const btn = document.getElementById("btn");
const remove = document.getElementById("remove");

function clickhandler() {
    alert("button clicked!");
}

btn.addEventListener("click", clickhandler);

// Remove event listener
remove.addEventListener("click", () => {
    btn.removeEventListener("click", clickhandler);
    alert("Event listener removed!");
});