// =======================
// ADD FARMER
// =======================

document.getElementById("farmerForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append(
        "name",
        document.getElementById("farmer_name").value
    );

    const response = await fetch("/add_farmer", {

        method: "POST",

        headers: {
            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: formData
    });

    const data = await response.json();

    showPopup(data.message, "success");

    document.getElementById("farmer_name").value = "";

    loadFarmers();
});


// =======================
// LOAD FARMERS
// =======================

async function loadFarmers() {

    const response =
        await fetch("/farmers");

    const farmers =
        await response.json();

    const farmerList =
        document.getElementById("farmerList");

    const farmerDropdown =
        document.getElementById("farmer_id");

    farmerList.innerHTML = "";

    farmerDropdown.innerHTML = `
        <option value="">
            Select Farmer
        </option>
    `;

    farmers.forEach(farmer => {

        farmerList.innerHTML += `

            <div class="card-item">

                <div class="inline-meta">

                    <span>
                        Farmer ID: ${farmer[0]}
                    </span>

                </div>

                <h3>
                    👨‍🌾 ${farmer[1]}
                </h3>

                <div class="card-actions">

                    <button
                        class="button button-secondary"
                        onclick="deleteFarmer(${farmer[0]})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;

        farmerDropdown.innerHTML += `

            <option value="${farmer[0]}">
                ${farmer[1]}
            </option>

        `;
    });
}


// =======================
// DELETE FARMER
// =======================

async function deleteFarmer(id) {

    await fetch(`/delete-farmer/${id}`, {

        method: "DELETE"
    });

    showPopup(
        "Farmer deleted successfully",
        "danger"
    );

    loadFarmers();
}


// =======================
// ADD CROP
// =======================

document.getElementById("cropForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append(
        "crop_name",
        document.getElementById("crop_name").value
    );

    formData.append(
        "quantity",
        document.getElementById("quantity").value
    );

    formData.append(
        "price",
        document.getElementById("price").value
    );

    formData.append(
        "farmer_id",
        document.getElementById("farmer_id").value
    );

    const response = await fetch("/add_crop", {

        method: "POST",

        headers: {
            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: formData
    });

    const data = await response.json();

    showPopup(data.message, "success");

    document.getElementById("cropForm").reset();

    loadCrops();
});


// =======================
// LOAD CROPS
// =======================

async function loadCrops() {

    const response =
        await fetch("/crops");

    const crops =
        await response.json();

    const cropList =
        document.getElementById("cropList");

    cropList.innerHTML = "";

    crops.forEach(crop => {

        cropList.innerHTML += `

            <div class="card-item">

                <div class="inline-meta">

                    <span>
                        👨‍🌾 ${crop[4]}
                    </span>

                    <span>
                        Qty ${crop[2]}
                    </span>

                </div>

                <h3>
                    🌾 ${crop[1]}
                </h3>

                <p>
                    💰 Price: ₹${crop[3]}
                </p>

                <div class="card-actions">

                    <button
                        class="button button-primary"
                        onclick="editCrop(
                            ${crop[0]},
                            '${crop[1]}',
                            '${crop[2]}',
                            '${crop[3]}'
                        )"
                    >
                        Edit
                    </button>

                    <button
                        class="button button-secondary"
                        onclick="deleteCrop(${crop[0]})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;
    });
}


// =======================
// DELETE CROP
// =======================

async function deleteCrop(id) {

    await fetch(`/delete-crop/${id}`, {

        method: "DELETE"
    });

    showPopup(
        "Crop deleted successfully",
        "danger"
    );

    loadCrops();
}


// =======================
// EDIT CROP
// =======================

async function editCrop(
    id,
    oldName,
    oldQty,
    oldPrice
) {

    const crop_name =
        prompt(
            "Enter crop name",
            oldName
        );

    const quantity =
        prompt(
            "Enter quantity",
            oldQty
        );

    const price =
        prompt(
            "Enter price",
            oldPrice
        );

    await fetch(`/update-crop/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

            crop_name,
            quantity,
            price

        })
    });

    showPopup(
        "Crop updated successfully",
        "success"
    );

    loadCrops();
}


// =======================
// ADD EXPENSE
// =======================

document.getElementById("expenseForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append(
        "expense_name",
        document.getElementById("expense_name").value
    );

    formData.append(
        "amount",
        document.getElementById("expense_amount").value
    );

    const response =
        await fetch("/add-expense", {

        method: "POST",

        headers: {
            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: formData
    });

    const data =
        await response.json();

    showPopup(data.message, "success");

    document.getElementById("expenseForm").reset();

    loadExpenses();
});


// =======================
// LOAD EXPENSES
// =======================

async function loadExpenses() {

    const response =
        await fetch("/expenses");

    const expenses =
        await response.json();

    const expenseList =
        document.getElementById("expenseList");

    expenseList.innerHTML = "";

    expenses.forEach(expense => {

        expenseList.innerHTML += `

            <div class="card-item">

                <div class="inline-meta">

                    <span>
                        Expense ID:
                        ${expense[0]}
                    </span>

                    <span>
                        ₹${expense[2]}
                    </span>

                </div>

                <h3>
                    💸 ${expense[1]}
                </h3>

                <div class="card-actions">

                    <button
                        class="button button-secondary"
                        onclick="deleteExpense(${expense[0]})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;
    });
}


// =======================
// DELETE EXPENSE
// =======================

async function deleteExpense(id) {

    await fetch(`/delete-expense/${id}`, {

        method: "DELETE"
    });

    showPopup(
        "Expense deleted successfully",
        "danger"
    );

    loadExpenses();
}


// =======================
// BEAUTIFUL POPUP
// =======================

function showPopup(message, type) {

    const popup =
        document.createElement("div");

    let bgColor =
        "#16a34a";

    if(type === "danger") {

        bgColor = "#dc2626";
    }

    popup.innerHTML = `

        <div style="
            position:fixed;
            top:20px;
            right:20px;
            background:${bgColor};
            color:white;
            padding:18px 25px;
            border-radius:14px;
            font-size:16px;
            font-weight:600;
            box-shadow:0 10px 25px rgba(0,0,0,0.2);
            z-index:9999;
            animation:slideIn 0.4s ease;
        ">

            ${message}

        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    }, 2500);
}


// =======================
// AUTO LOAD
// =======================

loadFarmers();

loadCrops();

loadExpenses();