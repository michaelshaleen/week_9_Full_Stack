console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('onReady');
  $('#addTaskBtn').on('click', addTask);
}

function addTask(event) {
  event.preventDefault();
  console.log('in addTask'); // test
  let newTask = {
    task: $('#taskInput').val(),
    dueDate: $('#dateInput').val(),
  };
  //ajax grab and POST object into server
  $.ajax({
    url: '/tasks',
    method: 'POST',
    data: {
      task_to_add: newTask,
    },
  }).then(function (response) {
    console.log('this is response', response);
    for (item of response) {
      $('#taskList').append(`
      <tbody>
        <td>Task
        ${newTask.task}
        </td>
        <td>Due Date
        ${newTask.dueDate}
        </td>
      </tbody>
    `);
    }
  });

  //an ajax to get from server and append???

  $.ajax;

  console.log('newTask', newTask);
}
