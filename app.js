const settingsBtn = document.querySelector("#settings-icon")
const settingsAreaDiv = document.querySelector(".settings-area")
const themeStyleFile = document.querySelector("#theme-style-file")
const todosArea = document.querySelector(".todos-area")
const addTaskForm = document.querySelector("#add-task-form")
const pendingTodosList = document.querySelectorAll(".todo-list")[0]
const completedTodosList = document.querySelectorAll(".todo-list")[1]
const completedTitle = document.querySelector(".completed-title")
const todayTodosCount = document.querySelector("#today-todos-count")
const importantTodosCount = document.querySelector("#important-todos-count")
const specificTodosCount = document.querySelector("#specific-todos-count")


document.addEventListener("DOMContentLoaded", e => {
    loadTodos()
    getDate()
    
    if(!localStorage.getItem("theme")) {
        document.body.className = "dark"
    } else {
        document.body.className = localStorage.getItem("theme")
    }
})
addTaskForm.addEventListener("submit", addTodoToUI)
settingsBtn.addEventListener("click", showSettings)
settingsAreaDiv.addEventListener("click", e => {
    if(e.target.classList.contains("theme")) {
        changeTheme(e)
    }
})


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4()); 
}

// ADD TO DO

function createElementModel(todoName, id, isImportant, isCompleted) {
    return `
    <li class="todos">
        <div style="display: flex;">
            <input type="checkbox" onclick="completeData(event, '${id}')" ${isCompleted ? "checked" : ""} title="important" class="check" id="deneme">
                        
            <p>${todoName}</p>
                            
        </div>

        <div class="functions">
            <img src="./icons/${isImportant ? "star" : "star-outline"}.svg" onclick="makeImporant(event, '${id}')" title="important" class="make-important" alt="">
            <img src="./icons/trash-outline.svg" onclick="deleteTodo(event, '${id}')" class="trash" alt="">
        </div>
    </li>`
}



function loadTodos() {
    let data = getDataFromStorage()

    for(let todo of data) {
        if(!todo.completed) {
            pendingTodosList.innerHTML += createElementModel(todo.text, todo.id, todo.important, todo.completed)
        } else {
            completedTodosList.innerHTML += createElementModel(todo.text, todo.id, todo.important, todo.completed)
        }
    }

    updateCompletedTitle()
    updateCounters()
}   

function getDataFromStorage() {
    let data;

    if(!localStorage.getItem("data")) {
        data = []
    } else {
        data = JSON.parse(localStorage.getItem("data"))
    }

    return data
}


function saveData(todoName, id) {
    if(!localStorage.getItem("data")) {
        let dataModel = [
            {id: id, text: todoName, completed: false, important: false}
        ]

        localStorage.setItem("data", JSON.stringify(dataModel))

    } else {
        let data = JSON.parse(localStorage.getItem("data"))
        data.push({id: id, text: todoName, completed: false, important: false})
        localStorage.setItem("data", JSON.stringify(data))
    }
}

function addTodoToUI(e) {
    e.preventDefault()

    const id = guidGenerator()
    let addInput = e.target.lastElementChild
    pendingTodosList.innerHTML += createElementModel(addInput.value, id)

    saveData(addInput.value, id)

    addInput.value = ""

    updateCounters()
}

function deleteTodo(e, id) {
    let data = getDataFromStorage()

    data.forEach((todo, index) => {
        if(todo.id === id) {
            data.splice(index, 1)
        }
    });

    e.target.parentElement.parentElement.remove()

    localStorage.setItem("data", JSON.stringify(data))
    
    updateCompletedTitle()
    updateCounters()
}


function makeImporant(e, id) {
    let data = getDataFromStorage()

    for(let todo of data) {
        if(todo.id === id) {
            if(todo.important === false) {
                todo.important = true
                e.target.src = "./icons/star.svg"
            } else {
                todo.important = false
                e.target.src = "./icons/star-outline.svg"
            }
        }
    }

    localStorage.setItem("data", JSON.stringify(data))

    updateCounters()
}

function completeData(e, id) {
    let data = getDataFromStorage()

    for(let todo of data) {
        if(todo.id === id) {
            if(todo.completed === true) {
                todo.completed = false
                e.target.removeAttribute("checked")
                e.target.parentElement.parentElement.remove()
                pendingTodosList.innerHTML += createElementModel(todo.text, todo.id, todo.important, todo.completed)
                updateCompletedTitle()
            } else {
                todo.completed = true
                e.target.parentElement.parentElement.remove()
                completedTodosList.innerHTML += createElementModel(todo.text, todo.id, todo.important, todo.completed)
                updateCompletedTitle()
                
            }
        }
    }


    localStorage.setItem("data", JSON.stringify(data))
}

function updateCompletedTitle() {
    if(completedTodosList.children.length > 0) {
        completedTitle.setAttribute("style", "display: block")
    } else {
        completedTitle.setAttribute("style", "display: none")
    }
}

function updateCounters() {
    let data = getDataFromStorage()

    todayTodosCount.textContent = data.length === 0 ? "" : data.length

    let i = 0

    for(let todo of data) {
        if(todo.important) {
            i++
        }
    }
    
    importantTodosCount.textContent = i === 0 ? "" : i
}

function showSettings() {

    if(settingsAreaDiv.style.display === "none") {
        settingsAreaDiv.style.display = "block"
    } else {
        settingsAreaDiv.style.display = "none"
    }
}

function changeTheme(e) {
    let theme = e.target.textContent.toLowerCase()
    document.body.className = theme

    localStorage.setItem("theme", theme)
}

function getDate() {
    const dateText = document.querySelector("#date")
    const now = new Date()

    const day = now.getDay()
    const month = now.getMonth()
    const date = now.getDate()

    console.log(day, month, date)

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