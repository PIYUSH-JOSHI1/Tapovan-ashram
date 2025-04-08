document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Validation and Submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const subject = document.getElementById("subject").value.trim()
      const message = document.getElementById("message").value.trim()
      const inquiryType = document.getElementById("inquiry-type").value

      if (!name || !email || !subject || !message || !inquiryType) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Here you would typically send the form data to your server
      // For now, we'll just show a success message
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    })
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
      const toggle = item.querySelector(".faq-toggle")

      // Initially hide all answers
      answer.style.display = "none"

      question.addEventListener("click", () => {
        // Toggle the current answer
        if (answer.style.display === "none") {
          answer.style.display = "block"
          toggle.innerHTML = '<i class="fas fa-minus"></i>'

          // Close other answers
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherAnswer = otherItem.querySelector(".faq-answer")
              const otherToggle = otherItem.querySelector(".faq-toggle")
              otherAnswer.style.display = "none"
              otherToggle.innerHTML = '<i class="fas fa-plus"></i>'
            }
          })
        } else {
          answer.style.display = "none"
          toggle.innerHTML = '<i class="fas fa-plus"></i>'
        }
      })
    })
  }

  // Map Interaction
  const mapContainer = document.querySelector(".map-container")

  if (mapContainer) {
    const iframe = mapContainer.querySelector("iframe")

    // Add a message about clicking to activate the map
    const mapOverlay = document.createElement("div")
    mapOverlay.className = "map-overlay"
    mapOverlay.innerHTML =
      '<div class="map-message"><i class="fas fa-map-marked-alt"></i><p>Click to activate map</p></div>'
    mapContainer.appendChild(mapOverlay)

    // Remove overlay when clicked
    mapOverlay.addEventListener("click", () => {
      mapOverlay.style.display = "none"
    })
  }

  // Form field animations
  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea, .form-group select")

  if (formInputs.length > 0) {
    formInputs.forEach((input) => {
      // Add focus class when input is focused
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })

      // Remove focus class when input loses focus
      input.addEventListener("blur", function () {
        if (this.value === "") {
          this.parentElement.classList.remove("focused")
        }
      })

      // Check if input already has value on page load
      if (input.value !== "") {
        input.parentElement.classList.add("focused")
      }
    })
  }
})
