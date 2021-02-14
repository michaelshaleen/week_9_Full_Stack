console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('onReady');
  $('#addTaskBtn').on('click', addTask);
  $('#addTaskBtn').on('click', getTasks);
}

////////////////////////////
function addTask(event) {
  console.log('in addTasks');
  $(document).on('click', '#deleteBtn', deleteTask);
  $(document).on('click', '#completeBtn', completeTask); // doc because is not loaded when page starts

  event.preventDefault();
  //console.log('in addTask'); // test
  let newTask = {
    task: $('#taskInput').val(),
    dueDate: $('#dateInput').val(),
  };

  console.log('newTask name', newTask.task);
  console.log('newTask dueDate', newTask.dueDate);

  $.ajax({
    url: '/tasks',
    method: 'POST',
    data: {
      task_to_add: newTask,
    },
  }).then(
    function (response) {
      console.log('ajax post response', response);
      $('#taskList').append(`
    <tr>Ajax Post
      <td>Task:
      ${newTask.task}--
      Due Date
      ${newTask.dueDate}
      </td>
      <td>
      <button id="deleteBtn">Delete Button</button>
      <button id="completeBtn">Completed!</button>

    </tr>
      `);
    }

    //an ajax to get from server and append???
    //ran automatically
  );
}

function getTasks() {
  console.log('In getTasks');

  $.ajax({
    type: 'GET',
    url: '/tasks',
  }).then(function (dbRes) {
    console.log('get response', dbRes);
    for (let i = 0; i < dbRes.length; i++) {
      $('#taskList').append(`
    <tr>
      <td>Task get:
      ${dbRes[i].name}--
      Due Date get
      ${dbRes[i].dueDate}
      </td>
      <td>
      <button id="deleteBtn">Delete Button</button>
      <button id="completeBtn">Completed!</button>

    </tr>
      `);
    }
  });
}
function clearInputs() {
  $('#taskInput').val('');
  $('#dateInput').val('');
}

function deleteTask() {
  console.log('deleteTask');
  let deleteTarget = $(this).parent().parent();
  deleteTarget.remove();
  return;
} //needs to coordinate with db

function completeTask() {
  console.log('complete task');
  let completeTarget = $(this).parent().parent();
  completeTarget.css('background-color', 'green');
}
//needs to coordinate with db
