let task = document.getElementById('task')

let clearBtn = document.getElementById('clearBtn')

let toastBox = document.getElementById('toastBox')

let addedMsg = '<i class="fa-solid fa-circle-check"></i> Task added successfully'

let updateMsg = '<i class="fa-solid fa-circle-check"></i> Task updated successfully'

let completeMsg = '<i class="fa-solid fa-circle-check"></i> Task completed'

let deleteMsg = '<i class="fa-solid fa-circle-exclamation"></i> Task deleted successfully'

let deleteAllMsg = '<i class="fa-solid fa-circle-exclamation"></i> Tasks deleted successfully'

let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid input'

// Container array to carry data inserted into local storage
let containerTask = []

if( localStorage.getItem('toDoList') === null ) {
    containerTask = []
    // Remove Clear All button if array is empty
    clearBtn.classList.remove('d-flex')
    clearBtn.classList.add('d-none')
} else {
    containerTask = JSON.parse(localStorage.getItem('toDoList'));
    displayTasks()

    // Remove Clear All button if array is empty
    if (containerTask.length === 0) {
        clearBtn.classList.remove('d-flex');
        clearBtn.classList.add('d-none');
    } else {
        // Add Clear All button if array is !empty
        clearBtn.classList.remove('d-none');
        clearBtn.classList.add('d-flex');
    }

}

// Show data
function displayTasks() {
    let container = "";

    for(var i = 0; i < containerTask.length; i++) {
        let checkIcon = containerTask[i].completed ? `<i class="fa-solid fa-circle-check"></i>` : ''
        let decoration = containerTask[i].completed ? 'text-decoration: line-through' : ''
        container += `
        
            <div class="task">

                <h4 class="title"><span onclick="completeTask(${i})" class="check">${checkIcon}</span> <span style="${decoration}"> ${containerTask[i].myTask} </span> </h4>

                <div class="updateDelete">

                    <span onclick='updateTask(${i});' class="update"><i class="fa-regular fa-pen-to-square"></i></span>

                    <span onclick='deleteTask(${i})' class="delete"><i class="fa-solid fa-xmark"></i></span>

                </div>

            </div>
        
        `
    }

    document.getElementById('tasks').innerHTML = container  
}

// Add task 
function addTask(e) {
    e.preventDefault();

    var tasks = {
        myTask : task.value
    }

    // Check input value 
    if(tasks.myTask === '') {
        showToast(invalidMsg)
    } else {
        containerTask.push( { myTask : task.value, completed : false } )
        localStorage.setItem('toDoList', JSON.stringify(containerTask))
        showToast(addedMsg)
        task.value = ''
        clearBtn.classList.remove('d-none')
        clearBtn.classList.add('d-flex')
        displayTasks()
    }
}

document.getElementById('taskForm').addEventListener('submit', addTask);

// Delete Function
function deleteTask(i) {
    containerTask.splice(i, 1) // Remove task from containerTask
    localStorage.setItem('toDoList', JSON.stringify(containerTask)) // Update local storage after deleting
    if(containerTask.length !== 0) {
        clearBtn.classList.remove('d-none')
        clearBtn.classList.add('d-flex')
    } else {
        clearBtn.classList.add('d-none')
        clearBtn.classList.remove('d-flex')
    }
    showToast(deleteMsg)
    displayTasks()
}

// Update Function
function updateTask(i) {
    task.value = containerTask[i].myTask
    for(var j = 0; j < containerTask.length; j++) {
        if(containerTask[i].myTask === containerTask[j].myTask ) {
            containerTask.splice(i, 1)
            localStorage.setItem('toDoList', JSON.stringify(containerTask))
        }
    }
    displayTasks()
    showToast(updateMsg)
}

// Task completed
function completeTask(i) {
    containerTask[i].completed = !containerTask[i].completed
    localStorage.setItem('toDoList', JSON.stringify(containerTask))
    if(containerTask[i].completed) {
        showToast(completeMsg)
    }
    displayTasks()
}

// Clear all tasks
function clearAll() {
    containerTask = []
    localStorage.setItem('toDoList', JSON.stringify(containerTask))
    showToast(deleteAllMsg)
    displayTasks()
    clearBtn.classList.add('d-none')
    clearBtn.classList.remove('d-flex')
}

// Notification Function
function showToast(msg) {
    let toast = document.createElement('div')
    toast.classList.add('toast')
    toast.innerHTML = msg
    toastBox.append(toast)

    if(msg.includes('error')) {
        toast.classList.add('error')
    }

    if(msg.includes('Invalid')) {
        toast.classList.add('invalid')
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.remove()
    }, 6000);
}