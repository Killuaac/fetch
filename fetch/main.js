const element = document.querySelector('.wrap');

async function displayTasks() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (response.ok) {
            let tasks = await response.json();
            console.log(tasks);
            tasks.forEach(elem => {
                element.insertAdjacentHTML('beforeend', `<h2>${elem.id} ${elem.title}</h2>`);
            });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasksUsingThen() {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(tasks => printTasks(tasks))
        .catch(error => console.error('Error fetching tasks:', error));
}

function printTasks(tasks) {
    tasks.forEach(elem => {
        element.insertAdjacentHTML('beforeend', `<h2>${elem.id} ${elem.title}</h2>`);
    });
}

let newPost = {
    userId: 1,
    title: 'new title',
    body: 'new body'
};

async function addNewPost() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
            let elem = await response.json();
            element.insertAdjacentHTML('beforeend', `<h2>${elem.id} ${elem.title}</h2>`);
        }
    } catch (error) {
        console.error('Error adding new post:', error);
    }
}

const postsContainer = document.querySelector('#posts');
const commentsContainer = document.querySelector('#comments');
const usersContainer = document.querySelector('#users');

const addUserButton = document.querySelector('#add-user-button');
const addPostButton = document.querySelector('#add-post-button');
const addCommentButton = document.querySelector('#add-comment-button');

function displayData(data, container) {
    container.innerHTML = '';

    data.forEach(item => {
        const element = document.createElement('div');
        element.innerHTML = JSON.stringify(item);

        container.appendChild(element);
    });
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function addUser(user) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    return data;
}

async function addPost(post) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    const data = await response.json();

    return data;
}

async function addComment(comment) {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    const data = await response.json();

    return data;
}

fetchData('https://jsonplaceholder.typicode.com/posts').then(data => displayData(data, postsContainer));
fetchData('https://jsonplaceholder.typicode.com/comments').then(data => displayData(data, commentsContainer));
fetchData('https://jsonplaceholder.typicode.com/users').then(data => displayData(data, usersContainer));

addUserButton.addEventListener('click', () => {
    const user = {
        name: 'New User',
        username: 'new_user',
        email: 'new_user@example.com'
    };

    addUser(user).then(data => {
        alert('User added');
        fetchData('https://jsonplaceholder.typicode.com/users').then(data => displayData(data, usersContainer));
    });
});

addPostButton.addEventListener('click', () => {
    const post = {
        title: 'New Post',
        body: 'This is a new post',
        userId: 123
    }});
