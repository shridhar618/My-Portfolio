
const Navbar = document.querySelector('.navbar');
menubar.onclick=()=>{
    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active')
}
const section=document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a')
window.onscroll = ()=>{
    section.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if(top>offset && top < offset + height){
            sec.classList.add('start-animation');
            navlink.forEach(links=>{
                links.classList.remove('active')
                document.querySelector('header nav a[href*='+id+']').classList.add('active')
              
            })
        }
    })
    var header = document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY>100)
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active')
} 



function whatsapp() {
    let phoneNumber = "8431152037"; // Replace with your WhatsApp number
    let message = "Hello👋 Shridhar! I would like to connect with you regarding a professional opportunity."; // Optional message
    let url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    
    window.open(url, "_blank"); // Opens in a new tab
}



function hire(){
    window.location.href="https://www.linkedin.com/in/shridhar-bhat-bb3410290/";
}

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



//for dropdown menu
document.getElementById("menu").addEventListener("click", function() {
    document.querySelector(".navbar").classList.toggle("active");
});


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