// Model

// we retrieve data
let todos;
// If localstorage has a todos array ,  then use it
// Otherwise use the default array.
// Retrieve localStorage
// Check if it's an array

let savedtodos = JSON.parse(window.localStorage.getItem('todo-key')); // converting localstorage value from string to object using JSON.parse()

if(Array.isArray(savedtodos)){
    todos = savedtodos;
} 
else {
    todos =[{
        title : 'Get groceries',
        dueDate : '2022-10-04',
        id : 'id1'
    },
    {
        title : 'Wash car',
        dueDate : '2022-10-07'  ,
        id:'id2'
    }];
}
render();
// create and delete a todo is about managing data so it comes in Model Section

// CREATES a todo
function createTodo(title, dueDate){
    const id = '' + new Date().getTime(); // change typeof id to String.
    // we will use object to have `title` and `dueDate` and `id` for each todo
    todos.push({
        title : title,    // key : value
        dueDate : dueDate,
        id:id
    });
    saveTodo();
}

// DELETES a todo
function removeTodo(idToDelete){
    todos = todos.filter( function (todo){
        if (todo.id === idToDelete){
            return false
        } else {
            return true
        }
    });
    saveTodo();
}

// using LocalStorage to save data in browser
function saveTodo(){
    window.localStorage.setItem('todo-key', JSON.stringify(todos))
}

//--Model

// Controller  :: controller is section which handles a event in view
function addTodo(){
    let textbox = document.getElementById('todoTitle');
    let title = textbox.value;
    const datePicker = document.getElementById('date-picker');
    let dueDate = datePicker.value;

    if (title === '' || dueDate === ''){
        alert('Is your input empty? or date not selected? ')
    } else {
        createTodo(title, dueDate);
        render();
        textbox.value = '';
    }
    
}

function deleteTodo(event){
 
    // delete garne kasari vanda, delete btn click garesi different events aucha, tesma id khojne ;; click garda huni id ra mathi array ma vako id same vaye 
    // delete that todo
    let idToDelete = event.target.id;
    // hamile todos array bata delete garne hoo so we use filter() method in that array; 
    // filter() returns copy of array so we can simply use same variable name.
    removeTodo(idToDelete);  
    render();
}
//-- Controller    

// View  :: it takes data , handles visual section so it is view Section
function render(){
    // reset our list
    document.getElementById('todoList').innerHTML='';
    /** 
    Using forEach makes it easy to select each element from array and perform function 
    on each element 
    */
    todos.forEach( function (todo){
        let newElem = document.createElement('div');
        newElem.innerText = todo.title + ' ' + todo.dueDate;

        let dltBtn = document.createElement('button');
        dltBtn.style='margin-left: 1.5rem; margin-top:0.15rem;'
        dltBtn.innerText='Delete';
        dltBtn.id = todo.id;
        dltBtn.onclick=deleteTodo;
        newElem.appendChild(dltBtn);
        let todoList = document.getElementById('todoList');
        todoList.appendChild(newElem)

    })
}
//--View