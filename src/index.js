// import './style.css';
import './style.scss';

function executeTest() {
  // EVENT LISTENERS
  function addEventListenerFetch() {
    document
      .getElementById('btn--fetch')
      .addEventListener('click', fetchJSONBasedOnUserInput);
  }

  function addEventListenerClear() {
    document
      .getElementById('btn--clear')
      .addEventListener('click', clearJsonRequestHistory);
  }

  // ---------------------------------------------------------

  // INPUT FIELD
  function getURLfromInput() {
    return document.getElementById('inputField').value;
  }

  function fetchJSONBasedOnUserInput() {
    const url = getURLfromInput();
    delegateNfetch(url);
  }

  // ---------------------------------------------------------

  // DATA
  async function fetchJSON(url) {
    try {
      let res = await fetch(`${url}`);
      if (res.ok) {
        return {status: res.status, ok: res.ok, json: await res.json()};
      } else {
        return {status: res.status, ok: res.ok};
      }
    } catch (e) {
      return {status: '404', ok: false};
    }
  }

  async function delegateNfetch(url) {
    const res = await fetchJSON(url);
    addToHistory(res, url);
    displayInExplorer(res);
  }
  // ---------------------------------------------------------

  // JSON
  function displayJson(json) {
    let jsonParsed = JSON.stringify(json, null, 4);
    const pre = document.createElement('pre');
    const text = document.createTextNode(jsonParsed);
    pre.appendChild(text);
    document.getElementById('displayedJson').appendChild(pre);
  }

  // ---------------------------------------------------------

  // EXPLORER
  function displayInExplorer(res) {
    document.getElementById('displayedJson').innerHTML = '';
    if (res.ok) {
      displayJson(res.json);
    }
    const explorerStatus = document.querySelector('.explorerStatus');
    explorerStatus.innerText = '';

    displayStatus(res, explorerStatus);
  }

  // ---------------------------------------------------------

  // HISTORY TEMP
  function createHistoryCard(res, url) {
    let historyTemplate = document.querySelector('.template').content;
    let historyCard = historyTemplate.cloneNode(true);

    const templateStatus = historyCard.querySelector('.historyStatus');
    displayStatus(res, templateStatus);
    const targetUrl = document.createTextNode(url);
    historyCard.querySelector('.url').appendChild(targetUrl);
    addEventListenerClear();

    historyCard
      .getElementById('btn--repeat')
      .addEventListener('click', function () {
        document.getElementById('inputField').value = url;
        delegateNfetch(url);
        console.log(this);
        this.parentElement.remove();
      });
    return historyCard;
  }

  function addToHistory(res, url) {
    let historyCard = createHistoryCard(res, url);
    document.querySelector('.templateRender').appendChild(historyCard);
  }

  //
  function clearJsonRequestHistory() {
    let what = (document.querySelector('.templateRender').innerHTML = '');
  }

  // ---------------------------------------------------------

  // STATUS MESSAGE
  function displayStatus(res, element) {
    let code;
    if (res.ok) {
      code = 'Ok';
      element.style.backgroundColor = '#3caea3';
      // element.style.backgroundColor = '#3caea3';
    } else {
      code = 'Not ok';
      element.style.backgroundColor = '#ed553b';
      // element.style.backgroundColor = '#ed553b';
    }

    const statusMessage = createStatus(res.status, code);
    element.appendChild(statusMessage);
  }

  function createStatus(status, code) {
    const statusMessage = document.createTextNode(
      `Response: ${status} ${code}`
    );
    return statusMessage;
  }

  addEventListenerFetch();
}
executeTest();
