const input1 = document.getElementById('input1');
let input2;
if (document.getElementById('input2')) {
  input2 = document.getElementById('input2');
}
const submitBtn = document.getElementById('submitBtn');
const submitMsg = document.getElementById('submitMsg');

submitBtn.addEventListener('click', handleSubmit);

function resetForm() {
  input1.value = '';
  if (input2) input2.value = '';
}

function handleSubmit() {
  let endpoint;
  let data;

  switch (document.title) {
    case 'Words':
      const name = input1.value;
      const definition = input2.value;
      endpoint = 'words';
      data = { name, definition };
      break;
    case 'Quotes':
      const quote = input1.value;
      const author = input2.value;
      endpoint = 'quotes';
      data = { text: quote, author };
      break;
    case 'Advice':
      const advice = input1.value;
      endpoint = 'advice';
      data = { text: advice };
      break;
    case 'Learnings':
      const learning = input1.value;
      const category = input2.value;
      endpoint = 'learnings';
      data = { text: learning, category };
      break;
    default:
      break;
  }

  doFetch(endpoint, data)
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
      submitMsg.innerText = 'Very nice! Great success!';
      submitMsg.classList.add('success');
      resetForm();
      setTimeout(() => {
        submitMsg.innerText = '';
        submitMsg.classList.remove('success');
      }, 5000);
    })
    .catch((error) => {
      submitMsg.innerText = error.message;
      submitMsg.classList.add('error');
      resetForm();
    });
}

// fetch function
async function doFetch(endpoint = '', data = {}, method = 'POST') {
  const response = await fetch(`https://wikiluke.herokuapp.com/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error(`You've already saved that word`);
    }
    throw new Error(`Something went wrong, please try again`);
  }
  return response.json(); // parses JSON response into native JavaScript objects
}
