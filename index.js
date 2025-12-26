
import menuArray from "./data.js"

const mainOrder = document.querySelector(".main-order")
const yourOrder = document.querySelector(".your-order")
const completeBtn = document.querySelector("#complete-btn")
const checkout = document.querySelector(".checkout")
const overlay = document.querySelector(".overlay")
const payBtn = document.querySelector("#pay-btn")

let order = []

function renderItems(menu) {
  mainOrder.innerHTML = menu.map(item => `
    <div class="menu-item">
      <div class="item-emoji">${item.emoji}</div>
      <div class="item-descr">
        <p class="item-name">${item.name}</p>
        <p class="item-ingr">${item.ingredients.join(", ")}</p>
        <p class="item-price">$${item.price}</p>
      </div>
      <button class="item-add" data-id="${item.id}">+</button>
    </div>
    <div class="line"></div>
  `).join("")
}

renderItems(menuArray)


mainOrder.addEventListener("click", (e) => {
    const button = e.target.closest(".item-add")
    if (!button) return

    const id = Number(button.dataset.id)
    const item = menuArray.find(elem => elem.id === id)
    if (!item) return

    order.push(item)
    renderOrder()
})



function renderOrder() {
    const orderItems = document.querySelector(".order-items")
    const totalPriceEl = document.querySelector(".total-price")
  
    orderItems.innerHTML = ""
    let total = 0

    completeBtn.style.display = order.length > 0 ? "block" : "none"

  
    order.forEach(item => {
      total += item.price
  
      orderItems.innerHTML += `
        <div class="order-item">
          <div class="item-name">${item.name}</div>
          <div class="remove" data-id="${item.id}">remove</div>
          <div class="item-price order-price">$${item.price}</div>
        </div>
      `
    })
  
    totalPriceEl.textContent = `$${total}`
  }
  

yourOrder.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove")
    if(!removeBtn) return

    const id = Number(removeBtn.dataset.id)
    const index = order.findIndex(item => item.id === id)
    if (index !== -1) {
    order.splice(index, 1)
    }
    renderOrder()

})



completeBtn.addEventListener("click", function(){
    checkout.classList.add("active")
    checkout.classList.remove("hidden")
  
    overlay.classList.add("active")
    overlay.classList.remove("hidden")
})

  


payBtn.addEventListener("click", function(){
    checkout.innerHTML = `
    <div class="success-popup">
        <h2>Thank you! 🎉</h2>
        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExendvMXJqNTJoZmdrNG14NHYwMjZlYjk5d3pkdWdwZzR1cWk1dTI1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxYdXvsGw6wT5lIY/giphy.gif">
        <div class="close"> X </div>
    </div>
    `
})


checkout.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      closeCheckout()
      resetOrder()
    }
  })


  function closeCheckout() {
    checkout.classList.remove("active")
    overlay.classList.remove("active")
  }
  
  function resetOrder() {
    order = []
    renderOrder()
  }
  

