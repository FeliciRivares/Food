import {getResource} from '../services/services';

function cards () {
    class MenuCard{
        constructor(src, alt, title, descr ,price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            // якщо не буде переданий клас встановлюється параметр за замовчуванням menu__item
            const element = document.createElement('div');

            if (this.classes.length === 0) { 
                this.element = 'menu__item';
                element.classList.add();
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML =`
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
            </div>
            `;
            this.parent.append(element);
        }
    } 
    
// створює стільки обєктів скільки масивів буде в базі даних menu, код сам верішує скільки буде запусків  
    // getResource('http://localhost:3000/menu')
        // .then(data => {
        //     data.forEach(({img, altimg, title, descr, price}) =>{
        //         new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        //     });
        // });
// використовуємо Axios бібліотеку
    axios.get("http://localhost:3000/menu")
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        });
    });
// виклик обєкту лише один раз 
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Menu "Fitness"',
    //     'Menu "Fitness" is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with the best price and high quality!',
    //     10,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Menu “Premium”',
    //     'In the “Premium” menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!',
    //     20,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     '"Lenten" menu',
    //     'The Lenten menu is a careful selection of ingredients: the complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein from tofu and imported vegetarian steaks.',
    //     15,
    //     '.menu .container',
    //     'menu__item'
    // ).render();

}
export default cards;