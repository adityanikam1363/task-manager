$(document).ready(function () {
   
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        $('#taskList').empty(); 
        tasks.forEach(function (task, index) {
            $('#taskList').append(`
                <li class="list-group-item task-item" data-index="${index}">
                    <span class="task-text">${task.text}</span>
                    <button class="btn btn-warning btn-sm editBtn">Edit</button>
                    <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
                </li>
            `);
        });
    }

    
    loadTasks();

    $('#addTaskBtn').click(function () {
        let taskText = $('#taskInput').val().trim();
        if (taskText === '') {
            $('#alertEmpty').fadeIn().delay(2000).fadeOut(); 
            return;
        }

       
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

       
        tasks.push({ text: taskText });

        
        localStorage.setItem('tasks', JSON.stringify(tasks));

        
        loadTasks();

        $('#taskInput').val('');
    });

    
    $(document).on('click', '.editBtn', function () {
        let taskIndex = $(this).closest('li').data('index');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let taskText = tasks[taskIndex].text;

        
        let newTaskText = prompt('Edit Task:', taskText);
        if (newTaskText && newTaskText !== taskText) {
            tasks[taskIndex].text = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        }
    });

 
    $(document).on('click', '.deleteBtn', function () {
        let taskIndex = $(this).closest('li').data('index');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
        tasks.splice(taskIndex, 1);

   
        localStorage.setItem('tasks', JSON.stringify(tasks));

    
        loadTasks();
    });
});
