async function fetchData() {
    try {
        const response = await fetch('s_6_data.json');
        if (!response.ok) {
            throw new Error('не получены данные с data.json');
        }
        const data = await response.json();
        const productBox = document.querySelector('.product__box');
        data.forEach(({ img, name, description, price }) => {
            const productEl = `
            <div class="product__box">
            <div class="product">
               
            <div class="content">
            <img class="product__img" src="${img}" alt="${name}" />
            <div class="product__desc">
                <h2 class="product__name">${name}</h2>
                <p class="product__description">${description}</p>
                <p class="product__price_label">
                    Price: <span class="product__price">$${price}</span>
                </p>
                </div>
                <div class="basket__items">
                <button class="btn__basket" style ="color: #FFF;">Add to Card</button>
                </div>
            </div>
        </div>
    </div>`
            productBox.insertAdjacentHTML('beforeend', productEl)
            cardItems(data);
        });

    } catch (error) {
        console.error(error);
    }
}
const cardBtnsItems = [];
function cardItems(data) {
    // const cardItem = document.querySelector('.card__items');
    const cardBtns = document.querySelectorAll('.btn__basket');
    cardBtns.forEach((el) => {
        el.addEventListener('click', () => {
            if (cardBtnsItems.indexOf(data[el.id]) < 0) {
                cardBtnsItems.push(data[el.id]);
                addCardItems(data[el.id]);
            }

            // cardItem.classList.contains('deleted') ? addCardItems(data) : console.log('no');
        });
    });
}

function addCardItems(datas) {
    const cardItem = document.querySelector('.card__items');
    const productCard = `
                    <div class="product__box">
                    <div class="product">
                        <button class="btn__del">Удалить</button>
                    <div class="content">
                    <img class="product__img" src="${datas.img}" alt="${datas.name}" />
                    <div class="product__desc">
                        <h2 class="product__name">${datas.name}</h2>
                        <p class="product__description">${datas.description}</p>
                        <p class="product__price_label">
                            Price: <span class="product__price">$${datas.price}</span>
                        </p>
                        </div>

                    </div>
                </div>
            </div>`
    cardItem.insertAdjacentHTML('beforeend', productCard);
}


const btns = document.querySelectorAll('.btn__del');
btns.forEach((el) => {
    el.addEventListener('click', () => {
        const product = el.closest('.product');
        product.remove();
    });
});

fetchData();