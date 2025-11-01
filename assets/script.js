// Countdown Timer
function initCountdown() {
    // Set your wedding date here (format: YYYY-MM-DDTHH:MM:SS)
    // April 25, 2026
    const weddingDate = new Date('2026-04-25T16:00:00').getTime();
    
    const daysElement = document.getElementById('countdown-days');
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return; // Countdown elements not found
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            // Wedding date has passed
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString();
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Photo Gallery Slider (Mobile)
let currentSlideIndex = 0;
// Get all images from gallery in order
function getGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery-image');
    return Array.from(galleryItems).map(img => img.src.split('/').pop());
}

const images = [
    'assets/hero.JPG',
    'assets/mauritius1.JPG',
    'assets/italia1.jpg',
    'assets/italia2.jpg',
    'assets/dans.JPG',
    'assets/ramo&sergiu2.JPG',
    'assets/camp.JPG',
    'assets/mauritius3.jpg',
    'assets/rico.jpg',
    'assets/dans2.jpg',
    'assets/untold.jpg',
    'assets/ramo&sergiu1.JPG'
];

function changeSlide(direction) {
    const gallery = document.querySelector('.photo-gallery');
    if (!gallery) return;
    
    const items = gallery.querySelectorAll('.photo-item');
    if (items.length === 0) return;
    
    // Hide current slide
    items[currentSlideIndex].style.display = 'none';
    
    // Calculate new index
    currentSlideIndex += direction;
    
    if (currentSlideIndex < 0) {
        currentSlideIndex = items.length - 1;
    } else if (currentSlideIndex >= items.length) {
        currentSlideIndex = 0;
    }
    
    // Show new slide
    items[currentSlideIndex].style.display = 'block';
}

// Lightbox Functions
let currentLightboxIndex = 0;

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (!lightbox || !lightboxImg) return;
    
    // Find current image index
    currentLightboxIndex = images.indexOf(imageSrc);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;
    
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox(event) {
    if (event && event.target !== event.currentTarget && !event.target.classList.contains('lightbox-close')) {
        return;
    }
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function changeLightboxImage(direction, event) {
    if (event) {
        event.stopPropagation();
    }
    
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = images.length - 1;
    } else if (currentLightboxIndex >= images.length) {
        currentLightboxIndex = 0;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.src = images[currentLightboxIndex];
    }
}

// Initialize mobile slider
function initMobileSlider() {
    const gallery = document.querySelector('.photo-gallery');
    if (!gallery) return;
    
    const items = gallery.querySelectorAll('.photo-item');
    const isMobile = window.innerWidth <= 768;
    
    items.forEach((item, index) => {
        if (isMobile) {
            item.style.display = index === 0 ? 'block' : 'none';
        } else {
            item.style.display = 'block';
        }
    });
}

// Form Submission Handler with Rate Limiting
function initFormSubmission() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    // Rate limiting: prevent multiple submissions
    const MIN_SUBMISSION_INTERVAL = 5000; // 5 seconds between submissions
    const MAX_SUBMISSIONS_PER_SESSION = 3; // Max 3 submissions per session
    let lastSubmissionTime = 0;
    let submissionCount = 0;
    
    // Load submission count from sessionStorage
    const storedCount = sessionStorage.getItem('formSubmissionCount');
    if (storedCount) {
        submissionCount = parseInt(storedCount, 10);
    }
    
    // Disable submit button if max submissions reached
    const submitButton = form.querySelector('button[type="submit"]');
    if (submissionCount >= MAX_SUBMISSIONS_PER_SESSION && submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Limita de trimiteri a fost atinsă';
        submitButton.style.opacity = '0.6';
        submitButton.style.cursor = 'not-allowed';
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if honeypot field is filled (spam check)
        const botField = form.querySelector('[name="bot-field"]');
        if (botField && botField.value.trim() !== '') {
            // Bot detected - silently fail
            console.warn('Spam detected: honeypot field filled');
            return;
        }
        
        // Rate limiting check
        const now = Date.now();
        const timeSinceLastSubmission = now - lastSubmissionTime;
        
        if (timeSinceLastSubmission < MIN_SUBMISSION_INTERVAL) {
            const remainingTime = Math.ceil((MIN_SUBMISSION_INTERVAL - timeSinceLastSubmission) / 1000);
            alert(`Te rugăm să aștepți ${remainingTime} secunde înainte de a trimite din nou.`);
            return;
        }
        
        if (submissionCount >= MAX_SUBMISSIONS_PER_SESSION) {
            alert('Ați atins limita de trimiteri pentru această sesiune. Te rugăm să reîmprospătați pagina pentru a continua.');
            return;
        }
        
        // Disable submit button during submission
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Se trimite...';
        }
        
        // Create FormData
        const formData = new FormData(form);
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Update rate limiting
            lastSubmissionTime = Date.now();
            submissionCount++;
            sessionStorage.setItem('formSubmissionCount', submissionCount.toString());
            
            // Hide form and title, show success message
            document.getElementById('form-container').style.display = 'none';
            const title = document.querySelector('.form-card .section-title');
            if (title) {
                title.style.display = 'none';
            }
            document.getElementById('success-message').style.display = 'block';
            
            // Scroll to success message
            document.getElementById('success-message').scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            
            // Re-enable submit button on error
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Trimite confirmarea';
            }
            
            alert('A apărut o eroare. Te rugăm să încerci din nou.');
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initSmoothScroll();
    initMobileSlider();
    initFormSubmission();
    
    // Reinitialize slider on resize
    window.addEventListener('resize', initMobileSlider);
});

