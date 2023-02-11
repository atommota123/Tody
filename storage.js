class Storage {
    

    static getTodosFromStorage() {
        let todos

        if(!localStorage.getItem("todos")) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem("todos"))
        }

        return todos
    }

    static addTodoToStorage(id, name, completed, important) {
        let todos = this.getTodosFromStorage()
        const todo = new Todo(id, name, completed, important)

        todos.push(todo)

        localStorage.setItem("todos", JSON.stringify(todos))
    }

    static deleteTodoFromStorage(id) {
        let todos = this.getTodosFromStorage()

        todos.forEach((todo, index) => {
            if(todo.id === id) {
                todos.splice(index, 1)
            }
        })


        localStorage.setItem("todos", JSON.stringify(todos))


    }

    static completeTodo(id, todos) {
        for(let todo of todos) {
            if(todo.id === id) {
                todo.completed = todo.completed ? false : true
            }
        }

        localStorage.setItem("todos", JSON.stringify(todos))
    }

    static increaseImportantCount(id) {
        let todos = this.getTodosFromStorage()

        todos.forEach((todo, index) => {
            if(todo.id === id) {
                if(!todo.important) {
                    todo.important = !todo.important
                } else {
                    todo.important = !todo.important
                }
            }
        })

        localStorage.setItem("todos", JSON.stringify(todos))
    }

    
    static saveTheme(themeName) {
        
        localStorage.setItem("theme", themeName)
    }


}