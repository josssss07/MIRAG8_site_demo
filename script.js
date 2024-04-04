const wrapper = document.querySelectorAll(".wrapper");
const carousel = document.querySelectorAll(".carousel");
const firstCardWidth = carousel[0].querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [];
for (let i = 0; i < carousel.length; i++) {
  carouselChildrens.push([...carousel[i].children]);
}
let i = 0;

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel[0].offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.forEach(function (element) {
  console.log("run after begin");
  element
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel[i].insertAdjacentHTML("afterbegin", card.outerHTML);
    });
  console.log(carousel);
  i++;
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
i = 0;
carouselChildrens.forEach(function (element) {
  console.log("run bbefore begin");
  element.slice(0, cardPerView).forEach((card) => {
    carousel[i].insertAdjacentHTML("beforeend", card.outerHTML);
  });
  i++;
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
for (let i = 0; i < carousel.length; i++) {
  carousel[i].classList.add("no-transition");
  carousel[i].scrollLeft = carousel[i].offsetWidth;
  carousel[i].classList.remove("no-transition");
}

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = function (e) {
  isDragging = true;
  console.log("dragstart");
  this.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = this.scrollLeft;
};

const dragging = function (e) {
  console.log("dragging");
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement\
  this.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = function () {
  console.log("dragstop");
  isDragging = false;
  this.classList.remove("dragging");
};

const infiniteScroll = function () {
  // If the carousel is at the beginning, scroll to the end
  if (this.scrollLeft === 0) {
    this.classList.add("no-transition");
    this.scrollLeft = this.scrollWidth - 2 * this.offsetWidth;
    this.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(this.scrollLeft) === this.scrollWidth - this.offsetWidth) {
    this.classList.add("no-transition");
    this.scrollLeft = this.offsetWidth;
    this.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  autoPlay();
};


let index=0;
function scrollCarousel() {
  if(carousel!=undefined){
  carousel[index].scrollLeft += firstCardWidth;
  index++;
  
  if (index === carousel.length) {
    console.log("inside");
    index = 0;
  }}}

const autoPlay = function () {
  console.log("play")
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms

  timeoutId = setTimeout(scrollCarousel, 2500);


};


carousel.forEach(function (carousal) {
  carousal.addEventListener("mousedown", dragStart);
});
carousel.forEach(function (carousel) {
  carousel.addEventListener("mousemove", dragging);
});
carousel.forEach(function (carousel) {
  carousel.addEventListener("mouseup", dragStop);
});
carousel.forEach(function (carousel) {
  carousel.addEventListener("scroll", infiniteScroll);
});
wrapper.forEach(function (wrapper) {
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
});
// wrapper.forEach(function (wrapper) {
//   wrapper.addEventListener("mouseleave", autoPlay);
// });


//to-do List
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
  
    if (confirm(`Proceeding to delete this task: ${deleteValue}!`)) {
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