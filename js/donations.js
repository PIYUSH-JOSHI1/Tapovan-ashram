document.addEventListener("DOMContentLoaded", () => {
  // Donation Amount Selection
  const amountButtons = document.querySelectorAll(".amount-btn")
  const customAmountInputs = document.querySelectorAll(".custom-amount-input")

  if (amountButtons.length > 0) {
    amountButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons in the same container
        const parentContainer = this.closest(".donation-amounts")
        const buttons = parentContainer.querySelectorAll(".amount-btn")
        buttons.forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        this.classList.add("active")

        // Show/hide custom amount input
        const customAmountInput = this.closest(".option-content").querySelector(".custom-amount-input")
        if (this.classList.contains("custom-amount")) {
          customAmountInput.style.display = "block"
        } else {
          customAmountInput.style.display = "none"
        }
      })
    })
  }

  // Donation Form Submission
  const donateButtons = document.querySelectorAll(".donate-btn")

  if (donateButtons.length > 0) {
    donateButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const optionCard = this.closest(".option-card")
        const optionHeader = optionCard.querySelector(".option-header h3").textContent

        let selectedAmount = ""
        const activeAmountBtn = optionCard.querySelector(".amount-btn.active")

        if (activeAmountBtn) {
          if (activeAmountBtn.classList.contains("custom-amount")) {
            const customInput = optionCard.querySelector(".custom-amount-input input")
            selectedAmount = customInput.value ? `₹${customInput.value}` : "No amount selected"
          } else {
            selectedAmount = activeAmountBtn.textContent
          }
        } else {
          // For program sponsorship
          const programSelect = optionCard.querySelector("select")
          if (programSelect) {
            const selectedOption = programSelect.options[programSelect.selectedIndex]
            selectedAmount = selectedOption.text
          } else {
            selectedAmount = "No option selected"
          }
        }

        // Here you would typically redirect to a payment gateway
        // For now, we'll just show an alert
        alert(
          `Thank you for choosing to support Tapovan Ashram!\n\nDonation Type: ${optionHeader}\nSelected Amount/Option: ${selectedAmount}\n\nYou will now be redirected to our secure payment gateway.`,
        )
      })
    })
  }

  // Custom Amount Input Validation
  const customInputs = document.querySelectorAll(".custom-amount-input input")

  if (customInputs.length > 0) {
    customInputs.forEach((input) => {
      input.addEventListener("input", function () {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, "")
      })
    })
  }

  // Program Selection
  const programSelects = document.querySelectorAll(".program-select select")

  if (programSelects.length > 0) {
    programSelects.forEach((select) => {
      select.addEventListener("change", function () {
        const donateBtn = this.closest(".option-content").querySelector(".donate-btn")

        if (this.value) {
          donateBtn.removeAttribute("disabled")
        } else {
          donateBtn.setAttribute("disabled", "disabled")
        }
      })

      // Initial check
      if (!select.value) {
        const donateBtn = select.closest(".option-content").querySelector(".donate-btn")
        donateBtn.setAttribute("disabled", "disabled")
      }
    })
  }

  // Recognition Levels Hover Effect
  const levelCards = document.querySelectorAll(".level-card")

  if (levelCards.length > 0) {
    levelCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.classList.add("active")
      })

      card.addEventListener("mouseleave", function () {
        this.classList.remove("active")
      })
    })
  }
})
