class UI {

    static addTodoToUI(id, name, completed, important) {
        const todo = new Todo(id, name, completed, important)
        const pendingTodosList = document.querySelectorAll(".todo-list")[0]
        const completedTodosList = document.querySelectorAll(".todo-list")[1]

        if(completed) {
            completedTodosList.innerHTML += this.createElement(id, name, completed, important)
        } else {
            pendingTodosList.innerHTML += this.createElement(id, name, completed, important)            
        }




    }

    static deleteTodoFromUI(button) {
        button.parentElement.parentElement.remove()
    }

    static createElement(id, name, completed, important) {
        return `
        <li class="todos">
                      <div style="display: flex;">
                       <input type="checkbox" title="important" ${completed ? "checked" : ""} onclick="completeTodo('${id}', event)" class="check" id="deneme">
                        
                       <p>${name}</p>
                            
                </div>

                <div class="functions">
                    <img src="./icons/${important ? "star" : "star-outline"}.svg" data-value="${important ? 1 : 0}" onclick="makeImportant('${id}', event)" title="important" class="make-important" alt="">
                    <img src="./icons/trash-outline.svg" onclick="deleteTodo('${id}', event)" class="trash" alt="">
                </div>
            </li>
        
        `
    }

    static makeImportant(event) {
        
        // if(event.target.src == "./icons/star.svg") {
        //     event.target.src = "./icons/star-outline.svg"
        // } else if(event.target.src == "./icons/star-outline.svg") {
        //     event.target.src = "./icons/star.svg"
        // }


        if(event.target.dataset.value == 1) {
            event.target.setAttribute("data-value", 0)
            event.target.src = "./icons/star-outline.svg"
        } else {
            event.target.setAttribute("data-value", 1)
            event.target.src = "./icons/star.svg"
        }
        
    }


    static completeTodo(id, event, todo) {


        console.log(todo.id, todo.name, todo.completed, todo.important)


        const pendingTodosList = document.querySelectorAll(".todo-list")[0]
        const completedTodosList = document.querySelectorAll(".todo-list")[1]
        event.target.parentElement.parentElement.remove()

        if(todo.completed) {
            pendingTodosList.innerHTML += this.createElement(todo.id, todo.name, !todo.completed, todo.important)
        } else {
            completedTodosList.innerHTML += this.createElement(todo.id, todo.name, !todo.completed, todo.important)
        }

        
    }



    static updateCounters() {
        let todos = Storage.getTodosFromStorage()

        const todayTodosCount = document.getElementById("today-todos-count")
        const importantTodosCount = document.getElementById("important-todos-count")
        const specificTodosCount = document.getElementById("specific-todos-count")


        let todayCount = 0
        let importantCount = 0
        let specificCount = 0

        todos.forEach(todo => {
            if(todo.important === true) {
                importantCount++
            }
        })

        importantTodosCount.textContent = importantCount > 0 ? importantCount : ""

        todayTodosCount.textContent = todos.length > 0 ? todos.length : ""


    }


    static updateCompletedTitle() {
        const completedTitle = document.querySelector(".completed-title")

        let todos = Storage.getTodosFromStorage()
        
        let completedTodosCount = 0

        for(let todo of todos) {
            todo.completed === true ? completedTodosCount++ : ""
        }

        if(completedTodosCount > 0) {
            completedTitle.style.display = "block"
        } else {
            completedTitle.style.display = "none"
        }
    }

    static showSettingsArea(settingsArea) {
        if(settingsArea.style.display == "block") {
            settingsArea.style.display = "none"
        } else {
            settingsArea.style.display = "block"
        }
    }

    static changeTheme(themeButton) {
        document.body.className = themeButton.classList[1].toLowerCase()
    }

    static loadTheme() {
        let theme
        if(!localStorage.getItem("theme")) {
            theme = "dark"
        } else {
            theme = localStorage.getItem("theme")
        }
        document.body.className = theme
    }

    static showToday(loadTodos, pendingTodosList, completedTodosList) {
        loadTodos()
    }

    static showImportant(pendingTodosList, completedTodosList) {



        let todos = Storage.getTodosFromStorage()

        for(let todo of todos) {
            if(todo.important && todo.completed == false) {
                pendingTodosList.innerHTML += this.createElement(todo.id, todo.name, false, true )
            } else if(todo.important && todo.completed) {
                completedTodosList.innerHTML += this.createElement(todo.id, todo.name, true, true )
            }
        } 
    }

    static emptyTheList(pendingTodosList, completedTodosList) {
        pendingTodosList.innerHTML = ""
        completedTodosList.innerHTML = ""
    }


    static selectCategorieEffect(select, unselect) {
        select.classList.add("selected")
        unselect.classList.remove("selected")
    }

    // static changeCategorieItemsColor(text, icon) {
    //     text.style.color = "var(--selected-text-color)"
    //     icon.style.filter = "var(--selected-icon-color)"
    // }

    static filteredTodos(value) {
        let todos = Storage.getTodosFromStorage()
        for(let todo of todos) {
            if(todo.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                
                if(todo.completed) {
                    completedTodosList.innerHTML += this.createElement(todo.id, todo.name, todo.completed, todo.important)
                } else {
                    pendingTodosList.innerHTML += this.createElement(todo.id, todo.name, todo.completed, todo.important)
                }
            }
        }
    }

    static filterTodos(value) {
        const addForm = document.querySelector(".add-task")
        
        const completedTodosList = document.querySelectorAll(".todo-list")[1]
        const pendingTodosList = document.querySelectorAll(".todo-list")[0]

        if(value != "") {
            addForm.setAttribute("style", "display: none;")
            this.emptyTheList(completedTodosList, pendingTodosList)
            this.filteredTodos(value)
        } else {
            addForm.setAttribute("style", "display: block;")
            this.emptyTheList(completedTodosList, pendingTodosList)
            this.filteredTodos(value)
        }
    }

}
