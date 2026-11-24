/* =====================================================================
   script.js : makes the MENU PAGE work (menu cards, category tabs, search).
   Both index.html and menu.html load this file, but it only does anything
   on menu.html (the home page has no menu elements, so it's skipped).
   ===================================================================== */

/* ---------- 1. MENU DATA ----------
   The ONLY place to edit when the menu changes. One line per item:
     name, category, price (number), desc (description),
     alt (describes the photo for screen readers),
     img (OPTIONAL: path to the item's photo, e.g. "images/latte.jpg").
   Items without img use the placeholder picture from menu.html. */
const MENU = [
  { name: "PLACEHOLDER NAME1", category: "PLACEHOLDER CATEGORY1", price: 100, desc: "PLACEHOLDERDESC1", alt: "PLACEHOLDERALT1" },
  { name: "PLACEHOLDER NAME2", category: "PLACEHOLDER CATEGORY2", price: 100, desc: "PLACEHOLDERDESC2", alt: "PLACEHOLDERALT2" },
  { name: "PLACEHOLDER NAME3", category: "PLACEHOLDER CATEGORY3", price: 100, desc: "PLACEHOLDERDESC3", alt: "PLACEHOLDERALT3" },
  { name: "PLACEHOLDER NAME4", category: "PLACEHOLDER CATEGORY4", price: 100, desc: "PLACEHOLDERDESC4", alt: "PLACEHOLDERALT4" },
  { name: "PLACEHOLDER NAME5", category: "PLACEHOLDER CATEGORY5", price: 100, desc: "PLACEHOLDERDESC5", alt: "PLACEHOLDERALT5" }
];

/* ---------- 1b. WHERE ORDERS GET SENT ----------
   PLACEHOLDER: check these before launch. */
const CAFE_NAME = "Kamp Kape MNL";                    // used in the greeting of the order message
const PHONE = "+6309696031748";                        // used by the "Send by text" button
const MESSENGER_LINK = "https://m.me/61588650507047"; // the cafe's Facebook page chat

/* ---------- 2. THINGS THAT CHANGE ---------- */
let category = "All";   // which tab is selected
let search = "";        // what is typed in the search box
let cart = {};          // e.g. { "PLACEHOLDER NAME1": 2 }

/* ---------- 3. FIND THE ELEMENTS IN menu.html ----------
   On index.html these are all null, which is how we know to do nothing. */
const menuList    = document.getElementById("menu-list");
const tabs        = document.getElementById("category-tabs");
const searchInput = document.getElementById("search-input");
const noResults   = document.getElementById("no-results");
const template    = document.getElementById("menu-item-template");
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

/* ---------- 4. DRAW THE CATEGORY TABS ----------
   One button per category in MENU, plus "All". */
function showTabs() {
  tabs.innerHTML = "";
  const names = ["All", ...new Set(MENU.map((item) => item.category))];

  for (const name of names) {
    const button = document.createElement("button");
    button.textContent = name;
    if (name === category) button.classList.add("active");   // highlights the selected tab
    button.onclick = () => {
      category = name;
      showTabs();    // redraw so the highlight moves
      showMenu();    // redraw the cards for the new category
    };
    tabs.appendChild(button);
  }
}

/* ---------- 5. DRAW THE MENU CARDS ----------
   For each item that matches the tab AND the search text, copy the
   <template> from menu.html, fill it in, and add it to the page. */
function showMenu() {
  menuList.innerHTML = "";
  let shown = 0;

  for (const item of MENU) {
    const inCategory = category === "All" || item.category === category;
    const matches = (item.name + " " + item.desc).toLowerCase().includes(search.toLowerCase());
    if (!inCategory || !matches) continue;     // skip items that don't match

    const card = template.content.cloneNode(true);   // a fresh copy of the template
    const image = card.querySelector(".item-image");
    if (item.img) image.src = item.img;              // otherwise the template's placeholder stays
    image.alt = item.alt;
    card.querySelector(".item-name").textContent = item.name;
    card.querySelector(".item-description").textContent = item.desc;
    card.querySelector(".item-price").textContent = "₱" + item.price;

    card.querySelector(".add-button").onclick = () => changeQty(item.name, 1);

    menuList.appendChild(card);
    shown++;
  }

  noResults.hidden = shown > 0;   // show the "No items match" message only when nothing matched
}

/* ---------- 6. START (menu page only) ---------- */
if (menuList) {
  searchInput.addEventListener("input", () => {
    search = searchInput.value.trim();
    showMenu();
  });
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
    showCart();
    orderPopup.close();
  };
  showTabs();
  showMenu();
  showCart();
}

function changeQty(name, amount) {
  cart[name] = (cart[name] || 0) + amount;
  if (cart[name] <= 0) delete cart[name];   // remove the row at zero
  showCart();
}

function showCart() {
  let count = 0, total = 0;
  cartLines.innerHTML = "";

  // The fallback picture is whatever the template in menu.html uses (images/placeholder.png)
  const defaultImage = template.content.querySelector(".item-image").getAttribute("src");

  for (const item of MENU) {
    const qty = cart[item.name];
    if (!qty) continue;
    count += qty;
    total += qty * item.price;

    const row = document.createElement("div");
    row.className = "cart-row";

    // Same photo as the menu card: the item's own img, or the placeholder
    const picture = document.createElement("img");
    picture.src = item.img || defaultImage;
    picture.alt = "";   // empty on purpose: the item name right next to it already describes it,
                        // and long alt text would spill out of the small box if the photo fails to load

    const label = document.createElement("span");
    label.textContent = item.name + " x " + qty + " = ₱" + (item.price * qty);

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.onclick = () => changeQty(item.name, -1);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.onclick = () => changeQty(item.name, 1);

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

  for (const item of MENU) {
    const qty = cart[item.name];
    if (!qty) continue;
    total += qty * item.price;
    lines += "- " + item.name + " x " + qty + " = ₱" + (qty * item.price) + "\n";
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