// value check
if (username.value == "") {
    alert("Username required");
}

// length check
if (username.value.length < 3) {
    alert("Username must be at least 3 characters");
}

// match validation (password confirmation)
if (password.value !== Confirmedpassword.value) {
    alert("Password invalid");
}

// prevent default submission
form.addEventListener("submit", function(e) {
    e.preventDefault();
});