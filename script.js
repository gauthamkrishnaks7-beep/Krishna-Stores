/* =========================================================
   KRISHNA STORES - CUSTOMER SCRIPT
   English + Malayalam
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL = "https://bbmyoedamaubumrgpmwj.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_YxgTwZJdKcOreql6A5Un3Q_ErxOJuuV";

let supabaseClient = null;

if (
    window.supabase &&
    SUPABASE_URL &&
    SUPABASE_KEY
) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
}


/* =========================================================
   WHATSAPP NUMBERS
   ========================================================= */

const WHATSAPP_NUMBERS = [
    "919847266521",
    "919744051327"
];


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let products = [];
let cart = [];
let currentCategory = "all";
let currentSearch = "";
let lastOrder = null;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    setMinimumDate();

    updateCartCount();

    renderCart();

    hideSection("checkoutSection");

    hideSection("confirmationSection");

    loadProducts();
});


/* =========================================================
   DATE
   ========================================================= */

function setMinimumDate() {

    const dateInput =
        document.getElementById("pickupDate");

    if (!dateInput) return;

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;
}


/* =========================================================
   LOAD PRODUCTS
   ========================================================= */

async function loadProducts() {

    const loading =
        document.getElementById("loadingProducts");

    const errorBox =
        document.getElementById("productError");


    if (!supabaseClient) {

        console.error(
            "Supabase client was not created."
        );

        if (loading) {

            loading.textContent =
                "Supabase connection failed. / Supabase ബന്ധിപ്പിക്കാൻ കഴിഞ്ഞില്ല.";
        }

        return;
    }


    try {

        const result =
            await supabaseClient
                .from("products")
                .select("*")
                .eq("available", true)
                .order("created_at", {
                    ascending: false
                });


        const data =
            result.data;

        const dbError =
            result.error;


        if (dbError) {
            throw dbError;
        }


        products =
            Array.isArray(data)
                ? data
                : [];


        if (loading) {

            loading.classList.add(
                "hidden"
            );
        }


        if (errorBox) {

            errorBox.classList.add(
                "hidden"
            );
        }


        renderProducts();


    } catch (errorObject) {

        console.error(
            "Product loading error:",
            errorObject
        );


        if (loading) {

            loading.classList.add(
                "hidden"
            );
        }


        if (errorBox) {

            errorBox.classList.remove(
                "hidden"
            );


            errorBox.innerHTML = `
                <strong>
                    Unable to load products.
                </strong>

                <br>

                സാധനങ്ങൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല.

                <br><br>

                Please check your Supabase
                connection and products table.
            `;
        }
    }
}


/* =========================================================
   PRODUCT FILTER
   ========================================================= */

function filterCategory(category) {

    currentCategory =
        String(category || "all");


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );


            const buttonCategory =
                String(
                    button.dataset.category || ""
                ).toLowerCase();


            if (
                buttonCategory ===
                currentCategory.toLowerCase()
            ) {

                button.classList.add(
                    "active"
                );
            }
        });


    renderProducts();
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProducts(value) {

    currentSearch =
        String(value || "")
            .toLowerCase()
            .trim();


    renderProducts();
}


/* =========================================================
   PRODUCT RENDER
   ========================================================= */

function renderProducts() {

    const grid =
        document.getElementById(
            "productsGrid"
        );


    if (!grid) return;


    let filtered =
        [...products];


    /* CATEGORY */

    if (
        currentCategory !== "all"
    ) {

        filtered =
            filtered.filter(product => {

                return String(
                    product.category || ""
                )
                    .toLowerCase()
                    ===
                    currentCategory
                        .toLowerCase();
            });
    }


    /* SEARCH */

    if (currentSearch) {

        filtered =
            filtered.filter(product => {

                const english =
                    String(
                        product.name || ""
                    )
                        .toLowerCase();


                const malayalam =
                    String(
                        product.malayalam_name ||
                        ""
                    )
                        .toLowerCase();


                return (
                    english.includes(
                        currentSearch
                    ) ||
                    malayalam.includes(
                        currentSearch
                    )
                );
            });
    }


    /* EMPTY */

    if (
        filtered.length === 0
    ) {

        grid.innerHTML = `
            <div class="empty-box product-empty">

                <h3>
                    No products found
                </h3>

                <p>
                    സാധനങ്ങൾ കണ്ടെത്താനായില്ല.
                </p>

            </div>
        `;

        return;
    }


    /* PRODUCTS */

    grid.innerHTML =
        filtered.map(product => {

            const cartItem =
                cart.find(
                    item =>
                        String(item.id) ===
                        String(product.id)
                );


            const quantity =
                cartItem
                    ? Number(
                        cartItem.quantity || 0
                    )
                    : 0;


            const image =
                product.image_url ||
                getCategoryImage(
                    product.category
                );


            const safeImage =
                escapeAttribute(image);


            const fallbackImage =
                escapeAttribute(
                    getCategoryImage(
                        product.category
                    )
                );


            const malayalamName =
                product.malayalam_name ||
                getMalayalamProductName(
                    product.name
                );


            return `
                <article
                    class="product-card"
                >

                    <div
                        class="product-image-wrapper"
                    >

                        <img
                            src="${safeImage}"
                            alt="${escapeAttribute(
                                product.name || ""
                            )}"
                            class="product-image"
                            onerror="
                                this.onerror=null;
                                this.src='${fallbackImage}';
                            "
                        >

                    </div>


                    <div
                        class="product-content"
                    >

                        <div
                            class="category-label"
                        >
                            ${escapeHTML(
                                product.category || ""
                            )}
                        </div>


                        <h3>
                            ${escapeHTML(
                                product.name ||
                                "Product"
                            )}
                        </h3>


                        <div
                            class="malayalam-product-name"
                        >
                            ${escapeHTML(
                                malayalamName
                            )}
                        </div>


                        ${renderUnitOptions(
                            product
                        )}


                        <div
                            class="product-bottom"
                        >

                            ${
                                quantity > 0
                                ?
                                `
                                <button
                                    type="button"
                                    class="add-btn added"
                                    onclick="
                                        addToCart(
                                            '${escapeAttribute(product.id)}',
                                            this
                                        );
                                        return false;
                                    "
                                >
                                    ✓ Added / ചേർത്തു
                                </button>
                                `
                                :
                                `
                                <button
                                    type="button"
                                    class="add-btn"
                                    onclick="
                                        addToCart(
                                            '${escapeAttribute(product.id)}',
                                            this
                                        );
                                        return false;
                                    "
                                >
                                    Add to Cart / കാർട്ടിൽ ചേർക്കുക
                                </button>
                                `
                            }

                        </div>


                        ${
                            quantity > 0
                            ?
                            `
                            <div
                                class="selected-info"
                            >

                                ✓ ${quantity}
                                item(s) in cart

                                <br>

                                ✓ ${quantity}
                                സാധനം കാർട്ടിലുണ്ട്

                            </div>
                            `
                            :
                            ""
                        }

                    </div>

                </article>
            `;

        }).join("");
}


/* =========================================================
   UNIT OPTIONS
   ========================================================= */

function renderUnitOptions(product) {

    let options =
        product.unit_options;


    if (!options) {
        return "";
    }


    if (
        typeof options ===
        "string"
    ) {

        try {

            options =
                JSON.parse(options);

        } catch {

            options =
                options
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                    .filter(Boolean);
        }
    }


    if (
        !Array.isArray(options) ||
        options.length === 0
    ) {

        return "";
    }


    return `
        <select
            class="unit-select"
            id="unit-${escapeAttribute(
                product.id
            )}"
        >

            ${options
                .map(option => {

                    return `
                        <option
                            value="${escapeAttribute(
                                option
                            )}"
                        >
                            ${escapeHTML(
                                option
                            )}
                        </option>
                    `;

                })
                .join("")}

        </select>
    `;
}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(
    productId,
    button
) {

    /*
       IMPORTANT:

       Do NOT navigate to cart.
       Do NOT scroll to bottom.
       Do NOT use scrollIntoView().
       Do NOT change window.location.
    */


    const product =
        products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return false;
    }


    /* SAVE CURRENT SCROLL */

    const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;


    /* UNIT */

    const unitSelect =
        document.getElementById(
            `unit-${product.id}`
        );


    const selectedUnit =
        unitSelect
            ? unitSelect.value
            : "";


    /* EXISTING CART ITEM */

    let existing =
        cart.find(
            item =>
                String(item.id) ===
                String(productId)
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 0) +
            1;


        if (selectedUnit) {

            existing.unit =
                selectedUnit;
        }

    } else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            malayalam_name:
                product.malayalam_name ||
                getMalayalamProductName(
                    product.name
                ),

            category:
                product.category,

            unit_type:
                product.unit_type || "",

            unit:
                selectedUnit,

            image_url:
                product.image_url || "",

            quantity:
                1,

            price:
                Number(
                    product.price || 0
                )
        });
    }


    /* SAVE */

    saveCart();

    updateCartCount();


    /*
       IMMEDIATELY SHOW SUCCESS
    */

    if (button) {

        button.type =
            "button";


        button.classList.add(
            "added"
        );


        button.textContent =
            "✓ Added / ചേർത്തു";


        button.disabled =
            false;


        button.setAttribute(
            "aria-label",
            "Added to cart / കാർട്ടിൽ ചേർത്തു"
        );
    }


    /*
       Re-render cards while
       preserving exact scroll.
    */

    renderProductsWithoutChangingScroll(
        scrollPosition
    );


    return false;
}


/* =========================================================
   SAFE PRODUCT RENDER
   ========================================================= */

function renderProductsWithoutChangingScroll(
    savedScroll
) {

    const currentScroll =
        typeof savedScroll === "number"
            ? savedScroll
            :
            (
                window.scrollY ||
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                0
            );


    const activeElement =
        document.activeElement;


    renderProducts();


    /*
       Restore scroll immediately
    */

    window.scrollTo(
        0,
        currentScroll
    );


    /*
       Restore focus without scrolling
    */

    if (
        activeElement &&
        document.body.contains(
            activeElement
        )
    ) {

        try {

            activeElement.focus({
                preventScroll: true
            });

        } catch {

            try {
                activeElement.focus();
            } catch {}
        }
    }


    /*
       Extra protection against
       browser layout movement.
    */

    requestAnimationFrame(() => {

        window.scrollTo(
            0,
            currentScroll
        );

    });
}


/* =========================================================
   CART STORAGE
   ========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            "krishnaStoresCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Could not save cart:",
            error
        );
    }
}


/* =========================================================
   LOAD CART
   ========================================================= */

function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                "krishnaStoresCart"
            );


        cart =
            saved
                ? JSON.parse(saved)
                : [];


        if (
            !Array.isArray(cart)
        ) {

            cart = [];
        }


    } catch (error) {

        console.error(
            "Could not load cart:",
            error
        );

        cart = [];
    }
}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    const element =
        document.getElementById(
            "cartCount"
        );


    if (element) {

        element.textContent =
            count;
    }
}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    const empty =
        document.getElementById(
            "emptyCart"
        );


    const summary =
        document.getElementById(
            "cartSummary"
        );


    if (!container) {
        return;
    }


    /* EMPTY */

    if (
        cart.length === 0
    ) {

        container.innerHTML =
            "";


        if (empty) {

            empty.classList.remove(
                "hidden"
            );
        }


        if (summary) {

            summary.classList.add(
                "hidden"
            );
        }


        return;
    }


    /* SHOW CART */

    if (empty) {

        empty.classList.add(
            "hidden"
        );
    }


    if (summary) {

        summary.classList.remove(
            "hidden"
        );
    }


    /* ITEMS */

    container.innerHTML =
        cart.map(
            (item, index) => {

                const price =
                    Number(
                        item.price || 0
                    );


                const quantity =
                    Number(
                        item.quantity || 0
                    );


                const total =
                    price * quantity;


                return `
                    <div
                        class="cart-item"
                    >

                        <div
                            class="cart-item-info"
                        >

                            <strong>
                                ${escapeHTML(
                                    item.name || ""
                                )}
                            </strong>


                            <span
                                class="malayalam-small"
                            >
                                ${escapeHTML(
                                    item.malayalam_name ||
                                    ""
                                )}
                            </span>


                            ${
                                item.unit
                                ?
                                `
                                <span>
                                    ${escapeHTML(
                                        item.unit
                                    )}
                                </span>
                                `
                                :
                                ""
                            }

                        </div>


                        <div
                            class="quantity-control"
                        >

                            <button
                                type="button"
                                onclick="
                                    changeQuantity(
                                        ${index},
                                        -1
                                    )
                                "
                            >
                                −
                            </button>


                            <span>
                                ${quantity}
                            </span>


                            <button
                                type="button"
                                onclick="
                                    changeQuantity(
                                        ${index},
                                        1
                                    )
                                "
                            >
                                +
                            </button>

                        </div>


                        ${
                            price > 0
                            ?
                            `
                            <strong>
                                ₹${total.toFixed(2)}
                            </strong>
                            `
                            :
                            ""
                        }


                        <button
                            type="button"
                            class="remove-btn"
                            onclick="
                                removeFromCart(
                                    ${index}
                                )
                            "
                        >
                            Remove / നീക്കം
                        </button>

                    </div>
                `;
            }
        ).join("");


    /* TOTAL ITEMS */

    const itemCount =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    /* TOTAL PRICE */

    const totalAmount =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    const totalItems =
        document.getElementById(
            "cartTotalItems"
        );


    const totalAmountElement =
        document.getElementById(
            "cartTotalAmount"
        );


    if (totalItems) {

        totalItems.textContent =
            itemCount;
    }


    if (totalAmountElement) {

        totalAmountElement.textContent =
            `₹${totalAmount.toFixed(2)}`;
    }
}


/* =========================================================
   QUANTITY
   ========================================================= */

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) {
        return;
    }


    const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;


    cart[index].quantity =
        Number(
            cart[index].quantity || 0
        ) +
        Number(amount || 0);


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );
    }


    saveCart();

    updateCartCount();

    renderCart();


    renderProductsWithoutChangingScroll(
        scrollPosition
    );
}


/* =========================================================
   REMOVE
   ========================================================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCartCount();

    renderCart();


    renderProductsWithoutChangingScroll(
        scrollPosition
    );
}


/* =========================================================
   OPEN CART
   ========================================================= */

function openCart() {

    const section =
        document.getElementById(
            "cartSection"
        );


    if (!section) {
        return;
    }


    renderCart();


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {

    if (
        cart.length === 0
    ) {

        alert(
            "Your cart is empty.\nനിങ്ങളുടെ കാർട്ട് കാലിയാണ്."
        );

        return;
    }


    const section =
        document.getElementById(
            "checkoutSection"
        );


    if (!section) {
        return;
    }


    section.classList.remove(
        "hidden"
    );


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   PLACE ORDER
   ========================================================= */

async function placeOrder(
    event
) {

    if (event) {

        event.preventDefault();
    }


    if (
        cart.length === 0
    ) {

        alert(
            "Your cart is empty.\nനിങ്ങളുടെ കാർട്ട് കാലിയാണ്."
        );

        return false;
    }


    const nameInput =
        document.getElementById(
            "customerName"
        );


    const phoneInput =
        document.getElementById(
            "customerPhone"
        );


    const dateInput =
        document.getElementById(
            "pickupDate"
        );


    const timeInput =
        document.getElementById(
            "pickupTime"
        );


    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    const phone =
        phoneInput
            ? phoneInput.value.trim()
            : "";


    const pickupDate =
        dateInput
            ? dateInput.value
            : "";


    const pickupTime =
        timeInput
            ? timeInput.value
            : "";


    /* VALIDATION */

    if (
        !name ||
        !phone ||
        !pickupDate ||
        !pickupTime
    ) {

        alert(
            "Please fill all details.\nദയവായി എല്ലാ വിവരങ്ങളും നൽകുക."
        );

        return false;
    }


    if (
        !/^[0-9]{10}$/.test(phone)
    ) {

        alert(
            "Please enter a valid 10-digit phone number.\n10 അക്കമുള്ള ശരിയായ ഫോൺ നമ്പർ നൽകുക."
        );

        return false;
    }


    const button =
        document.getElementById(
            "placeOrderBtn"
        );


    if (button) {

        button.disabled =
            true;


        button.textContent =
            "Placing Order... / ഓർഡർ നൽകുന്നു...";
    }


    /* ORDER NUMBER */

    const orderNumber =
        generateOrderNumber();


    /* TOTAL */

    const totalAmount =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 0
                    )
                );

            },
            0
        );


    /* ITEMS */

    const orderItems =
        cart.map(item => ({

            id:
                item.id,

            name:
                item.name,

            malayalam_name:
                item.malayalam_name,

            category:
                item.category,

            unit:
                item.unit,

            quantity:
                Number(
                    item.quantity || 0
                ),

            price:
                Number(
                    item.price || 0
                )

        }));


    /* ORDER DATA */

    const orderData = {

        order_number:
            orderNumber,

        customer_name:
            name,

        customer_phone:
            phone,

        pickup_date:
            pickupDate,

        pickup_time:
            pickupTime,

        items:
            orderItems,

        total_amount:
            totalAmount,

        status:
            "Preparing"
    };


    try {

        if (!supabaseClient) {

            throw new Error(
                "Supabase is not configured."
            );
        }


        const result =
            await supabaseClient
                .from("orders")
                .insert([
                    orderData
                ])
                .select()
                .single();


        const data =
            result.data;


        const error =
            result.error;


        if (error) {

            throw error;
        }


        lastOrder =
            data ||
            orderData;


        /*
           Show confirmation
        */

        showConfirmation(
            lastOrder
        );


    } catch (errorObject) {

        console.error(
            "Order error:",
            errorObject
        );


        alert(
            "Unable to place your order.\n" +
            "ഓർഡർ നൽകാൻ കഴിഞ്ഞില്ല.\n\n" +
            "Please try again.\nവീണ്ടും ശ്രമിക്കുക."
        );


        if (button) {

            button.disabled =
                false;


            button.textContent =
                "Confirm Order / ഓർഡർ സ്ഥിരീകരിക്കുക";
        }
    }


    return false;
}


/* =========================================================
   ORDER NUMBER
   ========================================================= */

function generateOrderNumber() {

    const year =
        new Date().getFullYear();


    const random =
        Math.floor(
            10000 +
            Math.random() *
            90000
        );


    return `KS-${year}-${random}`;
}


/* =========================================================
   SHOW CONFIRMATION
   ========================================================= */

function showConfirmation(
    order
) {

    hideSection(
        "checkoutSection"
    );


    hideSection(
        "cartSection"
    );


    const confirmation =
        document.getElementById(
            "confirmationSection"
        );


    const number =
        document.getElementById(
            "orderNumber"
        );


    if (number) {

        number.textContent =
            order.order_number;
    }


    if (confirmation) {

        confirmation.classList.remove(
            "hidden"
        );


        confirmation.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


/* =========================================================
   WHATSAPP
   ========================================================= */

function sendOrderToWhatsApp() {

    if (!lastOrder) {

        alert(
            "No order found.\nഓർഡർ കണ്ടെത്താനായില്ല."
        );

        return;
    }


    const order =
        lastOrder;


    let message =
        `Krishna Stores Order\n` +
        `കൃഷ്ണ സ്റ്റോർസ് ഓർഡർ\n\n` +

        `Order No: ${order.order_number}\n` +

        `Name: ${order.customer_name}\n` +

        `Phone: ${order.customer_phone}\n` +

        `Pickup Date: ${order.pickup_date}\n` +

        `Pickup Time: ${order.pickup_time}\n\n` +

        `Items / സാധനങ്ങൾ:\n`;


    if (
        Array.isArray(order.items)
    ) {

        order.items.forEach(
            item => {

                message +=
                    `• ${item.name}`;


                if (
                    item.malayalam_name
                ) {

                    message +=
                        ` (${item.malayalam_name})`;
                }


                message +=
                    ` × ${item.quantity}`;


                if (item.unit) {

                    message +=
                        ` - ${item.unit}`;
                }


                message +=
                    "\n";
            }
        );
    }


    message +=
        `\nPickup only / കടയിൽ നിന്ന് വാങ്ങൽ മാത്രം\n` +

        `Payment at shop / പണം കടയിൽ വെച്ച് നൽകാം`;


    const encoded =
        encodeURIComponent(
            message
        );


    const firstNumber =
        WHATSAPP_NUMBERS[0];


    if (!firstNumber) {
        return;
    }


    window.open(
        `https://wa.me/${firstNumber}?text=${encoded}`,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   NEW ORDER
   ========================================================= */

function startNewOrder() {

    cart = [];

    lastOrder = null;


    saveCart();

    updateCartCount();

    renderCart();


    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (form) {

        form.reset();
    }


    hideSection(
        "confirmationSection"
    );


    const checkout =
        document.getElementById(
            "checkoutSection"
        );


    if (checkout) {

        checkout.classList.add(
            "hidden"
        );
    }


    scrollToProducts();
}


/* =========================================================
   SCROLL TO PRODUCTS
   ========================================================= */

function scrollToProducts() {

    const section =
        document.getElementById(
            "productsSection"
        );


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   MALAYALAM PRODUCT FALLBACK
   ========================================================= */

function getMalayalamProductName(
    name
) {

    const map = {

        "Tomato":
            "തക്കാളി",

        "Potato":
            "ഉരുളക്കിഴങ്ങ്",

        "Onion":
            "സവാള",

        "Carrot":
            "കാരറ്റ്",

        "Cabbage":
            "കാബേജ്",

        "Cauliflower":
            "കോളിഫ്ലവർ",

        "Beetroot":
            "ബീറ്റ്റൂട്ട്",

        "Beans":
            "പയർ",

        "Green Chilli":
            "പച്ചമുളക്",

        "Brinjal":
            "വഴുതന",

        "Cucumber":
            "വെള്ളരിക്ക",

        "Pumpkin":
            "മത്തങ്ങ",

        "Bitter Gourd":
            "പാവയ്ക്ക",

        "Bottle Gourd":
            "ചുരയ്ക്ക",

        "Drumstick":
            "മുരിങ്ങക്കായ",

        "Lady Finger":
            "വെണ്ടയ്ക്ക",

        "Spinach":
            "ചീര",

        "Garlic":
            "വെളുത്തുള്ളി",

        "Ginger":
            "ഇഞ്ചി",

        "Coconut":
            "തേങ്ങ",

        "Banana":
            "പഴം",

        "Apple":
            "ആപ്പിൾ",

        "Rice":
            "അരി",

        "Sugar":
            "പഞ്ചസാര",

        "Salt":
            "ഉപ്പ്",

        "Wheat":
            "ഗോതമ്പ്",

        "Flour":
            "മാവ്",

        "Tea":
            "ചായപ്പൊടി",

        "Coffee":
            "കാപ്പിപ്പൊടി",

        "Biscuits":
            "ബിസ്കറ്റ്",

        "Soap":
            "സോപ്പ്",

        "Shampoo":
            "ഷാംപൂ",

        "Toothpaste":
            "ടൂത്ത് പേസ്റ്റ്",

        "Pen":
            "പേന",

        "Pencil":
            "പെൻസിൽ",

        "Notebook":
            "നോട്ട്ബുക്ക്",

        "Eraser":
            "റബ്ബർ",

        "Sharpener":
            "ഷാർപ്പനർ",

        "Scale":
            "സ്കെയിൽ",

        "Paper":
            "പേപ്പർ"
    };


    if (!name) {
        return "";
    }


    return map[name] || "";
}


/* =========================================================
   CATEGORY IMAGES
   ========================================================= */

function getCategoryImage(
    category
) {

    const value =
        String(
            category || ""
        ).toLowerCase();


    if (
        value === "vegetables"
    ) {

        return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";
    }


    if (
        value === "grocery"
    ) {

        return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";
    }


    if (
        value === "stationery"
    ) {

        return "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=800&q=80";
    }


    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";
}


/* =========================================================
   SECTION HELPERS
   ========================================================= */

function hideSection(
    id
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.classList.add(
            "hidden"
        );
    }
}


/* =========================================================
   SECURITY / HTML HELPERS
   ========================================================= */

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


function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );
}