let url = document.getElementById('image-url');
let name = document.getElementById('image-name');
let date = document.getElementById('image-date');
let email = document.getElementById('image-email');
let address = document.getElementById('image-address');
let button = document.getElementById('add-btn');
let showDiv = document.getElementById('show-div');


window.onload = () => {
    let existingData = JSON.parse(localStorage.getItem("product")) || [];
    existingData.forEach(product => {
        showData(product);
    });
}

const getData = (event) => {
    event.preventDefault();

    let product = {
        id: Date.now(),
        url: url.value,
        name: name.value,
        date: date.value,
        email: email.value,
        address: address.value
    }

    let existingData = JSON.parse(localStorage.getItem("product")) || [];

    existingData.push(product);

    localStorage.setItem("product", JSON.stringify(existingData));

    url.value = "";
    name.value = "";
    date.value = "";
    email.value = "";
    address.value = "";

    showData(product);
}

const showData = (product) => {
    let dataDiv = document.createElement("div");
    dataDiv.innerHTML = `
        <style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
        </style>
            <div style = "height:100%; width:100%; display:flex; flex-direction: column;align-items: center;justify-content: center; ">
                <!-- Image -->
                <img style = "width:90%; height:190px; object-fit: cover; border-radius: 10px;" src=${product.url} alt="Image Title">
                
                <!-- Image Title and Price -->
                <div style = "width:90%;display:flex;flex-direction:column; margin:10px;  gap:10px; ">
                    <h3 style = "color:white; font-weight:bold;">name:${product.name}</h3>
                    <p style = "color:white; font-weight:bold;">date-of-birth:-${product.date}</p>
                    <p style = "color:white; font-weight:bold;">email:-${product.email}</p>
                    <p style = "color:white; font-weight:bold;">address:-${product.address}</p>
                </div>

                <!-- Buttons -->
                <div style = "width:100%; display:flex; gap:20px; align-items: center;justify-content: center; " >
                    <button onclick="deleteItem(${product.id})" style = "border:1px solid white; color:white;  font-weight: bold; height:50px; width:40%;border-radius:15px; background: none;">
                    Delete
                    </button>
                    <button onclick="editItem(${product.id})" style ="border:1px solid white; color:white;height:50px; width:40%;border-radius:15px;background: none;font-weight: bold;">
                    Edit
                    </button>
                </div>
                </div>

    
    `;
    showDiv.append(dataDiv);
}


const deleteItem = (id) => {
    let getData = JSON.parse(localStorage.getItem('product')) || [];
    let filteredData = getData.filter(data => data.id !== id);

    localStorage.setItem('product', JSON.stringify(filteredData));

    showDiv.innerHTML = "";

    filteredData.forEach(product => {
        showData(product);
    });
};


const editItem = (id) => {
    let existingData = JSON.parse(localStorage.getItem('product')) || [];
    let product = existingData.find(product => product.id === id);

    if (product) {
        url.value = product.url;
        name.value = product.value;
        date.value = product.value;
        email.value = product.value;
        address.value = product.value;

        button.textContent = "Update Product";

        button.onclick = function (event) {

            event.preventDefault();

            product.url = url.value;
            product.name = name.value;
            product.date = date.value;
            product.email = email.value;
            product.address = address.value;

            localStorage.setItem("product", JSON.stringify(existingData));

            url.value = "";
            name.value = "";
            date.value = "";
            email.value = "";
            address.value = "";
            button.textContent = "Add Product";
            button.onclick = getData;
            showDiv.innerHTML = "";
            existingData.forEach(product => {
                showData(product);
            });
        };
    }
};