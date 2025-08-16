document.addEventListener('DOMContentLoaded', function() {
    // --- Welcome Message ---
    const welcomeElement = document.getElementById('welcome-message');
    // Use a timeout to make the prompt appear after the page is visible
    setTimeout(() => {
        const name = prompt("Please enter your name:", "Guest");
        if (name) {
            welcomeElement.textContent = `Hi ${name}, Welcome to My Website`;
        } else {
            welcomeElement.textContent = `Welcome to My Website`;
        }
    }, 500);

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Form Validation and Submission ---
    const form = document.getElementById('contact-form');
    const submittedDataContainer = document.getElementById('submitted-data-container');
    const submittedDataDiv = document.getElementById('submitted-data');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        
        // Clear previous errors
        document.querySelectorAll('p[id$="-error"]').forEach(p => p.classList.add('hidden'));
        document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('border-red-500'));

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;

        // Name validation
        if (name === '') {
            document.getElementById('name-error').classList.remove('hidden');
            document.getElementById('name').classList.add('border-red-500');
            isValid = false;
        }

        // Email validation (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').classList.remove('hidden');
            document.getElementById('email').classList.add('border-red-500');
            isValid = false;
        }

        // Phone validation (checks if it's a number and has reasonable length)
        const phoneRegex = /^[0-9\s\-\+\(\)]{8,15}$/;
        if (!phoneRegex.test(phone)) {
            document.getElementById('phone-error').classList.remove('hidden');
            document.getElementById('phone').classList.add('border-red-500');
            isValid = false;
        }

        // Message validation
        if (message === '') {
            document.getElementById('message-error').classList.remove('hidden');
            document.getElementById('message').classList.add('border-red-500');
            isValid = false;
        }

        if (isValid) {
            // If form is valid, display the data
            submittedDataDiv.innerHTML = `
                <p><strong>Name:</strong> ${escapeHTML(name)}</p>
                <p><strong>Email:</strong> ${escapeHTML(email)}</p>
                <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
                <p><strong>Message:</strong></p>
                <p class="pl-4 border-l-4 border-indigo-200">${escapeHTML(message)}</p>
            `;
            submittedDataContainer.classList.remove('hidden');
            
            // Reset the form
            form.reset();
        }
    });
    
    // Helper function to prevent XSS attacks
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function(match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }
});
