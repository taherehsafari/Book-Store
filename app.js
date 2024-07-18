// Select Elements
let body = document.body
let form = document.querySelector(".form-container")
let file = document.querySelector('#book-photo');
let title = document.querySelector("#title")
let author = document.querySelector("#author")
let year = document.querySelector("#year")
let genre = document.querySelector("#genre")
let addBookBtn = document.getElementById("addBtn")
let submitBtn = document.getElementById("btn-submit")
let closeBtn = document.getElementById("btn-close-popup")

// Add Event Listner
addBookBtn.addEventListener("click", togglePopup)
submitBtn.addEventListener("click", addBookToList )
closeBtn.addEventListener("click", togglePopup)

// ---------- Functions ----------

// Form Pop Up Function
function togglePopup() { 
    let overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show'); 
} 

// Array For Saving Book Data
let bookList = []

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
function NewBook(bookDetails) {

    this.file = bookDetails.file
    this.title = bookDetails.title
    this.author = bookDetails.author
    this.year = bookDetails.year
    this.genre = bookDetails.genre

}

// Add New Book To Book List
function addBookToList(e) {

    e.preventDefault()

    // Get Input Data
    let bookData = getBookData()
  
    // New Book Object 
    let newBook = new NewBook(bookData)
  
    // Add The New Book To The Beginning Of The List
    bookList.unshift(newBook)

    // Close The Pup Up After Submit
    togglePopup()

    // Reset the Form
    form.reset()

    previewFile()
    displayList()

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
        let img = document.createElement('img')

        li.textContent = `Title: ${book.title} -- Author: ${book.author} -- Year: ${book.year} -- Genre: ${book.genre}`
        img.src = URL.createObjectURL(book.file);

        li.appendChild(img)
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