document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && !event.target.closest(".menu-toggle")) {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    }
  })

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (testimonialSlides.length > 0) {
    let currentSlide = 0

    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach((slide) => {
        slide.classList.remove("active")
      })

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Show the current slide and activate the corresponding dot
      testimonialSlides[index].classList.add("active")
      dots[index].classList.add("active")
    }

    // Next slide function
    function nextSlide() {
      currentSlide++
      if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0
      }
      showSlide(currentSlide)
    }

    // Previous slide function
    function prevSlide() {
      currentSlide--
      if (currentSlide < 0) {
        currentSlide = testimonialSlides.length - 1
      }
      showSlide(currentSlide)
    }

    // Event listeners for next and previous buttons
    if (nextBtn) {
      nextBtn.addEventListener("click", nextSlide)
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", prevSlide)
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          menuToggle.classList.remove("active")
        }
      }
    })
  })

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (email) {
        // Here you would typically send the data to your server
        // For now, we'll just show an alert
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }
    })
  }

  // Scroll to Top Button
  const scrollTopBtn = document.createElement("button")
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollTopBtn.className = "scroll-top-btn"
  scrollTopBtn.style.position = "fixed"
  scrollTopBtn.style.bottom = "20px"
  scrollTopBtn.style.left = "20px"
  scrollTopBtn.style.width = "50px"
  scrollTopBtn.style.height = "50px"
  scrollTopBtn.style.borderRadius = "50%"
  scrollTopBtn.style.backgroundColor = "var(--primary-color)"
  scrollTopBtn.style.color = "white"
  scrollTopBtn.style.border = "none"
  scrollTopBtn.style.display = "none"
  scrollTopBtn.style.justifyContent = "center"
  scrollTopBtn.style.alignItems = "center"
  scrollTopBtn.style.cursor = "pointer"
  scrollTopBtn.style.zIndex = "999"
  scrollTopBtn.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"

  document.body.appendChild(scrollTopBtn)

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = "flex"
    } else {
      scrollTopBtn.style.display = "none"
    }
  })

  // Add active class to current page in navigation
  const currentLocation = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-menu a")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (currentLocation.includes(linkPath) && linkPath !== "index.html") {
      link.classList.add("active")
    } else if (currentLocation.endsWith("/") && linkPath === "index.html") {
      link.classList.add("active")
    }
  })
})
