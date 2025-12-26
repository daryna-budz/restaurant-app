

import menuArray from "./data.js"

const mainOrder = document.querySelector(".main-order")

function renderItems(menu) {
  mainOrder.innerHTML = menu.map(item => `
    <div class="menu-item">
      <div class="item-emoji">${item.emoji}</div>
      <div class="item-descr">
        <p id="item-name">${item.name}</p>
        <p id="item-ingr">${item.ingredients.join(", ")}</p>
        <p id="item-price">$${item.price}</p>
      </div>
      <div class="item-add">+</div>
    </div>
    <div class="line"></div>
  `).join("")
}

renderItems(menuArray)



/**

<div class="menu-item">
   <div>${ITEM.emoji}</div>
   <div>
      <p>PIZZA</p>
      <p>pepperoni,mushrom,mozarella</p>
      <p>$ 14</p>
   </div>
   <div> + </div>
</div>



 */