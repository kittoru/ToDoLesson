// найти форму
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = []; 

// проверка хранилища браузера на наличине данных. Если их нет, то будeт null(всегда false), а наличие каких-то данных true
if (localStorage.getItem('tasks')){
    // парсинг данных из строк в массив
    tasks = JSON.parse(localStorage.getItem('tasks'));
    // вывод на экран пользователя списка задач из хранилища
    tasks.forEach((task) => renderTast(task));
}

checkEmplyList();

// добавление задачи
form.addEventListener('submit', addTask);

// удаление задачи
tasksList.addEventListener('click', deleteTask);

// отметка, что задание выполнено
tasksList.addEventListener('click', doneTask);

function addTask(event) {
    // отмена отправки формы
    event.preventDefault();
    console.log('SUBMIT');

    // извлечение текста из формы
    const taskText = taskInput.value;

    // описание задачи в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // добавление в массив
    tasks.push(newTask);

    renderTast(newTask);

    // // формирование цсс класса
    // const cssClass = newTask.done? "task-title task-title--done": "task-title";

    // // формирование разметки для новой задачи
    // const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    //                     <span class="${cssClass}">${newTask.text}</span>
    //                         <div class="task-item__buttons">
    //                             <button type="button" data-action="done" class="btn-action">
    //                                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
    //                             </button>
    //                             <button type="button" data-action="delete" class="btn-action">
    //                                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
    //                             </button>
    //                         </div>
    //                 </li>`

    // // добавление задачи на страницу
    // tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // очищение поля ввода и возвращение фокуса на поле ввода
    taskInput.value = "";
    taskInput.focus();

    // // сокрытие блока с пустым списком дел
    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }
    checkEmplyList();

    saveToLocalStorage();
}

function deleteTask(event) {
    // проверка на то, что не была нажата кнопка удалить
    if (event.target.dataset.action !== 'delete') return;

    console.log('Delete');


    const parentNode = event.target.closest('.list-group-item');
    // определение айди задачи
    const taskID = Number(parentNode.id);
    // нахождение индекса в массиве
    const index  = tasks.findIndex((task) => task.id === taskID);
    // удаление задачи из массива
    tasks.splice(index, 1);
    parentNode.remove();

    // возвращение пустого списка
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }
    checkEmplyList();
    saveToLocalStorage();
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;
    // клик по кнопке зада выполнена
    const parentNode = event.target.closest('.list-group-item');

    const taskID = Number(parentNode.id);

    const task = tasks.find((task) => task.id === taskID);
    task.done = !task.done;

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')

    saveToLocalStorage();

}

function checkEmplyList(){
    if(tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`
        tasksList.insertAdjacentHTML('afterbegin',emptyListHTML);
    }

    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl? emptyListEl.remove() : null;
    }
}

// сохранение массива в браузере
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTast(task){
    // формирование цсс класса
    const cssClass = task.done? "task-title task-title--done": "task-title";

    // формирование разметки для новой задачи
    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>`

    // добавление задачи на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}