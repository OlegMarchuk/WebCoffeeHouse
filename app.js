let currentCoffee = null;
let currentSize = 'TALL';
let currentMilk = 'REGULAR';
let currentQuantity = 1;
let currentExtras = { sugar: false, syrup: false };
let order = [];
let selectedType = 'all';

function saveOrderToStorage() {
    localStorage.setItem('coffeeOrder', JSON.stringify(order));
}

function loadOrderFromStorage() {
    const saved = localStorage.getItem('coffeeOrder');
    if (saved) {
        order = JSON.parse(saved);
    }
}

function closeDetail() {
    document.getElementById('detailPage').classList.remove('active');
    document.body.classList.remove('modal-open');
}

function toggleOrderPanel() {
    document.getElementById('orderPanel').classList.toggle('active');
}

function toggleBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const coffeeTypesNav = document.getElementById('coffeeTypesNav');
    burgerMenu.classList.toggle('active');
    coffeeTypesNav.classList.toggle('active');
}

function filterAndRenderCoffee(searchTerm = '') {
    let filtered = coffeeData;

    if (selectedType !== 'all') {
        filtered = filtered.filter(c => c.type === selectedType);
    }

    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(q)
        );
    }

    renderCoffeeCards(filtered);
}

function renderCoffeeCards(coffees) {
    const grid = document.getElementById('coffeeGrid');
    grid.innerHTML = '';

    if (coffees.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:#999;">Кофе не найден</div>';
        return;
    }

    coffees.forEach(coffee => {
        const card = document.createElement('div');
        card.className = 'coffee-card';
        card.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.name}" class="coffee-card-image"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22250%22%3E%3Crect fill=%22%23ddd%22 width=%22280%22 height=%22250%22/%3E%3C/svg%3E'">
            <div class="coffee-card-body">
                <h3 class="coffee-card-title">${coffee.name}</h3>
                <p class="coffee-card-desc">${coffee.description}</p>
                <div class="coffee-card-footer">
                    <span class="coffee-price">${coffee.basePrice} ₽</span>
                    <button class="coffee-card-btn" data-coffee-id="${coffee.id}">Добавить</button>
                </div>
            </div>
        `;

        card.querySelector('.coffee-card-btn').addEventListener('click', () => {
            openDetail(coffee);
        });

        grid.appendChild(card);
    });
}

function openDetail(coffee) {
    currentCoffee = coffee;
    currentSize = 'TALL';
    currentMilk = 'REGULAR';
    currentQuantity = 1;
    currentExtras = { sugar: false, syrup: false };

    const img = document.getElementById('detailImage');
    img.src = coffee.image;
    img.onerror = function () {
        this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22600%22 height=%22300%22/%3E%3C/svg%3E';
    };

    document.getElementById('detailTitle').textContent = coffee.name;
    document.getElementById('detailDesc').textContent = coffee.description;

    renderDetailOptions();
    calculateDetailPrice();
    document.getElementById('detailPage').classList.add('active');
    document.body.classList.add('modal-open');
}

function renderDetailOptions() {
    const sizeButtons = document.getElementById('sizeButtons');
    sizeButtons.innerHTML = '';
    sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn' + (size.name === currentSize ? ' active' : '');
        btn.dataset.size = size.name;
        btn.textContent = `${size.label} (+${size.price} ₽)`;
        sizeButtons.appendChild(btn);
    });

    const milkButtons = document.getElementById('milkButtons');
    milkButtons.innerHTML = '';
    milks.forEach(milk => {
        const btn = document.createElement('button');
        btn.className = 'milk-btn' + (milk.name === currentMilk ? ' active' : '');
        btn.dataset.milk = milk.name;
        btn.textContent = `${milk.label} (+${milk.price} ₽)`;
        milkButtons.appendChild(btn);
    });

    document.getElementById('sugarCheckbox').checked = false;
    document.getElementById('syrup').checked = false;
    document.getElementById('quantityValue').textContent = 1;
}
const coffeeData = [
    {
        id: 1,
        name: 'Классический Капучино',
        type: 'cappuccino',
        description: 'Сбалансированное сочетание эспрессо, горячего молока и молочной пены. Классический итальянский напиток с насыщенным вкусом.',
        image: 'images/cappuccino-classic.jpg',
        basePrice: 150
    },
    {
        id: 2,
        name: 'Капучино с корицей',
        type: 'cappuccino',
        description: 'Традиционный капучино с тонким ароматом корицы. Идеально для холодных дней.',
        image: 'images/cappuccino-cinnamon.jpg',
        basePrice: 155
    },
    {
        id: 3,
        name: 'Капучино с какао',
        type: 'cappuccino',
        description: 'Нежный капучино с натуральным какао. Шоколадные ноты гармонируют с кофейным вкусом.',
        image: 'images/cappuccino-cocoa.jpg',
        basePrice: 160
    },
    {
        id: 4,
        name: 'Капучино Мока',
        type: 'cappuccino',
        description: 'Смесь капучино и мокко. Насыщенный вкус кофе с шоколадным оттенком.',
        image: 'images/cappuccino-mocha.jpg',
        basePrice: 170
    },
    {
        id: 5,
        name: 'Классический Латте',
        type: 'latte',
        description: 'Мягкий кофейный напиток с преобладанием молока. Идеален для утреннего кофе.',
        image: 'images/latte-classic.jpg',
        basePrice: 140
    },
    {
        id: 6,
        name: 'Латте Макиато',
        type: 'latte',
        description: 'Латте с красивыми слоями. Молоко, пена и эспрессо создают визуальный эффект.',
        image: 'images/latte-macchiato.jpg',
        basePrice: 145
    },
    {
        id: 7,
        name: 'Латте Ванильный',
        type: 'latte',
        description: 'Классический латте с ванильным сиропом. Нежный сладкий вкус.',
        image: 'images/latte-vanilla.jpg',
        basePrice: 155
    },
    {
        id: 8,
        name: 'Латте Карамель',
        type: 'latte',
        description: 'Латте с карамельным сиропом. Сладкий и сбалансированный вкус.',
        image: 'images/latte-caramel.jpg',
        basePrice: 160
    },
    {
        id: 9,
        name: 'Латте Медовый',
        type: 'latte',
        description: 'Латте с натуральным медом. Натуральная сладость и нежный вкус.',
        image: 'images/latte-honey.jpg',
        basePrice: 165
    },
    {
        id: 10,
        name: 'Классический Американо',
        type: 'americano',
        description: 'Эспрессо с добавлением горячей воды. Крепкий, но нежный напиток.',
        image: 'images/americano-classic.jpg',
        basePrice: 120
    },
    {
        id: 11,
        name: 'Американо с молоком',
        type: 'americano',
        description: 'Американо с молоком. Смягчает горечь и добавляет кремовость.',
        image: 'images/americano-milk.jpg',
        basePrice: 130
    },
    {
        id: 12,
        name: 'Долгий Американо',
        type: 'americano',
        description: 'Американо с большим количеством воды. Мягкий вкус для долгого наслаждения.',
        image: 'images/americano-long.jpg',
        basePrice: 125
    },
    {
        id: 13,
        name: 'Эспрессо Одинарный',
        type: 'espresso',
        description: 'Один шот эспрессо. Концентрированный вкус настоящего кофе.',
        image: 'images/espresso-single.jpg',
        basePrice: 80
    },
    {
        id: 14,
        name: 'Эспрессо Двойной',
        type: 'espresso',
        description: 'Два шота эспрессо. Для любителей насыщенного кофейного вкуса.',
        image: 'images/espresso-double.jpg',
        basePrice: 100
    },
    {
        id: 15,
        name: 'Эспрессо Макиато',
        type: 'espresso',
        description: 'Эспрессо с небольшой шапкой молочной пены. Смягчает интенсивность.',
        image: 'images/espresso-macchiato.jpg',
        basePrice: 110
    },
    {
        id: 16,
        name: 'Классический Флэт Уайт',
        type: 'flatwhite',
        description: 'Два шота эспрессо с молоком. Кремовая текстура и сбалансированный вкус.',
        image: 'images/flatwhite-classic.jpg',
        basePrice: 160
    },
    {
        id: 17,
        name: 'Флэт Уайт Интенсивный',
        type: 'flatwhite',
        description: 'Флэт уайт с дополнительным шотом эспрессо. Более насыщенный вкус.',
        image: 'images/flatwhite-intense.jpg',
        basePrice: 175
    },
    {
        id: 18,
        name: 'Флэт Уайт Медовый',
        type: 'flatwhite',
        description: 'Флэт уайт с медом. Натуральная сладость и нежная текстура.',
        image: 'images/flatwhite-honey.jpg',
        basePrice: 180
    }
];

const sizes = [
    { name: 'SHORT', label: 'Маленький', price: 0 },
    { name: 'TALL', label: 'Средний', price: 20 },
    { name: 'GRANDE', label: 'Большой', price: 40 },
    { name: 'VENTI', label: 'Очень большой', price: 60 }
];

const milks = [
    { name: 'REGULAR', label: 'Обычное молоко', price: 0 },
    { name: 'SOY', label: 'Соевое молоко', price: 30 },
    { name: 'ALMOND', label: 'Миндальное молоко', price: 40 },
    { name: 'OAT', label: 'Овсяное молоко', price: 35 }
];