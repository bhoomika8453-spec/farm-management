// =======================
// LOAD CROPS
// =======================

async function loadCrops() {

    const response = await fetch("/crops");

    const data = await response.json();

    const cropList = document.getElementById("cropList");

    cropList.innerHTML = "";

    data.forEach(crop => {

        cropList.innerHTML += `
            <div class="card-item">
                <div class="inline-meta">
                    <span>${crop[4]}</span>
                    <span>Qty ${crop[2]}</span>
                </div>
                <h3>${crop[1]}</h3>
                <p>Price: $${crop[3]}</p>
                <div class="card-actions">
                    <button type="button" class="button button-primary" onclick="buyCrop(${crop[0]})">Buy</button>
                </div>
            </div>
        `;
    });
}


// =======================
// BUY CROP
// =======================

async function buyCrop(cropId) {

    const response = await fetch("/add-to-cart", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            crop_id: cropId
        })

    });

    const data = await response.json();

    alert(data.message);

    loadCart();
}


// =======================
// LOAD CART
// =======================

async function loadCart() {

    const response = await fetch("/cart");

    const data = await response.json();

    const cartList = document.getElementById("cartList");

    cartList.innerHTML = "";

    data.forEach(item => {

        cartList.innerHTML += `
            <div class="card-item">
                <div class="inline-meta">
                    <span>User: ${item[1]}</span>
                    <span>Qty ${item[3]}</span>
                </div>
                <h3>${item[2]}</h3>
                <p>Price: $${item[4]}</p>
            </div>
        `;
    });
}


// =======================
// PLACE ORDER
// =======================

async function placeOrder() {

    const response = await fetch("/place-order", {

        method: "POST"

    });

    const data = await response.json();

    alert(data.message);

    loadCart();
}


// =======================
// AUTO LOAD
// =======================

loadCrops();

loadCart();