const newTaskButton = document.getElementById('new-task-button')
const modalFade = document.getElementById('modal-fade')
const closeIcon = document.getElementById('modal-close-icon')
const addTaskButton = document.getElementById('add-task-button')
const newTaskText = document.getElementById('new-task-text')

newTaskButton.addEventListener('click', changeModalDisplay)
modalFade.addEventListener('click', changeModalDisplay)
addTaskButton.addEventListener('click', saveNewTask)

function changeModalDisplay(event) {
    if (
        event.target.id === modalFade.id ||
        event.target.id === newTaskButton.id ||
        event.target.id === closeIcon.id ||
        event.target.id === newTaskText.id
    ) {
        checkClass()
    }
}

function checkClass() {
    if (modalFade.classList.contains('modal-invisible')) {
        switchClass('modal-invisible', 'modal-visible')
    } else {
        switchClass('modal-visible', 'modal-invisible')
    }
}

function switchClass(oldClass, newClass) {
    modalFade.classList.remove(oldClass)
    modalFade.classList.add(newClass)
}

function validateNewTask(payload) {
    let acceptableStates = ['planned', 'doing', 'review', 'done']

    payload.title = payload.title.trim()

    if (!payload.title) {
        alert('Título é um campo obrigatório')
        return false
    }

    const dateInMilliseconds = dateStringToMilliseconds(date.value)

    if (isNaN(dateInMilliseconds)) {
        alert('Data inválida')
        return false
    }

    if (!acceptableStates.includes(payload.state)) {
        alert('Estado inválido')
        return false
    }

    payload.date = dateInMilliseconds

    return payload
}

function dateStringToMilliseconds(string) {
    const split = string.split('/')
    const validStringDate = `${split[1]}/${split[0]}/${split[2]} GMT-4`
    return new Date(validStringDate).getTime()
}

function saveNewTask() {
    const title = document.getElementById('task-title').value
    const description = document.getElementById('task-description').value
    const state = document.querySelector('input[name=task-state]:checked').value

    const newTask = validateNewTask({
        title: title,
        description: description,
        state: state
    })


    if (newTask) {
        const nextId = Number(localStorage.lastId) + 1

        newTask.id = nextId
        localStorage.lastId = nextId

        if (!localStorage.tasks) {
            localStorage.tasks = '[]'
        }

        const tasks = JSON.parse(localStorage.tasks)

        tasks.push(newTask)

        localStorage.tasks = JSON.stringify(tasks)
    }
}