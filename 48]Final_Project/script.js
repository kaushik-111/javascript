let url = document.getElementById('Product-Image');
let name = document.getElementById('Product-Name');
let price = document.getElementById('Product-Price');
let Description = document.getElementById('Product-Description');
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
        price: price.value,
        Description: Description.value
    }

    let existingData = JSON.parse(localStorage.getItem("product")) || [];

    existingData.push(product);

    localStorage.setItem("product", JSON.stringify(existingData));

    url.value = "";
    name.value = "";
    price.value = "";
    Description.value = "";

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
                <img style = "width:90%; height:220px; object-fit: cover; border-radius: 10px; " src=${product.url} alt="Image Title">
                
                <!-- Image Title and Price -->
                <div style = "width:90%;display:flex;flex-direction:column; margin:10px;  gap:10px; ">
                    <h3 style = "color:white; font-weight:bold; margin:3px;">Name : ${product.name}</h3>
                    <p style = "color:white; font-weight:bold; margin:3px; font-size:20px;">Price :- $${product.price}</p>
                    <p style = "color:white; font-weight:bold; margin:3px; font-size:20px;">Description :- ${product.Description}</p>
                </div>

                <!-- Buttons -->
                <div style = "width:100%; display:flex; gap:20px; align-items: center;justify-content: center; " >
                    <button onclick="deleteItem(${product.id})" style = "border:0.5px solid white; color:white;  font-weight: bold; height:50px; width:40%;border-radius:10px; background: none;   border: 2px solid; animation: colorChange 3s infinite;box-shadow: rgba(27, 71, 110, 0.458) 3px 3px 6px 0px inset, rgba(30, 64, 137, 0.5) -3px -3px 6px 1px inset;">
                    Delete
                    </button>
                    <button onclick="editItem(${product.id})" style ="border:0.5px solid white; color:white;height:50px; width:40%;border-radius:10px;background: none;font-weight: bold;  border: 2px solid; animation: colorChange 3s infinite;box-shadow: rgba(27, 71, 110, 0.458) 3px 3px 6px 0px inset, rgba(30, 64, 137, 0.5) -3px -3px 6px 1px inset;">
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
        name.value = product.name;
        price.value = product.price;
        Description.value = product.Description;

        button.textContent = "Update Product";

        button.onclick = function (event) {

            event.preventDefault();

            product.url = url.value;
            product.name = name.value;
            product.price = price.value;
            product.Description = Description.value;

            localStorage.setItem("product", JSON.stringify(existingData));

            url.value = "";
            name.value = "";
            price.value = "";
            Description.value = "";
            button.textContent = "Add Product";
            button.onclick = getData;
            showDiv.innerHTML = "";
            existingData.forEach(product => {
                showData(product);
            });
        };
    }
};