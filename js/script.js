// Add this at the beginning of your script
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check if user is logged in
    if (window.isLoggedIn) {
        logoutBtn.style.display = 'inline-block';
    }
});

// Your existing logout button event listener
document.getElementById('logoutBtn').addEventListener('click', async function(e) {
    e.preventDefault();
    try {
        const response = await fetch('/logout', {
            method: 'GET',
            credentials: 'same-origin'
        });
        
        if (response.ok) {
            window.location.href = '/login';
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to logout. Please try again.');
    }
}); 

function chatbot(){
    window.location.href("https://flask-chatbot-3-pl35.onrender.com/");
}

function navonmesh(){
    window.location.href("https://navomesh-main.vercel.app/");
}

function chatapp(){
    window.location.href("#");
}

function fitclub(){
    window.location.href("#");
}

function todo(){
    window.location.href("https://to-do-app-by-bolt-ai.vercel.app/");
}