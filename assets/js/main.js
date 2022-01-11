import { setDragDrop } from "/assets/js/dragDrap.js";

const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const msg = document.querySelector('.msg');
const todoList = document.querySelector("#list");
const filters = document.querySelector(".filters-sec");
const filterItemsText = document.querySelectorAll('.filter');
const clearbtn = document.querySelector('#clearBtn');
let itemCounter = 0;


addBtn.addEventListener('click', addItem);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

todoList.addEventListener('click', (e) => { deleteOrCompleteItem(e.target) });
filters.addEventListener('click', (e) => { filterItems(e.target) });
clearbtn.addEventListener('click', clearAllCompletedItems);
document.addEventListener('DOMContentLoaded', run);
window.addEventListener('resize', ()=> {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.childNodes[1].innerText = isolateItemName(item.innerText);
    });
});

function createItemElement(todo) {
    const isolatedTodoTitle = isolateItemName(todo.value);
    const li = document.createElement('li');
    const checkSpan = document.createElement('span');
    const todoValueSpan = document.createElement('span');
    const crossIcon = document.createElement('img');
    li.draggable = 'true';
    li.classList.add('item');
    li.classList.add('incomplete');
    checkSpan.classList.add('check');
    if (todo.state === 'completed') {
        li.classList.remove('incomplete');
        li.classList.add('complete');
        checkSpan.classList.add('completed');
    }
    todoValueSpan.className = 'task';
    crossIcon.className = 'cross-icon';
    crossIcon.src = './assets/icons/icon-cross.svg';
    if (todo.value !== '') {
        todoValueSpan.innerText = isolatedTodoTitle;
        li.appendChild(checkSpan);
        li.appendChild(todoValueSpan);
        li.appendChild(crossIcon);
        document.querySelector("#list").appendChild(li);
    }

}

function addItem() {
    const todoInputValue = todoInput.value;
    if (todoInputValue !== "") {
        const todo = { 'value': todoInputValue, 'state': 'incomplete' } 
        msg.style.display = 'none';
        setItemCounter(itemCounter++);
        createItemElement(todo);
        saveItem(todo);
        todoInput.value = "";
        const draggableItems = document.querySelectorAll(".item");
        setDragDrop(draggableItems);
    }
}

function saveItem(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deleteItem(itemValue) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.pop(itemValue);
    localStorage.removeItem("todos");
    localStorage.setItem('todos', JSON.stringify(todos));
}


function loadItems() {
    let todos;
    if (localStorage.getItem("todos").length <= 2) {
        todos = [];
        msg.style.display = 'block';
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        msg.style.display = 'none';
    }
    return new Promise((resolve, reject) => {
        resolve(todos.forEach((todo) => {
            createItemElement(todo);
            setItemCounter(itemCounter++);
        }));
    })
}

function deleteOrCompleteItem(e) {
    if (e.classList[0] === 'cross-icon') {
        const todoValue = e.previousElementSibling.innerText;
        deleteItem(todoValue);
        e.parentElement.remove();
        setItemCounter(itemCounter--);
    }
    if (e.classList[0] === 'check') {
        updateItemsState(e);
        e.classList.toggle('completed');
        e.parentElement.classList.toggle('incomplete');
        e.parentElement.classList.toggle('complete');
    }
}

function isolateItemName(todoValue) {
    if (window.innerWidth < 768){
        return todoValue.length > 35 ? todoValue.substr().substring(0 , 30) + "..." : todoValue;
    } 
    if (window.innerWidth > 768) {
        return todoValue.length > 55 ? todoValue.substr().substring(0 , 50) + "..." : todoValue;
    }
}

function filterItems(e) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        switch (e.innerText) {
            case 'All':
                item.style.display = 'flex';
                break;
            case 'Active':
                if (item.classList.contains('incomplete')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
            case 'Completed':
                if (item.classList.contains('complete')) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";

                }
                break;
        }
    });
}

filterItemsText.forEach(filter => {
    filter.addEventListener('click', (e) => {
        let currentFilter = document.getElementsByClassName('active-filter');
        currentFilter[0].classList = currentFilter[0].className.replace(" active-filter", "");
        e.target.classList.add("active-filter");
    });
});

function setItemCounter() {
    return document.querySelector('#itemsCount').innerText = itemCounter === 1 ? `${itemCounter} Item` : `${itemCounter} Items`;
}

function clearAllCompletedItems() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        if (todo.state === 'completed') {
            deleteItem(todo.value);
        }
    });
    return window.location.reload();
}

function updateItemsState(e) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        if (todo.value === e.parentElement.childNodes[1].innerText) {
            todo.state = "completed";
        }
    });
    localStorage.removeItem('todos');
    localStorage.setItem('todos', JSON.stringify(todos));
}

async function run() {
    const load = await loadItems();
    const draggableItems = document.querySelectorAll(".item");
    return setDragDrop(draggableItems);
}