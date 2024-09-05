const socket = io();

//Formulario
const form = document.getElementById("form")
const title = document.getElementById("title")
const description = document.getElementById("description")
const code = document.getElementById("code")
const price = document.getElementById("price")
const stock = document.getElementById("stock")
const category = document.getElementById("category")

form.onsubmit = (e)=>{
    e.preventDefault();
    const formProduct= {
        title: title.value,    
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        status:true,
    }
    console.log(formProduct);
    socket.emit('newProductForm', formProduct)

}




//Visualizacion Productos
const productsContainer = document.getElementById("idProductsContainer")

socket.on('getProducts', (products)=>{
    
    
    productsContainer.innerHTML= "";
    
    products.forEach((product) => {

        let div = document.createElement("div");
        div.className = "cardContainer"
        
        div.innerHTML = `
        
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <h3>${product.price}</h3>
        <button id="${product.id}">Borrar</button>
        
        
        `;

        productsContainer.append(div);

        const deleteProduct = document.getElementById(`${product.id}`)

        deleteProduct.addEventListener('click',()=>{
            console.log("Borrar");
            socket.emit('deleteProduct',product.id)
        })

    });

})




