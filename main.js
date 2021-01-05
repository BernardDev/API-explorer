function executeTest() {
  // ADD EVENT LISTENER / GET VALUE INPUT FIELD
  function eventListening() {
    const button = document.getElementById('fetchBtn');
    button.addEventListener('click', () => {
      const input = document.getElementById('inputAPI');
      const value = input.value;
      getApiJSON(value);
    });
  }

  // EVENT HANDLING / FETCHING / RENDERING / STATUS CODE REPLY
  async function getApiJSON(value) {
    // add the value of input to html colelction / array / nodecollection
    const left = document.querySelector('.left');
    const paragraph = document.createElement('p');
    left.appendChild(paragraph);
    const history = document.createTextNode(value);
    paragraph.appendChild(history);

    let res = await fetch(`${value}`);

    const status = document.getElementById('status');
    status.innerText = '';
    let code = res.ok ? 'Ok' : 'Not ok';
    const statuscode = document.createTextNode(
      `Response: ${res.status} ${code}`
    );
    status.appendChild(statuscode);
    if (res.ok) {
      let data = await res.json();
      let jsonParsed = JSON.stringify(data, null, 4);
      // printing the json
      const API = document.getElementById('resAPI');
      const pre = document.createElement('pre');
      resAPI.appendChild(pre);
      const text = document.createTextNode(jsonParsed);
      pre.appendChild(text);
      document.querySelector('#status').style.backgroundColor = '#28ff85';
    } else {
      document.querySelector('#status').style.backgroundColor = '#ff4128';
      document.getElementById('resAPI').innerHTML = '';
    }
  }
  eventListening();
}
executeTest();
