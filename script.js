```javascript
const SUPABASE_URL = "https://bbmyoedamaubumrgpmwj.supabase.co";
const SUPABASE_KEY = "sb_publishable_YxgTwZJdKcOreql6A5Un3Q_ErxOJuuV";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const WHATSAPP_NUMBERS = [
  "919847266521",
  "919744051327"
];

let cart = [];

const categoryImages = {
  Vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",
  Grocery: "https://images.unsplash.com/photo-1601598851547-4302969d7d66?auto=format&fit=crop&w=700&q=85",
  Stationery: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=85"
};

const malayalamNames = {
  Tomato: "തക്കാളി",
  Potato: "ഉരുളക്കിഴങ്ങ്",
  Onion: "സവാള",
  "Small Onion": "ചെറിയ ഉള്ളി",
  Carrot: "കാരറ്റ്",
  Beetroot: "ബീറ്റ്റൂട്ട്",
  Cabbage: "കാബേജ്",
  Cauliflower: "കോളിഫ്ലവർ",
  Cucumber: "വെള്ളരിക്ക",
  "Green Beans": "പയർ",
  "Ladies Finger": "വെണ്ടയ്ക്ക",
  "Green Chilli": "പച്ചമുളക്",
  "Bitter Gourd": "പാവയ്ക്ക",
  "Snake Gourd": "പടവലങ്ങ",
  "Ash Gourd": "കുമ്പളങ്ങ",
  Pumpkin: "മത്തങ്ങ",
  "Ivy Gourd": "കോവയ്ക്ക",
  Drumstick: "മുരിങ്ങക്കായ",
  "Raw Banana": "പച്ചക്കായ",
  Plantain: "ഏത്തക്ക",
  Tapioca: "കപ്പ",
  "Elephant Yam": "ചേന",
  Ginger: "ഇഞ്ചി",
  Garlic: "വെളുത്തുള്ളി",
  Capsicum: "കാപ്സിക്കം",
  "Raw Mango": "പച്ചമാങ്ങ",
  "Green Peas": "പച്ചപ്പട്ടാണി",
  "Red Amaranth": "ചുവന്ന ചീര",
  "Banana Flower": "വാഴപ്പൂ",
  Coconut: "തേങ്ങ",

  "Toor Parippu": "തുവരപ്പരിപ്പ്",
  "Cherupayar Parippu": "ചെറുപയർ പരിപ്പ്",
  "Uzhunnu Parippu": "ഉഴുന്ന് പരിപ്പ്",
  "Kadala Parippu": "കടല പരിപ്പ്",
  "Masoor Parippu": "മസൂർ പരിപ്പ്",

  Sugar: "പഞ്ചസാര",
  "Wheat Flour": "ഗോതമ്പ് പൊടി",
  Atta: "ആട്ട",
  "Puttu Podi": "പുട്ടുപൊടി",
  "Idiyappam Podi": "ഇടിയപ്പം പൊടി",
  "Pathiri Podi": "പത്തിരിപ്പൊടി",
  Rava: "റവ",
  Maida: "മൈദ",

  "Coconut Oil": "വെളിച്ചെണ്ണ",
  "Sunflower Oil": "സൺഫ്ലവർ ഓയിൽ",
  "Gingelly Oil": "എള്ളെണ്ണ",
  "Groundnut Oil": "നിലക്കടല എണ്ണ",
  "Mustard Oil": "കടുകെണ്ണ",

  "Chilli Powder": "മുളകുപൊടി",
  "Coriander Powder": "മല്ലിപ്പൊടി",
  "Turmeric Powder": "മഞ്ഞൾപ്പൊടി",
  "Black Pepper": "കുരുമുളക്",
  Cumin: "ജീരകം",
  "Mustard Seeds": "കടുക്",
  Fenugreek: "ഉലുവ",
  "Garam Masala": "ഗരം മസാല",
  "Chicken Masala": "ചിക്കൻ മസാല",
  "Meat Masala": "മീറ്റ് മസാല",
  "Sambar Powder": "സാംബാർ പൊടി",
  "Rasam Powder": "രസം പൊടി"
};

document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  renderCart();
  setupDate();
});


async function loadProducts() {
  const container = document.getElementById("products");

  if (!container) {
    console.error("products element not found");
    return;
  }

  container.innerHTML = "<p>Products loading...</p>";

  const result = await supabaseClient
    .from("products")
    .select("*")
    .eq("available", true)
    .order("category")
    .order("name");

  if (result.error) {
    console.error("Products error:", result.error);
    container.innerHTML = "<p>Products load ചെയ്യാൻ കഴിഞ്ഞില്ല.</p>";
    return;
  }

  if (!result.data || result.data.length === 0) {
    container.innerHTML = "<p>ഇപ്പോൾ products ലഭ്യമല്ല.</p>";
    return;
  }

  renderCategories();

  container.innerHTML = result.data
    .map(function (product) {
      return createProductCard(product);
    })
    .join("");
}


function renderCategories() {
  let container = document.getElementById("categories");

  if (!container) {
    const products = document.getElementById("products");

    if (!products) {
      return;
    }

    container = document.createElement("div");
    container.id = "categories";
    container.className = "category-buttons";

    products.parentNode.insertBefore(container, products);
  }

  container.innerHTML = `
    <button type="button" class="category-btn active"
      onclick="filterCategory('all', this)">
      🛍️ All
    </button>

    <button type="button" class="category-btn"
      onclick="filterCategory('Vegetables', this)">
      🥦 Vegetables
    </button>

    <button type="button" class="category-btn"
      onclick="filterCategory('Grocery', this)">
      🛒 Grocery
    </button>

    <button type="button" class="category-btn"
      onclick="filterCategory('Stationery', this)">
      ✏️ Stationery
    </button>
  `;
}


function createProductCard(product) {
  const displayName =
    product.malayalam_name ||
    malayalamNames[product.name] ||
    product.name;

  const image =
    product.image_url ||
    categoryImages[product.category] ||
    categoryImages.Grocery;

  let unitHTML = "";

  if (product.category === "Vegetables") {
    unitHTML = `
      <select id="unit-${product.id}" class="unit-select"
        onchange="handleUnitChange(${product.id})">
        <option value="100 g">100 g</option>
        <option value="250 g">250 g</option>
        <option value="500 g">500 g</option>
        <option value="1 kg">1 kg</option>
        <option value="custom">മറ്റൊരു അളവ്</option>
      </select>

      <input
        id="customUnit-${product.id}"
        class="custom-unit"
        type="text"
        placeholder="ഉദാ: 750 g അല്ലെങ്കിൽ 1.5 kg"
        style="display:none;"
      >
    `;
  } else {
    let options = product.unit_options;

    if (!Array.isArray(options) || options.length === 0) {
      if (product.unit_type === "weight") {
        options = ["500 g", "1 kg"];
      } else if (product.unit_type === "volume") {
        options = ["500 ml", "1 L"];
      } else {
        options = ["1 piece"];
      }
    }

    unitHTML = `
      <select id="unit-${product.id}" class="unit-select">
        ${options.map(function (option) {
          return `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`;
        }).join("")}
      </select>
    `;
  }

  return `
    <div class="product-card" data-category="${escapeHTML(product.category)}">

      <img
        class="product-image"
        src="${escapeHTML(image)}"
        alt="${escapeHTML(displayName)}"
        loading="lazy"
        onerror="this.src='${categoryImages.Grocery}'"
      >

      <div class="product-content">

        <h3>${escapeHTML(displayName)}</h3>

        ${
          displayName !== product.name
            ? `<p class="english-name">${escapeHTML(product.name)}</p>`
            : ""
        }

        <p class="availability">✅ ലഭ്യമാണ്</p>

        <div class="product-options">

          ${unitHTML}

          <div class="quantity-row">

            <button type="button"
              onclick="changeQuantity(${product.id}, -1)">
              −
            </button>

            <span id="qty-${product.id}">1</span>

            <button type="button"
              onclick="changeQuantity(${product.id}, 1)">
              +
            </button>

          </div>

          <button
            type="button"
            class="add-cart-btn"
            onclick="addToCart(${product.id})">
            🛒 Cart-ലേക്ക് ചേർക്കുക
          </button>

        </div>
      </div>
    </div>
  `;
}


function handleUnitChange(productId) {
  const select = document.getElementById("unit-" + productId);
  const custom = document.getElementById("customUnit-" + productId);

  if (!select || !custom) {
    return;
  }

  if (select.value === "custom") {
    custom.style.display = "block";
    custom.focus();
  } else {
    custom.style.display = "none";
    custom.value = "";
  }
}


function changeQuantity(productId, change) {
  const element = document.getElementById("qty-" + productId);

  if (!element) {
    return;
  }

  let quantity = parseInt(element.textContent, 10) || 1;

  quantity += change;

  if (quantity < 1) {
    quantity = 1;
  }

  if (quantity > 99) {
    quantity = 99;
  }

  element.textContent = quantity;
}


async function addToCart(productId) {
  const result = await supabaseClient
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("available", true)
    .single();

  if (result.error || !result.data) {
    alert("ഈ product ഇപ്പോൾ ലഭ്യമല്ല.");
    await loadProducts();
    return;
  }

  const product = result.data;

  const quantityElement =
    document.getElementById("qty-" + productId);

  const quantity =
    parseInt(quantityElement ? quantityElement.textContent : "1", 10) || 1;

  const unitSelect =
    document.getElementById("unit-" + productId);

  let unit =
    unitSelect ? unitSelect.value : "1 piece";

  if (
    product.category === "Vegetables" &&
    unit === "custom"
  ) {
    const customInput =
      document.getElementById("customUnit-" + productId);

    unit =
      customInput ? customInput.value.trim() : "";

    if (!unit) {
      alert("അളവ് enter ചെയ്യുക.");
      if (customInput) {
        customInput.focus();
      }
      return;
    }
  }

  const existing = cart.find(function (item) {
    return (
      String(item.product_id) === String(productId) &&
      item.unit === unit
    );
  });

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      product_id: Number(product.id),
      name: product.name,
      displayName:
        product.malayalam_name ||
        malayalamNames[product.name] ||
        product.name,
      category: product.category,
      quantity: quantity,
      unit: unit
    });
  }

  saveCart();
  renderCart();

  alert("✅ Cart-ലേക്ക് ചേർത്തു!");
}


function saveCart() {
  localStorage.setItem(
    "krishnaStoresCart",
    JSON.stringify(cart)
  );
}


function renderCart() {
  const container =
    document.getElementById("cartItems");

  const count =
    document.getElementById("cartCount");

  if (!container) {
    return;
  }

  const totalQuantity = cart.reduce(function (sum, item) {
    return sum + Number(item.quantity || 0);
  }, 0);

  if (count) {
    count.textContent = totalQuantity;
  }

  if (cart.length === 0) {
    container.innerHTML = "<p>Cart ശൂന്യമാണ്.</p>";
    return;
  }

  container.innerHTML = cart.map(function (item, index) {
    return `
      <div class="cart-item">

        <div>
          <strong>${escapeHTML(item.displayName)}</strong>
          <div>${escapeHTML(item.unit)}</div>
          <div>Quantity: ${escapeHTML(item.quantity)}</div>
        </div>

        <button
          type="button"
          onclick="removeFromCart(${index})">
          🗑️
        </button>

      </div>
    `;
  }).join("");
}


function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}


function filterCategory(category, button) {
  const cards =
    document.querySelectorAll(".product-card");

  cards.forEach(function (card) {
    if (
      category === "all" ||
      card.dataset.category === category
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  document
    .querySelectorAll(".category-btn")
    .forEach(function (btn) {
      btn.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  }
}


function setupDate() {
  const dateInput =
    document.getElementById("pickupDate");

  if (!dateInput) {
    return;
  }

  const today = new Date();

  const year = today.getFullYear();

  const month =
    String(today.getMonth() + 1).padStart(2, "0");

  const day =
    String(today.getDate()).padStart(2, "0");

  dateInput.min =
    year + "-" + month + "-" + day;
}


async function placeOrder() {
  await submitOrder();
}


async function submitOrder() {
  if (cart.length === 0) {
    alert("ആദ്യം products cart-ലേക്ക് ചേർക്കുക.");
    return;
  }

  const nameElement =
    document.getElementById("customerName");

  const phoneElement =
    document.getElementById("customerPhone");

  const dateElement =
    document.getElementById("pickupDate");

  const timeElement =
    document.getElementById("pickupTime");

  const customerName =
    nameElement ? nameElement.value.trim() : "";

  const customerPhone =
    phoneElement ? phoneElement.value.trim() : "";

  const pickupDate =
    dateElement ? dateElement.value : "";

  const pickupTime =
    timeElement ? timeElement.value : "";

  if (!customerName) {
    alert("പേര് enter ചെയ്യുക.");
    return;
  }

  if (!customerPhone) {
    alert("Phone number enter ചെയ്യുക.");
    return;
  }

  if (!pickupDate) {
    alert("Pickup date തിരഞ്ഞെടുക്കുക.");
    return;
  }

  if (!pickupTime) {
    alert("Pickup time തിരഞ്ഞെടുക്കുക.");
    return;
  }

  const orderNumber =
    "KS-" +
    Date.now().toString().slice(-6);

  const productIds =
    cart.map(function (item) {
      return Number(item.product_id);
    });

  const productResult =
    await supabaseClient
      .from("products")
      .select("id,name,available")
      .in("id", productIds);

  if (productResult.error) {
    console.error(productResult.error);
    alert("Products verify ചെയ്യാൻ കഴിഞ്ഞില്ല.");
    return;
  }

  for (const item of cart) {
    const product =
      productResult.data.find(function (p) {
        return Number(p.id) === Number(item.product_id);
      });

    if (!product || !product.available) {
      alert(item.displayName + " ഇപ്പോൾ ലഭ്യമല്ല.");
      await loadProducts();
      return;
    }
  }

  const items =
    cart.map(function (item) {
      return {
        product_id: Number(item.product_id),
        product_name: item.displayName,
        quantity: Number(item.quantity),
        unit: item.unit
      };
    });

  const orderResult =
    await supabaseClient.rpc(
      "create_krishna_order",
      {
        p_order_number: orderNumber,
        p_customer_name: customerName,
        p_customer_phone: customerPhone,
        p_pickup_date: pickupDate,
        p_pickup_time: pickupTime,
        p_items: items
      }
    );

  if (orderResult.error) {
    console.error(orderResult.error);
    alert(
      "Order place ചെയ്യാൻ കഴിഞ്ഞില്ല:\n" +
      orderResult.error.message
    );
    return;
  }

  const message =
    buildWhatsAppMessage(
      orderNumber,
      customerName,
      customerPhone,
      pickupDate,
      pickupTime
    );

  cart = [];

  saveCart();
  renderCart();

  showConfirmation(orderNumber);

  openWhatsApp(message);
}


function buildWhatsAppMessage(
  orderNumber,
  customerName,
  customerPhone,
  pickupDate,
  pickupTime
) {
  let message =
    "🛒 *Krishna Stores - Pre-Booking*\n\n" +
    "🧾 Order No: " + orderNumber + "\n\n" +
    "👤 Name: " + customerName + "\n" +
    "📱 Phone: " + customerPhone + "\n\n" +
    "📅 Pickup Date: " + pickupDate + "\n" +
    "⏰ Pickup Time: " + pickupTime + "\n\n" +
    "*Items:*";

  cart.forEach(function (item) {
    message +=
      "\n• " +
      item.displayName +
      " - " +
      item.quantity +
      " × " +
      item.unit;
  });

  message +=
    "\n\n💰 Payment: Cash at pickup" +
    "\n🏪 Pickup only" +
    "\n🚫 No home delivery";

  return message;
}


function openWhatsApp(message) {
  const number = WHATSAPP_NUMBERS[0];

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}


function showConfirmation(orderNumber) {
  const message =
    document.getElementById("message");

  if (!message) {
    return;
  }

  message.innerHTML =
    '<div style="padding:20px;border-radius:14px;background:#e8f5e9;color:#1b5e20;margin-top:15px;">' +
    "<h3>✅ Order Confirmed!</h3>" +
    "<p>നിങ്ങളുടെ Order Number:</p>" +
    '<strong style="font-size:22px;">' +
    escapeHTML(orderNumber) +
    "</strong>" +
    "<p>Pickup സമയത്ത് കടയിൽ നിന്ന് order വാങ്ങാം.</p>" +
    "</div>";
}


function escapeHTML(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```
