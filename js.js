// retrive data frm local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let editIndex = -1;


// adding product
function addProduct() {

    let product = document.getElementById("product").value.trim();
    let price = Number(document.getElementById("price").value);
    let category = document.getElementById("category").value;
    let quantity = Number(document.getElementById("quantity").value);

    if (product === "" || price <= 0 ||
        category === "" || quantity <= 0 ||
        document.getElementById("price").value === "" ||
        document.getElementById("quantity").value === "") {

        alert("Please enter all product details");
        return;
    }

    let data = {
        product: product,
        price: price,
        category: category,
        quantity: quantity
    };

    if (editIndex === -1) {
        cart.push(data);
        alert("Product added successfully!");
    } else {
        cart[editIndex] = data;
        editIndex = -1;

        document.querySelector("button[onclick='addProduct()']").innerText = "Add to Cart";

        alert("Product updated successfully!");
    }

    saveData();
    displayProducts();
    clearInputs();
}


// SAVE DATA TO LOCAL STORAGE
function saveData() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// DISPLAY PRODUCTS
function displayProducts() {

    let output = document.getElementById("output");
    output.innerHTML = "";

    cart.forEach(function(item, index) {

        output.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.product}</td>
                <td>₹${item.price}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}


// EDIT PRODUCT
function editProduct(index) {

    let item = cart[index];

    document.getElementById("product").value = item.product;
    document.getElementById("price").value = item.price;
    document.getElementById("category").value = item.category;
    document.getElementById("quantity").value = item.quantity;

    editIndex = index;

    document.querySelector("button[onclick='addProduct()']").innerText = "Update Product";
}


// DELETE ONE PRODUCT
function deleteProduct(index) {

    if (confirm("Are you sure you want to delete this product?")) {

        cart.splice(index, 1);

        saveData();
        displayProducts();

        alert("Product deleted successfully!");
    }
}


// CLEAR ALL PRODUCTS
function clearAll() {

    if (cart.length === 0) {
        alert("Cart is already empty!");
        return;
    }

    if (confirm("Are you sure you want to delete all products?")) {

        cart = [];
        editIndex = -1;

        saveData();
        displayProducts();
        clearInputs();

        document.querySelector("button[onclick='addProduct()']").innerText = "Add to Cart";

        alert("All products deleted successfully!");
    }
}


// CLEAR INPUT FIELDS
function clearInputs() {

    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
}


// DISPLAY SAVED PRODUCTS WHEN PAGE LOADS
displayProducts();
