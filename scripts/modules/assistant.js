import { getAssistantAnswer } from '../api/assistantApi.js';
import { getNumberOfRequestsAllowed } from '../api/assistantApi.js';
import { getUserInfo } from '../api/userApi.js';

const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const form = document.querySelector('.assistant__input-container');

/**
 *
 */
export function initializeAssistantModule() {
  requestCounterDisplay();
  displayPlaceholder();
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
      await sendQuestionToBackend();
      // Clear the user input field
      userInput.value = '';
    } catch (error) {
      console.error(error);
    }
  });
}

/**
 *
 */
async function requestCounterDisplay() {
  const counter = document.getElementById('assistant_counter');
  try {
    const data = await getNumberOfRequestsAllowed();
    const requestNumber = data.chat_bot_day_requests;
    counter.textContent = `${requestNumber}/3`;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 *
 */
async function displayPlaceholder() {
  const message = document.getElementById('placeholder-message');
  try {
    const data = await getUserInfo();
    const username = data.username;
    message.textContent = `Salut ${username} ! Comment puis-je t'aider ?`;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 *
 */
async function sendQuestionToBackend() {
  const userQuestion = userInput.value;
  addUserMessage(userQuestion);

  // Display animated "..." to indicate that the assistant is generating a response
  const typingDots = document.createElement('div');
  typingDots.className = 'assistant-message typing-dots';
  chatOutput.appendChild(typingDots);

  chatOutput.scrollTop = chatOutput.scrollHeight;

  let generatedText;
  try {
    const data = await getAssistantAnswer({ 'user-input': userQuestion });
    generatedText = data;
    requestCounterDisplay();
  } catch (error) {
    if (error.message === 'Error: Too Many Requests') {
      setTimeout(() => {
        generatedText =
          "Désolé, vous avez atteint le nombre maximum de questions autorisées pour \
        aujourd'hui.\nLe compteur sera réinitialisé dès demain.\nN'oubliez pas que \
        la pratique est souvent plus efficace que la théorie.😉🥕🥦";
        chatOutput.removeChild(typingDots);
        addAssistantMessage(generatedText);
      }, 3000);
      return;
    } else {
      generatedText = 'Autre erreur';
      console.error(error);
    }
  }
  chatOutput.removeChild(typingDots);
  addAssistantMessage(generatedText);
}

/**
 *
 */
function addUserMessage(message) {
  chatOutput.innerHTML +=
    '<div class="user-message"><p id="message">' + message + '</p></div>';
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

/**
 *
 */
function addAssistantMessage(message) {
  let formattedResponse = message.replace(/\n/g, '<br>');
  chatOutput.innerHTML +=
    '<div class="assistant-message">' + formattedResponse + '</div>';
  chatOutput.scrollTop = chatOutput.scrollHeight;
}
