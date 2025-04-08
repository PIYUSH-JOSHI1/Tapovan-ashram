document.addEventListener("DOMContentLoaded", () => {
  // Gallery Filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        this.classList.add("active")

        // Get filter value
        const filterValue = this.getAttribute("data-filter")

        // Filter gallery items
        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxTitle = document.getElementById("lightbox-title")
  const lightboxDescription = document.getElementById("lightbox-description")
  const closeLightbox = document.querySelector(".close-lightbox")
  const lightboxPrev = document.querySelector(".lightbox-prev")
  const lightboxNext = document.querySelector(".lightbox-next")

  if (lightbox && galleryItems.length > 0) {
    let currentIndex = 0

    // Open lightbox
    galleryItems.forEach((item, index) => {
      const overlayIcon = item.querySelector(".overlay-icon")
      if (overlayIcon) {
        overlayIcon.addEventListener("click", () => {
          currentIndex = index
          const img = item.querySelector("img")
          const title = item.querySelector(".overlay-content h3").textContent
          const description = item.querySelector(".overlay-content p").textContent

          lightboxImg.src = img.src
          lightboxTitle.textContent = title
          lightboxDescription.textContent = description

          lightbox.classList.add("active")
          document.body.style.overflow = "hidden"
        })
      }
    })

    // Close lightbox
    if (closeLightbox) {
      closeLightbox.addEventListener("click", () => {
        lightbox.classList.remove("active")
        document.body.style.overflow = "auto"
      })
    }

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })

    // Previous image
    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", () => {
        currentIndex--
        if (currentIndex < 0) {
          currentIndex = galleryItems.length - 1
        }
        updateLightbox()
      })
    }

    // Next image
    if (lightboxNext) {
      lightboxNext.addEventListener("click", () => {
        currentIndex++
        if (currentIndex >= galleryItems.length) {
          currentIndex = 0
        }
        updateLightbox()
      })
    }

    // Update lightbox content
    function updateLightbox() {
      const item = galleryItems[currentIndex]
      const img = item.querySelector("img")
      const title = item.querySelector(".overlay-content h3").textContent
      const description = item.querySelector(".overlay-content p").textContent

      lightboxImg.src = img.src
      lightboxTitle.textContent = title
      lightboxDescription.textContent = description
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return

      if (e.key === "ArrowLeft") {
        currentIndex--
        if (currentIndex < 0) {
          currentIndex = galleryItems.length - 1
        }
        updateLightbox()
      } else if (e.key === "ArrowRight") {
        currentIndex++
        if (currentIndex >= galleryItems.length) {
          currentIndex = 0
        }
        updateLightbox()
      } else if (e.key === "Escape") {
        lightbox.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Video Gallery
  const videoItems = document.querySelectorAll(".video-item")

  if (videoItems.length > 0) {
    videoItems.forEach((item) => {
      const playButton = item.querySelector(".play-button")
      if (playButton) {
        playButton.addEventListener("click", () => {
          // Here you would typically open a video player or modal
          // For now, we'll just show an alert
          alert("Video player would open here. This is a placeholder for actual video functionality.")
        })
      }
    })
  }
})
