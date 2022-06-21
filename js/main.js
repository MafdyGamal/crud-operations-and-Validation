
let productNameInp = document.getElementById('productNameInp');
let productCodeInp = document.getElementById('productCodeInp');
let productPriceInp =  document.getElementById('productPriceInp');
let productOfferInp = document.getElementById ('productOfferInp');
let imageSrc = document.getElementById('imageSrc');
// Button Add Product 
let btnAdd = document.getElementById('btnAdd');
// The Variable That Collects All The Data
let products ;
// Count Id In  Fucdtion displayUpdate 
let countId = 0;
// Condition For Displaying Data
if (localStorage.getItem('products') != null){
    products = JSON.parse(localStorage.getItem('products'));
    display(products);
    // document.rel
}else{
    products = [];
}

// Button Add And Update
btnAdd.addEventListener('click' , function (){
    // condition To Add Product 
    if(btnAdd.innerHTML == "Add Product"){
        addProducts();
        location.reload();
    }
    // condition To Update Product
    else {
        update();
        location.reload();
    }
    // Fuction Clear Data From Form 
    clear();
})
//  Add Product From User
function addProducts (){
    // Condition Validation 
    if (validationProductName() ==true &&validationProductCode()==true &&validationImage() == true ){
        // Object to collect data value
        let product = {
            name : productNameInp.value,
            code : productCodeInp.value,
            price : productPriceInp.value,
            offer : productOfferInp.value,
            imageSrc: imageSrc.value,
        }
        // Add Data Value In Products Array 
        products.push(product);
        // Fuction Display Data
        display(products)
    }
}
// Display Products 
function display(list){
    // Variable To Add Tages html To Display  Data 
    let containerProducts = "";
    // Loop To Store List in container Products
    for(let i =0 ; i< list.length ; i++){
        containerProducts += `<div class="col-md-4">
        <div class="content">
          <img class="w-100 imgTage" src="${list[i].imageSrc}" alt="" srcset="">
          <h2>Name : ${list[i].name} </h2>
          <p> Code : ${list[i].code} </p>
          <p> Price : ${list[i].price} </p>
          <p>Sale : ${list[i].offer} </p>
          <button class="btn btn-dark my-3" onClick="deleteProduct(${i})">Delete</button> 
          <button class="btn btn-dark my-3" onClick="displayUpdate(${i})">Update</button>  
          </div>
      </div>`
    }
    // Display Data In html
    document.getElementById('rowDisplay').innerHTML = containerProducts;
    // data storage in Local Storage
    localStorage.setItem('products' , JSON.stringify(products));
}

// Delete Product 
function deleteProduct(id){
    products.splice(id,1)
    location.reload();
    display(products)
}
// Clear Form
function clear  (){
    productNameInp.value = " ";
    productCodeInp.value = " ";
    productPriceInp.value = 0;
    productOfferInp.value = 0; 
    imageSrc.value = " ";
}
// Search by name
function search(search){
    // An array to store all search results
    let displaySearch = [];
    // Loop On All Products 
    for (let i =0 ; i< products.length ; i++){
        if (products[i].name.toLowerCase().includes(search)) {
           displaySearch.push(products[i])
        }
    }
    // Display Data From Displaty Search 
        display(displaySearch)
}

// Display the data in the form for updating
function displayUpdate(id){
    productNameInp.value = products[id].name  ;
    productCodeInp.value = products[id].code ;
    productPriceInp.value = products[id].price ;
    productOfferInp.value = products[id].offer;
    imageSrc.value = products[id].imageSrc ;
    //Change the word Add product to Update
    btnAdd.innerHTML = "Update";
    countId = id;
}
// Update Data
function update(){
    products[countId].name = productNameInp.value;
    products[countId].code = productCodeInp.value;
    products[countId].price = productPriceInp.value;
    products[countId].offer = productOfferInp.value;
    products[countId].imageSrc = imageSrc.value;
    //Change the word Update to Add product
    btnAdd.innerHTML = "Add Product";
    display(products)
}



// Validation product Name
function validationProductName(){
    let validName = /^[A-Z][a-z]{3,18} {0,}[A-z]{3,18}$/;
    if (validName.test(productNameInp.value) == true){
        productNameInp.classList.replace('is-invalid','is-valid');
        document.getElementById('validName').innerHTML = " ";
        return true;
    }else{
        document.getElementById('validName').innerHTML = "Sorry Is Invalid ! Please start the word with a capital letter and not less than 7 letters or more than 18 letters";
        productNameInp.classList.add('is-invalid')        
        return false;
    }
    
}
// Validatio Product Code
function validationProductCode(){
    let validCode = /^[0-9]{4}$/;
    if(validCode.test(productCodeInp.value)==true){
        productCodeInp.classList.replace('is-invalid' , 'is-valid');
        document.getElementById('validcode').innerHTML = " ";
        return true;
    }else{
        productCodeInp.classList.add('is-invalid');
        document.getElementById('validcode').innerHTML = "Sorry Is Invalid ! Please enter 4 numbers      "
    }

}
// Validation Image Url
function validationImage(){

    let validImage= /^(https|http):\/\//;
    if (validImage.test(imageSrc.value) ==true ){
        imageSrc.classList.replace('is-invalid' , 'is-valid');
        document.getElementById('validImage').innerHTML = " ";
        return true;
    }else{
        imageSrc.classList.add('is-invalid');
        document.getElementById('validImage').innerHTML = "Please enter the link of the picture begins with https:// OR http:// ";
        return false;
    }
}


//  Image On Click
let imgTage = document.querySelectorAll('.imgTage');
// Display After Click
let displayImage =document.querySelector('#displayImage');
// Div Content Div Show Image 
let layOut= document.getElementById('layOut');
// Icon Close 
let close = document.getElementById('close');
// next  Icon
let next = document.getElementById('next');
// Previous Icon
let Previous = document.getElementById('Previous'); 
let countIndexImage = 0 ;

for (let i = 0 ; i < imgTage.length ; i++){
    imgTage[i].addEventListener('click', function(e){
        layOut.classList.replace('d-none' , 'd-flex');
        displayImage.style.cssText = `background-image: url(${e.target.src})`;
        countIndexImage= i;       
    })
}
// Function Close Imaget
close.addEventListener('click', function(){
    layOut.classList.add('d-none')
})

next.addEventListener('click' , function(){
        countIndexImage++;
        if(countIndexImage == imgTage.length){
            countIndexImage=0;
        }
        
        displayImage.style.cssText = `background-image: url(${imgTage[countIndexImage].src})`;      
})
Previous.addEventListener('click' , function(){
    countIndexImage--;
    if (countIndexImage < 0 ){
        countIndexImage = imgTage.length-1;
    }
    displayImage.style.cssText= `background-image:url(${imgTage[countIndexImage].src})`
})

// Use the keyboard to view photos
document.addEventListener('keydown',function(e){
    // Close the image via the keyboard
    if(e.key == 'Escape'){
        layOut.classList.add('d-none')
    }
    // Movebetween images using the keyboard by pressing the Next button
     if (e.key == 'ArrowRight'){
        countIndexImage--;
        if (countIndexImage < 0 ){
            countIndexImage = imgTage.length-1;
        }
        displayImage.style.cssText= `background-image :url(${imgTage[countIndexImage].src})`
    }
    // Move between images using the keyboard by pressing the Previous button
    if(e.key == 'ArrowLeft'){
        countIndexImage -- ;
        if(countIndexImage < 0 ){
            countIndexImage = imgTage.length-1 ;
        }
        displayImage.style.cssText = `background-image:url(${imgTage[countIndexImage].src})`
    }
})