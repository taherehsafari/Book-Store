// Select Elements
let body = document.body
let form = document.querySelector(".form-container")
let file = document.querySelector('#book-photo');
let title = document.querySelector("#title")
let author = document.querySelector("#author")
let year = document.querySelector("#year")
let genre = document.querySelector("#select-genre")
let filterBtn = document.getElementById("filter-btn")
let searchBtn = document.getElementById("search-btn")
let addBookBtn = document.getElementById("addBtn")
let submitBtn = document.getElementById("btn-submit")
let closeBtn = document.getElementById("btn-close-popup")

// Add Event Listner
addBookBtn.addEventListener("click", togglePopup)
submitBtn.addEventListener("click", checkForm )
closeBtn.addEventListener("click", togglePopup)
filterBtn.addEventListener("click" , filterBook)
searchBtn.addEventListener("click", searchBook)

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
            <p>نویسنده: ${book.author}</p>
            <p>سال انتشار: ${book.year}</p>
            <p>ژانر: ${book.genre}</p>
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

    let storedBooks = localStorage.getItem("bookList")

    if (storedBooks) {
        try {
        bookList = JSON.parse(storedBooks)
        } catch (error) {
        bookList = []
        }
    } else {
        bookList = [
        {
            file: "",
            title: "کتاب اول",
            author: "اسم نویسنده",
            year: "1400",
            genre: "فانتزی"
        },
        {
            file: "",
            title: "کتاب دو",
            author: "اسم نویسنده",
            year: "1400",
            genre: "معمایی"
        },
        {
            file: "",
            title: "کتاب سه",
            author: "اسم نویسنده",
            year: "1400",
            genre: "رمان"
        },
        {
            file: "",
            title: "کتاب چهار",
            author: "اسم نویسنده",
            year: "1400",
            genre: "تاریخی"
        },
        ];
    }

  displayList()
}

  

// Filter Books
function filterBook(){

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
            <p>نویسنده: ${book.author}</p>
            <p>سال انتشار: ${book.year}</p>
            <p>ژانر: ${book.genre}</p>
          `
          bookListContainer.appendChild(li);
        }
    }
    else {
        // Display a message if no books match the filter
        bookListContainer.innerHTML = `<p> کتابی با این ژانر پیدا نشد. </p>`;
    }
}

// Search Books
function searchBook(){

    // Get The Search Input Value
    let searchBox = document.querySelector("#search-books").value.toLowerCase()

    let searchedTitle = []

    if (searchBox) {
        searchedTitle = bookList.filter((book) => book.title.toLowerCase().includes(searchBox))
    }

    // Clear the existing book list display
    let bookListContainer = document.getElementById("book-container")
    bookListContainer.textContent = ""

    if (searchedTitle.length > 0) {
        for (let book of searchedTitle) {
        let li = document.createElement('li');
        li.innerHTML = `
            <img src="./img/book-img.jpg" alt="${book.title} Book Cover">
            <h2>${book.title}</h2>
            <p>نویسنده: ${book.author}</p>
            <p>سال انتشار: ${book.year}</p>
            <p>ژانر: ${book.genre}</p>
        `;
        bookListContainer.appendChild(li);
        }
    } else {
        // Display a message if no books match the search
        bookListContainer.innerHTML = `<p> کتابی به اسم "${searchBox}" پیدا نشد. </p>`;
    }

}