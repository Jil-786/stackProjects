document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessageElement = document.getElementById('error-message');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            // Check if email exists
            const emailCheckResponse = await fetch(`http://localhost:7800/api/users/check-email/${email}`);
            const emailExists = await emailCheckResponse.text();

            if (emailExists == 'false') {
                errorMessageElement.textContent = 'Email doesn\'t exist';
                return;
            }

            // Get the password for the email
            const passwordResponse = await fetch(`http://localhost:7800/api/users/get-password/${email}`);
            const storedPassword = await passwordResponse.text();

            if (password != storedPassword) {
                errorMessageElement.textContent = 'Password mismatch';
                return;
            }

            // If email exists and password matches, redirect to main.html
            window.location.href = 'main.html';
        } catch (error) {
            console.error('Error:', error);
            errorMessageElement.textContent = 'An error occurred. Please try again later.';
        }
    });
});