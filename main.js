function executeTest() {
  function eventListening() {
    //
    const button = document.getElementById('fetchBtn');

    button.addEventListener('click', () => {
      const input = document.getElementById('inputAPI');

      const value = input.value;

      getApiJSON(value);
    });
  }

  async function getApiJSON(value) {
    // GET RESPONSE
    let res = await fetch(`${value}`);
    // ---------------------------------

    // RESET STATUS
    const status = document.querySelector('.explorerStatus');
    status.innerText = '';
    // ---------------------------------

    // STYLING STATUS MESSAGE : EXPLORER
    let code = res.ok ? 'Ok' : 'Not ok';
    if (res.ok) {
      document.querySelector('.explorerStatus').style.backgroundColor =
        '#28ff85';
    } else {
      // console.log(status, 'status');
      document.querySelector('.explorerStatus').style.backgroundColor =
        '#ff4128';
    }

    const statuscode = document.createTextNode(
      `Response: ${res.status} ${code}`
    );

    status.appendChild(statuscode);
    // ---------------------------------

    // INSERTING TEMPLATE
    let temp1 = document.querySelector('.template').content;
    let temp1copy = temp1.cloneNode(true);

    // ---------------------------------
    // STYLING STATUS MESSAGE : CARD

    const statuscodeCard = document.createTextNode(
      `Response: ${res.status} ${code}`
    );

    temp1copy.querySelector('.cardStatus').appendChild(statuscodeCard);
    // ---------------------------------

    // INSERTING API URL
    const APIurl = temp1copy.querySelector('.APIurl');

    const APIvalue = document.createTextNode(value);

    APIurl.appendChild(APIvalue);
    // ---------------------------------

    // STYLING STATUS MESSAGE : CARD 2
    if (res.ok) {
      temp1copy.querySelector('.cardStatus').style.backgroundColor = '#28ff85';
    } else {
      temp1copy.querySelector('.cardStatus').style.backgroundColor = '#ff4128';
    }
    // ---------------------------------

    // INSERTING TEMPLATE 2
    document.querySelector('.left').appendChild(temp1copy);
    // ---------------------------------

    // HANDELING JSON RESPONSE
    if (res.ok) {
      let data = await res.json();

      let jsonParsed = JSON.stringify(data, null, 4);

      const pre = document.createElement('pre');

      const API = document.getElementById('resAPI');

      resAPI.appendChild(pre);

      const text = document.createTextNode(jsonParsed);

      pre.appendChild(text);
    } else {
      document.getElementById('resAPI').innerHTML = '';
    }
    // ---------------------------------
  }
  eventListening();
}
executeTest();
