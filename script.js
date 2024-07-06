
let formEl = document.getElementById("bookmarkForm");
let nameEl = document.getElementById("siteNameInput");
let urlEl = document.getElementById("siteUrlInput");
let btnEl = document.getElementById("submitBtn");
let errorMsg = "Required *";
let nameErrorEl = document.getElementById("siteNameErrMsg");
let urlErrorEl = document.getElementById("siteUrlErrMsg");
let ulEl = document.getElementById("bookmarksList");

function loadArray() {
    let stringifiedArr = localStorage.getItem("bookMarkManager");
    let parsedArr=JSON.parse(stringifiedArr);
    console.log("the array is : ",parsedArr);
    if (parsedArr === null) {
        return [];
    } else {
        return parsedArr;
    }

}
let bookMark = loadArray();
let bookMarkCount=bookMark.length;
console.log(bookMarkCount);

function nameChecker() {
    if (nameEl.value === "") {
        nameErrorEl.textContent = errorMsg;
        nameErrorEl.classList.add("error-msg");
    }
}

function urlChecker() {
    if (urlEl.value === "") {
        urlErrorEl.textContent = errorMsg;
        urlErrorEl.classList.add("error-msg");
    }
}
nameEl.addEventListener("blur", nameChecker);

urlEl.addEventListener("blur", urlChecker);

function onDeleteTodo(labelId){
    let labelElement = document.getElementById(labelId);
    ulEl.removeChild(labelElement);
    
    let deleteElementIndex = bookMark.findIndex(function(eachMark) {
    let eachMarkId ="label"+ eachMark.ID;
    if (eachMarkId === labelId) {
      return true;
    } else {
      return false;
    }
  });

  bookMark.splice(deleteElementIndex, 1);
  localStorage.setItem("bookMarkManager", JSON.stringify(bookMark));
}

function addToArrayAndDisplay(element) {
    

    let liEl = document.createElement("li");
    let smallContainerEl=document.createElement("div");
    smallContainerEl.classList.add("d-flex", "flex-row");
    let paraEl = document.createElement("p");
    let aEl = document.createElement("a");
    let labelId = "label" + element.ID;
    liEl.id=labelId;
    paraEl.textContent = element.NAME;
    aEl.textContent = element.URL;
    aEl.href = element.URL;
    aEl.target = "_blank";
    liEl.classList.add("outer-card");
    paraEl.classList.add("paraEl");
    smallContainerEl.appendChild(paraEl);
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    smallContainerEl.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function () {
    onDeleteTodo(labelId);
    };

    deleteIconContainer.appendChild(deleteIcon);
    
    liEl.appendChild(smallContainerEl);
    liEl.appendChild(aEl);
    ulEl.appendChild(liEl);



}

for (let mark of bookMark) {
  addToArrayAndDisplay(mark);
}



formEl.addEventListener("submit", function(event) {
    console.log("Enteered");
    event.preventDefault();
    nameChecker();
    urlChecker();
    if (nameEl.value === "" || urlEl.value === "") {
        alert("Fill the required fields");
        return;
    }



    bookMarkCount=bookMarkCount+1;
    let name = nameEl.value;
    let url = urlEl.value;
    let newBookMark={
        NAME:name,
        URL:url,
        ID:bookMarkCount
    };
    bookMark.push(newBookMark);

    addToArrayAndDisplay(newBookMark);

    nameEl.value = "";
    urlEl.value = "";

    localStorage.setItem("bookMarkManager", JSON.stringify(bookMark));
})