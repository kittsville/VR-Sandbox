const requestFullscreenEl = document.getElementById('request-fullscreen');
const fullscreenEl = document.getElementById('fullscreen');

requestFullscreenEl.addEventListener('click', ev => fullscreenEl.requestFullscreen());

fullscreenEl.addEventListener('fullscreenchange', ev => {
  if (document.fullscreenElement) {
    fullscreenEl.classList.add('active');
  } else {
    fullscreenEl.classList.remove('active');
  }
})

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.hasOwnProperty('debug')) {
  fullscreenEl.classList.add('debug');
}

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
