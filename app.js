const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

// 

eventListeners();

function eventListeners(){ // Tüm Event Listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    secondCardBody.addEventListener("click",editTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e) {
    if (confirm("Tüm todoları silmek istediğinize emin misiniz?")) {
        // Arayüzden todolar temizleme yavaş çalışan yol
        // todoList.innerHTML = "";
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }    
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style","display : none !important"); // Bulamadı
        } else {
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodo(e) {

    if (e.target.className === "fa fa-remove btn btn-danger mr-2") {
        
        e.target.parentElement.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.parentElement.textContent);

        showAlert("info","Todo başarıyla silindi.")

    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index) {
        if (todo === deleteTodo) {
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}




function editTodo(e) {

    if (e.target.className === "fa fa-pencil btn btn-warning") {
        
        if (todoInput.value == "") {
            showAlert("warning","Lütfen En az 1 karakter giriniz.")
        }
        else{

            

            e.target.parentElement.parentElement.parentElement.innerHTML = todoInput.value + `
            <div class="d-flex justify-content-end">
                <a href="#" class="delete-item">
                    <i class="fa fa-remove btn btn-danger mr-2"></i>
                </a>
                <a href="#" class="edit-item">
                    <i class="fa fa-pencil btn btn-warning"></i>
                </a>
            </div>
            `;

            // deleteTodoFromStorage(e.target.parentElement.parentElement.parentElement.textContent);
            // addTodoToStorage(e.target.parentElement.parentElement.parentElement.textContent);
            todoInput.value = "";

            
            

            showAlert("info","Todo başarıyla güncellendi.");
        }
    }
}



function uploadToStorageEditedTodo(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem('todos',JSON.stringify(todos));
}






function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo) {
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("warning","Lütfen bir todo girin...");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        
        showAlert("success","Todo başarıyla eklendi.");
    }

    e.preventDefault();
}

function getTodosFromStorage() { // Storagedan Todoları Alma
    let todos; 

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem('todos',JSON.stringify(todos));
}

function showAlert(type,message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 3000);
}

function addTodoToUI(newTodo) { // String değerini UI'a ekleyecek
    const listItem = document.createElement("li");
    
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove btn btn-danger mr-2'></i>";
    
    const linkEdit = document.createElement("a");
    linkEdit.href="#";
    linkEdit.className = "edit-item";
    linkEdit.innerHTML = "<i class = 'fa fa-pencil btn btn-warning'></i>"

    listItem.className = "list-group-item d-flex justify-content-between align-items-center"
    listItem.appendChild(document.createTextNode(newTodo));
    
    const myDiv = document.createElement("div");
    myDiv.className ="d-flex justify-content-end"
    
    listItem.appendChild(myDiv);
    myDiv.appendChild(link)
    myDiv.appendChild(linkEdit)
    
    // listItem.appendChild(linkEdit);

    todoList.appendChild(listItem);
    
    todoInput.value = "";
    

            // Diğer ekleme yolu //
    // const listItem = document.createElement("li");
    // const listItemA = document.createElement("a");
    // const listItemIcon = document.createElement("i");

    // // <li>
    // listItem.className = "list-group-item d-flex justify-content-between"
    // listItem.id = todoInput.value;
    // listItem.appendChild(document.createTextNode(todoInput.value));

    // // <a>
    // listItemA.href = "#";
    // listItemA.className = "delete-item";

    // // <i>
    // listItemIcon.className = "fa fa-remove";

    // todoList.appendChild(listItem);
    // listItem.appendChild(listItemA);
    // listItemA.appendChild(listItemIcon);

    // todoInput.value = "";
    // //console.log(listItem);
} 