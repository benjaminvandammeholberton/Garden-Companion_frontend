document.addEventListener('DOMContentLoaded', function () {
  const chatOutput = document.getElementById('chat-output');
  const userInput = document.getElementById('user-input');
  const submitButton = document.getElementById('submit-button');

  // Function to add a user message to the chat
  function addUserMessage(message) {
    chatOutput.innerHTML +=
      '<div class="user-message"><p id="message">' + message + '</p></div>';
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  // Function to add an assistant message to the chat
  function addAssistantMessage(message) {
    chatOutput.innerHTML +=
      '<div class="assistant-message">' + message + '</div>';
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  function sendQuestionToBackend() {
    const userQuestion = userInput.value;
    addUserMessage(userQuestion);

    // Display animated "..." to indicate that the assistant is generating a response
    const typingDots = document.createElement('div');
    typingDots.className = 'assistant-message typing-dots';
    chatOutput.appendChild(typingDots);

    // Send a POST request to your backend
    fetch('https://walrus-app-jbfmz.ondigitalocean.app/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user-prompt': userQuestion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(`-----${data}`);
        chatOutput.removeChild(typingDots);

        // Assuming your backend responds with a 'generatedText' property in the JSON
        const generatedText = data;
        addAssistantMessage(generatedText);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Clear the user input field
    userInput.value = '';
  }

  // Event listener for the submit button
  submitButton.addEventListener('click', sendQuestionToBackend);

  // Optionally, you can listen for the "Enter" key press to submit the question
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendQuestionToBackend();
    }
  });
});
