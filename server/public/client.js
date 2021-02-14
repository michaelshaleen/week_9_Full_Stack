console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('onReady');
  getTasks();
  addTask();
  $('#addTaskBtn').on('click', addTask);
  $('#addTaskBtn').on('click', getTasks);
}

////////////////////////////
///////////////////////////
function addTask(event) {
  console.log('in addTasks');
  $(document).on('click', '#deleteBtn', deleteTask);
  $(document).on('click', '#completeBtn', completeTask); // doc because is not loaded when page starts
  //event.preventDefault();
  console.log('in addTask'); // test
  let newTask = {
    task: $('#taskInput').val(),
    due_date: $('#dateInput').val(),
  };
  console.log('newTask name', newTask.task);
  console.log('newTask due_date', newTask.due_date);

  $.ajax({
    url: '/tasks',
    type: 'POST',
    data: {
      task_to_add: newTask,
    },
  })
    .then(getTasks())
    .catch(function (error) {
      console.log(error);
    });
}
///////////////////////////////////////
///////////////////////////////////////
function getTasks() {
  console.log('In getTasks');

  $.ajax({
    type: 'GET',
    url: '/tasks',
  }).then(function (response) {
    console.log('get response', response);
    for (let i = 0; i < response.length; i++) {
      $('#taskList').append(`
    <tr>
      <td>Task:
      ${response[i].name}--
      Due Date:
      ${response[i].due_date}
      </td>
      <td>
      <button id="deleteBtn">Delete Button</button>
      </td><td>
      <button id="completeBtn">Completed!</button>
      </td>
    </tr>
      `);
    }
  });
  clearInputs();
}
function clearInputs() {
  $('#taskInput').val('');
  $('#dateInput').val('');
}

function deleteTask() {
  console.log('deleteTask');
  let deleteTarget = $(this).parent().parent();
  deleteTarget.remove();
  $.ajax({
    type: 'DELETE',
    url: '/tasks',
  });

  return;
} //needs to coordinate with db
// ajax?

function completeTask() {
  console.log('complete task');
  let completeTarget = $(this).parent().parent();
  completeTarget.css('background-color', 'green');
}
//needs to coordinate with db
