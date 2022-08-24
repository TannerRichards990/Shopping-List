export function renderShoppingList(items, quantity) {
    const ul = document.createElement('ul');
    ul.classList.add('shopping-list');

    for (const item of items) {
        const li = document.createElement('li');
        li.classList.add('shopping-list-item');

        const h3 = document.createElement('h3');
        h3.textContent = item.name;

        const p = document.createElement('p');
        p.textContent = quantity + ' ' + item.unit;

        li.append(h3, p);
        ul.append(li);

    }}