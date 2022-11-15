function calculator (){
    const result = document.querySelector('.calculating__result span');

         

    let sex,height, weight, age,ratio ;
     
    // заповнення локального сховища за замовчуванням 
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        }else{
            sex = 'female';
            localStorage.setItem('sex', "female");
        }

        if(localStorage.getItem('ratio')){
            sex = localStorage.getItem('ratio');
        }else{
            ratio =1.375;
            localStorage.setItem('ratio', "1.375");
        }


    function initLocalSetting(selector, activeClass){
        const element = document.querySelectorAll(selector);

        element.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSetting('#gender', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big', 'calculating__choose-item_active');

     function calcTotal(){
        // перевірка на повну заповненість 
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = '~~~';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
     }
     calcTotal();
     function getStaticInformation( parentSelector, activeClass){
        const element = document.querySelectorAll(`${parentSelector} div`);
        element.forEach(elem =>{
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    // збереження в локальному сховищі
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));

                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                element.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
        
     } 
     getStaticInformation('#gender', 'calculating__choose-item_active' );
     getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active' );

     function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            // при введені не числа появляється червона рамка
            if (input. value.match(/\D/g)){
                input.style.boxShadow =  '0px 0px 35px -2px rgba(255,0,0,1)';
            }else{
                input.style.boxShadow =  '0px 0px 35px -2px rgba(0,255,0,1)';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
     }
     getDynamicInformation('#height');
     getDynamicInformation('#weight');
     getDynamicInformation('#age');
}
export default calculator;