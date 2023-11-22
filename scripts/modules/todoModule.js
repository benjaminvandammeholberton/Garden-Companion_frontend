import {
  getTodos,
  createTodo,
  deleteTodoById,
  updateTodoById,
} from '../api/todoApi.js';

const addTask = document.getElementById('addTask');
const toDoContainer = document.getElementById('toDoContainer');

addTask.addEventListener('click', async function () {
  const userInput = window.prompt('Entrez une nouvelle tâche:');
  if (userInput !== null) {
    try {
      await createTodo({ title: userInput });
      // Handle the successful addition of the task, if needed.
      while (toDoContainer.firstChild) {
        toDoContainer.removeChild(toDoContainer.firstChild);
      }
      displayToDo();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
});

export async function displayToDo() {
  try {
    const allTasks = await getTodos();

    if (allTasks.length > 0) {
      allTasks.forEach((element) => {
        // Create a task container
        const task = document.createElement('div');
        task.className = 'task';

        // Create a label
        const label = document.createElement('label');

        // Create an input element for the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = element.status; // Set checkbox state based on completion status

        // Add a change event listener to update completion status
        checkbox.addEventListener('change', function () {
          const taskId = element.todo_id;
          const newCompletionStatus = this.checked;
          updateCompletionStatus(taskId, newCompletionStatus);
        });

        // Create a text node with the task title
        const text = document.createTextNode(element.title);

        // Create a button for deletion
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.setAttribute('data-task-id', element.todo_id);

        // Add a click event listener to the delete button
        deleteButton.addEventListener('click', function () {
          const taskId = this.getAttribute('data-task-id');
          deleteTask(taskId);
        });

        // Append elements to the label
        label.appendChild(checkbox);
        label.appendChild(text);

        // Append the label and delete button to the task container
        task.appendChild(label);
        task.appendChild(deleteButton);

        // Append the task container to the toDoContainer
        toDoContainer.appendChild(task);
      });
    } else {
      // Handle the case when there are no tasks or an error occurred.
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

async function deleteTask(taskId) {
  try {
    await deleteTodoById(taskId);
    updateTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
}

// Function to update the displayed tasks
async function updateTasks() {
  while (toDoContainer.firstChild) {
    toDoContainer.removeChild(toDoContainer.firstChild);
  }
  displayToDo();
}

async function updateCompletionStatus(taskId, newCompletionStatus) {
  try {
    const data = { status: newCompletionStatus };
    await updateTodoById(taskId, data);

    // You can update the UI or perform other actions upon a successful update if needed.
  } catch (error) {
    console.error('Error updating completion status:', error);
  }
}
