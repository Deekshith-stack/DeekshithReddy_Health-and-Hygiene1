document.addEventListener('DOMContentLoaded', function() {

    const scroller = document.querySelector('.image-scroller');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const scrollItems = document.querySelectorAll('.scroll-item'); // Get all scroll items

    if (scroller) {
        const scrollItem = document.querySelector('.scroll-item');
        const itemStyle = window.getComputedStyle(scrollItem);
        const itemMarginRight = parseInt(itemStyle.marginRight, 10);
        const scrollAmount = scrollItem.offsetWidth + itemMarginRight;

        // Function to update the active item
        const updateActiveItem = () => {
            // Remove active class from all items first
            scrollItems.forEach(item => item.classList.remove('active-scroll-item'));

            // Find the item closest to the center of the scroller
            let closestItem = null;
            let minDistance = Infinity;

            scrollItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const scrollerRect = scroller.getBoundingClientRect();

                // Calculate the center of the item relative to the scroller's viewport
                const itemCenter = itemRect.left + (itemRect.width / 2);
                const scrollerCenter = scrollerRect.left + (scrollerRect.width / 2);

                const distance = Math.abs(itemCenter - scrollerCenter);

                // If the item is fully visible and closest to the center
                if (distance < minDistance &&
                    itemRect.left >= scrollerRect.left &&
                    itemRect.right <= scrollerRect.right) {
                    minDistance = distance;
                    closestItem = item;
                }
            });

            // If a closest item is found, add the active class
            if (closestItem) {
                closestItem.classList.add('active-scroll-item');
            } else {
                // Fallback: If no item is fully in view, try to activate the first visible one
                for (let i = 0; i < scrollItems.length; i++) {
                    const itemRect = scrollItems[i].getBoundingClientRect();
                    const scrollerRect = scroller.getBoundingClientRect();
                    if (itemRect.right > scrollerRect.left && itemRect.left < scrollerRect.right) {
                        scrollItems[i].classList.add('active-scroll-item');
                        break;
                    }
                }
            }
        };

        // Call updateActiveItem initially and on scroll
        updateActiveItem(); // Set initial active item
        scroller.addEventListener('scroll', updateActiveItem); // Update on scroll

        // Event listener for the NEXT button
        nextBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            // Add a small delay before updating active item to allow scroll to complete
            setTimeout(updateActiveItem, 400);
        });

        // Event listener for the PREVIOUS button
        prevBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            // Add a small delay before updating active item to allow scroll to complete
            setTimeout(updateActiveItem, 400);
        });
    }

});