document.addEventListener("DOMContentLoaded", () => {
  // Store Category Filtering
  const categoryTabs = document.querySelectorAll(".category-tab")
  const productCards = document.querySelectorAll(".product-card")

  if (categoryTabs.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => {
          t.classList.remove("active")
        })

        // Add active class to clicked tab
        this.classList.add("active")

        // Get category value
        const categoryValue = this.getAttribute("data-category")

        // Filter product cards
        productCards.forEach((card) => {
          if (categoryValue === "all" || card.getAttribute("data-category") === categoryValue) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Shopping Cart Functionality
  const cartContainer = document.querySelector(".cart-container")
  const cartToggle = document.querySelector(".cart-btn")
  const closeCart = document.querySelector(".close-cart")
  const cartItems = document.querySelector(".cart-items")
  const cartCount = document.querySelector(".cart-count")
  const totalAmount = document.querySelector(".total-amount")
  const checkoutBtn = document.querySelector(".checkout-btn")
  const addToCartButtons = document.querySelectorAll(".add-to-cart")

  // Cart data
  const cart = []

  // Open cart
  if (cartToggle) {
    cartToggle.addEventListener("click", () => {
      cartContainer.classList.add("active")
    })
  }

  // Close cart
  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartContainer.classList.remove("active")
    })
  }

  // Add to cart
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productCard = this.closest(".product-card")
        const productImage = productCard.querySelector(".product-image img").src
        const productName = productCard.querySelector("h3").textContent
        const productPrice = productCard.querySelector(".product-price").textContent
        const priceValue = Number.parseInt(productPrice.replace(/[^0-9]/g, ""))

        // Check if product is already in cart
        const existingItemIndex = cart.findIndex((item) => item.name === productName)

        if (existingItemIndex !== -1) {
          // Increment quantity
          cart[existingItemIndex].quantity++
        } else {
          // Add new item
          cart.push({
            image: productImage,
            name: productName,
            price: priceValue,
            quantity: 1,
          })
        }

        // Update cart UI
        updateCart()

        // Show cart
        cartContainer.classList.add("active")

        // Show notification
        showNotification(`${productName} added to cart!`)
      })
    })
  }

  // Update cart UI
  function updateCart() {
    // Clear cart items
    cartItems.innerHTML = ""

    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>'
      cartCount.textContent = "0"
      totalAmount.textContent = "₹0"
      return
    }

    // Calculate total
    let total = 0
    let itemCount = 0

    // Add items to cart
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity
      total += itemTotal
      itemCount += item.quantity

      const cartItemElement = document.createElement("div")
      cartItemElement.className = "cart-item"
      cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">
                        <span>₹${item.price} × ${item.quantity}</span>
                        <span>₹${itemTotal}</span>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                    <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `

      cartItems.appendChild(cartItemElement)
    })

    // Update total and count
    cartCount.textContent = itemCount.toString()
    totalAmount.textContent = `₹${total}`

    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll(".quantity-btn.decrease").forEach((button) => {
      button.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        if (cart[index].quantity > 1) {
          cart[index].quantity--
        } else {
          cart.splice(index, 1)
        }
        updateCart()
      })
    })

    document.querySelectorAll(".quantity-btn.increase").forEach((button) => {
      button.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        cart[index].quantity++
        updateCart()
      })
    })

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        cart.splice(index, 1)
        updateCart()
      })
    })
  }

  // Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.")
        return
      }

      // Here you would typically redirect to a checkout page
      // For now, we'll just show an alert
      alert("Proceeding to checkout. This is a placeholder for actual checkout functionality.")
    })
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = "var(--primary-color)"
    notification.style.color = "white"
    notification.style.padding = "10px 20px"
    notification.style.borderRadius = "var(--border-radius-md)"
    notification.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    notification.style.zIndex = "2000"
    notification.style.opacity = "0"
    notification.style.transform = "translateY(20px)"
    notification.style.transition = "opacity 0.3s ease, transform 0.3s ease"

    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.style.opacity = "1"
      notification.style.transform = "translateY(0)"
    }, 10)

    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transform = "translateY(20px)"

      // Remove notification from DOM after animation
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
})
