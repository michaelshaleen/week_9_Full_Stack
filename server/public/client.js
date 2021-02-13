console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('onReady');
  $('#addTaskBtn').on('click', addTask);
  // $(document).on;  did not work
  // 'click',
  //   '#deleteBtn',
  //   function () {
  //     console.log('function');
  //     let deleteTarget = $(this).parent();
  //     deleteTarget.remove();
  //   };
}

function addTask(event) {
  $(document).on('click', '#deleteBtn', deleteTask); // doc because is not loaded when page starts

  event.preventDefault();
  //console.log('in addTask'); // test
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
  });

  //an ajax to get from server and append???

  console.log('newTask', newTask);

  $.ajax({
    url: '/tasks',
    method: 'GET',
  }).then(function (response) {
    console.log('get response', response);
    $('#taskList').append(`
    <tr>
      <td>Task:
      ${response.task}--
      Due Date
      ${response.dueDate}
      </td>
      <td>
      <button id="deleteBtn">Delete Button</button>
    </tr>
      `);
  });

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
}

//works!
