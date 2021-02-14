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
  $(document).on('click', '#completeBtn', greenTask);
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
    .then(console.log('ajax post'))
    .catch(function (error) {
      console.log(error);
    });
}
///////////////////////////////////////
///////////////////////////////////////
function getTasks() {
  //console.log('In getTasks');

  $.ajax({
    type: 'GET',
    url: '/tasks',
  }).then(function (response) {
    console.log('get response', response);
    for (let i = 0; i < response.length; i++) {
      $('#taskList').append(`
    <tr>
      <td>Task:
      ${response[i].name}
      Due Date:
      ${response[i].due_date}
      </td>
      <td>
      <button id="deleteBtn" data-id="${response[i].id}">Delete Button</button>
      </td><td>
      <button id="completeBtn" data-id="${response[i].id}">Completed!</button>
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
//////////////////////////////
/////////////////////////////

// function badBanana() {
//   deleteSong($(this).data('id'));
//   //call AJAX to DELETE song:
// }

let deleteTarget = [];
function deleteTask() {
  deleteTarget = $(this).data('id');
  console.log('deleteTask', deleteTarget);
  $.ajax({
    url: `/DELETE/tasks/${deleteTarget}`,
    type: 'DELETE',
  })
    .then(function (response) {
      $('#taskList').empty();
      addTask();
      getTasks();
      //run function to re-append
    })
    .catch(function (error) {
      console.log('error in delete ajax');
    });

  return;
} //needs to coordinate with db

let completeTarget = [];
function completeTask() {
  completeTarget = $(this).data('id');
  console.log(completeTarget, 'complete Target');
  $.ajax({
    method: 'PUT',
    url: `/complete/complete${completeTarget}`,
  })
    .then(function (response) {
      $('#taskList').empty();
      addTask();
      getTasks();
      console.log('ajax put complete');
    })
    .catch(function (error) {
      console.log('error in complete client');
    });
}
//maybe drop down of completed or not?
function greenTask() {
  console.log('green Task');
  let completeTarget = $(this).parent().parent();
  completeTarget.css('background-color', 'green');
}
