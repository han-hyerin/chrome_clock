const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput= toDoForm.querySelector("input"),
    todoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); 
    //js object를 string으로 저장되도록 함
}

function paintToDo(text){
    const li= document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "no";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: toDos.length+1
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null ) {
        const parsedToDos = JSON.parse(loadedToDos)
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}

function init() {
 loadToDos();
 toDoForm.addEventListener("submit", handleSubmit);
}
init();