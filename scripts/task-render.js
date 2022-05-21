function createTaskCardElement(task) {
    const taskCardElement = document.createElement('div')
    taskCardElement.classList.add('task-card')
    taskCardElement.id = task.id
    taskCardElement.draggable  = true

    const taskTitle = document.createElement('h1')
    taskTitle.innerHTML = `#${task.id} - ${task.title}`
    taskTitle.className = 'task-title'

    const taskDescription = document.createElement('p')
    taskDescription.innerHTML = task.description
    taskDescription.className = 'task-description'

    const taskDate = document.createElement('h4')
    taskDate.className = 'task-date'
    taskDate.innerHTML = task.date

    taskCardElement.appendChild(taskTitle)
    taskCardElement.appendChild(taskDescription)
    taskCardElement.appendChild(taskDate)

    return taskCardElement
}

function formatDate(milliseconds) {
    let options = {
        dateStyle: 'short',
        timeStyle: 'short'
    }

    return new Intl.DateTimeFormat('pt-br', options).format(milliseconds)
}

function loadTask() {
    const tasks = JSON.parse(localStorage.tasks)

    const plannedTasks = document.getElementById('planned-column')
    const doingTasks = document.getElementById('doing-column')
    const reviewTasks = document.getElementById('review-column')
    const doneTasks = document.getElementById('done-column')

    tasks.forEach(task => {
        task.date = formatDate(task.date)
        const taskElement = createTaskCardElement(task)
        if (task.state === "planned") {
            taskElement.classList.add('border-planned')
            plannedTasks.appendChild(taskElement)
        }
        if (task.state === "doing") {
            taskElement.classList.add('border-doing')
            doingTasks.appendChild(taskElement)
        }
        if (task.state === "review") {
            taskElement.classList.add('border-review')
            reviewTasks.appendChild(taskElement)
        }
        if (task.state === "done") {
            taskElement.classList.add('border-done')
            doneTasks.appendChild(taskElement)
        }
    })
}