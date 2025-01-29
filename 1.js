'use strict';

const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
    },

    goods: [],
    basketCountEl: null,
    basketPriceEl: null,

    init(settings = {}) {
        this.settings = Object.assign(this.settings, settings);
        this.basketCountEl = document.querySelector(this.settings.countSelector);
        this.basketPriceEl = document.querySelector(this.settings.priceSelector);
        this.render();
    },

    render() {
        this.basketCountEl.textContent = this.goods.length;
        this.basketPriceEl.textContent = this.getGoodsPrice();
    },

    getGoodsPrice() {

        let cost = 0;
        for (const good of this.goods) {
            cost += good.price;
        }
        return cost;

    },


    add(goodName, goodPrice) {
        this.goods.push({name: goodName, price: goodPrice});
        let obj = {name: goodName, price: goodPrice};
        let serialObj = JSON.stringify(obj);
        let myKey = localStorage.length.toString() + 'key';
        localStorage.setItem(myKey, serialObj);
        this.render();
    },


    loadGoods() {
        let ls = localStorage;
        for (let i = 0; i < ls.length; i++) {
            let key = ls.key(i);
            let returnObj = JSON.parse(ls.getItem(key));
            this.goods.push(returnObj);
        }
    },
};


if (localStorage) {
    basket.loadGoods();
}

window.onload = () => basket.init();


document.querySelectorAll('.buy-btn').forEach(el => {
    el.addEventListener('click', e => {
        basket.add(e.target.dataset.name, +e.target.dataset.price);
    })

});
document.querySelectorAll('.clear-btn').forEach(el => {
    el.addEventListener('click', e => {
        localStorage.clear();
        basket.goods = [];
        basket.render();
    })

});