console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('onReady');
  $('#addTaskBtn').on('click', addTask);
}

function addTask(event) {
  $(document).on('click', '#deleteBtn', deleteTask);
  $(document).on('click', '#completeBtn', completeTask); // doc because is not loaded when page starts

  event.preventDefault();
  //console.log('in addTask'); // test
  let newTask = {
    task: $('#taskInput').val(),
    dueDate: $('#dateInput').val(),
  };
  ////////////////////////////

  $.ajax({
    url: '/tasks/getTasks',
    method: 'GET',
  }).then(function (dbRes) {
    console.log('get response', dbRes.rows);
    $('#taskList').append(`
    <tr>
      <td>Task:
      ${dbRes.task}--
      Due Date
      ${dbRes.dueDate}
      </td>
      <td>
      <button id="deleteBtn">Delete Button</button>
      <button id="completeBtn">Completed!</button>

    </tr>
      `);
  });
  //ajax grab and POST object into server
  $.ajax({
    url: '/tasks',
    method: 'POST',
    data: {
      task_to_add: newTask,
    },
  }).then(function (response) {
    console.log('this is response', response);
  });

  //an ajax to get from server and append???

  console.log('newTask name', newTask.task);
  console.log('newTask dueDate', newTask.dueDate);

  clearInputs(); //ran automatically
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
