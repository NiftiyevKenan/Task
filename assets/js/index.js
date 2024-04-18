const mainDiv = document.querySelector(".cards");
const count = document.querySelector(".num");

let itm;

function getAllData() {
    axios.get("https://dummyjson.com/products?limit=6")
        .then((res) => {
            itm = res.data.products;
            itm.forEach((item) => {
                let box = document.createElement("div");
                box.className = 'card';
                box.innerHTML =
                    `
            
                
                    <img src=${item.thumbnail} alt="product">
                    <h1>${item.title}</h1>
                    <span>Category: ${item.category}</span>
                    <p>$${item.price}<span>Stock:${item.stock}</span></p>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
            
            `;
                mainDiv.appendChild(box);
            });
        })
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart.length != 0) {
        count.innerHTML = cart.length
    } else {
        count.innerHTML = "0"
    }
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(itm.find(item => item.id == id))
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}


// document.addEventListener('DOMContentLoaded', function() {
//     const menuToggle = document.getElementById('menu-toggle');
//     const nav = document.getElementById('nav');

//     menuToggle.addEventListener('click', function() {
//         nav.classList.toggle('nav-open');
//     });
// });

getAllData();
updateCartCount();