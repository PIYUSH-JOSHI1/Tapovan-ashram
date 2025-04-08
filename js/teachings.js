document.addEventListener("DOMContentLoaded", () => {
  // Articles Filtering
  const filterButtons = document.querySelectorAll(".articles-filter .filter-btn")
  const articleCards = document.querySelectorAll(".article-card")

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

        // Filter articles
        articleCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Video Play Button
  const videoCards = document.querySelectorAll(".video-card")

  if (videoCards.length > 0) {
    videoCards.forEach((card) => {
      const playButton = card.querySelector(".play-button")
      if (playButton) {
        playButton.addEventListener("click", () => {
          const videoTitle = card.querySelector("h3").textContent
          // Here you would typically open a video player or modal
          // For now, we'll just show an alert
          alert(`Video player would open here: "${videoTitle}". This is a placeholder for actual video functionality.`)
        })
      }
    })
  }

  // Audio Player Functionality
  const audioButtons = document.querySelectorAll(".play-audio")

  if (audioButtons.length > 0) {
    audioButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const audioCard = this.closest(".audio-card")
        const audioTitle = audioCard.querySelector("h3").textContent

        // Toggle play/pause
        if (this.classList.contains("playing")) {
          this.classList.remove("playing")
          this.innerHTML = '<i class="fas fa-play"></i>'
          // Here you would pause the audio
        } else {
          // Reset all other buttons
          audioButtons.forEach((btn) => {
            btn.classList.remove("playing")
            btn.innerHTML = '<i class="fas fa-play"></i>'
          })

          this.classList.add("playing")
          this.innerHTML = '<i class="fas fa-pause"></i>'
          // Here you would play the audio
        }

        // For now, we'll just show an alert
        if (this.classList.contains("playing")) {
          alert(`Now playing: "${audioTitle}". This is a placeholder for actual audio functionality.`)
        }
      })
    })
  }

  // Subscribe Form Submission
  const subscribeForm = document.querySelector(".subscribe-form")

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const nameInput = this.querySelector('input[type="text"]')
      const emailInput = this.querySelector('input[type="email"]')

      const name = nameInput.value.trim()
      const email = emailInput.value.trim()

      if (name && email) {
        // Here you would typically send the data to your server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}, for subscribing to our teachings! We'll send updates to ${email}.`)
        nameInput.value = ""
        emailInput.value = ""
      }
    })
  }

  // Pagination
  const paginationLinks = document.querySelectorAll(".pagination a")

  if (paginationLinks.length > 0) {
    paginationLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all links
        paginationLinks.forEach((l) => {
          l.classList.remove("active")
        })

        // Add active class to clicked link if it's not the "Next" button
        if (!this.classList.contains("next")) {
          this.classList.add("active")
        }

        // Here you would typically load the next page of articles
        // For now, we'll just show an alert
        alert("Pagination functionality would be implemented here. This is a placeholder.")
      })
    })
  }

  // Featured Article Animation
  const featuredArticle = document.querySelector(".article-banner")

  if (featuredArticle) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const articlePosition = featuredArticle.offsetTop
      const windowHeight = window.innerHeight

      if (scrollPosition > articlePosition - windowHeight + 200) {
        featuredArticle.classList.add("animate")
      }
    })
  }
})
