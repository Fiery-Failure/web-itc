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
   Items without img use the placeholder picture from category.html. */
const MENU = [
  { name: "Americano", category: "Coffee", price: 80, desc: "PLACEHOLDERDESC1A", alt: "PLACEHOLDERALT1A" },
  { name: "Latte", category: "Coffee", price: 90, desc: "PLACEHOLDERDESC1B", alt: "PLACEHOLDERALT1B" },
  { name: "Spanish Latte", category: "Coffee", price: 110, desc: "PLACEHOLDERDESC1C", alt: "PLACEHOLDERALT1C" },
  { name: "White Mocha", category: "Coffee", price: 110, desc: "PLACEHOLDERDESC1D", alt: "PLACEHOLDERALT1D" },
  { name: "Caramel Macchiato", category: "Coffee", price: 110, desc: "PLACEHOLDERDESC1E", alt: "PLACEHOLDERALT1E" },
  { name: "Caramel Latte", category: "Coffee", price: 100, desc: "PLACEHOLDERDESC1F", alt: "PLACEHOLDERALT1F" },
  { name: "Salter Caramel Latte", category: "Coffee", price: 110, desc: "PLACEHOLDERDESC1G", alt: "PLACEHOLDERALT1G" },
  { name: "Sea Salt Latte", category: "Coffee", price: 110, desc: "PLACEHOLDERDESC1H", alt: "PLACEHOLDERALT1H" },
  { name: "Mocha Latte", category: "Coffee", price: 110, desc: "PLACEHOLDERDESC1I", alt: "PLACEHOLDERALT1I" },
  { name: "Smore's Latte", category: "Coffee", price: 120, desc: "PLACEHOLDERDESC1J", alt: "PLACEHOLDERALT1J" },
  { name: "Nutella Latte", category: "Coffee", price: 120, desc: "PLACEHOLDERDESC1K", alt: "PLACEHOLDERALT1K" },
  { name: "Matcha Espresso", category: "Coffee", price: 120, desc: "PLACEHOLDERDESC1L", alt: "PLACEHOLDERALT1L" },
  { name: "Biscoff Latte", category: "Coffee", price: 100, desc: "PLACEHOLDERDESC1M", alt: "PLACEHOLDERALT1M" },
  { name: "Choco Cream", category: "Non-Coffee", pricehot: 100, pricecold: 100, desc: "PLACEHOLDERDESC2A", alt: "PLACEHOLDERALT2A" },
  { name: "White Choco", category: "Non-Coffee", pricehot: 100, pricecold: 100, desc: "PLACEHOLDERDESC2B", alt: "PLACEHOLDERALT2B" },
  { name: "Matcha Latte", category: "Non-Coffee", pricehot: 110, pricecold: 110, desc: "PLACEHOLDERDESC2C", alt: "PLACEHOLDERALT2C" },
  { name: "Biscoff Cream", category: "Non-Coffee", pricehot: 120, pricecold: 120, desc: "PLACEHOLDERDESC2D", alt: "PLACEHOLDERALT2D" },
  { name: "Strawberry Milk", category: "Non-Coffee", pricecold: 100, desc: "PLACEHOLDERDESC2E", alt: "PLACEHOLDERALT2E" },
  { name: "Nutella Milk", category: "Non-Coffee", pricecold: 120, pricehot: 120, desc: "PLACEHOLDERDESC2F", alt: "PLACEHOLDERALT2F" },
  { name: "Seasalt Matcha", category: "Non-Coffee", pricecold: 120, pricehot: 120, desc: "PLACEHOLDERDESC2G", alt: "PLACEHOLDERALT2G" },
  { name: "Strawberry Matcha", category: "Non-Coffee", pricecold: 120, desc: "PLACEHOLDERDESC2H", alt: "PLACEHOLDERALT2H" },
  { name: "Ube Cloud", category: "Non-Coffee", pricecold: 130, pricehot: 130, desc: "PLACEHOLDERDESC2I", alt: "PLACEHOLDERALT2I" },
  { name: "Ube Matcha", category: "Non-Coffee", pricecold: 120, pricehot: 120, desc: "PLACEHOLDERDESC2J", alt: "PLACEHOLDERALT2J" },
  { name: "Sea Salt Latte", category: "Non-Coffee", pricecold: 120, pricehot: 120, desc: "PLACEHOLDERDESC2K", alt: "PLACEHOLDERALT2K" },
  { name: "Java Chip", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3A", alt: "PLACEHOLDERALT3A" },
  { name: "Coffee Jelly", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3B", alt: "PLACEHOLDERALT3B" },
  { name: "Espresso Frappe", category: "Frappes", price: 110, desc: "PLACEHOLDERDESC3C", alt: "PLACEHOLDERALT3C" },
  { name: "Biscoff Frappe", category: "Frappes", price: 145, desc: "PLACEHOLDERDESC3D", alt: "PLACEHOLDERALT3D" },
  { name: "Strawberries N Cream", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3E", alt: "PLACEHOLDERALT3E" },
  { name: "Cookies N Cream", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3F", alt: "PLACEHOLDERALT3F" },
  { name: "Nutella Frappe", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3G", alt: "PLACEHOLDERALT3G" },
  { name: "Matcha Frappe", category: "Frappes", price: 130, desc: "PLACEHOLDERDESC3H", alt: "PLACEHOLDERALT3H" },
  { name: "Caramel Frappe", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3I", alt: "PLACEHOLDERALT3I" },
  { name: "Salted Caramel Frappe", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3J", alt: "PLACEHOLDERALT3J" },
  { name: "Vanilla Frappe", category: "Frappes", price: 110, desc: "PLACEHOLDERDESC3K", alt: "PLACEHOLDERALT3K" },
  { name: "Mocha Frappe", category: "Frappes", price: 120, desc: "PLACEHOLDERDESC3L", alt: "PLACEHOLDERALT3L" },
  { name: "Salted Egg", category: "Wings", price: 180, desc: "PLACEHOLDERDESC4A", alt: "PLACEHOLDERALT4A" },
  { name: "Honey Glazed", category: "Wings", price: 180, desc: "PLACEHOLDERDESC4B", alt: "PLACEHOLDERALT4B" },
  { name: "Buffallo", category: "Wings", price: 180, desc: "PLACEHOLDERDESC4C", alt: "PLACEHOLDERALT4C" },
  { name: "Soy Garlic", category: "Wings", price: 180, desc: "PLACEHOLDERDESC4D", alt: "PLACEHOLDERALT4D" },
  { name: "Garlic Parmesan", category: "Wings", price: 180, desc: "PLACEHOLDERDESC4E", alt: "PLACEHOLDERALT4E" },
  { name: "Oreo Blast", category: "Waffles", price: 80, desc: "PLACEHOLDERDESC5A", alt: "PLACEHOLDERALT5A" },
  { name: "Butter Maple", category: "Waffles", price: 70, desc: "PLACEHOLDERDESC5B", alt: "PLACEHOLDERALT5B" },
  { name: "Strawberry", category: "Waffles", price: 75, desc: "PLACEHOLDERDESC5C", alt: "PLACEHOLDERALT5C" },
  { name: "S'More", category: "Waffles", price: 80, desc: "PLACEHOLDERDESC5D", alt: "PLACEHOLDERALT5D" },
  { name: "Biscoff", category: "Waffles", price: 80, desc: "PLACEHOLDERDESC5E", alt: "PLACEHOLDERALT5E" },
  { name: "Carbonara", category: "Pastas", price: 140, desc: "PLACEHOLDERDESC6A", alt: "PLACEHOLDERALT6A" },
  { name: "Chicken Alfredo", category: "Pastas", price: 140, desc: "PLACEHOLDERDESC6B", alt: "PLACEHOLDERALT6B" },
  { name: "Penne Tuna", category: "Pastas", price: 150, desc: "PLACEHOLDERDESC6C", alt: "PLACEHOLDERALT6C" },
  { name: "Pasta Negra", category: "Pastas", price: 140, desc: "PLACEHOLDERDESC6D", alt: "PLACEHOLDERALT6D" },
  { name: "Cajun Fries", category: "Snacks", price: 75, desc: "PLACEHOLDERDESC7A", alt: "PLACEHOLDERALT7A" },
  { name: "Potato Wedges", category: "Snacks", price: 100, desc: "PLACEHOLDERDESC7B", alt: "PLACEHOLDERALT7B" },
  { name: "Mozza Sticks", category: "Snacks", price: 100, desc: "PLACEHOLDERDESC7C", alt: "PLACEHOLDERALT7C" },
  { name: "Onion Rings", category: "Snacks", price: 100, desc: "PLACEHOLDERDESC7D", alt: "PLACEHOLDERALT7D" },
  { name: "K-Poppers", category: "Snacks", price: 100, desc: "PLACEHOLDERDESC7E", alt: "PLACEHOLDERALT7E" },
  { name: "Chicken Poppers Meal", category: "Rice Meals", price: 120, desc: "PLACEHOLDERDESC8", alt: "PLACEHOLDERALT8" },
  { name: "Hungarian Rice Meal", category: "Rice Meals", price: 120, desc: "PLACEHOLDERDESC8", alt: "PLACEHOLDERALT8" },
  { name: "Camp Bowl-Gyudon", category: "Rice Meals", price: 120, desc: "PLACEHOLDERDESC8", alt: "PLACEHOLDERALT8" },
  { name: "Chicken Wings Rice Meal", category: "Rice Meals", price: 130, desc: "PLACEHOLDERDESC8", alt: "PLACEHOLDERALT8" },
  { name: "Katsudon Pork Cutlet Bowl", category: "Rice Meals", price: 120, desc: "PLACEHOLDERDESC8", alt: "PLACEHOLDERALT8" },
  { name: "Tuna Clubhouse", category: "Sandwiches", price: 120, desc: "PLACEHOLDERDESC9", alt: "PLACEHOLDERALT9" },
  { name: "Monte Cristo", category: "Sandwiches", price: 120, desc: "PLACEHOLDERDESC9", alt: "PLACEHOLDERALT9" },
  { name: "Clubhouse", category: "Sandwiches", price: 120, desc: "PLACEHOLDERDESC9", alt: "PLACEHOLDERALT9" },
  { name: "Burger Sliders", category: "Sandwiches", price: 160, desc: "PLACEHOLDERDESC9", alt: "PLACEHOLDERALT9" },
];

/* ---------- 1b. WHERE ORDERS GET SENT ----------
   PLACEHOLDER: check these before launch. */
const CAFE_NAME = "Kamp Kape MNL";                    // used in the greeting of the order message
const PHONE = "+6309696031748";                        // used by the "Send by text" button
const MESSENGER_LINK = "https://m.me/61588650507047"; // the cafe's Facebook page chat

/* ---------- 2. THINGS THAT CHANGE ---------- */
let category = new URLSearchParams(window.location.search).get("category") || "";
let search = "";        // what is typed in the search box
let cart = JSON.parse(sessionStorage.getItem("kamp-kape-cart") || "{}");

/* ---------- 3. FIND THE ELEMENTS IN THE MENU PAGES ----------
   On index.html these are all null, which is how we know to do nothing. */
const menuList    = document.getElementById("menu-list");
const categoryList = document.getElementById("category-list");
const searchInput = document.getElementById("search-input");
const noResults   = document.getElementById("no-results");
const template    = document.getElementById("menu-item-template");
const categoryTitle = document.getElementById("category-title");
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
    const matches = (item.name + " " + item.desc).toLowerCase().includes(search.toLowerCase());
    if (!inCategory || !matches) continue;     // skip items that don't match

    const card = template.content.cloneNode(true);   // a fresh copy of the template
    const image = card.querySelector(".item-image");
    if (item.img) image.src = item.img;              // otherwise the template's placeholder stays
    image.alt = item.alt;
    card.querySelector(".item-name").textContent = item.name;
    card.querySelector(".item-description").textContent = item.desc;
    const regularPrice = card.querySelector(".item-price");
    const hotColdPrices = card.querySelector(".item-hot-cold");
    const regularAddButton = card.querySelector(".menu-item > .add-button");
    const hotButton = card.querySelector(".hot-button");
    const coldButton = card.querySelector(".cold-button");
    const hasHotPrice = item.pricehot != null;
    const hasColdPrice = item.pricecold != null;

    if (hasHotPrice || hasColdPrice) {
      regularPrice.hidden = true;
      regularAddButton.hidden = true;
      hotColdPrices.hidden = false;

      hotButton.hidden = !hasHotPrice;
      coldButton.hidden = !hasColdPrice;

      if (hasHotPrice) {
        card.querySelector(".item-pricehot").textContent = "₱" + item.pricehot;
        hotButton.onclick = () => changeQty(item.name + "|Hot", 1);
      }

      if (hasColdPrice) {
        card.querySelector(".item-pricecold").textContent = "₱" + item.pricecold;
        coldButton.onclick = () => changeQty(item.name + "|Cold", 1);
      }
    } else {
      regularPrice.textContent = "₱" + item.price;
      hotColdPrices.hidden = true;
      regularAddButton.onclick = () => changeQty(item.name, 1);
    }

    menuList.appendChild(card);
    shown++;
  }

  noResults.hidden = shown > 0;   // show the "No items match" message only when nothing matched
}

/* ---------- 6. START (menu pages only) ---------- */
if (categoryList || menuList) {
  if (categoryList) showCategories();

  if (menuList) {
    searchInput.addEventListener("input", () => {
      search = searchInput.value.trim();
      showMenu();
    });
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
  };

  if (menuList) showMenu();
  showCart();
}

function changeQty(name, amount) {
  cart[name] = (cart[name] || 0) + amount;
  if (cart[name] <= 0) delete cart[name];   // remove the row at zero
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

  const defaultImage = "images/placeholder.png";

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
    label.textContent = item.name + variantLabel + " x " + qty + " = ₱" + (unitPrice * qty);

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.onclick = () => changeQty(cartKey, -1);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.onclick = () => changeQty(cartKey, 1);

    row.append(picture, label, minus, plus);
    cartLines.appendChild(row);
  }

  if (count === 0) cartLines.textContent = "Your cart is empty.";
  cartCount.textContent = count;
  cartTotal.textContent = "₱" + total;
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
    lines += "- " + item.name + variantLabel + " x " + qty + " = ₱" + (qty * unitPrice) + "\n";
  }

  return "Hello " + CAFE_NAME + " I’d like to place an order:\n\n" +
         lines +
         "\nTotal: ₱" + total + "\n\n" +
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
