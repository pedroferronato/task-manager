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
  if(event.target.classList.contains('dropzone')) {
    event.target.classList.add('dragover')
  }
})

document.addEventListener('dragleave', event => {
  if(event.target.classList.contains('dropzone')) {
    event.target.classList.remove('dragover')
  }
})

document.addEventListener('drop', event => {
  event.preventDefault()

  if(event.target.classList.contains('dropzone')) {
    event.target.classList.remove('dragover')
    dragged.parentNode.removeChild(dragged)
    event.target.appendChild(dragged)
  }
})