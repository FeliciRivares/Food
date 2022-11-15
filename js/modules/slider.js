function slider ({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}){

    const slides = document.querySelectorAll(slide),
    slider  = document.querySelector(container),
    prev = document.querySelector(prewArrow),
    next = document.querySelector(nextArrow),
    total =  document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWraper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWraper).width;
let slideIndex = 1;
let offset= 0;
// ------------------------------------------------------------------------ slider 2 start 
if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent =`0${slideIndex}`;
}else{
   total.textContent = slides.length;
   current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide => {
       slide.style.width = width;
    });

        // крапки на слайдерах 
        slider.style.position =  'relative';
        const indicators = document.createElement('ol'),
           dots = [];
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText =`
           position: absolute;
           right: 0;
           bottom: 0;
           left: 0;
           z-index: 15;
           display: flex;
           justify-content: center;
           margin-right: 15%;
           margin-left: 15%;
           list-style: none;
        `;
        slider.append(indicators);

        for(let i = 0; i < slides.length; i++){
           const dot = document.createElement('li');
           dot.setAttribute('data-slide-to', i + 1);
           dot.style.cssText = `
               box-sizing: content-box;
               flex: 0 1 auto;
               width: 30px;
               height: 6px;
               margin-right: 3px;
               margin-left: 3px;
               cursor: pointer;
               background-color: #fff;
               background-clip: padding-box;
               border-top: 10px solid transparent;
               border-bottom: 10px solid transparent;
               opacity: .5;
               transition: opacity .6s ease;
           `;
           if (i == 0){
               dot.style.opacity = 1;
           }
           indicators.append(dot);
           dots.push(dot);
        }
   function addZerov () {
       if(slides.length < 10){
           current.textContent = `0${slideIndex}`;
       }else{
           current.textContent = slideIndex;
       }
   }
   function changeOpacity (){
       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = '1';
   }
   function deleteNotDigits(text){
       return +text.replace(/\D/g, ''); 
   }
    next.addEventListener('click', () =>{
       if (offset == deleteNotDigits(width) * (slides.length - 1)){
           offset = 0;
       } else {
           offset += deleteNotDigits(width);
       }
       slidesField.style.transform = `translateX(-${offset}px)`;
       if(slideIndex == slides.length){
           slideIndex = 1;
       }else{
           slideIndex++;
       }
       addZerov();
       changeOpacity (); 

    });
    prev.addEventListener('click', () =>{
       if (offset == 0){
           offset = deleteNotDigits(width) * (slides.length - 1);
       } else {
           offset -= deleteNotDigits(width);
       }
       slidesField.style.transform = `translateX(-${offset}px)`;
       if(slideIndex == 1){
           slideIndex = slides.length;
       }else{
           slideIndex--;
       }
       addZerov();
       changeOpacity ();

    });

    dots.forEach(dot =>{
       dot.addEventListener('click', (e) =>{
           const slideTo = e.target.getAttribute('data-slide-to');

           slideIndex = slideTo;
           offset = deleteNotDigits(width) * (slideTo - 1);

           slidesField.style.transform = `translateX(-${offset}px)`;

         
           addZerov();
           changeOpacity ();


       });
    });
    // -------------------------------------------------------------- slider 2 end
   //  ініціалізуємо, починаємо роботу з 1 слайдера 
// showSlides(slideIndex);
//  if(slides.length < 10){
//     total.textContent = `0${slides.length}`;
//  }else{
//     total.textContent = slides.length;
//  }
// function showSlides(n){
//     // перевірка на межі закіньчення слайдерів щоб йшло все по кругу  
//     if (n > slides.length){
//         slideIndex = 1;
//     }
//     if (n < 1){
//         slideIndex = slides.length;
//     }
//     // ховаємо всі слайдери залишаємо лише один 
//     slides.forEach(item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';

//     if(slides.length < 10){
//         current.textContent = `0${slideIndex}`;
//      }else{
//         current.textContent = slideIndex;
//      }

//   }

//     function plusSlides(n){
//         showSlides(slideIndex += n);
//     }

//     prev.addEventListener('click', () =>{
//         plusSlides(-1);
//     });
//     next.addEventListener('click', () =>{
//         plusSlides(1);
//     });
//  ------------------------  slider 1 - end
}
export default slider;