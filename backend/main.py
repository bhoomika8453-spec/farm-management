from fastapi import FastAPI, Form, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from database import get_db
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")


# =============================
# PAGE ROUTES
# =============================

@app.get("/")
def login_page():
    return FileResponse(FRONTEND_DIR / "login.html")


@app.get("/register")
def register_page():
    return FileResponse(FRONTEND_DIR / "register.html")


@app.get("/admin-dashboard")
def admin_dashboard():
    return FileResponse(FRONTEND_DIR / "admin_dashboard.html")


@app.get("/user-dashboard")
def user_dashboard():
    return FileResponse(FRONTEND_DIR / "user_dashboard.html")


# =============================
# REGISTER
# =============================

@app.post("/register")
def register(email: str = Form(...), password: str = Form(...)):
    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (email, password, role) VALUES (%s, %s, %s)",
            (email, password, "user")
        )
        db.commit()
        return {"message": "User registered"}

    except Exception as e:
        return {"error": str(e)}


# =============================
# LOGIN
# =============================

@app.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id, role FROM users WHERE email=%s AND password=%s",
        (email, password)
    )

    user = cursor.fetchone()

    if user:
        return {
            "message": "Login success",
            "user_id": user[0],
            "role": user[1]
        }

    return {"message": "Invalid login"}


# =============================
# ADD FARMER
# =============================

@app.post("/add_farmer")
def add_farmer(name: str = Form(...)):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO farmers (name) VALUES (%s)",
        (name,)
    )

    db.commit()

    return {"message": "Farmer added"}


# =============================
# GET FARMERS
# =============================

@app.get("/farmers")
def get_farmers():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM farmers")

    return cursor.fetchall()

@app.delete("/delete-farmer/{farmer_id}")
def delete_farmer(farmer_id: int):

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM farmers WHERE id=%s",
        (farmer_id,)
    )

    db.commit()

    return {"message": "Farmer deleted"}

# =============================
# ADD CROP
# =============================

@app.post("/add_crop")
def add_crop(
    crop_name: str = Form(...),
    quantity: int = Form(...),
    price: float = Form(...),
    farmer_id: int = Form(...)
):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO crops (crop_name, quantity, price, farmer_id) VALUES (%s,%s,%s,%s)",
        (crop_name, quantity, price, farmer_id)
    )

    db.commit()

    return {"message": "Crop added"}


# =============================
# GET CROPS
# =============================

@app.get("/crops")
def get_crops():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT c.id, c.crop_name, c.quantity, c.price, f.name
        FROM crops c
        JOIN farmers f ON c.farmer_id = f.id
    """)

    return cursor.fetchall()


# =============================
# DELETE CROP
# =============================

@app.delete("/delete-crop/{crop_id}")
def delete_crop(crop_id: int):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM crops WHERE id=%s",
        (crop_id,)
    )

    db.commit()

    return {"message": "Crop deleted"}

# =============================
# ADD TO CART
# =============================

@app.post("/add-to-cart")
async def add_to_cart(request: Request):

    data = await request.json()

    crop_id = data.get("crop_id")

    db = get_db()
    cursor = db.cursor()

    # GET CROP DETAILS

    cursor.execute(
        "SELECT crop_name, quantity, price FROM crops WHERE id=%s",
        (crop_id,)
    )

    crop = cursor.fetchone()

    crop_name = crop[0]
    quantity = crop[1]
    price = crop[2]

    # INSERT INTO CART

    cursor.execute(
        """
        INSERT INTO cart
        (username, crop_name, quantity, price)

        VALUES (%s, %s, %s, %s)
        """,
        ("user1", crop_name, quantity, price)
    )

    db.commit()

    return {"message": "Added to cart"}

# =============================
# GET CART
# =============================

@app.get("/cart")
def get_cart():

    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT
            id,
            username,
            crop_name,
            quantity,
            price
        FROM cart
    """)

    return cursor.fetchall()

    return cursor.fetchall()
# =============================
# PLACE ORDER
# =============================

@app.post("/place-order")
def place_order():

    db = get_db()

    cursor = db.cursor()

    try:

        # GET ALL CART ITEMS

        cursor.execute("""
            SELECT
                username,
                crop_name,
                quantity,
                price
            FROM cart
        """)

        cart_items = cursor.fetchall()

        # INSERT INTO ORDERS

        for item in cart_items:

            cursor.execute("""
                INSERT INTO orders
                (username, crop_name, quantity, price)

                VALUES (%s, %s, %s, %s)
            """, (
                item[0],
                item[1],
                item[2],
                item[3]
            ))

        # CLEAR CART

        cursor.execute("DELETE FROM cart")

        db.commit()

        return {
            "message": "Order placed successfully"
        }

    except Exception as e:

        return {
            "message": str(e)
        }

# =============================
# GET ORDERS
# =============================

@app.get("/orders")
def get_orders():

    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        SELECT
            orders.id,
            crops.crop_name,
            crops.price
        FROM orders
        JOIN crops
        ON orders.crop_id = crops.id
    """)

    return cursor.fetchall()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)