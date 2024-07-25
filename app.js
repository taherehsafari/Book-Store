// Select Elements
let body = document.body
let form = document.querySelector(".form-container")
let file = document.querySelector('#book-photo');
let title = document.querySelector("#title")
let author = document.querySelector("#author")
let year = document.querySelector("#year")
let genre = document.querySelector("#select-genre")
let filterBtn = document.getElementById("filter-btn")
let addBookBtn = document.getElementById("addBtn")
let submitBtn = document.getElementById("btn-submit")
let closeBtn = document.getElementById("btn-close-popup")

// Add Event Listner
addBookBtn.addEventListener("click", togglePopup)
submitBtn.addEventListener("click", checkForm )
closeBtn.addEventListener("click", togglePopup)
filterBtn.addEventListener("click" , filterBook)

// ---------- Functions ----------

// Form Pop Up Function
function togglePopup() { 
    let overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show'); 
} 

// Array For Saving Book Data
let bookList = []

loadBooksFromStorage()

// Get Book Data
function getBookData() {
    
    // Get values from Form Elements
    let fileVal = file.files[0]
    let titleVal = title.value
    let authorVal = author.value
    let yearVal = year.value
    let genreVal = genre.value
  
    // Return Book Data As Object
    return {
        file: fileVal,
        title: titleVal,
        author: authorVal,
        year: yearVal,
        genre: genreVal,
    };
}

// Function That Creates Book Object
function Book(bookDetails) {

    this.file = bookDetails.file
    this.title = bookDetails.title
    this.author = bookDetails.author
    this.year = bookDetails.year
    this.genre = bookDetails.genre

}

function checkForm(e){

    e.preventDefault()

    if(title.value !== "" && author.value !== "" && year.value !=="" && genre.value !==""){
        addBookToList()
    }
    
    else{
        alert("Complete The Form Please!")
    }
}

// Add New Book To Book List
function addBookToList() {

    // Get Input Data
    let bookData = getBookData()
  
    // New Book Object 
    let newBook = new Book(bookData)
  
    // Add The New Book To The Beginning Of The List
    bookList.unshift(newBook)

    // Close The Pup Up After Submit
    togglePopup()

    // Reset the Form
    form.reset()

    previewFile()
    displayList()

    // Save To Local Storage
    localStorage.setItem("bookList", JSON.stringify(bookList))

    console.log(bookList)
}

// Display The Book List
function displayList() {

    let bookListContainer = document.getElementById("book-container")

    // Clear The Container Before Adding New Items
    if (bookListContainer) {
        bookListContainer.textContent = ""
    }

    for (let book of bookList) {

        let li = document.createElement('li')

        li.innerHTML = `
            <img src="./img/book-img.jpg" alt="${book.title} Book Cover">
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <p>Genre: ${book.genre}</p>
        `
        bookListContainer.appendChild(li)

    }

}

// Upload Book Photo
function previewFile() {
    let preview = document.querySelector('img');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

}

function loadBooksFromStorage() {
    
    if (localStorage.getItem("bookList")) {
      bookList = JSON.parse(localStorage.getItem("bookList"));
      displayList()
    }
}
  

// Filter Books
function filterBook(){
    
    // Array For Selected Genres
    // let selectedGenres = []

    // Get Selected Genre Value
    let checkedBoxes = document.querySelector('input[name="filter-genre"]:checked').value
    console.log(checkedBoxes)
    // Filter Book List Based on Genre
    let filteredBooks = bookList.filter((book) => book.genre === checkedBoxes)

    // Clear the existing book list display
    let bookListContainer = document.getElementById("book-container")
    bookListContainer.textContent = ""

    if (filteredBooks.length > 0) {

        for (let book of filteredBooks) {
          let li = document.createElement('li');
          li.innerHTML = `
            <img src="./img/book-img.jpg" alt="${book.title} Book Cover">
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <p>Genre: ${book.genre}</p>
          `
          bookListContainer.appendChild(li);
        }
    }
    else {
        // Display a message if no books match the filter
        bookListContainer.innerHTML = `<p> No books found </p>`;
    }
}
