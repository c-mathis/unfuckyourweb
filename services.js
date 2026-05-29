// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    formEndpoint: 'https://unfuck-leads-worker.cameron-07f.workers.dev/submit',
    successMessage: "Got it. We'll record a walkthrough of your site and email you within 24 hours.",
    errorMessage: 'Something went wrong. Try emailing us directly instead.'
};

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ============================================
// OTHER CHECKBOX HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const otherCheckbox = document.getElementById('other-checkbox');
    const otherText = document.getElementById('other-text');

    if (otherCheckbox && otherText) {
        otherCheckbox.addEventListener('change', () => {
            if (otherCheckbox.checked) {
                otherText.style.display = 'block';
                otherText.focus();
            } else {
                otherText.style.display = 'none';
                otherText.value = '';
            }
        });
    }
});

// ============================================
// FORM SUBMISSION
// ============================================

// Quick Fix Form
document.getElementById('quick-fix-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmit(e.target, 'quick-fix');
});

// Retainer Form
document.getElementById('retainer-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmit(e.target, 'retainer');
});

// Not Sure Form
document.getElementById('not-sure-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmit(e.target, 'not-sure');
});

async function handleFormSubmit(form, formType) {
    const submitButton = form.querySelector('.submit-button');
    const buttonText = form.querySelector('.button-text');
    const buttonLoader = form.querySelector('.button-loader');
    const feedback = form.querySelector('.form-feedback');

    // Disable button and show loading state
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline';
    feedback.style.display = 'none';

    // Get form data
    const formData = new FormData(form);

    // Build payload based on form type
    let payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        website: formData.get('website'),
    };

    if (formType === 'quick-fix') {
        // Collect selected issues
        const selectedIssues = [];
        const checkboxes = form.querySelectorAll('input[name="issue"]:checked');

        checkboxes.forEach(checkbox => {
            if (checkbox.value === 'other') {
                const otherText = form.querySelector('input[name="other-issue"]').value;
                if (otherText) {
                    selectedIssues.push(`Other: ${otherText}`);
                }
            } else {
                selectedIssues.push(checkbox.value);
            }
        });

        payload.problem = `Quick Fix Request: ${selectedIssues.join(', ') || 'Not specified'}`;
        payload.selected_issues = selectedIssues.join(' | ');
        payload.issues_count = selectedIssues.length;
        payload.service_type = 'quick-fix';
    } else if (formType === 'retainer') {
        payload.problem = `Retainer Request: ${formData.get('needs') || 'Not specified'}`;
        payload.service_type = 'retainer';
    } else if (formType === 'not-sure') {
        payload.problem = `Not Sure / General Inquiry: ${formData.get('problem') || 'Not specified'}`;
        payload.service_type = 'not-sure';
    }

    // Add tracking data
    const trackingData = JSON.parse(sessionStorage.getItem('tracking_data') || '{}');
    payload.utm_source = trackingData.utm_source || null;
    payload.utm_medium = trackingData.utm_medium || null;
    payload.utm_campaign = trackingData.utm_campaign || null;
    payload.utm_content = trackingData.utm_content || null;
    payload.referrer = trackingData.referrer || null;
    payload.landing_page = trackingData.landing_page || window.location.href;

    try {
        const response = await fetch(CONFIG.formEndpoint, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success
            showFeedback(feedback, 'success', CONFIG.successMessage);
            form.reset();

            // Generate unique event ID for deduplication
            const eventID = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

            // Store event ID for thank you page
            sessionStorage.setItem('lead_event_id', eventID);

            // Fire Meta Pixel Lead event
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: formType === 'quick-fix' ? 'Quick Fix Request' : 'Retainer Request',
                    content_category: 'Service Inquiry',
                    value: formType === 'quick-fix' ? 297 : 1497,
                    currency: 'USD'
                }, {
                    eventID: eventID
                });

                console.log('Meta Pixel Lead event fired with ID:', eventID);

                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = '/thank-you';
                }, 1500);
            } else {
                console.warn('Meta Pixel not loaded');
                setTimeout(() => {
                    window.location.href = '/thank-you';
                }, 2000);
            }
        } else {
            throw new Error('Server returned an error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFeedback(feedback, 'error', CONFIG.errorMessage);

        // Re-enable button
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
    }
}

function showFeedback(feedbackElement, type, message) {
    feedbackElement.textContent = message;
    feedbackElement.className = `form-feedback ${type}`;
    feedbackElement.style.display = 'block';
}

// ============================================
// TRACKING DATA CAPTURE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const trackingData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        referrer: document.referrer,
        landing_page: window.location.href
    };

    sessionStorage.setItem('tracking_data', JSON.stringify(trackingData));
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🔥 Ready to Unfuck Your Website? 🔥', 'font-size: 24px; font-weight: bold; color: #FF0000;');
console.log('%cTwo options: Quick fix ($297) or ongoing support ($1,497/mo)', 'font-size: 14px;');
console.log('%cNo bullshit. Just results.', 'font-size: 14px;');
