// =====================================================
// KRISHNA STORES - OWNER DASHBOARD
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

const PRODUCT_IMAGE_BUCKET = "product-images";

let products = [];
let editingProduct = null;


// =====================================================
// MALAYALAM PRODUCT NAMES
// =====================================================

const malayalamNames = {

  "Tomato": "തക്കാളി",
  "Potato": "ഉരുളക്കിഴങ്ങ്",
  "Onion": "സവാള",
  "Small Onion": "ചെറിയ ഉള്ളി",
  "Carrot": "കാരറ്റ്",
  "Beetroot": "ബീറ്റ്റൂട്ട്",
  "Cabbage": "കാബേജ്",
  "Cauliflower": "കോളിഫ്ലവർ",
  "Cucumber": "വെള്ളരിക്ക",
  "Green Beans": "പയർ",
  "Ladies Finger": "വെണ്ടയ്ക്ക",
  "Green Chilli": "പച്ചമുളക്",
  "Bitter Gourd": "പാവയ്ക്ക",
  "Snake Gourd": "പടവലങ്ങ",
  "Ash Gourd": "കുമ്പളങ്ങ",
  "Pumpkin": "മത്തങ്ങ",
  "Ivy Gourd": "കോവയ്ക്ക",
  "Drumstick": "മുരിങ്ങക്കായ",
  "Raw Banana": "പച്ചക്കായ",
  "Plantain": "ഏത്തക്ക",
  "Tapioca": "കപ്പ",
  "Elephant Yam": "ചേന",
  "Ginger": "ഇഞ്ചി",
  "Garlic": "വെളുത്തുള്ളി",
  "Capsicum": "കാപ്സിക്കം",
  "Raw Mango": "പച്ചമാങ്ങ",
  "Green Peas": "പച്ചപ്പട്ടാണി",
  "Red Amaranth": "ചുവന്ന ചീര",
  "Banana Flower": "വാഴപ്പൂ",
  "Coconut": "തേങ്ങ",

  "Toor Parippu": "തുവരപ്പരിപ്പ്",
  "Cherupayar Parippu": "ചെറുപയർ പരിപ്പ്",
  "Uzhunnu Parippu": "ഉഴുന്ന് പരിപ്പ്",
  "Kadala Parippu": "കടല പരിപ്പ്",
  "Masoor Parippu": "മസൂർ പരിപ്പ്",

  "Sugar": "പഞ്ചസാര",
  "Wheat Flour": "ഗോതമ്പ് പൊടി",
  "Atta": "ആട്ട",
  "Puttu Podi": "പുട്ടുപൊടി",
  "Idiyappam Podi": "ഇടിയപ്പം പൊടി",
  "Pathiri Podi": "പത്തിരിപ്പൊടി",
  "Rava": "റവ",
  "Maida": "മൈദ",

  "Coconut Oil": "വെളിച്ചെണ്ണ",
  "Sunflower Oil": "സൺഫ്ലവർ ഓയിൽ",
  "Gingelly Oil": "എള്ളെണ്ണ",
  "Groundnut Oil": "നിലക്കടല എണ്ണ",
  "Mustard Oil": "കടുകെണ്ണ",

  "Chilli Powder": "മുളകുപൊടി",
  "Coriander Powder": "മല്ലിപ്പൊടി",
  "Turmeric Powder": "മഞ്ഞൾപ്പൊടി",
  "Black Pepper": "കുരുമുളക്",
  "Cumin": "ജീരകം",
  "Mustard Seeds": "കടുക്",
  "Fenugreek": "ഉലുവ",
  "Garam Masala": "ഗരം മസാല",
  "Chicken Masala": "ചിക്കൻ മസാല",
  "Meat Masala": "മീറ്റ് മസാല",
  "Sambar Powder": "സാംബാർ പൊടി",
  "Rasam Powder": "രസം പൊടി"

};


// =====================================================
// CATEGORY FALLBACK IMAGES
// =====================================================

const categoryImages = {

  Vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",

  Grocery:
    "https://images.unsplash.com/photo-1601598851547-4302969d7d66?auto=format&fit=crop&w=500&q=80",

  Stationery:
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=80"

};


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    await checkSession();

  }
);


// =====================================================
// LOGIN
// =====================================================

async function login() {

  const email =
    document
      .getElementById("loginEmail")
      .value
      .trim();

  const password =
    document
      .getElementById("loginPassword")
      .value;

  if (!email || !password) {

    showLoginMessage(
      "Email and password enter ചെയ്യുക.",
      "error"
    );

    return;
  }

  showLoginMessage(
    "Login ചെയ്യുന്നു...",
    "success"
  );

  const {
    data,
    error
  } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {

    showLoginMessage(
      "Login failed: " + error.message,
      "error"
    );

    return;
  }

  const owner =
    await checkOwner(data.user);

  if (!owner) {

    await supabaseClient.auth.signOut();

    showLoginMessage(
      "ഈ account owner account അല്ല.",
      "error"
    );

    return;
  }

  showDashboard();

}


// =====================================================
// SESSION CHECK
// =====================================================

async function checkSession() {

  const {
    data: {
      session
    }
  } =
    await supabaseClient.auth.getSession();

  if (!session) {

    showLogin();

    return;
  }

  const owner =
    await checkOwner(session.user);

  if (!owner) {

    await supabaseClient.auth.signOut();

    showLogin();

    return;
  }

  showDashboard();

}


// =====================================================
// OWNER CHECK
// =====================================================

async function checkOwner(user) {

  if (!user) {
    return false;
  }

  const {
    data,
    error
  } =
    await supabaseClient
      .from("owners")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

  if (error) {

    console.error(
      "Owner check error:",
      error
    );

    return false;
  }

  return !!data;

}


// =====================================================
// SHOW LOGIN
// =====================================================

function showLogin() {

  document
    .getElementById("loginSection")
    .style.display = "block";

  document
    .getElementById("dashboard")
    .style.display = "none";

}


// =====================================================
// SHOW DASHBOARD
// =====================================================

async function showDashboard() {

  document
    .getElementById("loginSection")
    .style.display = "none";

  document
    .getElementById("dashboard")
    .style.display = "block";

  await loadProducts();

  await loadOrders();

}


// =====================================================
// LOAD PRODUCTS
// =====================================================

async function loadProducts() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("products")
      .select("*")
      .order("category", {
        ascending: true
      })
      .order("name", {
        ascending: true
      });

  if (error) {

    console.error(
      "Products error:",
      error
    );

    showProductMessage(
      "Products load ചെയ്യാൻ കഴിഞ്ഞില്ല.",
      "error"
    );

    return;
  }

  products = data || [];

  renderProducts();

}


// =====================================================
// RENDER PRODUCTS
// =====================================================

function renderProducts() {

  const container =
    document.getElementById(
      "productList"
    );

  const search =
    document
      .getElementById(
        "productSearch"
      )
      .value
      .trim()
      .toLowerCase();

  const filter =
    document
      .getElementById(
        "productFilter"
      )
      .value;

  let filtered =
    products.filter(product => {

      const name =
        (
          product.name || ""
        ).toLowerCase();

      const ml =
        (
          product.malayalam_name || ""
        ).toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        ml.includes(search);

      const matchesCategory =
        filter === "all" ||
        product.category === filter;

      return (
        matchesSearch &&
        matchesCategory
      );

    });


  if (filtered.length === 0) {

    container.innerHTML =
      "<p>No products found.</p>";

    return;
  }


  container.innerHTML =
    filtered
      .map(
        product =>
          createProductHTML(product)
      )
      .join("");

}


// =====================================================
// PRODUCT HTML
// =====================================================

function createProductHTML(product) {

  const image =
    getProductImage(product);

  const displayName =
    product.malayalam_name ||
    malayalamNames[
      product.name
    ] ||
    product.name;

  const availabilityClass =
    product.available
      ? "available"
      : "unavailable";

  const availabilityText =
    product.available
      ? "✅ Available"
      : "❌ Unavailable";

  const units =
    Array.isArray(
      product.unit_options
    )
      ? product.unit_options.join(", ")
      : "";


  return `

    <div class="product-card">

      <img
        class="product-image"
        src="${escapeHTML(image)}"
        alt="${escapeHTML(displayName)}"
        onerror="this.src='${categoryImages[product.category] || categoryImages.Grocery}'"
      >

      <div class="product-info">

        <h3>
          ${escapeHTML(displayName)}
        </h3>

        <p>
          ${escapeHTML(product.name || "")}
        </p>

        <p>
          Category:
          ${escapeHTML(product.category || "")}
        </p>

        <p>
          Unit:
          ${escapeHTML(product.unit_type || "piece")}
        </p>

        ${
          units
            ? `<p>Options: ${escapeHTML(units)}</p>`
            : ""
        }

        <p class="${availabilityClass}">
          ${availabilityText}
        </p>

        <div class="actions">

          <button
            class="${
              product.available
                ? "warning-btn"
                : "success-btn"
            }"
            onclick="toggleAvailability('${product.id}', ${!product.available})"
          >
            ${
              product.available
                ? "❌ Make Unavailable"
                : "✅ Make Available"
            }
          </button>

          <button
            class="secondary-btn"
            onclick="editProduct('${product.id}')"
          >
            ✏️ Edit
          </button>

          <button
            class="secondary-btn"
            onclick="triggerImageUpload('${product.id}')"
          >
            🖼️ Upload Image
          </button>

          <button
            class="danger-btn"
            onclick="deleteProduct('${product.id}')"
          >
            🗑️ Delete
          </button>

          <input
            type="file"
            id="imageInput-${product.id}"
            accept="image/jpeg,image/png,image/webp"
            style="display:none"
            onchange="uploadProductImage('${product.id}', event)"
          >

        </div>

      </div>

    </div>

  `;

}


// =====================================================
// GET PRODUCT IMAGE
// =====================================================

function getProductImage(product) {

  if (
    product &&
    typeof product.image_url === "string" &&
    product.image_url.trim() !== ""
  ) {

    return product.image_url.trim();

  }

  return (
    categoryImages[
      product?.category
    ] ||
    categoryImages.Grocery
  );

}


// =====================================================
// TRIGGER IMAGE UPLOAD
// =====================================================

function triggerImageUpload(productId) {

  const input =
    document.getElementById(
      `imageInput-${productId}`
    );

  if (input) {
    input.click();
  }

}


// =====================================================
// UPLOAD PRODUCT IMAGE
// =====================================================

async function uploadProductImage(
  productId,
  event
) {

  const file =
    event.target.files?.[0];

  if (!file) {
    return;
  }


  if (
    ![
      "image/jpeg",
      "image/png",
      "image/webp"
    ].includes(file.type)
  ) {

    alert(
      "JPG, PNG or WEBP image മാത്രം upload ചെയ്യുക."
    );

    return;
  }


  if (file.size > 5 * 1024 * 1024) {

    alert(
      "Image size 5MB-ൽ താഴെയായിരിക്കണം."
    );

    return;
  }


  const {
    data: {
      user
    }
  } =
    await supabaseClient.auth.getUser();


  if (!user) {

    alert(
      "Please login again."
    );

    return;
  }


  const extension =
    file.name
      .split(".")
      .pop()
      .toLowerCase();


  const filePath =
    `${user.id}/${productId}-${Date.now()}.${extension}`;


  const {
    error: uploadError
  } =
    await supabaseClient
      .storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(
        filePath,
        file,
        {
          upsert: false,
          contentType: file.type
        }
      );


  if (uploadError) {

    console.error(
      uploadError
    );

    alert(
      "Image upload failed: " +
      uploadError.message
    );

    return;
  }


  const {
    data: publicData
  } =
    supabaseClient
      .storage
      .from(PRODUCT_IMAGE_BUCKET)
      .getPublicUrl(filePath);


  const imageUrl =
    publicData.publicUrl;


  const {
    error: updateError
  } =
    await supabaseClient
      .from("products")
      .update({
        image_url: imageUrl
      })
      .eq("id", productId);


  if (updateError) {

    alert(
      "Image URL save ചെയ്യാൻ കഴിഞ്ഞില്ല: " +
      updateError.message
    );

    return;
  }


  alert(
    "✅ Product image uploaded!"
  );


  await loadProducts();

}


// =====================================================
// PREVIEW IMAGE IN FORM
// =====================================================

function previewImage(event) {

  const file =
    event.target.files?.[0];

  const preview =
    document.getElementById(
      "imagePreview"
    );

  if (!file) {

    preview.style.display = "none";

    return;
  }

  const reader =
    new FileReader();

  reader.onload =
    function(e) {

      preview.src =
        e.target.result;

      preview.style.display =
        "block";

    };

  reader.readAsDataURL(file);

}


// =====================================================
// ADD / UPDATE PRODUCT
// =====================================================

async function saveProduct() {

  const name =
    document
      .getElementById(
        "productName"
      )
      .value
      .trim();

  const malayalam =
    document
      .getElementById(
        "productMalayalam"
      )
      .value
      .trim();

  const category =
    document
      .getElementById(
        "productCategory"
      )
      .value;

  const unitType =
    document
      .getElementById(
        "unitType"
      )
      .value;

  const unitOptionsText =
    document
      .getElementById(
        "unitOptions"
      )
      .value
      .trim();

  const available =
    document
      .getElementById(
        "productAvailable"
      )
      .checked;


  if (!name) {

    showProductMessage(
      "Product name enter ചെയ്യുക.",
      "error"
    );

    return;
  }


  // Vegetables always use weight
  let finalUnitType =
    unitType;

  let finalUnitOptions =
    unitOptionsText
      ? unitOptionsText
          .split(",")
          .map(x => x.trim())
          .filter(Boolean)
      : [];


  if (category === "Vegetables") {

    finalUnitType =
      "weight";

    finalUnitOptions = [
      "100 g",
      "250 g",
      "500 g",
      "1 kg"
    ];

  }


  const productData = {

    name,

    malayalam_name:
      malayalam ||
      malayalamNames[name] ||
      null,

    category,

    unit_type:
      finalUnitType,

    unit_options:
      finalUnitOptions,

    available

  };


  const editId =
    document
      .getElementById(
        "editProductId"
      )
      .value;


  let result;


  if (editId) {

    result =
      await supabaseClient
        .from("products")
        .update(productData)
        .eq("id", editId);

  } else {

    result =
      await supabaseClient
        .from("products")
        .insert(productData);

  }


  if (result.error) {

    console.error(
      result.error
    );

    showProductMessage(
      "Product save failed: " +
      result.error.message,
      "error"
    );

    return;
  }


  const imageFile =
    document
      .getElementById(
        "productImage"
      )
      .files?.[0];


  if (imageFile) {

    let productId =
      editId;


    if (!productId) {

      const {
        data: newProduct
      } =
        await supabaseClient
          .from("products")
          .select("id")
          .eq("name", name)
          .single();

      if (newProduct) {
        productId =
          newProduct.id;
      }

    }


    if (productId) {

      await uploadImageFromForm(
        productId,
        imageFile
      );

    }

  }


  showProductMessage(
    editId
      ? "✅ Product updated!"
      : "✅ Product added!",
    "success"
  );


  cancelEdit();

  await loadProducts();

}


// =====================================================
// UPLOAD IMAGE FROM ADD/EDIT FORM
// =====================================================

async function uploadImageFromForm(
  productId,
  file
) {

  const {
    data: {
      user
    }
  } =
    await supabaseClient.auth.getUser();


  if (!user) {
    return;
  }


  const extension =
    file.name
      .split(".")
      .pop()
      .toLowerCase();


  const filePath =
    `${user.id}/${productId}-${Date.now()}.${extension}`;


  const {
    error
  } =
    await supabaseClient
      .storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(
        filePath,
        file,
        {
          upsert: false,
          contentType: file.type
        }
      );


  if (error) {

    console.error(
      "Image upload error:",
      error
    );

    return;
  }


  const {
    data
  } =
    supabaseClient
      .storage
      .from(PRODUCT_IMAGE_BUCKET)
      .getPublicUrl(filePath);


  await supabaseClient
    .from("products")
    .update({
      image_url:
        data.publicUrl
    })
    .eq("id", productId);

}


// =====================================================
// EDIT PRODUCT
// =====================================================

function editProduct(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) {
    return;
  }

  editingProduct =
    product;


  document
    .getElementById(
      "editProductId"
    )
    .value =
    product.id;


  document
    .getElementById(
      "productName"
    )
    .value =
    product.name || "";


  document
    .getElementById(
      "productMalayalam"
    )
    .value =
    product.malayalam_name ||
    malayalamNames[
      product.name
    ] ||
    "";


  document
    .getElementById(
      "productCategory"
    )
    .value =
    product.category ||
    "Grocery";


  document
    .getElementById(
      "unitType"
    )
    .value =
    product.unit_type ||
    "piece";


  document
    .getElementById(
      "unitOptions"
    )
    .value =
    Array.isArray(
      product.unit_options
    )
      ? product.unit_options.join(", ")
      : "";


  document
    .getElementById(
      "productAvailable"
    )
    .checked =
    product.available !== false;


  const preview =
    document.getElementById(
      "imagePreview"
    );


  if (product.image_url) {

    preview.src =
      product.image_url;

    preview.style.display =
      "block";

  } else {

    preview.style.display =
      "none";

  }


  document
    .getElementById(
      "formTitle"
    )
    .textContent =
    "✏️ Edit Product";


  document
    .getElementById(
      "saveProductButton"
    )
    .textContent =
    "Update Product";


  document
    .getElementById(
      "cancelEditButton"
    )
    .classList
    .remove("hidden");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// =====================================================
// CANCEL EDIT
// =====================================================

function cancelEdit() {

  editingProduct =
    null;


  document
    .getElementById(
      "editProductId"
    )
    .value =
    "";


  document
    .getElementById(
      "productName"
    )
    .value =
    "";


  document
    .getElementById(
      "productMalayalam"
    )
    .value =
    "";


  document
    .getElementById(
      "productCategory"
    )
    .value =
    "Vegetables";


  document
    .getElementById(
      "unitType"
    )
    .value =
    "weight";


  document
    .getElementById(
      "unitOptions"
    )
    .value =
    "100 g, 250 g, 500 g, 1 kg";


  document
    .getElementById(
      "productAvailable"
    )
    .checked =
    true;


  document
    .getElementById(
      "productImage"
    )
    .value =
    "";


  document
    .getElementById(
      "imagePreview"
    )
    .style
    .display =
    "none";


  document
    .getElementById(
      "formTitle"
    )
    .textContent =
    "➕ Add Product";


  document
    .getElementById(
      "saveProductButton"
    )
    .textContent =
    "Add Product";


  document
    .getElementById(
      "cancelEditButton"
    )
    .classList
    .add("hidden");

}


// =====================================================
// DELETE PRODUCT
// =====================================================

async function deleteProduct(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) {
    return;
  }


  const name =
    product.malayalam_name ||
    product.name;


  const confirmed =
    confirm(
      `"${name}" delete ചെയ്യണോ?`
    );


  if (!confirmed) {
    return;
  }


  const {
    error
  } =
    await supabaseClient
      .from("products")
      .delete()
      .eq("id", productId);


  if (error) {

    console.error(
      error
    );

    alert(
      "Delete failed: " +
      error.message +
      "\n\nഈ product പഴയ order-ൽ ഉപയോഗിച്ചിട്ടുണ്ടെങ്കിൽ delete ചെയ്യാൻ database restriction ഉണ്ടാകാം. അപ്പോൾ Availability OFF ചെയ്യുക."
    );

    return;
  }


  alert(
    "✅ Product deleted."
  );


  await loadProducts();

}


// =====================================================
// AVAILABILITY
// =====================================================

async function toggleAvailability(
  productId,
  newValue
) {

  const {
    error
  } =
    await supabaseClient
      .from("products")
      .update({
        available:
          newValue
      })
      .eq("id", productId);


  if (error) {

    alert(
      "Availability update failed: " +
      error.message
    );

    return;
  }


  await loadProducts();

}


// =====================================================
// LOAD ORDERS
// =====================================================

async function loadOrders() {

  const container =
    document.getElementById(
      "ordersList"
    );


  container.innerHTML =
    "<p>Loading orders...</p>";


  const {
    data: orders,
    error
  } =
    await supabaseClient
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false
      });


  if (error) {

    console.error(
      error
    );

    container.innerHTML =
      `<p style="color:red;">
        Orders load failed:
        ${escapeHTML(error.message)}
      </p>`;

    return;
  }


  if (!orders || orders.length === 0) {

    container.innerHTML =
      "<p>No orders yet.</p>";

    return;
  }


  const orderIds =
    orders.map(
      order => order.id
    );


  const {
    data: orderItems,
    error: itemsError
  } =
    await supabaseClient
      .from("order_items")
      .select("*")
      .in(
        "order_id",
        orderIds
      );


  if (itemsError) {

    console.error(
      itemsError
    );

  }


  container.innerHTML =
    orders
      .map(
        order =>
          createOrderHTML(
            order,
            orderItems || []
          )
      )
      .join("");

}


// =====================================================
// ORDER HTML
// =====================================================

function createOrderHTML(
  order,
  allItems
) {

  const items =
    allItems.filter(
      item =>
        item.order_id ===
        order.id
    );


  const status =
    order.status ||
    "Preparing";


  const itemsHTML =
    items.length
      ? items
          .map(item => {

            const name =
              item.product_name ||
              item.name ||
              "Product";

            const quantity =
              item.quantity ??
              1;

            const unit =
              item.unit ||
              "";

            return `
              <div>
                • ${escapeHTML(String(name))}
                — ${escapeHTML(String(quantity))}
                ${escapeHTML(String(unit))}
              </div>
            `;

          })
          .join("")
      : "<div>No items found</div>";


  return `

    <div class="order-card">

      <div class="order-header">

        <div class="order-number">

          🧾 Order:
          ${escapeHTML(
            String(
              order.order_number ||
              order.id
            )
          )}

        </div>

        <div class="status">

          ${escapeHTML(
            String(status)
          )}

        </div>

      </div>


      <div class="order-details">

        <strong>Customer:</strong>
        ${escapeHTML(
          String(
            order.customer_name ||
            ""
          )
        )}

        <br>

        <strong>Phone:</strong>
        ${escapeHTML(
          String(
            order.customer_phone ||
            ""
          )
        )}

        <br>

        <strong>Pickup Date:</strong>
        ${escapeHTML(
          String(
            order.pickup_date ||
            ""
          )
        )}

        <br>

        <strong>Pickup Time:</strong>
        ${escapeHTML(
          String(
            order.pickup_time ||
            ""
          )
        )}

      </div>


      <div class="order-items">

        <strong>🛒 Items</strong>

        <div style="margin-top:8px;">
          ${itemsHTML}
        </div>

      </div>


      <div class="status-buttons">

        <button
          class="warning-btn"
          onclick="changeOrderStatus('${order.id}', 'Preparing')"
        >
          🟡 Preparing
        </button>

        <button
          class="success-btn"
          onclick="changeOrderStatus('${order.id}', 'Ready')"
        >
          🟢 Ready
        </button>

        <button
          class="secondary-btn"
          onclick="changeOrderStatus('${order.id}', 'Completed')"
        >
          ✅ Completed
        </button>

      </div>

    </div>

  `;

}


// =====================================================
// CHANGE ORDER STATUS
// =====================================================

async function changeOrderStatus(
  orderId,
  status
) {

  const {
    error
  } =
    await supabaseClient
      .from("orders")
      .update({
        status
      })
      .eq("id", orderId);


  if (error) {

    alert(
      "Status update failed: " +
      error.message
    );

    return;
  }


  await loadOrders();

}


// =====================================================
// LOGOUT
// =====================================================

async function logout() {

  await supabaseClient.auth.signOut();

  showLogin();

}


// =====================================================
// LOGIN MESSAGE
// =====================================================

function showLoginMessage(
  message,
  type
) {

  const box =
    document.getElementById(
      "loginMessage"
    );

  box.textContent =
    message;

  box.className =
    "message " +
    type;

}


// =====================================================
// PRODUCT MESSAGE
// =====================================================

function showProductMessage(
  message,
  type
) {

  const box =
    document.getElementById(
      "productMessage"
    );

  box.textContent =
    message;

  box.className =
    "message " +
    type;

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

  return String(value ?? "")
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