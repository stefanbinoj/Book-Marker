let formEl = document.getElementById("bookmarkForm");
let nameEl = document.getElementById("siteNameInput");
let urlEl = document.getElementById("siteUrlInput");
let btnEl = document.getElementById("submitBtn");
let errorMsg = "Required *";
let nameErrorEl = document.getElementById("siteNameErrMsg");
let urlErrorEl = document.getElementById("siteUrlErrMsg");
let ulEl = document.getElementById("bookmarksList");

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
nameEl.addEventListener("change", nameChecker);

urlEl.addEventListener("change", urlChecker);

let bookMark = [];

function addToArrayAndDisplay(element) {
    let name = element.NAME;
    let url = element.URL;

    let liEl = document.createElement("li");
    let paraEl = document.createElement("p");
    let aEl = document.createElement("a");
    paraEl.textContent = name;
    aEl.textContent = url;
    aEl.href = url;
    aEl.target = "_blank";
    liEl.classList.add("outer-card");
    paraEl.classList.add("paraEl");
    liEl.appendChild(paraEl);
    liEl.appendChild(aEl);
    ulEl.appendChild(liEl);



}

function loadArray() {
    let arr = localStorage.getItem("bookMarkManager");
    if (arr === null) {
        return;
    } else {
        bookMark = arr;
        console.log(bookMark);
        for (let each of bookMark) {
            addToArrayAndDisplay(each);
        }
    }

}
loadArray();




btnEl.addEventListener("submit", function(event) {
    event.preventDefault();
    nameChecker();
    urlChecker();
    if (nameEl.value === "" | urlEl.value === "") {
        alert("Fill the required fields");
        return;
    }



    let id = bookMark.length;
    id += 1;
    let name = nameEl.value;
    let url = urlEl.value;
    let mark = {
        NAME: name,
        URL: url,
        ID: id
    };
    bookMark.push(mark);

    addToArrayAndDisplay(mark);

    nameEl.value = "";
    urlEl.value = "";

    localStorage.setItem("bookMarkManager", bookMark);
})