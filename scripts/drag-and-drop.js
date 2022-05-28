let dragged

document.addEventListener('dragstart', event => {
    dragged = event.target 
    event.target.classList.add('dragging')
})

document.addEventListener('dragend', event => {
    event.target.classList.remove('dragging')
})

document.addEventListener('dragover', event => {
    event.preventDefault()
}, false)

document.addEventListener('dragenter', event => {
    if (event.target.classList.contains('dropzone') && dragged.draggable) {
        event.target.classList.add('dragover')
    }
})

document.addEventListener('dragleave', event => {
    if (event.target.classList.contains('dropzone') && dragged.draggable) {
        event.target.classList.remove('dragover')
    }
})

document.addEventListener('drop', event => {
    event.preventDefault()

    if (event.target.classList.contains('dropzone') && dragged.draggable) {
        event.target.classList.remove('dragover')
        dragged.parentNode.removeChild(dragged)
        event.target.appendChild(dragged)
        changeState(dragged, event.target)
    }
})

function changeState(target, parent) {
    const tasks = JSON.parse(localStorage.tasks)
    const task = tasks.filter(task => task.id === Number(target.id))[0]
    const index = tasks.indexOf(tasks.find(task => task.id === Number(target.id)))
    
    const newState = parent.id.split('-')[0]
    task.state = newState
    tasks[index] = task
    localStorage.tasks = JSON.stringify(tasks)

    target.className = ''
    target.classList.add('task-card')
    target.classList.add(`border-${newState}`)
}