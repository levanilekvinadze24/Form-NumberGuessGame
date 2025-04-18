// Helper function: Show error message
const showError = (input, message, withIcon = false) => {
    const error = document.createElement("div"); // Create a new div
    error.className = "error"; // Assign the "error" class to the new element

    if (withIcon) {
        // If we want a warning icon, add an image
        error.innerHTML = `
            <img src="image/error-triangle.png" alt="Warning" class="error-icon"> <!-- Error icon -->
            <span>${message}</span> <!-- Error text -->
        `;
    } else {
        // Just plain text
        error.textContent = message;
    }

    input.parentElement.appendChild(error); // Append the error to the input's parent element
};

// Input field configurations
const fields = [
    { id: "fname", name: "First name" },   // First name
    { id: "lname", name: "Last name" },    // Last name
    { id: "email", name: "Email" },        // Email
    { id: "password", name: "Password" }   // Password
];

// Form submission event listener
document.getElementById("group-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting automatically — we want to validate it with JavaScript

    // Clear all previous error messages and red borders
    document.querySelectorAll(".error").forEach(el => el.remove()); // Remove existing error messages
    document.querySelectorAll(".error-input").forEach(el => el.classList.remove("error-input")); // Remove red input borders

    let isValid = true; // Assume form is valid at the start

    // Check for empty input fields
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input.value.trim()) { // If field is empty
            showError(input, `${field.name} is required`); // Show error message
            input.classList.add("error-input"); // Add red border
            isValid = false; // Mark form as invalid
        }
    });

    // Validate email format
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (email.value.trim() && !emailPattern.test(email.value)) {
        showError(email, "Please enter a valid email address"); // Show email format error
        isValid = false;
    }

    // Validate password length
    const password = document.getElementById("password");
    if (password.value.trim() && password.value.length < 8) {
        showError(password, "Password must be at least 8 characters long"); // Show password length error
        isValid = false;
    }

    // Ensure at least 3 checkboxes are selected
    const checkedCount = Array
        .from(document.querySelectorAll('.checkbox-container input[type="checkbox"]')) // Get all checkboxes
        .filter(cb => cb.checked).length; // Filter selected ones
    if (checkedCount < 3) {
        showError(document.querySelector('.checkbox-container'), "Choose at least 3 technologies", true); // Show error with icon
        isValid = false;
    }

    // Final step: if everything is valid, hide the form and show the game
    if (isValid) {
        document.getElementById("form-wrapper").style.display = "none"; // Hide form
        document.getElementById("game-wrapper").style.display = "block"; // Show game
        startGame(); // Start the game
    }
});
