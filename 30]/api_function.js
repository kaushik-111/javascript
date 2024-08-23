
let container = document.getElementById("container");

fetch('https://fakestoreapi.com/products')
    .then((response) => {
        console.log(response);
        return response.json(); // Call the json() method here
    })
    .then((data) => {
        console.log(data);
        createProductCard(data);
    })
    .catch((error) => {
        console.log(error.name, error.message); // Corrected error.message typo
    });

    const createProductCard = ((data)=> {
        data.forEach(element => {
            // Create image tag
            let image = document.createElement("img");
            image.src = element.image;
            image.className = "image";

            // Create heading tag
            let heading = document.createElement("h1");
            heading.textContent = "$" + element.price; // Set the text content of the heading
            heading.className = "title"; // Use "title" as a string

            let category =document.createElement("p");
            category.textContent = "category" + element.category;
            category.className = "category";
            category.style= "color: white; font-size: 25px; font-weight:bold; ";

            // Create child div
            let child = document.createElement("div");
            child.className = "child";
            child.appendChild(image); // Append image to child
            child.appendChild(heading); // Append heading to child
            child.appendChild(category);

            // Append child div to container
            container.appendChild(child);
        });
   
    });