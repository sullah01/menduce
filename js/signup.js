// js/signup.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');

    // Real-time password validation
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const val = this.value;
            const checks = {
                length: val.length >= 8,
                upper: /[A-Z]/.test(val),
                lower: /[a-z]/.test(val),
                number: /[0-9]/.test(val),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(val)
            };

            // Update requirement list items
            document.getElementById('req-length').style.color = checks.length ? '#00c9b7' : '#ff6b6b';
            document.getElementById('req-upper').style.color = checks.upper ? '#00c9b7' : '#ff6b6b';
            document.getElementById('req-lower').style.color = checks.lower ? '#00c9b7' : '#ff6b6b';
            document.getElementById('req-number').style.color = checks.number ? '#00c9b7' : '#ff6b6b';
            document.getElementById('req-special').style.color = checks.special ? '#00c9b7' : '#ff6b6b';
        });
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide previous messages
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';

            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const dob = document.getElementById('dob').value;
            const qualification = document.getElementById('qualification').value;

            // Basic validation
            if (!firstName || !lastName || !email || !password || !dob || !qualification) {
                errorDiv.textContent = 'Please fill in all required fields.';
                errorDiv.style.display = 'block';
                return;
            }

            try {
                // 1. Sign up the user with Supabase Auth
                const { data, error } = await supabaseClient.auth.signUp({
                    email: email,
                    password: password,
                });

                if (error) {
                    errorDiv.textContent = 'Sign-up error: ' + error.message;
                    errorDiv.style.display = 'block';
                    return;
                }

                // 2. If sign-up is successful, create the user's profile
                if (data.user) {
                    const { error: profileError } = await supabaseClient
                        .from('profiles')
                        .insert([
                            {
                                id: data.user.id,
                                first_name: firstName,
                                last_name: lastName,
                                date_of_birth: dob,
                                qualification: qualification
                            }
                        ]);

                    if (profileError) {
                        console.error('Profile creation error:', profileError);
                        errorDiv.textContent = 'Account created, but there was an error saving your profile. Please contact support.';
                        errorDiv.style.display = 'block';
                    } else {
                        successDiv.textContent = 'Sign-up successful! Please check your email for verification.';
                        successDiv.style.display = 'block';
                        form.reset();
                        // Redirect after 3 seconds
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 3000);
                    }
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                errorDiv.textContent = 'An unexpected error occurred. Please try again.';
                errorDiv.style.display = 'block';
            }
        });
    }
});
