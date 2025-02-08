
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
            const emailCheckResponse = await fetch(`http://localhost:7800/api/users/check-email/${email}`);
            const emailExists = await emailCheckResponse.text();

            if (emailExists === 'false') {
                errorMessageElement.textContent = 'Email doesn\'t exist';
                return;
            }

            const passwordResponse = await fetch(`http://localhost:7800/api/users/get-password/${email}`);
            const storedPassword = await passwordResponse.text();

            if (password !== storedPassword) {
                errorMessageElement.textContent = 'Password mismatch';
                return;
            }

            window.location.href = `main.html?email=${encodeURIComponent(email)}`;
        } catch (error) {
            console.error('Error:', error);
            errorMessageElement.textContent = 'An error occurred. Please try again later.';
        }
    });
});
