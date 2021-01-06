function executeTest() {
  //
  function addEventListenerFetch() {
    document
      .getElementById('btn--fetch')
      .addEventListener('click', fetchJSONBasedOnUserInput);
  }

  function getURLfromInput() {
    return document.getElementById('inputField').value;
  }

  function fetchJSONBasedOnUserInput() {
    const url = getURLfromInput();
    delegateNfetch(url);
  }

  async function delegateNfetch(url) {
    const res = await fetchJSON(url);
    addToHistory(res, url);
    displayInExplorer(res);
  }

  async function fetchJSON(url) {
    try {
      let res = await fetch(`${url}`);
      if (res.ok) {
        return {status: res.status, ok: res.ok, json: await res.json()};
      } else {
        return {status: res.status, ok: res.ok};
      }
    } catch (e) {
      console.log(e);
      return {status: 'error', ok: false};
    }
  }

  function createStatus(status, code) {
    const statusMessage = document.createTextNode(
      `Response: ${status} ${code}`
    );
    return statusMessage;
  }

  function displayJson(json) {
    let jsonParsed = JSON.stringify(json, null, 4);
    const pre = document.createElement('pre');
    const text = document.createTextNode(jsonParsed);
    pre.appendChild(text);
    document.getElementById('displayedJson').appendChild(pre);
  }

  function displayInExplorer(res) {
    document.getElementById('displayedJson').innerHTML = '';
    if (res.ok) {
      displayJson(res.json);
    }
    const explorerStatus = document.querySelector('.explorerStatus');
    explorerStatus.innerText = '';

    displayStatus(res, explorerStatus);
  }

  function addToHistory(res, url) {
    let historyCard = createHistoryCard(res, url);
    document.querySelector('.templateRender').appendChild(historyCard);
  }

  function createHistoryCard(res, url) {
    let historyTemplate = document.querySelector('.template').content;
    let historyCard = historyTemplate.cloneNode(true);

    const templateStatus = historyCard.querySelector('.historyStatus');
    displayStatus(res, templateStatus);
    const targetUrl = document.createTextNode(url);
    historyCard.querySelector('.url').appendChild(targetUrl);
    return historyCard;
  }

  function displayStatus(res, element) {
    let code;
    if (res.ok) {
      code = 'Ok';
      element.style.backgroundColor = '#28ff85';
    } else {
      code = 'Not ok';
      element.style.backgroundColor = '#ff4128';
    }

    const statusMessage = createStatus(res.status, code);
    element.appendChild(statusMessage);
  }
  addEventListenerFetch();
}
executeTest();

// ------------------
// display data explorer: res{}
// display data in history: res{}

// similar?
// different yes /no? parameters

// functionality
// chunking
// data vs formatting
// isolate test
// naming: describing
// delegating function

// const templateRender = document.querySelector('.template');
// templateRender.style.display = 'block';
// document.querySelector('#clearBtn').style.display = 'block';

// ---------------------------------

// function eventClear() {
//   const buttonClear = document.getElementById('clearBtn');
//   buttonClear.addEventListener('click', () => {
//     const templateRender = document.querySelector('.template');
//     console.log(templateRender, 'test');
//     templateRender.style.display = 'none';
//   });
// }

// return {
//   status: (res.status = status),
//   ok: (res.ok = statusOk),
//   json: (await res.json() = resJson),
// };

// nieuwe functie
// stukje code daar in plakken
// parameters (placeholders) invullen
// content afhankelijk van parameter herschrijven
// returnen ?
// bedenken waar de functie te callen
// arguments invullen
//
