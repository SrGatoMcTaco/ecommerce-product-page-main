//VARIABLES
let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');
let userInputNumber = 0;



//EVENTOS CLICK AGREGAR Y DISMINUIR DATOS
plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0 ;
    }
    userInput.value = userInputNumber;
});



//MOSTRAR LAS NOTIFICACIONES DEL CARRITO + AGREGAR + DIBUJAR DATOS EN EL CARRITO
const addtocartBtn = document.querySelector('.details__button');
let cartnotification = document.querySelector('.header__cart--notification');
let lastvalue = parseInt(cartnotification.innerText);
addtocartBtn.addEventListener('click', ()=>{   
    lastvalue = lastvalue + userInputNumber;   
    cartnotification.innerText = lastvalue;
    cartnotification.style.display = 'block';
    drawProductInModal();   
});



//MOSTRAR EL CARRITO DE COMPRAS 
const carticonBtn = document.querySelector('.header__cart');
const cartmodal = document.querySelector('.cart-modal');
const productcontainer = document.querySelector('.cart-modal__checkout-container');

carticonBtn.addEventListener('click', ()=>{
    cartmodal.classList.toggle('show');
    if(lastvalue === 0){
        productcontainer.innerHTML = '<p class="cart-empty">Your Cart is Empty</p>';
    }else{
        drawProductInModal();
    }   
});




//EVENTO CAMBIAR A LA SIGUIENTE IMAGEN Y RETORNAR A LA SIGUIENTE IMAGEN
const imagecontainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextimage(imagecontainer);
});
previusGalleryBtn.addEventListener('click', ()=>{
    changePreviusimage(imagecontainer);
});




//EVENTO CUANDO HAGO CLICK EN LA IMAGEN DEL PRODUCTO + SWITCH
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');


imagecontainer.addEventListener('click', ()=>{
    imagesModal.style.display = 'grid';
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});




//CAMBIAR LAS IMAGENES DESDE LAS IMAGENES EN MINIATURA
let thumbnails = document.querySelectorAll('.gallery__thumnail');
thumbnails = [...thumbnails];

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click',event=>{
        //console.log(event.target.id);
        imagecontainer.style.backgroundImage = `url('./images/image-product-${event.target.id}.jpg')`
    });
});




//CAMBIAR A LA IMAGEN SIGUIENTE DESDE LOS THUMBNAILS EN LOS MODALS DESKTOP
let modalsthumbnails = document.querySelectorAll('.modal-gallery__thumnail');
const modalimgagecontainer = document.querySelector('.modal-gallery__image-container')
modalsthumbnails = [...modalsthumbnails];


modalsthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event=>{
        //console.log(event.target.id.slice(-1));
        modalimgagecontainer.style.backgroundImage = `url('./images/image-product-${event.target.id.slice(-1)}.jpg')`
    });
});




//CAMBIAR IMAGENES MODALS CON LOS BOTONES FLECHAS
const previusmodalsbtn = document.querySelector('.modal-gallery__previus');
const nextmodalsbtn = document.querySelector('.modal-gallery__next');

previusmodalsbtn.addEventListener('click', ()=>{
    changePreviusimage(modalimgagecontainer);
});

nextmodalsbtn.addEventListener('click', ()=>{
    changeNextimage(modalimgagecontainer);
});




//MOSTRAR EL MENU NAVBAR EN MOBILE Y CERRAR EL MENU NAVBAR EN MOBILE
const navbarmodalhead = document.querySelector('.header__menu');
const navbarmodalbg = document.querySelector('.modal-navbar__background');
const navbarclosebg = document.querySelector('.modal-navbar__close-icon');


navbarmodalhead.addEventListener('click', ()=>{
    navbarmodalbg.style.display = 'block';
});
    navbarclosebg.addEventListener('click', ()=>{
        navbarmodalbg.style.display = 'none';
    });







//FUNCIONES
function changePreviusimage(imgContainer) {
    if(imgIndex == 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}

function changeNextimage(imgContainer) {
    if(imgIndex == 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    }   
    imgContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}

function deleteProduct(){
    const deleteproductBtn = document.querySelector('.cart-modal__delete');
    deleteproductBtn.addEventListener('click', ()=>{
        productcontainer.innerHTML = '<p class="cart-empty">Your Cart is Empty</p>';
        lastvalue = 0;
        cartnotification.innerText = lastvalue;
    });
}

function drawProductInModal(){
        productcontainer.innerHTML = `
        <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="images/image-product-1-thumbnail.jpg" alt="product1 thumbnail">
        <div>
        <p class="cart-modal__product">Autumn Limited Edition...</p>
        <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
        </div>
        <img class="cart-modal__delete" src="images/icon-delete.svg" alt="delete">
    </div> 
    <button class="cart-modal__checkout">Checkout</button>`
deleteProduct();
let pricemodal = document.querySelector('.cart-modal__price');
pricemodal.innerHTML = `$125 x${lastvalue} <span>$${lastvalue*125}</span>`
}