// ============================================
// UNFUCKYOURWEB.COM - JAVASCRIPT
// ============================================

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavScrollEffect();
    initHeroAnimation();
    initReasonAnimations();
    initContactAnimation();
    initContactForm();
});

// ============================================
// NAVIGATION - Scroll Effect
// ============================================
function initNavScrollEffect() {
    const nav = document.getElementById('site-nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ============================================
// SCROLL FUNCTIONS
// ============================================
function scrollToContact() {
    const contact = document.getElementById('contact');
    if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToReasons() {
    const reasons = document.getElementById('reasons');
    if (reasons) {
        reasons.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// HERO SECTION - Initial Animation
// ============================================
function initHeroAnimation() {
    const heroContent = document.getElementById('hero-content');

    // Trigger animation after a short delay
    setTimeout(function() {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
}

// ============================================
// REASONS SECTION - Scroll Reveal Animation
// ============================================
function initReasonAnimations() {
    const reasonRows = document.querySelectorAll('.reason-row');

    // Set up Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px'
        }
    );

    // Observe each reason row
    reasonRows.forEach(function(row) {
        observer.observe(row);
    });
}

// ============================================
// CONTACT SECTION - Scroll Reveal Animation
// ============================================
function initContactAnimation() {
    const contactSection = document.querySelector('.contact-section');

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px'
        }
    );

    if (contactSection) {
        observer.observe(contactSection);
    }
}

// ============================================
// CONTACT FORM - Submission & Validation
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validate
        if (!validateForm(name, email, message)) {
            return;
        }

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Submit form (replace this with your actual form endpoint)
        try {
            await submitContactForm({ name, email, message });

            // Success
            showFeedback('success', "Got it. We'll take a look and get back to you.");

            // Reset form
            form.reset();

        } catch (error) {
            // Error
            showFeedback('error', "Didn't send. Try again.");
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send It';
        }
    });
}

// ============================================
// FORM VALIDATION
// ============================================
function validateForm(name, email, message) {
    // Name validation
    if (name.length < 2) {
        showFeedback('error', 'Give us your name, a real email, and enough detail.');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFeedback('error', 'Give us your name, a real email, and enough detail.');
        return false;
    }

    // Message validation
    if (message.length < 10) {
        showFeedback('error', 'Give us your name, a real email, and enough detail.');
        return false;
    }

    return true;
}

// ============================================
// FEEDBACK MESSAGE DISPLAY
// ============================================
function showFeedback(type, message) {
    const feedbackDiv = document.getElementById('form-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackIcon = feedbackDiv.querySelector('.ph');

    // Set message
    feedbackText.textContent = message;

    // Set icon and color based on type
    if (type === 'success') {
        feedbackDiv.classList.remove('text-amber-400');
        feedbackDiv.classList.add('text-green-400');
        feedbackIcon.className = 'ph ph-check-circle mt-0.5 shrink-0';
    } else {
        feedbackDiv.classList.remove('text-green-400');
        feedbackDiv.classList.add('text-amber-400');
        feedbackIcon.className = 'ph ph-warning-circle mt-0.5 shrink-0';
    }

    // Show feedback
    feedbackDiv.classList.remove('hidden');
    feedbackDiv.classList.add('flex');

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(function() {
            feedbackDiv.classList.add('hidden');
            feedbackDiv.classList.remove('flex');
        }, 5000);
    }
}

// ============================================
// FORM SUBMISSION
// ============================================
async function submitContactForm(data) {
    // OPTION 1: FormSubmit.co (No backend needed)
    // Replace YOUR_EMAIL with your actual email
    const formSubmitEndpoint = 'https://formsubmit.co/YOUR_EMAIL@example.com';

    // OPTION 2: Your own API endpoint
    // const apiEndpoint = '/api/contact';

    // OPTION 3: Netlify Forms (if hosted on Netlify)
    // Just add data-netlify="true" to the form in HTML

    // Example using FormSubmit:
    const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: 'New Unfuckyourweb Contact Form Submission',
            _template: 'table'
        })
    });

    if (!response.ok) {
        throw new Error('Form submission failed');
    }

    return response.json();

    // NOTE: You'll need to replace the above with your actual form handling logic
    // Options include:
    // - FormSubmit.co (free, no backend)
    // - Formspree (free tier available)
    // - Netlify Forms (if hosted on Netlify)
    // - Your own backend API
    // - Email service like EmailJS

    // For testing, you can uncomment this to simulate a successful submission:
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         console.log('Form data:', data);
    //         resolve({ success: true });
    //     }, 1000);
    // });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top (if you want to add a "back to top" button)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
