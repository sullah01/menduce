// js/login.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');

    // Check if user is already logged in
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        if (session && window.location.pathname.includes('login.html')) {
            window.location.href = 'training-portal.html';
        }
    });

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide previous messages
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                errorDiv.textContent = 'Please enter both email and password.';
                errorDiv.style.display = 'block';
                return;
            }

            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    errorDiv.textContent = 'Login failed: ' + error.message;
                    errorDiv.style.display = 'block';
                    return;
                }

                if (data.user) {
                    // Check if email is confirmed
                    if (!data.user.email_confirmed_at) {
                        errorDiv.textContent = 'Please verify your email address before logging in. Check your inbox for the verification link.';
                        errorDiv.style.display = 'block';
                        await supabaseClient.auth.signOut();
                        return;
                    }
                    
                    successDiv.textContent = 'Login successful! Redirecting...';
                    successDiv.style.display = 'block';
                    
                    // Redirect to training portal
                    setTimeout(() => {
                        window.location.href = 'training-portal.html';
                    }, 1000);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                errorDiv.textContent = 'An unexpected error occurred. Please try again.';
                errorDiv.style.display = 'block';
            }
        });
    }
});
