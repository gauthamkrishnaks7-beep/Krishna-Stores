```javascript
// =====================================================
// KRISHNA STORES - CUSTOMER WEBSITE
// =====================================================

const SUPABASE_URL =
  "https://bbmyoedamaubumrgpmwj.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_YxgTwZJdKcOreql6A5Un3Q_ErxOJuuV";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


// =====================================================
// WHATSAPP
// =====================================================

const WHATSAPP_NUMBERS = [
  "919847266521",
  "919744051327"
];


// =====================================================
// CATEGORY IMAGES
// =====================================================

const categoryImages = {

  Vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85",

  Grocery:
    "https://images.unsplash.com/photo-1601598851547-4302969d7d66?auto=format&fit=crop&w=700&q=85",

  Stationery:
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=85"

};


// =====================================================
// PRODUCT FALLBACK IMAGES
// =====================================================

const productImages = {

  Tomato:
    "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85",

  Potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=85",

  Onion:
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=85",

  Carrot:
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=85",

  Beetroot:
    "https://images.unsplash.com/photo-1603048719539-9ecb4f9f5d9f?auto=format&fit=crop&w=700&q=85",

  Cabbage:
    "https://images.unsplash.com/photo-1598030343246-eec71cb4427c?auto=format&fit=crop&w=700&q=85",

  Cauliflower:
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=700&q=85",

  Cucumber:
    "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=700&q=85",

  "Green Beans":
    "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=700&q=85",

  "Green Chilli":
    "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=85",

  Ginger:
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=85",

  Garlic:
    "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=700&q=85",

  Capsicum:
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=85",

  "Raw Mango":
    "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=85",

  "Green Peas":
    "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=700&q=85",

  Coconut:
    "https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=700&q=85",

  Sugar:
    "https://images.unsplash.com/photo-1581268496017-3c7f1c7d3c3e?auto=format&fit=crop&w=700&q=85",

  "Coconut Oil":
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=85",

  "Wheat Flour":
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",

  Atta:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",

  "Puttu Podi":
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=700&q=85",

  Rava:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85",

  Maida:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",

  "Black Pepper":
    "https://images.unsplash.com/photo-1599909533730-f9d7c5a8c6c9?auto=format&fit=crop&w=700&q=85",

  Cumin:
    "https://images.unsplash.com/photo-1599909533730-f9d7c5a8c6c9?auto=format&fit=crop&w=700&q=85"

};


// =====================================================
// MALAYALAM NAMES
// =====================================================

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


// =====================================================
// CART
// =====================================================

let cart = [];

try {

  cart =
    JSON.parse(
      localStorage.getItem(
        "krishnaStoresCart"
      )
    ) || [];

} catch (error) {

  cart = [];

}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    console.log(
      "Krishna Stores website loaded"
    );

    renderCategories();

    await loadProducts();

    renderCart();

    setupDate();

  }
);


// =====================================================
// RENDER CATEGORIES
// =====================================================

function renderCategories() {

  const possibleContainers = [

    "categories",
    "categoryButtons",
    "category-buttons",
    "categoryList"

  ];

  let container = null;

  for (
    const id of possibleContainers
  ) {

    const element =
      document.getElementById(id);

    if (element) {

      container = element;

      break;

    }

  }

  // If no category container exists,
  // create one automatically above products.

  if (!container) {

    const products =
      document.getElementById(
        "products"
      );

    if (!products) {
      return;
    }

    container =
      document.createElement("div");

    container.id =
      "categories";

    container.className =
      "category-buttons";

    products.parentNode.insertBefore(
      container,
      products
    );

  }

  container.innerHTML = `

    <button
      type="button"
      class="category-btn active"
      onclick="filterCategory('all', this)"
    >
      🛍️ All
    </button>

    <button
      type="button"
      class="category-btn"
      onclick="filterCategory('Vegetables', this)"
    >
      🥦 Vegetables
    </button>

    <button
      type="button"
      class="category-btn"
      onclick="filterCategory('Grocery', this)"
    >
      🛒 Grocery
    </button>

    <button
      type="button"
      class="category-btn"
      onclick="filterCategory('Stationery', this)"
    >
      ✏️ Stationery
    </button>

  `;

}


// =====================================================
// LOAD PRODUCTS
// =====================================================

async function loadProducts() {

  const container =
    document.getElementById(
      "products"
    );

  if (!container) {

    console.error(
      "ERROR: #products element not found in index.html"
    );

    return;

  }

  container.innerHTML =
    "<p>Products loading...</p>";

  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("products")
        .select("*")
        .eq("available", true)
        .order("category")
        .order("name");

    if (error) {

      console.error(
        "Products loading error:",
        error
      );

      container.innerHTML = `
        <p style="padding:20px;text-align:center;">
          Products load ചെയ്യാൻ കഴിഞ്ഞില്ല.
        </p>
      `;

      return;

    }

    console.log(
      "Products loaded:",
      data
    );

    if (
      !data ||
      data.length === 0
    ) {

      container.innerHTML = `
        <p style="padding:20px;text-align:center;">
          ഇപ്പോൾ products ലഭ്യമല്ല.
        </p>
      `;

      return;

    }

    container.innerHTML =
      data
        .map(
          product =>
            createProductCard(product)
        )
        .join("");

  } catch (error) {

    console.error(
      "Unexpected product loading error:",
      error
    );

    container.innerHTML = `
      <p style="padding:20px;text-align:center;">
        Products load ചെയ്യാൻ കഴിഞ്ഞില്ല.
      </p>
    `;

  }

}


// =====================================================
// GET PRODUCT IMAGE
// =====================================================

function getProductImage(
  product
) {

  if (
    product &&
    typeof product.image_url ===
      "string" &&
    product.image_url.trim()
  ) {

    return product.image_url.trim();

  }

  if (
    productImages[
      product.name
    ]
  ) {

    return productImages[
      product.name
    ];

  }

  if (
    categoryImages[
      product.category
    ]
  ) {

    return categoryImages[
      product.category
    ];

  }

  return categoryImages.Grocery;

}


// =====================================================
// PRODUCT CARD
// =====================================================

function createProductCard(
  product
) {

  const displayName =
    product.malayalam_name ||
    malayalamNames[
      product.name
    ] ||
    product.name;

  const image =
    getProductImage(product);

  let unitHTML = "";

  // ---------------------------------------------------
  // VEGETABLES
  // ---------------------------------------------------

  if (
    product.category ===
    "Vegetables"
  ) {

    unitHTML = `

      <select
        id="unit-${product.id}"
        class="unit-select"
        onchange="handleUnitChange('${product.id}')"
      >

        <option value="100 g">
          100 g
        </option>

        <option value="250 g">
          250 g
        </option>

        <option value="500 g">
          500 g
        </option>

        <option value="1 kg">
          1 kg
        </option>

        <option value="custom">
          മറ്റൊരു അളവ്
        </option>

      </select>

      <input
        type="text"
        id="customUnit-${product.id}"
        class="custom-unit"
        placeholder="ഉദാ: 750 g അല്ലെങ്കിൽ 1.5 kg"
        style="display:none;"
      >

    `;

  }

  // ---------------------------------------------------
  // OTHER PRODUCTS
  // ---------------------------------------------------

  else {

    let options =
      Array.isArray(
        product.unit_options
      )
        ? product.unit_options
        : [];

    if (
      options.length === 0
    ) {

      if (
        product.unit_type ===
        "weight"
      ) {

        options = [
          "500 g",
          "1 kg"
        ];

      } else if (
        product.unit_type ===
        "volume"
      ) {

        options = [
          "500 ml",
          "1 L"
        ];

      } else {

        options = [
          "1 piece"
        ];

      }

    }

    unitHTML = `

      <select
        id="unit-${product.id}"
        class="unit-select"
      >

        ${options
          .map(
            option => `

              <option
                value="${escapeHTML(option)}"
              >
                ${escapeHTML(option)}
              </option>

            `
          )
          .join("")}

      </select>

    `;

  }

  return `

    <div
      class="product-card"
      data-category="${escapeHTML(
        product.category
      )}"
    >

      <img
        class="product-image"
        src="${escapeHTML(image)}"
        alt="${escapeHTML(
          displayName
        )}"
        loading="lazy"
        onerror="handleImageError(this, '${escapeHTML(
          product.category
        )}')"
      >

      <div class="product-content">

        <h3>
          ${escapeHTML(
            displayName
          )}
        </h3>

        ${
          displayName !==
          product.name
            ? `
              <p class="english-name">
                ${escapeHTML(
                  product.name
                )}
              </p>
            `
            : ""
        }

        <p class="availability">
          ✅ ലഭ്യമാണ്
        </p>

        <div class="product-options">

          ${unitHTML}

          <div class="quantity-row">

            <button
              type="button"
              onclick="changeQuantity('${product.id}', -1)"
            >
              −
            </button>

            <span
              id="qty-${product.id}"
            >
              1
            </span>

            <button
              type="button"
              onclick="changeQuantity('${product.id}', 1)"
            >
              +
            </button>

          </div>

          <button
            type="button"
            class="add-cart-btn"
            onclick="addToCart('${product.id}')"
          >
            🛒 Cart-ലേക്ക് ചേർക്കുക
          </button>

        </div>

      </div>

    </div>

  `;

}


// =====================================================
// IMAGE ERROR
// =====================================================

function handleImageError(
  imageElement,
  category
) {

  if (
    imageElement.dataset.fallbackUsed
  ) {

    return;

  }

  imageElement.dataset.fallbackUsed =
    "true";

  imageElement.src =
    categoryImages[
      category
    ] ||
    categoryImages.Grocery;

}


// =====================================================
// CUSTOM VEGETABLE UNIT
// =====================================================

function handleUnitChange(
  productId
) {

  const select =
    document.getElementById(
      `unit-${productId}`
    );

  const custom =
    document.getElementById(
      `customUnit-${productId}`
    );

  if (!select || !custom) {
    return;
  }

  if (
    select.value ===
    "custom"
  ) {

    custom.style.display =
      "block";

    custom.focus();

  } else {

    custom.style.display =
      "none";

    custom.value = "";

  }

}


// =====================================================
// QUANTITY
// =====================================================

function changeQuantity(
  productId,
  change
) {

  const element =
    document.getElementById(
      `qty-${productId}`
    );

  if (!element) {
    return;
  }

  let quantity =
    parseInt(
      element.textContent
    ) || 1;

  quantity += change;

  if (
    quantity < 1
  ) {

    quantity = 1;

  }

  if (
    quantity > 99
  ) {

    quantity = 99;

  }

  element.textContent =
    quantity;

}


// =====================================================
// ADD TO CART
// =====================================================

async function addToCart(
  productId
) {

  try {

    const {
      data: product,
      error
    } =
      await supabaseClient
        .from("products")
        .select("*")
        .eq("id", productId)
        .eq("available", true)
        .single();

    if (
      error ||
      !product
    ) {

      console.error(
        "Add to cart error:",
        error
      );

      alert(
        "ഈ product ഇപ്പോൾ ലഭ്യമല്ല."
      );

      await loadProducts();

      return;

    }

    const quantityElement =
      document.getElementById(
        `qty-${productId}`
      );

    const quantity =
      parseInt(
        quantityElement?.textContent
      ) || 1;

    const unitSelect =
      document.getElementById(
        `unit-${productId}`
      );

    let unit =
      unitSelect?.value ||
      "1 piece";

    if (
      product.category ===
        "Vegetables" &&
      unit === "custom"
    ) {

      const customInput =
        document.getElementById(
          `customUnit-${productId}`
        );

      unit =
        customInput?.value
          ?.trim() || "";

      if (!unit) {

        alert(
          "അളവ് enter ചെയ്യുക."
        );

        customInput?.focus();

        return;

      }

    }

    const existing =
      cart.find(
        item =>
          String(
            item.product_id
          ) ===
            String(productId) &&
          item.unit === unit
      );

    if (existing) {

      existing.quantity +=
        quantity;

    } else {

      cart.push({

        product_id:
          Number(product.id),

        name:
          product.name,

        displayName:
          product.malayalam_name ||
          malayalamNames[
            product.name
          ] ||
          product.name,

        category:
          product.category,

        quantity:
          quantity,

        unit:
          unit

      });

    }

    saveCart();

    renderCart();

    alert(
      "✅ Cart-ലേക്ക് ചേർത്തു!"
    );

  } catch (error) {

    console.error(
      "Add to cart unexpected error:",
      error
    );

    alert(
      "Cart-ലേക്ക് ചേർക്കാൻ കഴിഞ്ഞില്ല."
    );

  }

}


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

  localStorage.setItem(
    "krishnaStoresCart",
    JSON.stringify(cart)
  );

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  const count =
    document.getElementById(
      "cartCount"
    );

  if (!container) {
    return;
  }

  const totalQuantity =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 0
        ),
      0
    );

  if (count) {

    count.textContent =
      totalQuantity;

  }

  if (
    cart.length === 0
  ) {

    container.innerHTML =
      "<p>Cart ശൂന്യമാണ്.</p>";

    return;

  }

  container.innerHTML =
    cart
      .map(
        (
          item,
          index
        ) => `

          <div class="cart-item">

            <div>

              <strong>
                ${escapeHTML(
                  item.displayName
                )}
              </strong>

              <div>
                ${escapeHTML(
                  item.unit
                )}
              </div>

              <div>
                Quantity:
                ${escapeHTML(
                  String(
                    item.quantity
                  )
                )}
              </div>

            </div>

            <div>

              <button
                type="button"
                onclick="removeFromCart(${index})"
              >
                🗑️
              </button>

            </div>

          </div>

        `
      )
      .join("");

}


// =====================================================
// REMOVE CART ITEM
// =====================================================

function removeFromCart(
  index
) {

  cart.splice(
    index,
    1
  );

  saveCart();

  renderCart();

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(
  category,
  button
) {

  const cards =
    document.querySelectorAll(
      ".product-card"
    );

  cards.forEach(
    card => {

      const cardCategory =
        card.dataset.category;

      if (
        category === "all" ||
        category === "All" ||
        cardCategory ===
          category
      ) {

        card.style.display =
          "";

      } else {

        card.style.display =
          "none";

      }

    }
  );

  document
    .querySelectorAll(
      ".category-btn"
    )
    .forEach(
      btn =>
        btn.classList.remove(
          "active"
        )
    );

  if (button) {

    button.classList.add(
      "active"
    );

  }

}


// =====================================================
// DATE
// =====================================================

function setupDate() {

  const dateInput =
    document.getElementById(
      "pickupDate"
    );

  if (!dateInput) {
    return;
  }

  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );

  dateInput.min =
    `${year}-${month}-${day}`;

}


// =====================================================
// PLACE ORDER
// =====================================================

async function placeOrder() {

  await submitOrder();

}


// =====================================================
// SUBMIT ORDER
// =====================================================

async function submitOrder() {

  if (
    cart.length === 0
  ) {

    alert(
      "ആദ്യം products cart-ലേക്ക് ചേർക്കുക."
    );

    return;

  }

  const customerName =
    document
      .getElementById(
        "customerName"
      )
      ?.value
      ?.trim();

  const customerPhone =
    document
      .getElementById(
        "customerPhone"
      )
      ?.value
      ?.trim();

  const pickupDate =
    document
      .getElementById(
        "pickupDate"
      )
      ?.value;

  const pickupTime =
    document
      .getElementById(
        "pickupTime"
      )
      ?.value;

  if (!customerName) {

    alert(
      "പേര് enter ചെയ്യുക."
    );

    return;

  }

  if (!customerPhone) {

    alert(
      "Phone number enter ചെയ്യുക."
    );

    return;

  }

  if (!pickupDate) {

    alert(
      "Pickup date തിരഞ്ഞെടുക്കുക."
    );

    return;

  }

  if (!pickupTime) {

    alert(
      "Pickup time തിരഞ്ഞെടുക്കുക."
    );

    return;

  }


  // ---------------------------------------------------
  // ORDER NUMBER
  // ---------------------------------------------------

  const orderNumber =
    "KS-" +
    Date.now()
      .toString()
      .slice(-6);


  // ---------------------------------------------------
  // VERIFY PRODUCTS
  // ---------------------------------------------------

  const productIds =
    cart.map(
      item =>
        Number(
          item.product_id
        )
    );

  const {
    data: currentProducts,
    error: productError
  } =
    await supabaseClient
      .from("products")
      .select(
        "id,name,available"
      )
      .in(
        "id",
        productIds
      );

  if (productError) {

    console.error(
      "Product verification error:",
      productError
    );

    alert(
      "Products verify ചെയ്യാൻ കഴിഞ്ഞില്ല."
    );

    return;

  }

  for (
    const item of cart
  ) {

    const product =
      currentProducts.find(
        p =>
          Number(p.id) ===
          Number(
            item.product_id
          )
      );

    if (
      !product ||
      !product.available
    ) {

      alert(
        `${item.displayName} ഇപ്പോൾ ലഭ്യമല്ല.`
      );

      await loadProducts();

      return;

    }

  }


  // ---------------------------------------------------
  // RPC ITEMS
  // ---------------------------------------------------

  const items =
    cart.map(
      item => ({

        product_id:
          Number(
            item.product_id
          ),

        product_name:
          item.displayName,

        quantity:
          Number(
            item.quantity
          ),

        unit:
          item.unit

      })
    );


  // ---------------------------------------------------
  // CREATE ORDER
  // ---------------------------------------------------

  console.log(
    "Creating order through RPC..."
  );

  const {
    data: orderId,
    error: orderError
  } =
    await supabaseClient
      .rpc(
        "create_krishna_order",
        {

          p_order_number:
            orderNumber,

          p_customer_name:
            customerName,

          p_customer_phone:
            customerPhone,

          p_pickup_date:
            pickupDate,

          p_pickup_time:
            pickupTime,

          p_items:
            items

        }
      );

  if (orderError) {

    console.error(
      "Order creation error:",
      orderError
    );

    alert(
      "Order place ചെയ്യാൻ കഴിഞ്ഞില്ല:\n" +
      orderError.message
    );

    return;

  }

  if (!orderId) {

    console.error(
      "RPC returned no order ID"
    );

    alert(
      "Order create ചെയ്യാൻ കഴിഞ്ഞില്ല."
    );

    return;

  }

  console.log(
    "Order created successfully:",
    orderId
  );


  // ---------------------------------------------------
  // WHATSAPP MESSAGE
  // ---------------------------------------------------

  const message =
    buildWhatsAppMessage(
      orderNumber,
      customerName,
      customerPhone,
      pickupDate,
      pickupTime
    );


  // ---------------------------------------------------
  // CLEAR CART AFTER SUCCESS
  // ---------------------------------------------------

  cart = [];

  saveCart();

  renderCart();


  // ---------------------------------------------------
  // CONFIRMATION
  // ---------------------------------------------------

  showConfirmation(
    orderNumber
  );


  // ---------------------------------------------------
  // WHATSAPP
  // ---------------------------------------------------

  openWhatsApp(
    message
  );

}


// =====================================================
// WHATSAPP MESSAGE
// =====================================================

function buildWhatsAppMessage(
  orderNumber,
  customerName,
  customerPhone,
  pickupDate,
  pickupTime
) {

  let message =
`🛒 *Krishna Stores - Pre-Booking*

🧾 Order No: ${orderNumber}

👤 Name: ${customerName}
📱 Phone: ${customerPhone}

📅 Pickup Date: ${pickupDate}
⏰ Pickup Time: ${pickupTime}

*Items:*`;

  cart.forEach(
    item => {

      message +=
        `\n• ${item.displayName} - ${item.quantity} × ${item.unit}`;

    }
  );

  message +=
`

💰 Payment: Cash at pickup

🏪 Pickup only
🚫 No home delivery`;

  return message;

}


// =====================================================
// OPEN WHATSAPP
// =====================================================

function openWhatsApp(
  message
) {

  const number =
    WHATSAPP_NUMBERS[0];

  const url =
    "https://wa.me/" +
    number +
    "?text=" +
    encodeURIComponent(
      message
    );

  window.open(
    url,
    "_blank"
  );

}


// =====================================================
// CONFIRMATION
// =====================================================

function showConfirmation(
  orderNumber
) {

  const message =
    document.getElementById(
      "message"
    );

  if (!message) {
    return;
  }

  message.innerHTML = `

    <div
      style="
        padding:20px;
        border-radius:14px;
        background:#e8f5e9;
        color:#1b5e20;
        margin-top:15px;
      "
    >

      <h3>
        ✅ Order Confirmed!
      </h3>

      <p>
        നിങ്ങളുടെ Order Number:
      </p>

      <strong
        style="font-size:22px;"
      >
        ${escapeHTML(
          orderNumber
        )}
      </strong>

      <p>
        Pickup സമയത്ത് കടയിൽ നിന്ന് order വാങ്ങാം.
      </p>

    </div>

  `;

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}
```
