document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var errorMessage = document.getElementById('error-message');

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        return;
    }

    fetch(`http://localhost:7800/api/users/check-email/${email}`)
        .then(response => response.text())
        .then(data => {
            if (data=='true') {
                errorMessage.textContent = 'Email already exists!';
            } else {
                var userData = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                };

                fetch('http://localhost:7800/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => response.json())
                .then(data => {
                    errorMessage.textContent = '';
                    window.location.href = 'main.html';
                })
                .catch((error) => {
                    errorMessage.textContent = 'Error: ' + error.message;
                });
            }
        })
        .catch((error) => {
            errorMessage.textContent = 'Error: ' + error.message;
        });
});