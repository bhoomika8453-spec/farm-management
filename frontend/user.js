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

            <div style="
                background: white;
                border-radius: 20px;
                padding: 25px;
                margin-bottom: 25px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                border-left: 8px solid #2e8b57;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:15px;
                ">
                    <span style="
                        background:#e8f5e9;
                        color:#2e7d32;
                        padding:8px 15px;
                        border-radius:20px;
                        font-weight:bold;
                    ">
                        Farmer: ${crop[4]}
                    </span>

                    <span style="
                        background:#f1f8e9;
                        padding:8px 15px;
                        border-radius:20px;
                        font-weight:bold;
                    ">
                        Qty Available: ${crop[2]}
                    </span>
                </div>

                <h2 style="
                    margin:0;
                    font-size:32px;
                    color:#222;
                ">
                    🌾 ${crop[1]}
                </h2>

                <h3 style="
                    color:#2e8b57;
                    margin-top:15px;
                    font-size:28px;
                ">
                    ₹ ${crop[3]}
                </h3>

                <div style="margin-top:20px;">

                    <label style="
                        font-weight:bold;
                        display:block;
                        margin-bottom:8px;
                    ">
                        Select Quantity
                    </label>

                    <input
                        type="number"
                        id="qty_${crop[0]}"
                        min="1"
                        max="${crop[2]}"
                        placeholder="Enter quantity"
                        style="
                            width:100%;
                            padding:12px;
                            border-radius:10px;
                            border:1px solid #ccc;
                            margin-bottom:15px;
                            font-size:16px;
                        "
                    >

                    <label style="
                        font-weight:bold;
                        display:block;
                        margin-bottom:8px;
                    ">
                        Contact Number
                    </label>

                    <input
                        type="text"
                        id="phone_${crop[0]}"
                        placeholder="Enter phone number"
                        style="
                            width:100%;
                            padding:12px;
                            border-radius:10px;
                            border:1px solid #ccc;
                            margin-bottom:20px;
                            font-size:16px;
                        "
                    >

                    <button
                        onclick="buyCrop(${crop[0]}, ${crop[2]})"
                        style="
                            background:#2e8b57;
                            color:white;
                            border:none;
                            padding:14px 30px;
                            border-radius:12px;
                            font-size:18px;
                            font-weight:bold;
                            cursor:pointer;
                            width:100%;
                        "
                    >
                        🛒 Buy Now
                    </button>

                </div>

            </div>
        `;
    });
}


// =======================
// BUY CROP
// =======================

async function buyCrop(cropId, maxQty) {

    const quantity =
        document.getElementById(`qty_${cropId}`).value;

    const phone =
        document.getElementById(`phone_${cropId}`).value;

    if (!quantity || quantity <= 0) {

        alert("Please enter quantity");

        return;
    }

    if (quantity > maxQty) {

        alert("Quantity exceeds available stock");

        return;
    }

    if (!phone) {

        alert("Please enter contact number");

        return;
    }

    const response = await fetch("/add-to-cart", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            crop_id: cropId,
            quantity: quantity,
            phone: phone
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

            <div style="
                background:white;
                border-radius:18px;
                padding:20px;
                margin-bottom:20px;
                box-shadow:0 4px 10px rgba(0,0,0,0.1);
                border-left:6px solid #4caf50;
            ">

                <h2 style="
                    margin:0;
                    color:#222;
                ">
                    🥬 ${item[2]}
                </h2>

                <p style="margin-top:12px; color:#222; font-weight:600;">
    👤 User: ${item[1]}
</p>

<p style="color:#222; font-weight:600;">
    📦 Quantity: ${item[3]}
</p>

                <p style="
                    color:#2e8b57;
                    font-weight:bold;
                    font-size:20px;
                ">
                    ₹ ${item[4]}
                </p>

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

    document.body.innerHTML += `

        <div id="successPopup" style="
            position:fixed;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
            background:white;
            padding:60px;
            border-radius:25px;
            box-shadow:0 0 40px rgba(0,0,0,0.4);
            z-index:9999;
            text-align:center;
            width:500px;
        ">

            <div style="
                font-size:80px;
                margin-bottom:20px;
            ">
                ✅
            </div>

            <h1 style="
                color:#2e8b57;
                font-size:42px;
                margin-bottom:20px;
            ">
                Order Placed Successfully
            </h1>

            <p style="
                font-size:22px;
                color:#555;
            ">
                Thank you for purchasing fresh crops 🌱
            </p>

        </div>
    `;

    setTimeout(() => {

        document
        .getElementById("successPopup")
        .remove();

    }, 3500);

    loadCart();
}


// =======================
// AUTO LOAD
// =======================

loadCrops();

loadCart();