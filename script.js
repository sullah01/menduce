document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
      this.classList.toggle('active');
      document.querySelector('.nav-links').classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelector('.mobile-menu-toggle').classList.remove('active');
        document.querySelector('.nav-links').classList.remove('active');
          });
        });

    // Testimonial Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
// Contact us
    function trackEmailClick() {
  // You can add analytics tracking here
  console.log('Contact email link clicked');
  // Example: gtag('event', 'email_click', { 'event_category': 'Contact' });
}

    // Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

    // Modal functionality
const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Form submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById("name").value,
    company: document.getElementById("company").value,
    email: document.getElementById("email").value,
    inquiry: document.getElementById("inquiry").value
  };

  // Send email using FormSubmit.co (free service)
  fetch("https://formsubmit.co/ajax/info@meduce.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    alert("Thank you! Your message has been sent.");
    document.getElementById("contactForm").reset();
    modal.style.display = "none";
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was an error sending your message. Please try again.");
  });

    
});
});
