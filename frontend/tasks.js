const domain = 'http://127.0.0.1:8000/';

const username = 'admin';
const password = '123';
const credentials = window.btoa(username + ':' + password);

let list = document.querySelector('#list');
let listLoader = new XMLHttpRequest();

let id = document.querySelector('#id');
let name = document.querySelector('#name');
let taskLoader = new XMLHttpRequest();

let taskUpdater = new XMLHttpRequest();
let taskDeleter = new XMLHttpRequest();

function listLoad() {
    listLoader.open('GET', domain + 'api/tasks/', true);
    listLoader.setRequestHeader('Authorization', 'Basic' + credentials);
    listLoader.send();
}

function taskDelete(evt) {
    evt.preventDefault();
    taskDeleter.open('DELETE', evt.target.href, true);
    taskDeleter.send();
}


function taskLoad(evt) {
    evt.preventDefault();
    taskLoader.open('GET', evt.target.href, true);
    taskLoader.send();
}

listLoader.addEventListener('readystatechange', ()=> {
    if (listLoader.readyState ==4) {
        if (listLoader.status == 200) {
            let data = JSON.parse(listLoader.responseText);
            let s = '<ul>', d;
            for (let i = 0; i < data.length; i++){
                d = data[i]
                s += '<li>' + d.name + '<a href="' + domain + 'api/tasks/' + d.id + '/" class="detail"> Вывести</a> <a href="' + domain + 'api/tasks/' + d.id + '/" class="delete">Удалить</a> </li>';
            }
            s += '</ul>';
            list.innerHTML = s;

            let links = list.querySelectorAll('ul li a.detail');
            links.forEach((links) => {
                links.addEventListener('click', taskLoad);
            });

            links = list.querySelectorAll('ul li a.delete');
            links.forEach((links) => {
                links.addEventListener('click', taskDelete);
            });

        } else
        {
            window.alert(listLoader.statusText);
        }
    }
});

taskLoader.addEventListener('readystatechange', ()=> {
    if (taskLoader.readyState ==4) {
        if (taskLoader.status == 200) {
            let data = JSON.parse(taskLoader.responseText);
            id.value = data.id;
            name.value = data.name;
        } else {
            window.alert(taskLoader.statusText)
        }
    }
});

taskUpdater.addEventListener('readystatechange', () => {
    if (taskUpdater.readyState == 4) {
        if ((taskUpdater.status == 200) || (taskUpdater.status == 201)) {
            listLoad();
            name.form.reset();
            id.value == '';
        } else {
            window.alert(taskUpdater.statusText);
        }
    }
})


taskDeleter.addEventListener('readystatechange', () => {
      if (taskDeleter.readyState == 4) {
        if (taskDeleter.status == 204) {
            listLoad()
        } else {
            window.alert(taskDeleter.statusText)
        }
    }
})

name.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let vid = id.value, url, method;
    if (vid) {
        url = 'api/tasks/' + vid + '/';
        method = 'PUT';
    } else {
        url = 'api/tasks/';
        method = 'POST';
    }
    let data = JSON.stringify({id: vid, name: name.value})
    taskUpdater.open(method, domain + url, true)
    taskUpdater.setRequestHeader('Content-Type', 'application/json')
    taskUpdater.send(data)
})


listLoad();