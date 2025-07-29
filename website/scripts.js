// Login/Register Toggle
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (loginTab && registerTab) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active-form');
        loginForm.classList.remove('hidden-form');
        registerForm.classList.add('hidden-form');
        registerForm.classList.remove('active-form');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active-form');
        registerForm.classList.remove('hidden-form');
        loginForm.classList.add('hidden-form');
        loginForm.classList.remove('active-form');
    });
}

// Form Validation
function validateLoginForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return false;
    }
    
    // In a real app, you would send this to your backend
    console.log('Login attempt with:', email, password);
    
    // Redirect to dashboard after successful login
    window.location.href = 'dashboard.html';
    return false; // Prevent actual form submission
}

function validateRegisterForm() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return false;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return false;
    }
    
    // In a real app, you would send this to your backend
    console.log('Registration attempt:', name, email, password);
    
    // Show success message and switch to login
    alert('Registration successful! Please login.');
    loginTab.click();
    return false; // Prevent actual form submission
}

// Attach form validation if forms exist
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateLoginForm();
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateRegisterForm();
    });
}

// Navigation Active State
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    
    // Logout button functionality
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // In a real app, you would clear session/token
            window.location.href = 'index.html';
        });
    }
    
    // Water Calculator (if on calculator page)
    if (document.getElementById('calculateBtn')) {
        document.getElementById('calculateBtn').addEventListener('click', calculateWaterNeeds);
    }
});

// Water Calculator Function
function calculateWaterNeeds() {
    const gardenSize = parseFloat(document.getElementById('gardenSize').value);
    const plantType = parseFloat(document.getElementById('plantType').value);
    const climate = parseFloat(document.getElementById('climate').value);
    const irrigation = parseFloat(document.getElementById('irrigation').value);
    
    if (isNaN(gardenSize) {
        alert('Please enter a valid garden size');
        return;
    }
    
    // Calculate water needs (liters per week)
    const baseWater = 5; // liters per square meter
    const waterNeed = gardenSize * baseWater * plantType * climate * irrigation;
    
    // Display results
    document.getElementById('waterResult').textContent = 
        `Your garden needs approximately ${waterNeed.toFixed(1)} liters of water per week.`;
    
    // Provide tips based on calculation
    let tips = [];
    if (plantType > 1.2) tips.push('Consider planting some drought-resistant crops to reduce water needs.');
    if (climate > 1.1) tips.push('In dry climates, mulching can significantly reduce water evaporation.');
    if (irrigation > 0.9) tips.push('Switching to drip irrigation could save up to 30% of your water usage.');
    
    const waterTips = document.getElementById('waterTips');
    if (tips.length > 0) {
        waterTips.innerHTML = '<strong>Water Saving Tips:</strong><ul>' + 
            tips.map(tip => `<li>${tip}</li>`).join('') + '</ul>';
    } else {
        waterTips.textContent = 'Your current setup is water efficient!';
    }
    
    document.getElementById('result').style.display = 'block';
}