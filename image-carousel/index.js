const slides = document.getElementsByClassName('carousel-item')
let slidePosition = 0
let slideTimeout
const totalSlides = slides.length
renderDots()

document.getElementById('carousel-button-next').addEventListener('click', function() {
    moveToNextSlide(true)
});
document.getElementById('carousel-button-prev').addEventListener('click', moveToPrevSlide)

function setSlideTimer() {
        slideTimeout = window.setTimeout(function() {
        moveToNextSlide()    
    }
    , 8000)
}
setSlideTimer()

function hideAllSlides(direction) {
    for (const slide of slides) {
        slide.classList.remove('carousel-item-hidden-right')
        slide.classList.remove('carousel-item-hidden-left')
        
    }
    
    if (direction === 'next') {
        for (let slide of slides) {
            slide.classList.remove('carousel-item-visible')
            slide.classList.add('carousel-item-hidden-right')
        }
    } else if (direction === 'prev') {
        for (let slide of slides) {
            slide.classList.remove('carousel-item-visible')
            slide.classList.add('carousel-item-hidden-left')
        }
    } else {
        for (let slide of slides) {
            slide.classList.remove('carousel-item-visible')
            slide.classList.add('carousel-item-hidden')
        }
    }
    
}

function moveToNextSlide(clicked) {
    hideAllSlides('next')
    
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++
    }
    
    slides[slidePosition].classList.add("carousel-item-visible");
    
    renderDots()
    
    if (clicked) {
        clearTimeout(slideTimeout)
    } else {
        setSlideTimer()
    }
}

function moveToPrevSlide() {
    hideAllSlides('prev')
    
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1
    } else {
        slidePosition--
    }
    
    slides[slidePosition].classList.add("carousel-item-visible");
    
    renderDots()
}

function renderDots() {
    const dotsLists = document.getElementsByClassName('slide-dots')
    
    for (const dotsList of dotsLists) {
        dotsList.innerHTML = null
    }
    
    const activeDots = document.querySelector('.carousel-item-visible .slide-dots')
    
    let dotsDOMString = ''
    for (let i=0; i<totalSlides; i++) {
        if(i === slidePosition) {
            dotsDOMString += `
                <li class="dot active"></li>
            `
        } else {
            dotsDOMString += `
                <li class="dot"></li>
            `
        }
    }
    activeDots.innerHTML = dotsDOMString
}