document.addEventListener('DOMContentLoaded', function() {

    // --- 1. RIPPLE CLICK ANIMATION (for main.html CTA button) ---
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Get the click coordinates relative to the button
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            // Create the ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // --- 2. MAGIC DOT MOUSE TRAIL (for the entire body) ---
    const magicDot = document.createElement('div');
    magicDot.classList.add('magic-dot');
    document.body.appendChild(magicDot);

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let speed = 0.1; // Lower value = smoother/slower follow

    function animateDot() {
        // Calculate new dot position based on mouse position and speed
        dotX += (mouseX - dotX) * speed;
        dotY += (mouseY - dotY) * speed;

        magicDot.style.left = dotX + 'px';
        magicDot.style.top = dotY + 'px';

        requestAnimationFrame(animateDot); // Loop this animation
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    animateDot(); // Start the animation loop

    // --- 3. CONFETTI CLICK EFFECT (for any click on the document) ---
    document.addEventListener('click', function(e) {
        if (e.target.closest('.cta-button') || e.target.closest('.scroll-item') || e.target.closest('.nav-button')) {
            // If it's a specific interactive element, only spawn confetti
            // when it's not the CTA button itself (as it has ripple)
            // Or you can have both! I'll leave both for now
        }

        const colors = ['#ff6f61', '#ffc72c', '#a7e9af', '#85dcb8', '#4dc0b5', '#008080']; // More beautiful colors
        const numConfetti = 15; // Number of confetti particles

        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Position at click
            confetti.style.left = e.clientX + 'px';
            confetti.style.top = e.clientY + 'px';

            // Random size (5px to 15px) and shape (circle/square)
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            if (Math.random() > 0.5) { // 50% chance of square
                confetti.style.borderRadius = '0';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Initial rotation for squares
            }

            // Random end position and rotation for animation
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50; // How far it flies
            confetti.style.setProperty('--x-end', `${Math.cos(angle) * distance}px`);
            confetti.style.setProperty('--y-end', `${Math.sin(angle) * distance + 50}px`); // Add some fall
            confetti.style.setProperty('--rotation', `${Math.random() * 720 + 360}deg`); // More rotation

            document.body.appendChild(confetti);

            // Remove confetti after animation (1.5s as per CSS)
            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }
    });


    // --- 4. IMAGE SCROLLER LOGIC (for index2.html, unchanged) ---
    const scroller = document.querySelector('.image-scroller');

    if (scroller) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const scrollItems = document.querySelectorAll('.scroll-item');

        const scrollItem = document.querySelector('.scroll-item');
        const itemStyle = window.getComputedStyle(scrollItem);
        const itemMarginRight = parseInt(itemStyle.marginRight, 10);
        const scrollAmount = scrollItem.offsetWidth + itemMarginRight;

        const updateActiveItem = () => {
            scrollItems.forEach(item => item.classList.remove('active-scroll-item'));

            let closestItem = null;
            let minDistance = Infinity;
            const scrollerRect = scroller.getBoundingClientRect();
            const scrollerCenter = scrollerRect.left + (scrollerRect.width / 2);

            scrollItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + (itemRect.width / 2);
                const distance = Math.abs(itemCenter - scrollerCenter);

                const isPartiallyVisible = itemRect.left < scrollerRect.right && itemRect.right > scrollerRect.left;

                if (distance < minDistance && isPartiallyVisible) {
                    minDistance = distance;
                    closestItem = item;
                }
            });

            if (closestItem) {
                closestItem.classList.add('active-scroll-item');
            }
        };

        updateActiveItem();
        scroller.addEventListener('scroll', updateActiveItem);

        nextBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(updateActiveItem, 400);
        });

        prevBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            setTimeout(updateActiveItem, 400);
        });
    }

});