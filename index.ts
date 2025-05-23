
interface Task {
    id:number;
    title:string
}

interface User {
    id: number;
    name: string;
    tasks: Task[];
}

const users: User[] = [];
let incrementUsers = 1;
let incrementTasksId = 1;

// selecting dom elements
const userNameInput = document.getElementById('nameOfUser') as HTMLInputElement;
const addUserBtn = document.getElementById("addUserBtn") as HTMLButtonElement;
const taskTitleInput = document.getElementById("taskTitleInput") as HTMLInputElement;
const selectUser = document.getElementById("selectUser") as HTMLSelectElement;
const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const usersContainer = document.getElementById("usersContainer") as HTMLDivElement;

// add a new user
addUserBtn.addEventListener('click', () =>{
    const name = userNameInput.value.trim();
    if(name.length <= 0){
        window.alert("Please provide name of a user")
        return
    }

    // create object for a user
    const user: User = {
        id:incrementUsers,
        name,
        tasks:[]
    }
    // add user to array of users
    users.push(user);
    userNameInput.value = ''

    // call displayUsersToDropDown
    displayUsers();
    addUsersToDropdown();

});

// add a new task
addTaskBtn.addEventListener('click', () =>{
    const title = taskTitleInput.value.trim();
    const userId = Number(selectUser.value)
    if(title.length <= 0){
        window.alert("Please provide title of a task");
        return;
    }
    if(userId <= 0){
        window.alert("Please select user");
        return;
    }
    // check if user exists
    const user = users.find(user => user.id === userId);
    if(!user){
        window.alert("User does not exist");
        return;
    }

    // create object for a task
    const task: Task = {
        id: incrementTasksId ++,
        title,
    }

    // add task to user's tasks array
    user.tasks.push(task);
    taskTitleInput.value = ''

    // call displayUsers function
    displayUsers();
});

// function to display users
const displayUsers = () =>{
    usersContainer.innerHTML = ''
    // loop through users to check if there i any
    users.forEach(user =>{
        const userElement = document.createElement('div');
        userElement.className = 'user'

        const titleh3 = document.createElement('h3');
        titleh3.textContent = user.name;
        userElement.appendChild(titleh3);

        // check if user has tasks first
        if(user.tasks.length === 0){
            const ZeroTasks = document.createElement('p');
            ZeroTasks.textContent = 'No tasks assigned to this user';
            userElement.appendChild(ZeroTasks);
        }
        // loop through user's tasks to display them
        user.tasks.forEach(task =>{
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            // create a task span title
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.title;
            taskElement.appendChild(taskSpan);
            // create a delete bnt
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () =>{
                // call delete function
                deleteTask(task.id,user.id);
            }
            taskElement.appendChild(deleteBtn);
            userElement.appendChild(taskElement);
        });

        usersContainer.appendChild(userElement);
    });
}

// function to add all users to the select dropdown menu
const addUsersToDropdown = () =>{
selectUser.innerHTML = '<option value = ""> Choose a user </option>';
//loop through users to add them to the dropdown
users.forEach(user =>{
    const option = document.createElement('option');
    option.value = String(user.id);
    option.textContent = user.name;

    //appendChild
    selectUser.appendChild(option);
});
}

// function to delete a task
const deleteTask = (userId:number,taskId:number) =>{
    // find the user with the matching id
    const user = users.find(user => user.id === userId);
    if(!user){
        console.log('User not found');
        return;
    }
    // remove the task from the user's tasks array
    user.tasks = user.tasks.filter(task => task.id !== taskId);

    // call display function
    displayUsers();
}

// function to update a task
const updateTask = (userId:number,taskId:number,newTitle:string) =>{
    // find the task with matching id
    const task = user.tasks.find(task => task.id === taskId);
    if(!task){
        console.log('Task not found');
        return;
    }

}

addUsersToDropdown()
displayUsers()
