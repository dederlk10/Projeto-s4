//  Filter functionality


document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category');
                
                if (filterValue === 'todos') {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    if (itemCategories.includes(filterValue)) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });

            // Update visible images array
            updateVisibleImages();
        });
    });

    // Function to update visible images
    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(item => 
            !item.classList.contains('hidden')
        );
    }

    // Initialize visible images
    updateVisibleImages();

    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-overlay h3').textContent;
            const subcaption = this.querySelector('.gallery-overlay p').textContent;
            
            // Find current index in visible images
            currentImageIndex = visibleImages.indexOf(this);
            
            openLightbox(img.src, `${caption} - ${subcaption}`);
        });
    });

    // Open lightbox function
    function openLightbox(src, caption) {
        lightboxImage.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Previous image
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        showImage(currentImageIndex);
    });

    // Next image
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        showImage(currentImageIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });

    // Show specific image
    function showImage(index) {
        const item = visibleImages[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay h3').textContent;
        const subcaption = item.querySelector('.gallery-overlay p').textContent;
        
        lightboxImage.style.animation = 'none';
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxCaption.textContent = `${caption} - ${subcaption}`;
            lightboxImage.style.animation = 'zoomIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 10);
    }

    // Add smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active from all
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);