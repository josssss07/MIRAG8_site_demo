const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

function CreateToDoItem() {
  const todoText = todoValue.value.trim();

  // Skip length check if called after updating a todo item
  if (arguments[0] !== 3 && todoText.length === 0) {
      // todoAlert.innerText = "Please enter your todo text!";
      // setTimeout(() => {
      //     todoAlert.innerText = "";
      // }, 1000);
      todoValue.focus();
      return;
  }

  if (todo.some(item => item.item === todoText)) {
      todoAlert.innerText = "This item already exists in the list!";
      setTimeout(() => {
          todoAlert.innerText = "";
      }, 1000);
      todoValue.focus();
      return;
  }

  const li = document.createElement("li");
  const todoItemHTML = `
      <div title="Double click to mark as completed" data-item="${todoText}" ondblclick="CompletedToDoItem(this)">
          ${todoText}
      </div>
      <div>
          <img class="edit todo-controls" onclick="UpdateToDoItem(this)" src="images/editNote.webp" />
          <img class="delete todo-controls" onclick="DeleteToDoItem(this)" src="images/deleteNote.jpg" />
      </div>`;
  li.innerHTML = todoItemHTML;
  listItems.appendChild(li);

  const newItem = { item: todoText, status: false };
  todo.push(newItem);
  setLocalStorage();

  // Reset todo text field only if called for creating a new item
  if (arguments[0] !== 3) {
      todoValue.value = "";
      todoValue.focus();
  }

  todoAlert.innerText = "Todo item created successfully!";
  setTimeout(() => {
      todoAlert.innerText = "";
  }, 1000);
}


function CompletedToDoItem(element) {
    element.style.textDecoration = "line-through";
    const todoText = element.innerText.trim();
    const img = document.createElement("img");
    img.src = "images/tick.webp";
    img.className = "todo-controls";
    element.appendChild(img);

    todo.forEach((item) => {
        if (item.item === todoText) {
            item.status = true;
        }
    });
    setLocalStorage();
    todoAlert.innerText = "Todo item completed successfully!";
    setTimeout(() => {
        todoAlert.innerText = "";
    }, 1000);
    addUpdate.setAttribute("src", "images/addList.jpg");
    addUpdate.setAttribute("alt", "add");
}

addUpdate.addEventListener("click", function () {
    CreateToDoItem();
});

function DeleteToDoItem(element) {
    const deleteValue = element.parentElement.parentElement.querySelector("div").innerText.trim();
    if (confirm(`Are you sure you want to delete: ${deleteValue}?`)) {
        element.parentElement.parentElement.classList.add("deleted-item");
        todo = todo.filter((item) => item.item !== deleteValue);
        setLocalStorage();
        setTimeout(() => {
            element.parentElement.parentElement.remove();
            todoAlert.innerText = "Todo item deleted successfully!";
            setTimeout(() => {
                todoAlert.innerText = "";
            }, 1000);
        }, 1000); // Adjusted setTimeout to 1 second
    }
    addUpdate.setAttribute("src", "images/addList.jpg");
    addUpdate.setAttribute("alt", "add");
}

function UpdateToDoItem(element) {
  const todoText = element.parentElement.parentElement.querySelector("div").innerText.trim();
  todoValue.value = todoText;
  addUpdate.setAttribute("src", "images/tick.webp");
  addUpdate.setAttribute("alt", "Update");
  addUpdate.focus();
  addUpdate.onclick = function () {
      const result = UpdateOnSelectionItem(todoText, element);
      if (result !== 3) {
          // Reset the onclick event handler
          addUpdate.onclick = function () {
              CreateToDoItem();
          };
      }
  };
}


function UpdateOnSelectionItem(originalText) {
    const updatedText = todoValue.value.trim();

    // Check if the updated text is different from the original text
    if (updatedText !== originalText) {
        const existingItem = listItems.querySelector(`div[data-item="${originalText}"]`);
        if (existingItem) {
            todo.forEach((item) => {
                if (item.item === originalText) {
                    item.item = updatedText;
                }
            });

            existingItem.innerText = updatedText;
            setLocalStorage();
            todoAlert.innerText = "Todo item updated successfully!";
            setTimeout(() => {
                todoAlert.innerText = "";
            }, 1000);

            // Change the image back to the original one
            const editImg = existingItem.nextElementSibling.querySelector(".edit");
            editImg.src = "images/editNote.webp";
            todoValue.value = "";
            todoValue.focus();

            addUpdate.setAttribute("src", "images/addList.jpg");
            addUpdate.setAttribute("alt", "add");

            // Hide the edit image button
            editImg.style.display = "none";
            return; // Exit the function if the task is successfully updated
        }
    }

    // No changes made to the todo item, so no need to display a message
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function initializeToDoList() {
    todo.forEach((item) => {
        const li = document.createElement("li");
        const todoItems = `
            <div title="Double click to mark as completed" data-item="${item.item}" ondblclick="CompletedToDoItem(this)">
                ${item.item}
            </div>
            <div>
                <img class="edit todo-controls" onclick="UpdateToDoItem(this)" src="images/editNote.webp" />
                <img class="delete todo-controls" onclick="DeleteToDoItem(this)" src="images/deleteNote.jpg" />
            </div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

initializeToDoList();
