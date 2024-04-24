let cards;
let body;
let wrapperModel ;
let currentNode;
let nodeNew;
function initializeCards() {
  cards = document.querySelectorAll(".card");
  body = document.querySelector("body");
  console.log(cards);
}

function addListenerToCard() {
  Array.from(cards).forEach(function (card) {
    card.addEventListener("click", openModel);
  });
}



function addElement(node) {
    let newlist = node;
     wrapperModel = document.createElement("div");
  nodeNew = document.createElement("div");
  wrapperModel.classList.add("model_wrapper");
  nodeNew.classList.add("Model");
  console.log(node);
  Array.from(newlist).forEach(function(node){nodeNew.appendChild(node);});
  body.classList.add("disabled");
  wrapperModel.appendChild(nodeNew);
  body.appendChild(wrapperModel);
  
  addListenerToWrapperModel();
}

function addListenerToWrapperModel(){
wrapperModel.addEventListener("click", (e)=>{

  e.stopPropagation()
  nodeNew.classList.remove("Model");
  wrapperModel.classList.remove("model_wrapper");
    body.removeChild(wrapperModel);
    Array.from(wrapperModel.children).forEach((child)=>{currentNode.appendChild(child);});


});
}


export { initializeCards, addListenerToCard };
