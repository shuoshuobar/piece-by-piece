document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('gridContainer');
    const resetBtn = document.getElementById('resetBtn');
    
    // Cover image setup
    const coverImageUrl = 'cover.JPG';
    
    // This is a list of all the images in your photos directory
    // You'll need to manually list your photos here
    const allPhotos = [
        // Replace these with the actual paths to your images in the photos folder
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
    ];
    
    // Shuffle all photos and select exactly 12 (or as many as available if less than 12)
    const shuffledPhotos = [...allPhotos];
    shuffleArray(shuffledPhotos);
    
    // Take only up to 12 photos
    const photosToUse = shuffledPhotos.slice(0, Math.min(12, shuffledPhotos.length));
    let photoIndex = 0;
    
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
            
            // Add click event to reveal the image
            gridItem.addEventListener('click', function() {
                if (!hiddenImage.classList.contains('revealed') && photoIndex < photosToUse.length) {
                    // Get the next photo from the array
                    const photoUrl = photosToUse[photoIndex];
                    photoIndex++;
                    
                    hiddenImage.src = photoUrl;
                    hiddenImage.classList.add('revealed');
                }
            });
            
            gridContainer.appendChild(gridItem);
        }
    }
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        // Hide all revealed images
        document.querySelectorAll('.hidden-image').forEach(img => {
            img.classList.remove('revealed');
        });
        
        // Reshuffle the photos
        shuffleArray(shuffledPhotos);
        const photosToUse = shuffledPhotos.slice(0, Math.min(12, shuffledPhotos.length));
        photoIndex = 0;
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