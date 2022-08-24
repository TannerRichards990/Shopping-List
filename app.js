// importing other stuff, utility functions for:
import { createListItem, getListItems, boughtListItem, deleteAllItems } from './fetch-utils.js';
// working with supabase:
import { checkAuth, signOutUser } from './fetch-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const formList = document.querySelector('shopping-list-form');
const deleteListButton = document.querySelector('delete');
const listEl = document.querySelector('list');
// local state:
let listItems = [];

// display functions:
async function displayList() {
  
    const list = await getListItems();

    listEl.textContent = '';
    for (let item of list) {
        const listItemEl = document.createElement('p');
        listItemEl.classList.add('list-item');
        listItemEl.textContent = `${item.item} ${item.quantity}`;

        if (item.bought) {
            listItemEl.classList.add('bought');
        } else {
            listItemEl.classList.add('not-bought');
            listItemEl.addEventListener('click', async () => {
                await boughtListItem(item.id);

                displayList();
            });
        }
        listEl.append(listItemEl);
    }
}

// events:
