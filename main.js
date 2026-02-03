document.addEventListener('DOMContentLoaded', function() {
    console.log('Appexy website loaded');
    
    const themeToggle = document.createElement('button');
    themeToggle.textContent = 'Toggle Theme';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        z-index: 1000;
        font-weight: 600;
    `;
    
    document.body.appendChild(themeToggle);
    
    let darkMode = false;
    
    themeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        
        if (darkMode) {
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#ffffff';
            
            document.querySelectorAll('.feature-card, .solution-card, .pricing-card, .notification').forEach(card => {
                card.style.backgroundColor = '#2d2d2d';
                card.style.color = '#ffffff';
            });
            
            document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                heading.style.color = '#ffffff';
            });
            
            document.querySelectorAll('p, li').forEach(text => {
                text.style.color = '#cccccc';
            });
            
            document.querySelector('.features').style.backgroundColor = '#2d2d2d';
            document.querySelector('.pricing').style.backgroundColor = '#2d2d2d';
            
            themeToggle.textContent = 'Light Mode';
            themeToggle.style.background = '#764ba2';
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            
            document.querySelectorAll('.feature-card, .solution-card, .pricing-card, .notification').forEach(card => {
                card.style.backgroundColor = '';
                card.style.color = '';
            });
            
            document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                heading.style.color = '';
            });
            
            document.querySelectorAll('p, li').forEach(text => {
                text.style.color = '';
            });
            
            document.querySelector('.features').style.backgroundColor = '';
            document.querySelector('.pricing').style.backgroundColor = '';
            
            themeToggle.textContent = 'Dark Mode';
            themeToggle.style.background = '#667eea';
        }
    });
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        let progress = 0;
        const targetProgress = 75;
        const interval = setInterval(() => {
            if (progress < targetProgress) {
                progress++;
                progressFill.style.width = progress + '%';
                document.querySelector('.progress-text').textContent = progress + '%';
            } else {
                clearInterval(interval);
            }
        }, 30);
    }
    
    const statNumbers = document.querySelectorAll('.stat-number, .big-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        let currentValue = 0;
        const increment = parseInt(finalValue.replace(/[^0-9]/g, '')) / 50;
        
        const updateNumber = () => {
            if (currentValue < parseInt(finalValue.replace(/[^0-9]/g, ''))) {
                currentValue += increment;
                if (finalValue.includes('+')) {
                    stat.textContent = Math.floor(currentValue) + '+';
                } else if (finalValue.includes('/')) {
                    stat.textContent = '24/7';
                } else {
                    stat.textContent = currentValue.toFixed(finalValue.includes('.') ? 1 : 0);
                }
                setTimeout(updateNumber, 30);
            }
        };
        
        setTimeout(updateNumber, 500);
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .solution-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});