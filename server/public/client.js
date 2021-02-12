console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  $('#addaddTaskBtn').on('click', addTask);
}

function addTask() {
  let newTast = {
    task: $('#taskInput').val(),
    dueDate: $('#dateInput').val(),
  };
}
