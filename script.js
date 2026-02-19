document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = this.querySelectorAll('.toggle-bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuToggle.querySelectorAll('.toggle-bar').forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-slide testimonials
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('serviceRequestForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form data collection
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Form validation
        if (!formData.name || !formData.email || !formData.company || !formData.service || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Using FormSubmit.co (free service)
        fetch('https://formsubmit.co/ajax/info@menduce.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                service: formData.service,
                message: formData.message,
                _subject: `New Service Request: ${formData.company}`,
                _template: 'table',
                _captcha: 'false'
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Show success message
            alert('Thank you! Your service request has been sent. We\'ll contact you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            
            // Reset form validation states
            contactForm.querySelectorAll('input, select, textarea').forEach(element => {
                element.classList.remove('valid', 'invalid');
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your request. Please try again or email us directly at info@menduce.com');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    // Form input validation styling
    contactForm.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
                this.classList.remove('valid');
            }
        });
        
        // Add purple border on focus
        element.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
        });
        
        element.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '';
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-row, .industry-card, .news-card, .testimonial-slide').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Tech news card hover effects
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const category = this.querySelector('.news-category');
            if (category.classList.contains('ai')) {
                this.style.borderColor = 'var(--primary)';
            } else if (category.classList.contains('security')) {
                this.style.borderColor = 'var(--secondary)';
            } else if (category.classList.contains('innovation')) {
                this.style.borderColor = 'var(--accent)';
            } else if (category.classList.contains('issues')) {
                this.style.borderColor = '#F59E0B';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
        });
    });

    // Update current year in footer
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', yearSpan.textContent);
    }

    // Add scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    // Style scroll to top button
    const scrollToTopStyle = document.createElement('style');
    scrollToTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(66, 36, 96, 0.3);
            transition: all 0.3s ease;
            z-index: 100;
        }
        
        .scroll-to-top:hover {
            background: var(--secondary);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(106, 58, 156, 0.4);
        }
        
        .scroll-to-top.show {
            display: flex;
        }
    `;
    document.head.appendChild(scrollToTopStyle);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
fetch('data/case-studies.json')
  .then(response => response.json())
  .then(data => {
      const container = document.querySelector('#case-studies .news-grid');
      if(container){
          data.forEach(item => {
              const card = document.createElement('a');
              card.href = item.url;
              card.className = 'news-card';
              card.innerHTML = `
                  <h4>${item.title}</h4>
                  <p>${item.result}</p>
              `;
              container.appendChild(card);
          });
      }
  });
