// js/training.js
document.addEventListener('DOMContentLoaded', async function() {
    // Get current user session
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Fetch user profile
    const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', session.user.id)
        .single();

    if (profile) {
        const displayName = `${profile.first_name} ${profile.last_name}`;
        document.getElementById('user-name-display').textContent = displayName;
        document.getElementById('user-greeting').textContent = profile.first_name;
    }

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', async function() {
        await supabaseClient.auth.signOut();
        window.location.href = 'index.html';
    });

    // Add click handlers for training cards
    document.querySelectorAll('.training-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            // You can replace this with actual course links later
            alert(`"${title}" training module is coming soon!`);
        });
    });
});
