function getTimeTask() {
    Notification.requestPermission()

    if (Notification.permission === 'granted') {
        setInterval(() => {
            const tenMinutes = 600000
            const tasks = JSON.parse(localStorage.tasks)
            const now = new Date().setSeconds(0, 0);
            const tasksInTenMinutes = tasks.filter(task => task.date === now + tenMinutes)
            tasksInTenMinutes.forEach(task => {
                const text = `#${task.id} - ${task.title}\nEm 10 minutos!`
                new Notification('Task manager - Lembrete', {
                    body : text
                })
            });
        }, 60000);
    }
}

getTimeTask() 
