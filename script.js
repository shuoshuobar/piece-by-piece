document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('gridContainer');
    const resetBtn = document.getElementById('resetBtn');
    const animateBtn = document.getElementById('animateBtn');
    const popup = document.getElementById('completionPopup');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    
    // Cover image setup
    const coverImageUrl = 'cover-image.jpg';
    
    // Photo list
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
        'photos/Maddy.jpg',
    ];
    
    // Initialize
    const shuffledPhotos = [...allPhotos];
    shuffleArray(shuffledPhotos);
    const photoQueue = [...shuffledPhotos];
    const positions = [4, 6, 10, 11, 12];
    let animationInterval;
    
    // Hide popup initially
    popup.style.display = 'none';

    // Create grid
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.style.backgroundImage = `url(${coverImageUrl})`;
            gridItem.style.backgroundPosition = `${col * 50}% ${row * 33.33}%`;
            
            const hiddenImage = document.createElement('img');
            hiddenImage.className = 'hidden-image';
            hiddenImage.alt = 'Hidden photo';
            
            gridItem.appendChild(hiddenImage);
            gridContainer.appendChild(gridItem);
        }
    }

    // Button handlers
    resetBtn.addEventListener('click', resetGrid);
    animateBtn.addEventListener('click', startAnimation);
    popupCloseBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
        if (e.target === popup) closePopup();
    });

    function resetGrid() {
        document.querySelectorAll('.hidden-image').forEach(img => {
            img.classList.remove('revealed');
            img.src = '';
        });
        shuffleArray(shuffledPhotos);
        photoQueue.length = 0;
        photoQueue.push(...shuffledPhotos);
        clearInterval(animationInterval);
        closePopup();
    }

    function startAnimation() {
        clearInterval(animationInterval);
        let photoIndex = 0;
        const totalPhotos = allPhotos.length;

        animationInterval = setInterval(() => {
            if (photoIndex >= totalPhotos) {
                clearInterval(animationInterval);
                setTimeout(() => {
                    popup.style.display = 'flex';
                    setTimeout(() => popup.classList.add('show'), 10);
                }, 1500);
                return;
            }

            const pos = getPositionForPhoto(photoIndex);
            const gridItem = gridContainer.children[pos - 1];
            const hiddenImage = gridItem.querySelector('.hidden-image');
            
            hiddenImage.src = photoQueue[photoIndex];
            hiddenImage.classList.add('revealed');
            
            photoIndex++;
            setTimeout(() => hiddenImage.classList.remove('revealed'), 1300);
        }, 1800);
    }

    function getPositionForPhoto(index) {
        if (index < 10) return positions[index % 5];
        switch (index) {
            case 10: return 4;
            case 11: return 6;
            case 12: return 10;
            case 13: return 12;
            default: return positions[index % 5];
        }
    }

    function closePopup() {
        popup.style.display = 'none';
        popup.classList.remove('show');
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});