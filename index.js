const wordInput = document.getElementById('wordInput');
const definitionInput = document.getElementById('definitionInput');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', handleSubmit);

function handleSubmit() {
  const name = wordInput.value;
  const definition = definitionInput.value;
  postData('https://better-brain.herokuapp.com/words', {
    name,
    definition,
  })
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
      wordInput.value = '';
      definitionInput.value = '';
    })
    .catch((error) => console.log(error));
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
