/* =====================================================================
   script.js : makes the menu and category pages work.
   Both index.html and the menu pages load this file, but it only does
   anything when menu elements are present.
   ===================================================================== */

/* ---------- 1. MENU DATA ----------
   The ONLY place to edit when the menu changes. One line per item:
     name, category, price (number), desc (description),
     alt (describes the photo for screen readers),
     img (OPTIONAL: path to the item's photo, e.g. "images/latte.jpg").
     Add pricehot and pricecold to an item that offers both temperatures.
   Items without img use images/category-placeholder.svg. */
const MENU = [
  { name: "Americano", category: "Coffee", price: 80, img: "images/americano.png", alt: "Iced Americano" },
  { name: "Latte", category: "Coffee", price: 90, img: "images/latte.png", alt: "Iced Latte" },
  { name: "Spanish Latte", category: "Coffee", price: 110, alt: "Spanish Latte" },
  { name: "White Mocha", category: "Coffee", price: 110, img: "images/white-mocha.png", alt: "White Mocha topped with whipped cream" },
  { name: "Caramel Macchiato", category: "Coffee", price: 110, img: "images/caramel-macchiato.png", alt: "Caramel Macchiato with caramel drizzle" },
  { name: "Caramel Latte", category: "Coffee", price: 100, img: "images/caramel-latte.png", alt: "Iced Caramel Latte" },
  { name: "Salter Caramel Latte", category: "Coffee", price: 110, alt: "Salted Caramel Latte" },
  { name: "Sea Salt Latte", category: "Coffee", price: 110, img: "images/seasalt-latte.png", alt: "Sea Salt Latte topped with cream" },
  { name: "Mocha Latte", category: "Coffee", price: 110, img: "images/mocha.png", alt: "Iced Mocha Latte" },
  { name: "Smore's Latte", category: "Coffee", price: 120, alt: "Smore's Latte" },
  { name: "Nutella Latte", category: "Coffee", price: 120, alt: "Nutella Latte" },
  { name: "Matcha Espresso", category: "Coffee", price: 120, alt: "Matcha Espresso" },
  { name: "Biscoff Latte", category: "Coffee", price: 100, alt: "Biscoff Latte" },
  { name: "Choco Cream", category: "Non-Coffee", pricehot: 100, pricecold: 100, alt: "Choco Cream" },
  { name: "White Choco", category: "Non-Coffee", pricehot: 100, pricecold: 100, alt: "White Choco" },
  { name: "Matcha Latte", category: "Non-Coffee", pricehot: 110, pricecold: 110, alt: "Matcha Latte" },
  { name: "Biscoff Cream", category: "Non-Coffee", pricehot: 120, pricecold: 120, alt: "Biscoff Cream" },
  { name: "Strawberry Milk", category: "Non-Coffee", pricecold: 100, alt: "Strawberry Milk" },
  { name: "Nutella Milk", category: "Non-Coffee", pricecold: 120, pricehot: 120, alt: "Nutella Milk" },
  { name: "Seasalt Matcha", category: "Non-Coffee", pricecold: 120, pricehot: 120, alt: "Seasalt Matcha" },
  { name: "Strawberry Matcha", category: "Non-Coffee", pricecold: 120, alt: "Strawberry Matcha" },
  { name: "Ube Cloud", category: "Non-Coffee", pricecold: 130, pricehot: 130, alt: "Ube Cloud" },
  { name: "Ube Matcha", category: "Non-Coffee", pricecold: 120, pricehot: 120, alt: "Ube Matcha" },
  { name: "Sea Salt Latte", category: "Non-Coffee", pricecold: 120, pricehot: 120, alt: "Sea Salt Latte" },
  { name: "Java Chip", category: "Frappes", price: 120, img: "images/java-chip.png", alt: "Java Chip Frappe" },
  { name: "Coffee Jelly", category: "Frappes", price: 120, img: "images/coffee-jelly.png", alt: "Coffee Jelly Frappe" },
  { name: "Espresso Frappe", category: "Frappes", price: 110, img:"images/espresso-frappe.png", alt: "Espresso Frappe" },
  { name: "Biscoff Frappe", category: "Frappes", price: 145, img: "images/biscoff-frappe.png", alt: "Biscoff Frappe" },
  { name: "Strawberries N Cream", category: "Frappes", price: 120, img:"images/strawberries-n-cream.png", alt: "Strawberries N Cream Frappe" },
  { name: "Cookies N Cream", category: "Frappes", price: 120, img:"images/cookies-n-cream.png", alt: "Cookies N Cream Frappe" },
  { name: "Nutella Frappe", category: "Frappes", price: 120, img:"images/nutella-frappe.png", alt: "Nutella Frappe" },
  { name: "Matcha Frappe", category: "Frappes", price: 130, img:"images/matcha-frappe.png", alt: "Matcha Frappe" },
  { name: "Caramel Frappe", category: "Frappes", price: 120, img:"images/caramel-frappe.png", alt: "Caramel Frappe" },
  { name: "Salted Caramel Frappe", category: "Frappes", price: 120, img:"images/salted-caramel-frappe.png", alt: "Salted Caramel Frappe" },
  { name: "Vanilla Frappe", category: "Frappes", price: 110, img:"images/vanilla-frappe.png", alt: "Vanilla Frappe" },
  { name: "Mocha Frappe", category: "Frappes", price: 120, img:"images/mocha-frappe.png", alt: "Mocha Frappe" },
  { name: "Salted Egg", category: "Wings", price: 180, img:"images/salted-egg.png", alt: "Salted Egg Wings" },
  { name: "Honey Glazed", category: "Wings", price: 180, img:"images/honey-glazed.png", alt: "Honey Glazed Wings" },
  { name: "Buffallo", category: "Wings", price: 180, img:"images/buffalo.png", alt: "Buffallo Wings" },
  { name: "Soy Garlic", category: "Wings", price: 180, img:"images/soy-garlic.png", alt: "Soy Garlic Wings" },
  { name: "Garlic Parmesan", category: "Wings", price: 180, img:"images/garlic-parmesan.png", alt: "Garlic Parmesan Wings" },
  { name: "Oreo Blast", category: "Waffles", price: 80, img:"images/oreo-blast.png", desc: "Whipped cream, crushed oreo, choco syrup.", alt: "Oreo Blast Waffle" },
  { name: "Butter Maple", category: "Waffles", price: 70, img:"images/butter-maple.png", desc: "Whipped cream, butter, maple syrup.", alt: "Butter Maple Waffle" },
  { name: "Strawberry", category: "Waffles", price: 75, img:"images/strawberry.png", desc: "Whipped cream, strawberry jam, powdered sugar.", alt: "Strawberry Waffle" },
  { name: "S'More", category: "Waffles", price: 80, img:"images/s'more.png", desc: "Whipped cream, crushed graham, melted mallows, choco chips, choco syrup.", alt: "S'more Waffle" },
  { name: "Biscoff", category: "Waffles", price: 80, img:"images/biscoff.png", desc: "Whipped cream, crushed biscoff, biscoff syrup.", alt: "Biscoff Waffle" },
  { name: "Carbonara", category: "Pastas", price: 140, img:"images/carbonara.png", desc: "Creamy classic pasta with bacon bits and parmesan cheese.", alt: "Carbonara Pasta" },
  { name: "Chicken Alfredo", category: "Pastas", price: 140, img:"images/chicken-alfredo.png", desc: "Fettucine in rich and creamy alfredo sauce with grilled chicken.", alt: "Chicken Alfredo Pasta" },
  { name: "Penne Tuna", category: "Pastas", price: 150, img:"images/penne-tuna.png", desc: "Penne pasta sautéed with tuna, garlic, and herbs in olive oil.", alt: "Penne Tuna Pasta" },
  { name: "Pasta Negra", category: "Pastas", price: 140, img:"images/pasta-negra.png", desc: "Squid ink pasta in creamy white sauce with chicken chunks and mushrooms, topped in parmesan.", alt: "Pasta Negra" },
  { name: "Cajun Fries", category: "Snacks", price: 75, img:"images/cajun-fries.png", desc: "Crispy fries with Cajun seasoning.", alt: "Cajun Fries" },
  { name: "Potato Wedges", category: "Snacks", price: 100, img:"images/potato-wedges.png", desc: "Thick-cut wedges, crispy on the outside, soft on the inside.", alt: "Potato Wedges" },
  { name: "Mozza Sticks", category: "Snacks", price: 100, img:"images/mozza-sticks.png", desc: "Golden-fried mozzarella sticks with a melty cheesy center.", alt: "Mozza Sticks" },
  { name: "Onion Rings", category: "Snacks", price: 100, img:"images/onion-rings.png", desc: "Crispy and golden onion rings.", alt: "Onion RIngs" },
  { name: "K-Poppers", category: "Snacks", price: 100, img:"images/k-poppers.png", desc: "Bite-sized chicken poppers, crunchy and flavorful.", alt: "K-Poppers" },
  { name: "Chicken Poppers Meal", category: "Rice Meals", price: 120, img:"images/chicken-poppers.png", desc: "Crispy chicken poppers served with garlic rice and special camp sauce.", alt: "Chicken Poppers Meal" },
  { name: "Hungarian Rice Meal", category: "Rice Meals", price: 120, img:"images/hungarian-rice-meal.png", desc: "Savory Hungarian-style rice with ground beef, vegetables, and a side of sausage.", alt: "Hungarian Rice Meal" },
  { name: "Camp Bowl-Gyudon", category: "Rice Meals", price: 120, img:"images/camp-bowl-gyudon.png", desc: "Savory beef and onions simmered in gyudon sauce over steamed rice.", alt: "Camp Bowl-Gyudon" },
  { name: "Chicken Wings Rice Meal", category: "Rice Meals", price: 130, img:"images/chicken-wings-rice-meal.png", desc: "Juicy chicken wings served with garlic rice and a side of camp sauce.", alt: "Chicken Wings Rice Meal" },
  { name: "Katsudon Pork Cutlet Bowl", category: "Rice Meals", price: 120, img:"images/katsudon-pork-cutlet-bowl.png", desc: "Crispy pork cutlet simmered with egg and onions in a savoury sauce over steamed rice.", alt: "Katsudon Pork Cutlet Bowl" },
  { name: "Tuna Clubhouse", category: "Sandwiches", price: 120, img:"images/tuna-clubhouse.png", desc: "Flaky tuna salad, crisp lettuce, tomato, cucumber, and egg sandwiched in toasted bread.", alt: "Tuna Clubhouse" },
  { name: "Monte Cristo", category: "Sandwiches", price: 120, img:"images/monte-cristo.png", desc: "Ham and cheese between soft bread, dipped in egg and grilled golden. Served warm and melty.", alt: "Monte Cristo" },
  { name: "Clubhouse", category: "Sandwiches", price: 120, img:"images/clubhouse.png", desc: "A classic triple-decker with chicken, bacon, lettuce, tomato, egg and mayo on toasted bread.", alt: "Clubhouse" },
  { name: "Burger Sliders", category: "Sandwiches", price: 160, img:"images/burger-sliders.png", desc: "Three juicy mini beef burgers with cheese, lettuce, tomato, and our special sauce. Served with crispy fries.", alt: "Burger Sliders" },
];

/* ---------- 1b. WHERE ORDERS GET SENT ----------
   PLACEHOLDER: check these before launch. */
const CAFE_NAME = "Kamp Kape MNL";                    // used in the greeting of the order message
const PHONE = "+639696031748";                        // used by the "Send by text" button
const MESSENGER_LINK = "https://m.me/61588650507047"; // the cafe's Facebook page chat

/* ---------- 2. THINGS THAT CHANGE ---------- */
let category = new URLSearchParams(window.location.search).get("category") || "";
let search = "";        // what is typed in the search box
let cart = JSON.parse(sessionStorage.getItem("kamp-kape-cart") || "{}");
let statusTimeout = null;
let statusHideTimeout = null;

/* ---------- 3. FIND THE ELEMENTS IN THE MENU PAGES ----------
   On index.html these are all null, which is how we know to do nothing. */
const menuList    = document.getElementById("menu-list");
const categoryList = document.getElementById("category-list");
const searchInput = document.getElementById("search-input");
const noResults   = document.getElementById("no-results");
const template    = document.getElementById("menu-item-template");
const categoryTitle = document.getElementById("category-title");
const menuItemPopup  = document.getElementById("menu-item-popup");
const statusPopup    = document.getElementById("status-popup");
const statusMessage  = document.getElementById("status-message");
const cartLines      = document.getElementById("cart-lines");
const cartCount      = document.getElementById("cart-count");
const cartTotal      = document.getElementById("cart-total");
const cartPopup      = document.getElementById("cart-popup");
const checkoutButton = document.getElementById("checkout-button");
const orderPopup     = document.getElementById("order-popup");
const orderText      = document.getElementById("order-text");
const copyStatus     = document.getElementById("copy-status");
const smsLink        = document.getElementById("sms-link");
const messengerLink  = document.getElementById("messenger-link");

/* ---------- 4. DRAW THE CATEGORY LINKS ---------- */
function showCategories() {
  categoryList.innerHTML = "";
  const names = [...new Set(MENU.map((item) => item.category))];

  for (const name of names) {
    const link = document.createElement("a");
    const categoryItem = MENU.find((item) => item.category === name);
    const image = document.createElement("img");
    const label = document.createElement("span");

    link.href = "category.html?category=" + encodeURIComponent(name);
    link.className = "category-card";
    image.src = categoryItem.img || "images/category-placeholder.svg";
    image.alt = "";
    label.textContent = name;
    link.append(image, label);
    categoryList.appendChild(link);
  }
}

/* ---------- 5. DRAW THE MENU CARDS ----------
   For each item that matches the selected category and search text, copy the
   <template> from category.html, fill it in, and add it to the page. */
function showMenu() {
  menuList.innerHTML = "";
  let shown = 0;
  categoryTitle.textContent = category || "Food category";

  for (const item of MENU) {
    const inCategory = item.category === category;
    const matches = (item.name + " " + (item.desc || "")).toLowerCase().includes(search.toLowerCase());
    if (!inCategory || !matches) continue;     // skip items that don't match

    const card = template.content.cloneNode(true);   // a fresh copy of the template
    const image = card.querySelector(".item-image");
    if (item.img) image.src = item.img;              // otherwise the template's placeholder stays
    image.alt = item.alt;
    card.querySelector(".item-name").textContent = item.name;
    card.querySelector(".item-price").textContent = getItemPriceLabel(item);
    card.querySelector(".item-details-button").onclick = () => showMenuItem(item);

    menuList.appendChild(card);
    shown++;
  }

  noResults.hidden = shown > 0;   // show the "No items match" message only when nothing matched
}

function getItemPriceLabel(item) {
  const prices = [item.price, item.pricehot, item.pricecold].filter((price) => price != null);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  return (lowest === highest ? "" : "From ") + "₱" + formatPrice(lowest);
}

function formatPrice(price) {
  return Number(price).toFixed(2);
}

function showMenuItem(item) {
  const image = menuItemPopup.querySelector(".popup-item-image");
  image.src = item.img || "images/category-placeholder.svg";
  image.alt = item.alt;
  menuItemPopup.querySelector(".popup-item-name").textContent = item.name;
  menuItemPopup.querySelector(".popup-item-description").textContent =
    item.desc || "Description coming soon.";
  menuItemPopup.querySelector(".popup-item-price").textContent = getItemPriceLabel(item);

  const hotColdPrices = menuItemPopup.querySelector(".popup-item-hot-cold");
  const hotButton = hotColdPrices.querySelector(".hot-button");
  const coldButton = hotColdPrices.querySelector(".cold-button");
  const regularAddButton = menuItemPopup.querySelector(".popup-add-button");
  const hasHotPrice = item.pricehot != null;
  const hasColdPrice = item.pricecold != null;

  hotColdPrices.hidden = !hasHotPrice && !hasColdPrice;
  regularAddButton.hidden = hasHotPrice || hasColdPrice;

  hotButton.hidden = !hasHotPrice;
  coldButton.hidden = !hasColdPrice;
  if (hasHotPrice) {
    hotButton.onclick = () => {
      changeQty(item.name + "|Hot", 1);
      menuItemPopup.close();
      showStatus("Item successfully Added!");
    };
  }
  if (hasColdPrice) {
    hotColdPrices.querySelector(".item-pricecold").textContent = "₱" + formatPrice(item.pricecold);
    coldButton.onclick = () => {
      changeQty(item.name + "|Cold", 1);
      menuItemPopup.close();
      showStatus("Item successfully Added!");
    };
  }
  if (hasHotPrice) {
    hotColdPrices.querySelector(".item-pricehot").textContent = "₱" + formatPrice(item.pricehot);
  }
  regularAddButton.onclick = () => {
    changeQty(item.name, 1);
    menuItemPopup.close();
    showStatus("Item successfully Added!");
  };

  menuItemPopup.showModal();
}

function showStatus(message) {
  clearTimeout(statusTimeout);
  clearTimeout(statusHideTimeout);
  statusMessage.textContent = message;
  statusPopup.hidden = false;
  requestAnimationFrame(() => statusPopup.classList.add("is-visible"));
  statusTimeout = setTimeout(() => {
    statusPopup.classList.remove("is-visible");
    statusHideTimeout = setTimeout(() => {
      statusPopup.hidden = true;
    }, 300);
  }, 3000);
}

/* ---------- 6. START (menu pages only) ---------- */
if (categoryList || menuList) {
  if (categoryList) showCategories();

  if (menuList) {
    searchInput.addEventListener("input", () => {
      search = searchInput.value.trim();
      showMenu();
    });
    document.getElementById("close-menu-item-popup").onclick = () => menuItemPopup.close();
  }

  document.getElementById("open-cart").onclick = () => cartPopup.showModal();
  document.getElementById("close-cart").onclick = () => cartPopup.close();
  // "Place order": write the order into the message box, then swap popups
  checkoutButton.onclick = () => {
    orderText.value = buildOrderText();
    copyStatus.textContent = "";
    messengerLink.href = MESSENGER_LINK;
    cartPopup.close();
    orderPopup.showModal();
  };

  // The text link is set at the moment of the click so it uses the EDITED message
  smsLink.onclick = () => {
    smsLink.href = "sms:" + PHONE + "?&body=" + encodeURIComponent(orderText.value);
  };

  messengerLink.onclick = copyOrder;   // copies the message first; Messenger then opens in a new tab
  document.getElementById("copy-order").onclick = copyOrder;
  document.getElementById("back-to-cart").onclick = () => {
    orderPopup.close();
    cartPopup.showModal();
  };
  document.getElementById("done-order").onclick = () => {
    cart = {};
    sessionStorage.setItem("kamp-kape-cart", JSON.stringify(cart));
    showCart();
    orderPopup.close();
    showStatus("Order confirmed!");
  };
  document.getElementById("cancel-order").onclick = () => {
    cart = {};
    sessionStorage.setItem("kamp-kape-cart", JSON.stringify(cart));
    showCart();
    orderPopup.close();
    showStatus("Cancelled order");
  };

  if (menuList) showMenu();
  showCart();
}

function changeQty(name, amount) {
  cart[name] = (cart[name] || 0) + amount;
  if (cart[name] <= 0) delete cart[name];   // remove the row at zero
  saveCart();
}

function saveCart() {
  sessionStorage.setItem("kamp-kape-cart", JSON.stringify(cart));
  showCart();
}

function getCartItem(cartKey) {
  const separatorIndex = cartKey.indexOf("|");
  const name = separatorIndex === -1 ? cartKey : cartKey.slice(0, separatorIndex);
  const variant = separatorIndex === -1 ? "" : cartKey.slice(separatorIndex + 1);
  return {
    item: MENU.find((menuItem) => menuItem.name === name),
    variant
  };
}

function getCartItemPrice(item, variant) {
  if (variant === "Hot" && item.pricehot != null) return item.pricehot;
  if (variant === "Cold" && item.pricecold != null) return item.pricecold;
  return item.price;
}

function showCart() {
  let count = 0, total = 0;
  cartLines.innerHTML = "";

  const defaultImage = "images/category-placeholder.svg";

  for (const [cartKey, qty] of Object.entries(cart)) {
    const { item, variant } = getCartItem(cartKey);
    if (!item) continue;
    const unitPrice = getCartItemPrice(item, variant);
    if (!qty) continue;
    count += qty;
    total += qty * unitPrice;

    const row = document.createElement("div");
    row.className = "cart-row";

    // Same photo as the menu card: the item's own img, or the placeholder
    const picture = document.createElement("img");
    picture.src = item.img || defaultImage;
    picture.alt = "";   // empty on purpose: the item name right next to it already describes it,
                        // and long alt text would spill out of the small box if the photo fails to load

    const label = document.createElement("span");
    const variantLabel = variant ? " (" + variant + ")" : "";
    label.textContent = item.name + variantLabel + " x " + qty + " = ₱" + formatPrice(unitPrice * qty);

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Decrease quantity of " + item.name + variantLabel);
    minus.onclick = () => changeQty(cartKey, -1);

    const quantity = document.createElement("input");
    quantity.type = "number";
    quantity.min = "1";
    quantity.step = "1";
    quantity.value = String(qty);
    quantity.setAttribute("aria-label", "Quantity of " + item.name + variantLabel);
    quantity.addEventListener("change", () => {
      const newQty = Number(quantity.value);
      if (!Number.isSafeInteger(newQty) || newQty < 1) {
        quantity.value = String(cart[cartKey]);
        showStatus("Enter a whole quantity of at least 1.");
        return;
      }

      cart[cartKey] = newQty;
      saveCart();
    });

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Increase quantity of " + item.name + variantLabel);
    plus.onclick = () => changeQty(cartKey, 1);

    row.append(picture, label, minus, quantity, plus);
    cartLines.appendChild(row);
  }

  if (count === 0) cartLines.textContent = "Your cart is empty.";
  cartCount.textContent = count;
  cartTotal.textContent = "₱" + formatPrice(total);
  checkoutButton.disabled = count === 0;
}

/* ---------- 7. THE ORDER MESSAGE ----------
   Builds the editable message from whatever is in the cart.
   Change the wording here. The blank lines (Name, Pickup...) are for the customer to fill in. */
function buildOrderText() {
  let lines = "";
  let total = 0;

  for (const [cartKey, qty] of Object.entries(cart)) {
    const { item, variant } = getCartItem(cartKey);
    if (!item) continue;
    const unitPrice = getCartItemPrice(item, variant);
    total += qty * unitPrice;
    const variantLabel = variant ? " (" + variant + ")" : "";
    lines += "- " + item.name + variantLabel + " x " + qty + " = ₱" + formatPrice(qty * unitPrice) + "\n";
  }

  return "Hello " + CAFE_NAME + " I’d like to place an order:\n\n" +
         lines +
         "\nTotal: ₱" + formatPrice(total) + "\n\n" +
         "Name: \n" +
         "Pickup or delivery: \n" +
         "Pickup time / delivery address: \n" +
         "Notes: \n\n" +
         "Thank you!";
}

// Copies whatever is in the message box right now (including the customer's edits)
function copyOrder() {
  orderText.select();
  if (navigator.clipboard) navigator.clipboard.writeText(orderText.value);
  else document.execCommand("copy");
  copyStatus.textContent = "Copied!";
}

// Slider Fucntion
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
});

function initHeroSlider() {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const prevBtn = slider.querySelector(".slider-btn.prev");
  const nextBtn = slider.querySelector(".slider-btn.next");
  const dots = Array.from(slider.querySelectorAll(".dot"));

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const SLIDE_INTERVAL_MS = 5000; // 5 seconds
  let autoSlideTimer = null;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, SLIDE_INTERVAL_MS);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      startAutoSlide();
    });
  });

  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  let touchStartX = 0;
  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 40) {
      goToSlide(swipeDistance < 0 ? currentIndex + 1 : currentIndex - 1);
    }
    startAutoSlide();
  }, { passive: true });

  goToSlide(0);
  startAutoSlide();
}
