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
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    const data = await response.json();

    alert(data.message);

    document.getElementById("farmer_name").value = "";

    loadFarmers();
});


// =======================
// LOAD FARMERS
// =======================

async function loadFarmers() {

    const response = await fetch("/farmers");

    const farmers = await response.json();

    const farmerList = document.getElementById("farmerList");

    const farmerDropdown = document.getElementById("farmer_id");

    farmerList.innerHTML = "";

    farmerDropdown.innerHTML =
        `<option value="">Select Farmer</option>`;

    farmers.forEach(farmer => {

        // SHOW FARMERS

        farmerList.innerHTML += `
            <div class="card-item">
                <h3>${farmer[1]}</h3>
                <div class="card-actions">
                    <button type="button" class="button button-secondary" onclick="deleteFarmer(${farmer[0]})">Delete</button>
                </div>
            </div>
        `;

        // DROPDOWN

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
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    const data = await response.json();

    alert(data.message);

    document.getElementById("cropForm").reset();

    loadCrops();
});


// =======================
// LOAD CROPS
// =======================

async function loadCrops() {

    const response = await fetch("/crops");

    const crops = await response.json();

    const cropList = document.getElementById("cropList");

    cropList.innerHTML = "";

    crops.forEach(crop => {

        cropList.innerHTML += `
            <div class="card-item">
                <div class="inline-meta">
                    <span>${crop[4]}</span>
                    <span>Qty ${crop[2]}</span>
                </div>
                <h3>${crop[1]}</h3>
                <p>Price: $${crop[3]}</p>
                <div class="card-actions">
                    <button type="button" class="button button-secondary" onclick="deleteCrop(${crop[0]})">Delete</button>
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

    loadCrops();
}


// =======================
// AUTO LOAD
// =======================

loadFarmers();

loadCrops();