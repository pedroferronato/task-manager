const date = document.getElementById('task-date')

function loadDate() {
    let dateNow = Date.now()

    let options = {
        dateStyle: 'short',
        timeStyle: 'short'
    }

    let dateLocalFormat = new Intl.DateTimeFormat('pt-br', options).format(dateNow)
    date.value = dateLocalFormat;
}

function checkIds() {
    if (!localStorage.lastId) {
        localStorage.lastId = 0
    }
}

window.addEventListener('load', () => {
    loadDate()
    checkIds()
})