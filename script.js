// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMobileMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }
});

// Horizontal scroll functionality
const cardsContainer = document.getElementById("cardsContainer");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

scrollLeftBtn.addEventListener("click", () => {
  cardsContainer.scrollBy({
    left: -320,
    behavior: "smooth",
  });
});

scrollRightBtn.addEventListener("click", () => {
  cardsContainer.scrollBy({
    left: 320,
    behavior: "smooth",
  });
});

// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu after clicking a link
    mobileMenu.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 100) {
    navbar.classList.add("backdrop-blur-md");
  } else {
    navbar.classList.remove("backdrop-blur-md");
  }
});

// Filter Gallery Function
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button states
    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-custom-yellow', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
    });
    
    // Find and activate the clicked button
    const activeButton = Array.from(buttons).find(btn => 
        btn.getAttribute('onclick').includes(`'${category}'`)
    );
    if (activeButton) {
        activeButton.classList.add('active', 'bg-custom-yellow', 'text-white');
        activeButton.classList.remove('bg-white', 'text-gray-700');
    }
    
    // Filter items with smooth animation
    items.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            // Show matching items
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50); // Staggered animation
        } else {
            // Hide non-matching items
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Update counter (optional)
    updateGalleryCounter(category);
}

// Update gallery counter
function updateGalleryCounter(category) {
    const items = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            visibleCount++;
        }
    });
    
    console.log(`Menampilkan ${visibleCount} foto untuk kategori: ${category}`);
}

// Modal Functions
function openModal(imageSrc, title, description) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('imageModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('imageModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    // Add animation delay to gallery items
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Set initial state
    filterGallery('all');
});

  // Form Submission
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Mengirim...</span>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Form Data:', data);
        showSuccessModal();
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Show Success Modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const content = document.getElementById('modalContent');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// Close Modal
function closeModal() {
  const modal = document.getElementById("successModal");
  const content = document.getElementById("modalContent");

  // Tambahkan animasi keluar
  content.classList.remove("scale-100", "opacity-100");
  content.classList.add("scale-95", "opacity-0");

  // Setelah animasi selesai, sembunyikan modal
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 200); // pastikan sesuai dengan durasi transisi CSS
}

// Event listener untuk tombol close
document.getElementById("closeModalBtn").addEventListener("click", closeModal);

// Tutup modal jika klik di luar konten
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

const menuBtn = document.getElementById("mobileMenuBtn");
// const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeMobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});


