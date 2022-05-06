//Variables
const product = document.querySelector('#products')
const listCart = document.querySelector('#listCart tbody')
const iconCart = document.querySelector('.material-symbols-outlined')
const empty = document.querySelector('#empty')
let cart = []

// Listeners
listeners()
function listeners(){
    product.addEventListener('click', readBtn)
    listCart.addEventListener('click', deleteProduct)
    empty.addEventListener('click', (e)=>{
        e.preventDefault()
        cart = []
        empty.innerHTML = ''
        listHTML()
    }) // EmptyCart
}

//Functions
function readBtn(e){
    e.preventDefault()
    if (e.target.classList.contains('add')) {
        const select = e.target.parentElement
        info(select)
    }
    //Change icon cart
    iconCart.innerHTML='add_shopping_cart'
    //Empty Cart
    empty.innerHTML='<a href="#" class="emptyCart"> Empty Cart </a>'
}

function info(product){
    const info = {
        img: product.querySelector('img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('.price').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }
    // Update quantity
    const exist = cart.some(product => product.id === info.id)
    if (exist) {
        const products = cart.map(product => {
            if (product.id === info.id) {
                // Update quantity
                product.quantity++
                return product
            } else {
                return product
            }
        })
        cart = [...products]
    } else {
        cart.push(info)
    }
    listHTML()
}

function listHTML(){
    textDel()
    cleanHTML()
    cart.forEach( product =>{
        const {img,title,price,quantity,id} = product
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${img}" style="width: 80px; height: 80px;">
            </td>
            <td>
                <div style="font-weight: 600;">${title}</div>
                <div style="color: darkviolet;">${price}</div>
                <div style="color: gray;">Quantity: ${quantity}</div>
            </td>
            <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td>
                <a href="#" class="deleteProduct" data-id="${id}"> X </a>
            </td>
        `
        listCart.appendChild(row)
    })
}

//Clean HTML
function cleanHTML(){
    listCart.innerHTML = ''
}

//Delete product
function deleteProduct(e){
    e.preventDefault()
    if (e.target.classList.contains('deleteProduct')) {
        const productId = e.target.getAttribute('data-id')
        cart = cart.filter(product => product.id !== productId)
    }
    //Change icon cart and add empty cart
    if (cart.length === 0) {
        console.log(cart.length);
        iconCart.innerHTML='shopping_cart'
        empty.innerHTML=''
    } else {
        iconCart.innerHTML='add_shopping_cart'
        empty.innerHTML='<a href="#" class="emptyCart"> Empty Cart </a>'
    }

    listHTML()
}

//Remove text in listCart
function textDel(){
    const textDel = document.querySelector('#textDel')
    if (cart.length !== 0) {
        textDel.classList.add('delete')
    } else {
        textDel.classList.remove('delete')
    }
}
