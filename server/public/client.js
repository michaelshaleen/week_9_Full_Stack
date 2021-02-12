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
    url: '/jokes',
    method: 'POST',
    data: {
      task_to_add: newTask,
    },
  }).then(function (response) {
    console.log('this is response', response);
    for (item of response) {
      $('#outputDiv').append(`<li>
      Joke Artist:
    ${item.whoseJoke},
    Joke Set up:
    ${item.jokeQuestion},
    Punch Line:
    ${item.punchLine}
    </li>
    `);
    }
  });

  console.log('newTask', newTask);
}
