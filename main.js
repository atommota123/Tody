const form = document.getElementById("add-task-form")
const addInput = document.getElementById("add-input")
const todosArea = document.querySelector(".todos-area")
const settingsIcon = document.querySelector("#settings-icon")
const settingsArea = document.querySelector(".settings-area")
const pendingTodosList = document.querySelectorAll(".todo-list")[0]
const completedTodosList = document.querySelectorAll(".todo-list")[1]
const categorieToday = document.querySelector("#today")
const categorieImportant = document.querySelector("#important")
const categorieSpecific = document.querySelector("#specific")
const categorieArea = document.querySelector(".categorie-area")
const categories = document.querySelectorAll(".categories")
const searchInput = document.querySelector("#search-input")



eventListeners()

function eventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        loadTodos()
        UI.updateCounters()
        UI.updateCompletedTitle()
        UI.loadTheme()
        updateDate()
    })
    form.addEventListener("submit", addTodo)


    settingsIcon.addEventListener("click", showSettingsArea)

    settingsArea.addEventListener("click", e => {
        changeTheme(e.target)
    })


    categories.forEach(categorie => {
        categorie.addEventListener("click", (e) => {

            // e.target.setAttribute("style", "background-color: black")
            changeShowingTodos(e.target.dataset.categorie)
        })
    })


    searchInput.addEventListener("keyup", searchTodo)
    
}

function uuidv4() {
    return ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

function addTodo(e) {

    const name = addInput.value
    const id = uuidv4()

    UI.addTodoToUI(id, name, false, false)
    Storage.addTodoToStorage(id, name, false, false)

    
    
    addInput.value = ""

    UI.updateCounters()
    e.preventDefault()
}

function loadTodos() {
    let todos = Storage.getTodosFromStorage()

    for(let todo of todos) {
        UI.addTodoToUI(todo.id, todo.name, todo.completed, todo.important)
    }

}

function deleteTodo(id, event) {
    UI.deleteTodoFromUI(event.target)
    Storage.deleteTodoFromStorage(id)

    UI.updateCounters()
    UI.updateCompletedTitle()
}

function makeImportant(id, event) {

    Storage.increaseImportantCount(id)
    UI.makeImportant(event)
    UI.updateCounters()

}

function completeTodo(id, event) {
    let todos = Storage.getTodosFromStorage()
    let currentTodo

    for(let todo of todos) {
        if(todo.id === id) {
            currentTodo = todo
        }
    }

    UI.completeTodo(id, event, currentTodo)
    Storage.completeTodo(id, todos)
    UI.updateCompletedTitle()
}

function showSettingsArea() {

    UI.showSettingsArea(settingsArea)
}

function changeTheme(themeButton) {
    UI.changeTheme(themeButton)
    Storage.saveTheme(themeButton.classList[1].toLowerCase())
}

function changeShowingTodos(categorieName) {



    if(categorieName === "today") {
        // const text = document.getElementById("today-text")
        // const icon = document.getElementById("today-icon")
        // UI.changeCategorieItemsColor(text, icon)
        UI.selectCategorieEffect(categorieToday, categorieImportant)
        UI.emptyTheList(pendingTodosList, completedTodosList)
        UI.showToday(loadTodos, pendingTodosList, completedTodosList)
    } else if(categorieName === "important") {
        // const text = document.getElementById("important-text")
        // const icon = document.getElementById("important-icon")
        // UI.changeCategorieItemsColor(text, icon)
        UI.selectCategorieEffect(categorieImportant, categorieToday)
        UI.emptyTheList(pendingTodosList, completedTodosList)
        UI.showImportant(pendingTodosList, completedTodosList)
    }
}

function searchTodo(e) {
    UI.filterTodos(searchInput.value)
}

function updateDate() {
    const dateText = document.querySelector("#date")
    const now = new Date()

    const day = now.getDay()
    const month = now.getMonth()
    const date = now.getDate()

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]


    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    
    dateText.innerHTML = `${days[day]}, ${months[month]} ${date}`
}