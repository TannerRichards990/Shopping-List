const SUPABASE_URL = 'https://mtegvpmustvqjcrpqjft.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZWd2cG11c3R2cWpjcnBxamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2MzgyMTYsImV4cCI6MTk3NTIxNDIxNn0.1qATbqaxyJY3HmYMZsX0LcLV6_XXcgd_qnE96O4JeR8';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

function checkError({ data, error }) {
    return error ? error : data;
}
    

/* Data functions */
export async function getListItems() {
    const response = await client.from('shopping-list').select();

    return checkError(response);
}

export async function createListItem(item) {
    const response = await client.from('shopping-list').insert([{
        item : item.item,
        quantity : item.quantity
    }]);

    return checkError(response);
}

export async function boughtListItem(id) {
    const response = await client.from('shopping-list').update({ bought: true }).match({ id: id });

    return checkError(response);
}

export async function deleteAllItems(id) {
    const response = await client.from('shopping-list').delete().match({ user_id: id });

    return checkError(response);
}