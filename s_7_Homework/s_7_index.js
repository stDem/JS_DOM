async function fetchData() {
    try {
        const response = await fetch('s_7_data.json');
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
        });
        addCartItems(data);
    } catch (error) {
        console.error(error);
    }
}

function addCartItems(data) {
    const basketBtns = document.querySelectorAll('.btn__basket');
    const cardItems = document.querySelector('.card__items');

    basketBtns.forEach((e) => {
        e.addEventListener('click', () => {
            if (cardItems.classList.contains('deleted')) {
                cardItems.classList.remove('deleted');
            }
            if (cardBtnsItems.indexOf(data[e.id]) < 0) {
                cardBtnsItems.push(data[e.id]);
                addItems(data[e.id]);
            }
        });
    });
}

function addItems(datas) {
    const cardItems = document.querySelector('.cards');
    const product = `
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
        <div class="basket__items">
        <button class="btn__basket" style ="color: #FFF;">Add to Card</button>
        </div>
    </div>
</div>
</div>`;
    cardItems.insertAdjacentHTML('beforeend', product);

    const btns = document.querySelectorAll('.btn__del');
    btns.forEach((el) => {
        el.addEventListener('click', () => {
            const product1 = el.closest('.product');
            product1.remove();
        });
    });

    if (cardBtnsItems.length === 0) {
        cartItems.classList.add('deleted');
    }

}

//-----------------------------------------------------------------------------------
let cardBtnsItems = [];
fetchData();