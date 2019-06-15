/*добавляет в корзину значения суммируя все article и каждый умножает на свою цену
 *записывает в хранилище локальное  количество и сумму
 */
function inBasketAdd() {
    let res = 0;
    let sum = 0;
    for (let i = 0; i < el.length; i++) {
        if (el[i].value != '') res += parseInt(el[i].value);
        else el[i].value = '0';
        sum += (parseInt(el[i].value)) * (parseInt(pEl[i].getAttribute('data-prise')));

    }
    if (parseInt(res) > 0) {
        countBasket.innerHTML = parseInt(countBasket.innerHTML) + res;
        summaTotal.innerHTML = parseInt(summaTotal.innerHTML) + sum + ' грн.';
        localStorage.setItem('count', parseInt(countBasket.innerHTML));
        localStorage.setItem('summa', parseInt(summaTotal.innerHTML));
    } else alert('Выберите количество больше 0');
    clearValue();
}

function clearValue(){
	for(let i=0; i<el.length; i++){
    	el[i].value = 0;
    }
}

let el = document.getElementsByTagName('input');
let addBasket = document.getElementById('addBasket');
let delBasket = document.getElementById('delBasket');
let countBasket = document.getElementById('countProduct');
let summaTotal = document.getElementById('summaTotal');
let pEl = document.querySelectorAll('.prise');


//проверка на наличие записанного значения в хранилище для отображения на странице значений в корзине
if (localStorage.getItem('count')) {
    countBasket.innerHTML = localStorage.getItem('count');
    summaTotal.innerHTML = localStorage.getItem('summa') + ' грн.';
} else {
    countBasket.innerHTML = 0;
    summaTotal.innerHTML = 0 + ' грн.';
}

// событие на фокус поля, при попадании курсора поле становится пустое чтобы вводить значение
for (let i = 0; i < el.length; i++) {
    el[i].addEventListener('focus', function() {
        this.value = '';
    });
}
// событие на потерю фокуса и проверки регулярки на введенное значение (только цифры положительные)
for (let i = 0; i < el.length; i++) {
    el[i].addEventListener('blur', function() {
        reg = /[1-9]+/g;
        if (el[i].value != el[i].value.match(reg)) el[i].value = '0';
    });
}


addBasket.addEventListener('click', inBasketAdd);


delBasket.addEventListener('click', function() {
    if (parseInt(countBasket.innerHTML) > 0) {
        countBasket.innerHTML = '0';
        summaTotal.innerHTML = '0 грн.';
        localStorage.removeItem('count');
        localStorage.removeItem('summa');
    } else alert('Что там удалять? в корзине 0');
    clearValue();
})