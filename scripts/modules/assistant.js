import { getAssistantAnswer } from '../api/assistantApi.js';

const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('assistantSubmit');
const form = document.querySelector('.assistant__input-container');

// Function to add a user message to the chat
function addUserMessage(message) {
  chatOutput.innerHTML +=
    '<div class="user-message"><p id="message">' + message + '</p></div>';
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Function to add an assistant message to the chat
function addAssistantMessage(message) {
  let formattedResponse = message.replace(/\n/g, '<br>');
  chatOutput.innerHTML +=
    '<div class="assistant-message">' + formattedResponse + '</div>';
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

async function sendQuestionToBackend() {
  const userQuestion = userInput.value;
  console.log(userQuestion);
  addUserMessage(userQuestion);

  // Display animated "..." to indicate that the assistant is generating a response
  const typingDots = document.createElement('div');
  typingDots.className = 'assistant-message typing-dots';
  chatOutput.appendChild(typingDots);
  chatOutput.scrollTop = chatOutput.scrollHeight;
  const data = await getAssistantAnswer({ 'user-input': userQuestion });
  chatOutput.removeChild(typingDots);

  // Assuming your backend responds with a 'generatedText' property in the JSON
  const generatedText = data;
  addAssistantMessage(generatedText);
}

// Event listener for the submit button
form.addEventListener('submit', function (event) {
  event.preventDefault();
  sendQuestionToBackend();
  // Clear the user input field
  userInput.value = '';
});
