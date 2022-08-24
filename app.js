// importing other stuff, utility functions for:
import { createListItem, getListItems, boughtListItem, deleteAllItems } from './fetch-utils.js';
// working with supabase:
import { checkAuth, signOutUser } from './fetch-utils.js';
// pure rendering (data --> DOM):
import { renderShoppingList } from './render-utils.js';
/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):

// can optionally return the user:
const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const form = document.querySelector('.shopping-list-form');
const deleteListButton = document.querySelector('.delete');
const listEl = document.querySelector('.shopping-list');
// local state:


// display functions:
async function displayList() {


    listEl.textContent = '';
    const list = await getListItems();

    
    for (let item of list) {
        const listItemEl = renderShoppingList(item, handleBought);
        listItemEl.classList.add('list-item');
        listItemEl.textContent = `${item.item} ${item.quantity}`;

    
        listEl.append(listItemEl);
    }
}

async function handleBought(item) {
    await boughtListItem(item.id);
    displayList();
}

// events:
window.addEventListener('load', async () => {
    
    displayList();
});

deleteListButton.addEventListener('click', async () => {
    await deleteAllItems(user.id);
    
    

    displayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const itemObject = {
        item : data.get('item'),
        quantity : data.get('quantity'),
        
    };

    

    await createListItem(itemObject);

    form.reset();



    await displayList();
});