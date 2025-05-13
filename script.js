document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('gridContainer');
    const resetBtn = document.getElementById('resetBtn');
    const animateBtn = document.getElementById('animateBtn');
    const popup = document.getElementById('completionPopup');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    
    // Cover image setup
    const coverImageUrl = 'cover-image.jpg';
    
    // This is a list of all the images in your photos directory
    const allPhotos = [
        'photos/Ailing Li.jpg',
        'photos/Ayana Garcia.jpg',
        'photos/Ayushee_MemProjPhoto.png',
        'photos/Cecelia Puckhaber.jpg',
        'photos/CLazerwitz_MemoryProject.jpg',
        'photos/Elisabeth Campbell.jpg',
        'photos/Jessica Wong.JPG',
        'photos/Junko\'s picture.jpg',
        'photos/Nikita Apte.jpg',
        'photos/Owen MH_Memory Project.jpg',
        'photos/Shiyu Yu.jpg',
        'photos/Stephanie Rodriguez.jpg',
        'photos/Yushuo Wang.jpeg',
        'photos/Maddy.jpg', // Added the new photo
    ];
    
    // Shuffle all photos
    const shuffledPhotos = [...allPhotos];
    shuffleArray(shuffledPhotos);

    // Queue to track photos to be revealed
    const photoQueue = [...shuffledPhotos]; // Copy all photos into a queue
    const specificPositions = [4, 6, 10, 11, 12];
    const photoMap = new Map();

    let animationInterval; // Variable to store the interval ID

    // Create grid items (3x4 grid)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.style.backgroundImage = `url(${coverImageUrl})`;
            
            // Position the background image to show only the current grid section
            gridItem.style.backgroundPosition = `${col * 50}% ${row * 33.33}%`;
            
            // Create hidden image that will be revealed on click
            const hiddenImage = document.createElement('img');
            hiddenImage.className = 'hidden-image';
            hiddenImage.alt = 'Hidden photo';
            
            gridItem.appendChild(hiddenImage);
            gridContainer.appendChild(gridItem);
        }
    }

    // Reset button functionality
    resetBtn.addEventListener('click', function () {
        // Hide all revealed images
        document.querySelectorAll('.hidden-image').forEach(img => {
            img.classList.remove('revealed');
            img.src = ''; // Clear the image source
        });

        // Reset the photo queue
        shuffleArray(shuffledPhotos);
        photoQueue.length = 0;
        photoQueue.push(...shuffledPhotos);

        // Stop animation if running
        clearInterval(animationInterval);
        
        // Hide popup if visible
        popup.classList.remove('show');
    });

    // Animate button functionality
    animateBtn.addEventListener('click', function () {
        clearInterval(animationInterval);

        let currentIndex = 0;
        let revealedCount = 0;
        const totalImages = allPhotos.length;

        animationInterval = setInterval(() => {
            // Get the current position
            const pos = specificPositions[currentIndex];
            const gridItem = gridContainer.children[pos - 1];
            const hiddenImage = gridItem.querySelector('.hidden-image');

            // Get the next photo from the queue
            if (photoQueue.length > 0) {
                const photoUrl = photoQueue.shift(); // Remove the first photo from the queue
                hiddenImage.src = photoUrl;
                hiddenImage.classList.add('revealed');
                revealedCount++;
            }

            // Check if all photos have been revealed
            if (photoQueue.length === 0) {
                clearInterval(animationInterval); // Stop the animation
                
                // Show the popup instead of alert
                setTimeout(() => {
                    popup.classList.add('show');
                }, 1500); // Wait a bit after the last image is revealed
            }

            setTimeout(() => {
                hiddenImage.classList.remove('revealed');
                currentIndex = (currentIndex + 1) % specificPositions.length;
            }, 1300);
        }, 1800);
    });
    
    // Close popup when the close button is clicked
    popupCloseBtn.addEventListener('click', function() {
        popup.classList.remove('show');
    });
    
    // Also close popup when clicking outside the popup content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});