const taskcalled = new Set()
const modalNotification = document.getElementById("modal-notification")
const modalNotificationBody = document.getElementById("modal-notification-boby")
const closeIconNotification = document.getElementById('modal-notification-close-icon')

closeIconNotification.addEventListener('click', chargeClass)

function getTodayTask() {
    const allTasks = JSON.parse(localStorage.tasks)
    const tasks = []

    allTasks.forEach(task => {
        if (task.state !== 'done') {
            if ((new Date(task.date).getUTCFullYear() === new Date().getUTCFullYear()) &&
                (new Date(task.date).getUTCMonth() === new Date().getUTCMonth()) &&
                (new Date(task.date).getUTCDay() === new Date().getUTCDay())
            ) {
                tasks.push(task)
            }
        }
    })
    return tasks
}

function getTimeTasks(payload) {
    const tasks = []
    payload.forEach(task => {
        let checkMilliseconds = task.date - 600000

        if (checkMilliseconds === new Date().setSeconds(0, 0)) {
            tasks.push(task)
        }
    })
    return tasks
}

function createTaskCardElementNotification(task) {
    const taskCardElement = document.createElement('div')
    taskCardElement.classList.add('task-card')
    taskCardElement.classList.add('margin-bottom-0px')
    taskCardElement.id = task.id
    taskCardElement.draggable = true

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

async function notificationTask() {
    const showNotification = () => {
        const notification = new Notification('Gerenciador de tarefas', {
            body: 'Há tarefas proximas de expirar. Clique aqui e confira.'
        })
        setTimeout(() => {
            notification.close()
        }, 10 * 1000)
        notification.addEventListener('click', () => {
            window.open('http://127.0.0.1:5500/', '_blank')
        })
    }

    // show an error message
    const showError = () => {
        const error = document.querySelector('.error')
        error.style.display = 'block'
        error.textContent = 'You blocked the notifications'
    }

    let granted = false
    if (Notification.permission === 'granted') {
        granted = true
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission()
        granted = permission === 'granted' ? true : false
    }
    granted ? showNotification() : showError()

}

function chargeClass() {
    if (modalNotification.classList.contains('modal-invisible')) {
        switchClassN('modal-invisible', 'modal-visible')
    } else {
        switchClassN('modal-visible', 'modal-invisible')
    }
}

function switchClassN(oldClass, newClass) {
    modalNotification.classList.remove(oldClass)
    modalNotification.classList.add(newClass)
}

function alertTask() {
    const tasks = getTimeTasks(getTodayTask())
    tasks.forEach(task => {
        if (!taskcalled.has(task.id)) {
            chargeClass()
            task.date = formatDate(task.date)
            const taskElement = createTaskCardElementNotification(task)

            if (task.state === "planned") {
                modalNotificationBody.classList.add('border-planned')
                modalNotificationBody.appendChild(taskElement)
            }
            if (task.state === "doing") {
                modalNotificationBody.classList.add('border-doing')
                modalNotificationBody.appendChild(taskElement)
            }
            if (task.state === "review") {
                modalNotificationBody.classList.add('border-review')
                modalNotificationBody.appendChild(taskElement)
            }
            notificationTask()
            taskcalled.add(task.id)
        }
    })
}

setInterval(alertTask, 60*1000)