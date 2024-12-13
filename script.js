let clients = [];
let products = [];
let purchases = [];


// Отображения выбранной вкладки
function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tab).style.display = 'block';
}

// Добавить клиента
function addClient() {
    const clientName = document.getElementById('clientName').value;
    if (clientName) {
        clients.push(clientName);
        document.getElementById('clientName').value = '';
        updateClientList();
    } else {
        alert('Введите имя клиента');
    }
}

// Обновление списка клиентов
function updateClientList() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';
    clients.forEach((client, index) => {
        const li = document.createElement('li');
        li.textContent = client;
        li.appendChild(createEditButton(index));
        clientList.appendChild(li);
    });
}

// Создание кнопки редактирования клиента
function createEditButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Редактировать';
    button.onclick = () => editClient(index);
    return button;
}

// Функция редактирование клиента
function editClient(index) {
    const newName = prompt('Введите новое имя клиента:', clients[index]);
    if (newName) {
        clients[index] = newName;
        updateClientList();
    }
}

// Обработчик для добавления товара
document.getElementById('products').querySelector('button').addEventListener('click', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
   
     if (name && !isNaN(price) && !isNaN(quantity)) {
        products.push({ name, price, quantity });
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQuantity').value = '';
        renderProducts(); 
    } else {
        alert('Пожалуйста, заполните все поля');
    }
});



// Функция для отображения товаров
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product-item">
                <span>${product.name} - ${product.price}₽ (Количество: ${product.quantity})</span>
                <button onclick="editProduct(${index})">Редактировать товар</button>
                <button onclick="deleteProduct(${index})">Удалить товар</button>
               
            </div>`;
    });
}


function deleteProduct(index) {
    products.splice(index, 1); // Удаляем товар из массива
    renderProducts(); // Обновляем список товаров
}


function editProduct(index) {
    const product = products[index];
    const newName = prompt('Введите новое название товара:', product.name);
    const newPrice = prompt('Введите новую цену товара:', product.price);
    const newQuantity = prompt('Введите новое количество товара:', product.quantity);

    if (newName && !isNaN(newPrice) && !isNaN(newQuantity)) {
        products[index] = { name: newName, price: parseFloat(newPrice), quantity: parseInt(newQuantity) };
        renderProducts(); // Обновляем список товаров
    } else {
        alert('Пожалуйста, заполните все поля корректно');
    }
}



// Обновление списка товаров
function updateProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; }

    document.getElementById('addPurchaseForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = this[0].value;
        const price = parseFloat(this[1].value);
        const quantity = parseInt(this[2].value);
        const clientName = this[3].value;
        const product = products.find(product => product.name === name);
        const client = clients.find(client => client === clientName); // Поиск клиента по имени
    
        if (product && product.quantity >= quantity && client) {
            const totalPrice = product.price * quantity;
            purchases.push({ name, price: totalPrice, quantity, clientName });
            product.quantity -= quantity;
            renderProducts();
            renderPurchases();
        } else if (!product) {
            alert('Товара нет в наличии');
        } else if (!client) {
            alert('Клиента с таким именем не существует');
        }
    });

    function renderPurchases() {
        const purchaseList = document.getElementById('purchaseList');
        purchaseList.innerHTML = '';
        purchases.forEach((purchase, index) => {
            purchaseList.innerHTML += `
                <div class="purchase-item">
                    <span>${purchase.name} - ${purchase.price}₽ (Количество: ${purchase.quantity}) - Клиент: ${purchase.clientName}</span>
                    <button onclick="editPurchase(${index})">Редактировать</button> 
                    <button onclick="deletePurchase(${index})">Удалить</button> 
                </div>`;
        });
    }








    
// Функция для рассчёта цены
function calculatePrice() {
    const quantityInput = document.getElementById('addPurchaseForm')[2];
    const priceInput = document.getElementById('addPurchaseForm')[1];
    const product = products.find(product => product.name === document.getElementById('addPurchaseForm')[0].value);
    if (product) {
    const totalPrice = product.price * parseInt(quantityInput.value);
    priceInput.value = totalPrice;
    }
}

// Вызов функции при изменении количества покупки
document.getElementById('addPurchaseForm')[2].addEventListener('input', calculatePrice);

// Функция для отображения покупок
function renderPurchases() {
    const purchaseList = document.getElementById('purchaseList');
    purchaseList.innerHTML = '';
    purchases.forEach((purchase, index) => {
        purchaseList.innerHTML += `
            <div class="purchase-item">
                <span>${purchase.name} - ${purchase.price}₽ (Количество: ${purchase.quantity}) - Клиент: ${purchase.clientName}</span>
                <button onclick="editPurchase(${index})">Редактировать</button>
                <button onclick="deletePurchase(${index})">Удалить</button>
            </div>`;
                                         }
                                                            );
}