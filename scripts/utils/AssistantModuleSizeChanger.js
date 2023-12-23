export function assistantModuleSizeChanger() {
  const gptButton = document.getElementById('submit-button');
  const inputElement = document.getElementById('user-input');
  const expandElement = document.getElementById('assistant_button');
  const chatOutput = document.querySelector('.chat-output');
  const placeholderMessage = document.getElementById('placeholder-message');
  const assistantModule = document.querySelector(
    '.dashbord__module--assistant'
  );
  const forecastModule = document.querySelector('.dashbord__module--forecast');
  const toDoModule = document.querySelector('.dashbord__module--todolist');
  const recommandationsModule = document.querySelector(
    '.dashbord__module--recommandations'
  );
  const assistantConversationContainer = document.getElementById('chat-output');
  const counter = document.getElementById('assistant_counter');
  let isAssistantToggled = false; // Variable to track the grid state

  function showChatContainer() {
    chatOutput.style.display = 'block';
  }

  // Function to hide the chat container
  function hideChatContainer() {}

  // Add a click event listener to the element
  expandElement.addEventListener('click', (event) => {
    // Toggle between the two grid templates
    if (isAssistantToggled) {
      assistantModule.style.gridRow = '';
      assistantModule.style.gridColumn = '';
      forecastModule.style.display = 'flex';
      toDoModule.style.display = '';
      assistantModule.style.borderRadius = '';
      recommandationsModule.style.display = '';
      assistantConversationContainer.style.height = '70%';
      counter.style.top = '18px';
      counter.style.right = '15px';
      hideChatContainer();
      // placeholderMessage.style.display = 'block';
    } else {
      counter.style.top = '18px';
      counter.style.right = '80px';
      assistantModule.style.gridRow = 'span 3';
      assistantModule.style.gridColumn = 'span 2';
      assistantModule.style.borderRadius = '5px 100px 100px 5px';
      forecastModule.style.display = 'none';
      recommandationsModule.style.display = 'none';
      toDoModule.style.display = 'none';
      assistantConversationContainer.style.height = '80%';
      showChatContainer();
      // placeholderMessage.style.display = 'none';
    }
    isAssistantToggled = !isAssistantToggled; // Toggle the state
  });
}
