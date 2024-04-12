const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}

function CreateToDoItems() {
    const todoValue = document.getElementById("todoText").value;
    const todoAlert = document.getElementById("Alert");
    const listItems = document.getElementById("list-items");
  
    if (todoValue === "") {
      todoAlert.innerText = "Please enter your todo text!";
      document.getElementById("todoText").focus();
    } else {
      let isPresent = false;
      todo.forEach((element) => {
        if (element.item == todoValue) {
          isPresent = true;
        }
      });
  
      if (isPresent) {
        setAlertMessage("This item already present in the list!");
        return;
      }
  
      const li = document.createElement("li");
      const todoItems = `
        <div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">
          ${todoValue}
        </div>
        <div>
          <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/editNote.webp" />
          <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/deleteNote.jpg" />
        </div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
  
      const itemList = { item: todoValue, status: false };
      todo.push(itemList);
      setLocalStorage();
    }
    document.getElementById("todoText").value = "";
    setAlertMessage("Todo item Created Successfully!");
  }
  

  function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="todo-controls" src="images/tick.webp" />'
      }</div><div>
      ${
        style === ""
          ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/editNote.webp" />'
          : ""
      }
      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/deleteNote.jpg" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
    });
  }
  ReadToDoItems();

  function UpdateToDoItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      todoValue.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      addUpdate.setAttribute("src", "images/tick.webp");
      todoValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
  
    todo.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = todoValue.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "images/plus.png");
    todoValue.value = "";
    setAlertMessage("Todo item Updated Successfully!");
  }

  function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();
  
      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
  
      setLocalStorage();
    }
  

  function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const img = document.createElement("img");
      img.src = "images/tick.webp";
      img.className = "todo-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(img);
      e.parentElement.querySelector("img.edit").remove();
  
      todo.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });
      setLocalStorage();
      setAlertMessage("Todo item Completed Successfully!");
    }
  }

  function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
  }

  function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
      todoAlert.classList.add("toggleMe");
    }, 1000);
  } 