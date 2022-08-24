export function renderShoppingList(item, action) {

    const li = document.createElement('li');
    li.classList.add('shopping-list-item');

    const h3 = document.createElement('h3');
    h3.textContent = item.item;

    const p = document.createElement('p');
    p.textContent = item.quantity;

    li.append(h3, p);
    

    li.addEventListener('click', () => {
        li.classList.toggle('bought');
    });
    if (item.bought) {
        li.classList.add('bought');
    } else {
        li.classList.add('not-bought');
        li.addEventListener('click', async () => {
            
            action(item);
    
        });
    }
    return li;
}