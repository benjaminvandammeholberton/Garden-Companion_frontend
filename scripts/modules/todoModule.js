import {
  getTodos,
  createTodo,
  deleteTodoById,
  updateTodoById,
} from '../api/todoApi.js';

const addTask = document.getElementById('addTask');
const toDoContainer = document.getElementById('toDoContainer');

/**
 * Event listener for the "Add Task" button click. Prompts the user for a new task,
 * adds the task using the createTodo API, and then refreshes the displayed tasks.
 */
addTask.addEventListener('click', async function () {
  const userInput = window.prompt('Entrez une nouvelle tâche:');
  if (userInput !== null) {
    try {
      await createTodo({ title: userInput });
      while (toDoContainer.firstChild) {
        toDoContainer.removeChild(toDoContainer.firstChild);
      }
      displayToDo();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
});

/**
 * Displays the list of tasks by fetching them from the API and rendering each task
 * in the toDoContainer. Includes checkboxes for completion status, task content,
 * and delete buttons.
 */
export async function displayToDo() {
  try {
    const allTasks = await getTodos();
    if (allTasks.length > 0) {
      // Sorting tasks based on completion status (completed last)
      const allTasksSorted = allTasks.sort((a, b) => {
        // If a is completed and b is not, b comes first
        if (a.status && !b.status) {
          return 1;
        }
        // If b is completed and a is not, a comes first
        else if (!a.status && b.status) {
          return -1;
        }
        // Sort completed tasks by updated_at in descending order
        else if (a.status && b.status) {
          return new Date(a.updated_at) - new Date(b.updated_at);
        }
        // Sort non-completed tasks by created_at in descending order
        else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });
      allTasksSorted.forEach((element) => {
        // Create a task container
        const task = document.createElement('div');
        task.className = 'task';

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = element.status;
        task.appendChild(checkbox);

        // Add a change event listener to update completion status
        checkbox.addEventListener('change', function () {
          const taskId = element.todo_id;
          const newCompletionStatus = this.checked;
          updateCompletionStatus(taskId, newCompletionStatus);
        });

        // Create the content of the task
        const taskContent = document.createElement('p');
        taskContent.textContent = element.title;
        taskContent.className = 'task__task-content';
        task.appendChild(taskContent);

        // Create a button for deletion
        const deleteButton = document.createElement('button');
        deleteButton.className = 'task__delete-button';
        deleteButton.setAttribute('data-task-id', element.todo_id);
        task.appendChild(deleteButton);

        // Add a click event listener to the delete button
        deleteButton.addEventListener('click', function () {
          const taskId = this.getAttribute('data-task-id');
          deleteTask(taskId);
        });

        toDoContainer.appendChild(task);
      });
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

/**
 * Deletes a task with the given taskId using the deleteTodoById API and updates the
 * displayed tasks.
 *
 * @param {string} taskId - The ID of the task to be deleted.
 */
async function deleteTask(taskId) {
  try {
    await deleteTodoById(taskId);
    updateTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
}

/**
 * Updates the displayed tasks by removing all existing tasks from the toDoContainer
 * and then calling the displayToDo function.
 */
async function updateTasks() {
  while (toDoContainer.firstChild) {
    toDoContainer.removeChild(toDoContainer.firstChild);
  }
  displayToDo();
}

/**
 * Updates the completion status of a task with the given taskId using the
 * updateTodoById API.
 *
 * @param {string} taskId - The ID of the task to be updated.
 * @param {boolean} newCompletionStatus - The new completion status for the task.
 */
async function updateCompletionStatus(taskId, newCompletionStatus) {
  try {
    const data = { status: newCompletionStatus };
    await updateTodoById(taskId, data);
    updateTasks();
  } catch (error) {
    console.error('Error updating completion status:', error);
  }
}
