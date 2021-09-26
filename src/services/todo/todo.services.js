import {v4 as uuid} from 'uuid';

let todoItems = [{description: "Do something fun", tags: ["fun", "todo"], done: false},
                    {description: "Testing some more", tags: ["fun", "todo"], done: true}];

export const getItems = () => {
    return todoItems;
}

export const addItem = item => {
    if(!item || item.id) {
        return;
    }
    item.id = uuid();
    todoItems.push(item);
    return item;
}

export const updateItem = item => {
    if(!item || !item.id) {
        return;
    }
    let itemToUpdate = getItem(item.id);

    itemToUpdate = {...itemToUpdate, item};
    todoItems = todoItems.filter(i => i.id !== item.id);
    todoItems.push(itemToUpdate);
}

export const deleteItem = id => {
    let itemToDelete = getItem(id);
    if(!itemToDelete) {
        return;
    }
    todoItems = todoItems.filter(i => i.id !== itemToDelete.id);
}

export const getItem = id => {
    let foundItems = todoItems.filter(i => i.id === id);
    if(!foundItems.length) {
        return;
    }
    return foundItems[0];
}