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
                <button class="btn__del">Удалить</button>
            <div class="content">
            <img class="product__img" src="${img}" alt="${name}" />
            <div class="product__desc">
                <h2 class="product__name">${name}</h2>
                <p class="product__description">${description}</p>
                <p class="product__price_label">
                    Price: <span class="product__price">$${price}</span>
                </p>
                </div>
            </div>
        </div>
    </div>`
            productBox.insertAdjacentHTML('beforeend', productEl)
        });
        const btns = document.querySelectorAll('.btn__del');
        btns.forEach((el) => {
            el.addEventListener('click', () => {
                const product = el.closest('.product');
                product.remove();
            });
        });
    } catch (error) {
        console.error(error);
    }
}
fetchData();