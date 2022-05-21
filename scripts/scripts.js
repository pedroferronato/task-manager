const date = document.getElementById('task-date')

function checkIds() {
    if (!localStorage.lastId) {
        localStorage.lastId = 0
    }
}

window.addEventListener('load', () => {
    checkIds()
    loadTask()
})