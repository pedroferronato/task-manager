const taskcalled = new Set()
const modalNotication = document.getElementById("modal-notification")
const modalNoticationBody = document.getElementById("modal-notification-boby")
const closeIconNotication = document.getElementById('modal-notificaion-close-icon')

closeIconNotication.addEventListener('click', chargeClass)

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
    });
    return tasks
}

function getTimeTasks(payload) {
    const tasks = []

    payload.forEach(task => {
        if (new Date(task.date).getUTCHours() === new Date().getUTCHours()) {

            let checkMinutes = new Date(task.date).getUTCMinutes() - 10


            if (checkMinutes === new Date().getUTCMinutes()) {
                tasks.push(task)
            }
        }
    })

    return tasks
}

function createTaskCardElement(task) {
    const taskCardElement = document.createElement('div')
    taskCardElement.classList.add('task-card')
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
    // create and show the notification
    const showNotification = (_callback) => {
        // create a new notification
        const notification = new Notification('Gerenciador de tarefas', {
            body: 'Há tarefas proximas de expirar. Clique aqui e confira.'
        });

        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);

        // navigate to a URL when clicked
        notification.addEventListener('click', () => {

            window.open('http://127.0.0.1:5500/', '_blank');
        });
    }

    // show an error message
    const showError = () => {
        const error = document.querySelector('.error');
        error.style.display = 'block';
        error.textContent = 'You blocked the notifications';
    }

    // check notification permission
    let granted = false;

    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false;
    }

    // show notification or error
    granted ? showNotification() : showError();

};

function chargeClass() {

    if (modalNotication.classList.contains('modal-invisible')) {
        switchClassN('modal-invisible', 'modal-visible')
    } else {
        switchClassN('modal-visible', 'modal-invisible')
    }
}

function switchClassN(oldClass, newClass) {
    modalNotication.classList.remove(oldClass)
    modalNotication.classList.add(newClass)
}

function alertTask() {
    const tasks = getTimeTasks(getTodayTask())

    tasks.forEach(task => {
        if (!taskcalled.has(task.id)) {
            chargeClass()
            task.date = formatDate(task.date)
            const taskElement = createTaskCardElement(task)

            if (task.state === "planned") {
                modalNoticationBody.classList.add('border-planned')
                modalNoticationBody.appendChild(taskElement)
            }
            if (task.state === "doing") {
                modalNoticationBody.classList.add('border-doing')
                modalNoticationBody.appendChild(taskElement)
            }
            if (task.state === "review") {
                modalNoticationBody.classList.add('border-review')
                modalNoticationBody.appendChild(taskElement)
            }
            notificationTask()
            taskcalled.add(task.id)
        }
    })

}

setInterval(alertTask, 10000)