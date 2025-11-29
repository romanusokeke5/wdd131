const products = [
    { id: "lawnmower3000", name: "Lawn Mower 3000" },
    { id: "supershower5", name: "Super Shower 5" },
    { id: "smartfanx", name: "Smart Fan X" },
    { id: "megacleanpro", name: "Mega Clean Pro" },
    { id: "ultralightbulb", name: "Ultra Light Bulb" }
];

const productSelect = document.querySelector("#productName");

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
});
