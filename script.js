// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeIcon.className = 'fas fa-sun';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            darkModeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
        
        // Reinitialize particles with new theme
        setTimeout(() => {
            initParticles(isDarkMode);
        }, 100);
    });
});

// Particles.js Configuration
function initParticles(isDarkMode = false) {
    const particleColor = isDarkMode ? '#ffffff' : '#667eea';
    const lineColor = isDarkMode ? '#ffffff' : '#667eea';
    
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: particleColor },
            shape: { type: 'circle' },
            opacity: { value: isDarkMode ? 0.3 : 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: lineColor, opacity: isDarkMode ? 0.2 : 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });
}

// Initialize particles on load
initParticles();

// Profile Image Fallback and Optimization
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        // Try different image extensions
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];
        const basePath = 'assets/img/profile.';
        
        function tryImageExtension(index) {
            if (index >= extensions.length) {
                // If no image found, keep the placeholder or show a default
                console.log('Profile image not found');
                return;
            }
            
            const testImage = new Image();
            testImage.onload = function() {
                profileImage.src = basePath + extensions[index];
                
                // 이미지 로드 후 크롭핑 최적화
                setTimeout(() => {
                    optimizeImageCrop(profileImage);
                }, 100);
            };
            testImage.onerror = function() {
                tryImageExtension(index + 1);
            };
            testImage.src = basePath + extensions[index];
        }
        
        tryImageExtension(0);
    }
});

// 이미지 크롭핑 최적화 함수
function optimizeImageCrop(img) {
    // 이미지가 로드된 후 실행
    img.onload = function() {
        // 이미지의 자연 크기 확인
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        
        // 이미지 비율 계산
        const aspectRatio = naturalWidth / naturalHeight;
        
        // 얼굴이 잘 보이도록 object-position 조정
        img.style.objectFit = 'cover';
        
        if (aspectRatio > 1.2) {
            // 가로가 훨씬 더 긴 경우 (landscape)
            img.style.objectPosition = 'center 30%';
        } else if (aspectRatio > 1) {
            // 가로가 약간 더 긴 경우
            img.style.objectPosition = 'center 25%';
        } else if (aspectRatio > 0.8) {
            // 정사각형에 가까운 경우
            img.style.objectPosition = 'center 20%';
        } else {
            // 세로가 더 긴 경우 (portrait)
            img.style.objectPosition = 'center 15%';
        }
    };
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animations
document.addEventListener('DOMContentLoaded', function() {
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        // Set the text immediately without typing animation
        element.textContent = text;
    });
});

// Skills Chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Backend', 'Frontend', 'Database', 'Mobile', 'DevOps'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
});

// Scroll Animations - Disabled
// function animateOnScroll() {
//     const elements = document.querySelectorAll('.timeline-item, .education-item, .training-item, .cert-item, .project-item');
    
//     elements.forEach(element => {
//         const elementTop = element.getBoundingClientRect().top;
//         const elementVisible = 150;
        
//         if (elementTop < window.innerHeight - elementVisible) {
//             element.classList.add('animate');
//         }
//     });
// }

// window.addEventListener('scroll', animateOnScroll);

// Current Time Display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

setInterval(updateTime, 1000);
updateTime();

// Page Views Counter
function updatePageViews() {
    let views = localStorage.getItem('pageViews') || 0;
    views = parseInt(views) + 1;
    localStorage.setItem('pageViews', views);
    
    const viewCountElement = document.getElementById('viewCount');
    if (viewCountElement) {
        viewCountElement.textContent = views;
    }
}

updatePageViews();

// Experience Calculator
function calculateExperience() {
    const startDate = new Date('2021-09-01');
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMs = currentDate - startDate;
    
    // Convert to years and months
    const years = Math.floor(diffInMs / (365.25 * 24 * 60 * 60 * 1000));
    const remainingMs = diffInMs % (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(remainingMs / (30.44 * 24 * 60 * 60 * 1000));
    
    // Update experience in summary section
    const experienceYearsElement = document.getElementById('experienceYears');
    const experienceMonthsElement = document.getElementById('experienceMonths');
    
    if (experienceYearsElement) {
        experienceYearsElement.textContent = years;
    }
    if (experienceMonthsElement) {
        experienceMonthsElement.textContent = months;
    }
    
    // Update typing subtitle with current experience
    const typingExperienceElement = document.getElementById('typingExperience');
    if (typingExperienceElement) {
        typingExperienceElement.textContent = years;
    }
    
    // Update typing animation text
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        typingTextElement.setAttribute('data-text', `웹 개발자 | 풀스택 개발자 | ${years}년 경력`);
    }
    
    return { years, months };
}

// Age Calculator
function calculateAge() {
    const birthYear = 1994;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthMonth = 0; // January (0-based)
    const currentMonth = currentDate.getMonth();
    
    let age = currentYear - birthYear;
    
    // Adjust age if birthday hasn't occurred this year
    if (currentMonth < birthMonth) {
        age--;
    }
    
    // Update age in header
    const ageElement = document.querySelector('.age-gender');
    if (ageElement) {
        ageElement.textContent = `여, 1994 (${age}세)`;
    }
    
    return age;
}

// Update experience and age on page load
document.addEventListener('DOMContentLoaded', function() {
    calculateExperience();
    calculateAge();
    
    // Update experience and age every month
    setInterval(() => {
        calculateExperience();
        calculateAge();
    }, 1000 * 60 * 60 * 24 * 30); // Check monthly
});

// Konami Code Easter Egg
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function showEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    easterEgg.classList.remove('hidden');
    easterEgg.style.animation = 'easterEggShow 0.5s ease-in-out';
    
    setTimeout(() => {
        easterEgg.classList.add('hidden');
    }, 5000);
}

// Skill Tags Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const level = this.getAttribute('data-level');
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            
            // Show skill level
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = `${level}%`;
            this.appendChild(tooltip);
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
            
            const tooltip = this.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Parallax Effect - Disabled
// window.addEventListener('scroll', function() {
//     const scrolled = window.pageYOffset;
//     const parallax = document.querySelector('.header');
//     if (parallax) {
//         const speed = scrolled * 0.5;
//         parallax.style.transform = `translateY(${speed}px)`;
//     }
// });

// Smooth Scrolling for Navigation
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Project Cards 3D Effect
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Loading Animation - Disabled
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // No fade-in animations
});
