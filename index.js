var users = [];
var incrementUsers = 1;
var incrementTasksId = 1;
// selecting dom elements
var userNameInput = document.getElementById('nameOfUser');
var addUserBtn = document.getElementById("addUserBtn");
var taskTitleInput = document.getElementById("taskTitleInput");
var selectUser = document.getElementById("selectUser");
var addTaskBtn = document.getElementById("addTaskBtn");
var usersContainer = document.getElementById("usersContainer");
// add a new user
addUserBtn.addEventListener('click', function () {
    var name = userNameInput.value.trim();
    if (name.length <= 0) {
        window.alert("Please provide name of a user");
        return;
    }
    // create object for a user
    var user = {
        id: incrementUsers,
        name: name,
        tasks: []
    };
    // add user to array of users
    users.push(user);
    userNameInput.value = '';
    // call displayUsersToDropDown
    displayUsers();
    addUsersToDropdown();
});
// add a new task
addTaskBtn.addEventListener('click', function () {
    var title = taskTitleInput.value.trim();
    var userId = Number(selectUser.value);
    if (title.length <= 0) {
        window.alert("Please provide title of a task");
        return;
    }
    if (userId <= 0) {
        window.alert("Please select user");
        return;
    }
    // check if user exists
    var user = users.find(function (user) { return user.id === userId; });
    if (!user) {
        window.alert("User does not exist");
        return;
    }
    // create object for a task
    var task = {
        id: incrementTasksId++,
        title: title,
    };
    // add task to user's tasks array
    user.tasks.push(task);
    taskTitleInput.value = '';
    // call displayUsers function
    displayUsers();
});
// function to display users
var displayUsers = function () {
    usersContainer.innerHTML = '';
    // loop through users to check if there i any
    users.forEach(function (user) {
        var userElement = document.createElement('div');
        userElement.className = 'user';
        var titleh3 = document.createElement('h3');
        titleh3.textContent = user.name;
        userElement.appendChild(titleh3);
        // check if user has tasks first
        if (user.tasks.length === 0) {
            var ZeroTasks = document.createElement('p');
            ZeroTasks.textContent = 'No tasks assigned to this user';
            userElement.appendChild(ZeroTasks);
        }
        // loop through user's tasks to display them
        user.tasks.forEach(function (task) {
            var taskElement = document.createElement('div');
            taskElement.className = 'task';
            // create a task span title
            var taskSpan = document.createElement('span');
            taskSpan.textContent = task.title;
            taskElement.appendChild(taskSpan);
            // create a delete bnt
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function () {
                // call delete function
                deleteTask(task.id, user.id);
            };
            taskElement.appendChild(taskSpan);
            taskElement.appendChild(deleteBtn);
            userElement.appendChild(taskElement);
        });
        usersContainer.appendChild(userElement);
    });
};
// function to add all users to the select dropdown menu
var addUsersToDropdown = function () {
    selectUser.innerHTML = '<option value = ""> Choose a user </option>';
    //loop through users to add them to the dropdown
    users.forEach(function (user) {
        var option = document.createElement('option');
        option.value = String(user.id);
        option.textContent = user.name;
        //appendChild
        selectUser.appendChild(option);
    });
};
// function to delete a task
var deleteTask = function (userId, taskId) {
    // find the user with the matching id
    var user = users.find(function (user) { return user.id === userId; });
    if (!user) {
        console.log('User not found');
        return;
    }
    // remove the task from the user's tasks array
    user.tasks = user.tasks.filter(function (task) { return task.id !== taskId; });
    // call display function
    displayUsers();
};
addUsersToDropdown();
displayUsers();
