const newTaskButton = document.getElementById('new-task-button')
const modalFade = document.getElementById('modal-fade')

newTaskButton.addEventListener('click', changeModalDisplay)
modalFade.addEventListener('click', changeModalDisplay)

function changeModalDisplay(event) {
    if (event.target.id === modalFade.id || event.target.id === newTaskButton.id) {
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