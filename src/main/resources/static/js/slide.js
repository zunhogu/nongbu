//과일
var slideFruitIndex = 1;
fruitSlides(slideFruitIndex);
function plusFruitSlides(n) {
    fruitSlides(slideFruitIndex += n);
}
function currentFruitSlide(n) {
    fruitSlides(slideFruitIndex = n);
}
function fruitSlides(n) {
    var i;
    var slides = document.getElementsByClassName("fruitSlide");
    var dots = document.getElementsByClassName("Fdot");
    if (n > slides.length) {
        slideFruitIndex = 1
    }
    if (n < 1) {
        slideFruitIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideFruitIndex - 1].style.display = "block";
    dots[slideFruitIndex - 1].className += " active";
}


//채소
var slideVegetableIndex = 1;
vegetableSlides(slideVegetableIndex);

function plusVegetableSlides(n) {
    vegetableSlides(slideVegetableIndex += n);
}

function currentVegetableSlide(n) {
    vegetableSlides(slideVegetableIndex = n);
}

function vegetableSlides(n) {
    var i;
    var slides = document.getElementsByClassName("vegetableSlide");
    var dots = document.getElementsByClassName("Vdot");
    if (n > slides.length) {
        slideVegetableIndex = 1
    }
    if (n < 1) {
        slideVegetableIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideVegetableIndex - 1].style.display = "block";
    dots[slideVegetableIndex - 1].className += " active";
}


//작물
var slideCropIndex = 1;
cropSlides(slideCropIndex);

function plusCropSlides(n) {
    cropSlides(slideCropIndex += n);
}

function currentCropSlide(n) {
    cropSlides(slideCropIndex = n);
}

function cropSlides(n) {
    var i;
    var slides = document.getElementsByClassName("cropSlide");
    var dots = document.getElementsByClassName("Cdot");
    if (n > slides.length) {
        slideCropIndex = 1
    }
    if (n < 1) {
        slideCropIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideCropIndex - 1].style.display = "block";
    dots[slideCropIndex - 1].className += " active";
}