const requestFullscreenEl = document.getElementById('request-fullscreen');
const fullscreenEl = document.getElementById('fullscreen');
const stylesEl = document.getElementById('dynamic');
const introEl = document.getElementById('intro');
const hexDisplayEl = document.getElementById('hex-display');

requestFullscreenEl.addEventListener('click', ev => fullscreenEl.requestFullscreen());

fullscreenEl.addEventListener('fullscreenchange', ev => {
  if (document.fullscreenElement) {
    introEl.style.display = 'initial';
    hexDisplayEl.style.display = 'none';
    let timers = [ // cancel these
      setTimeout(() => introEl.style.display = 'none', 3500),
      setTimeout(() => hexDisplayEl.style.display = 'initial', 3800)
    ];
  } else {
    introEl.style.display = 'none';
    hexDisplayEl.style.display = 'none';
  }
})

const generateHexGrid = (width, height) => {
  const stylesEl = document.createElement('style');
  stylesEl.type = 'text/css';
  stylesEl.innerHTML = `
    #hex-display {
      width: calc(111px*${width});
    }
  `;
  document.head.appendChild(stylesEl);

  for (let row = 0; row < height; row++) {
    const rowEl = document.createElement('div');
    rowEl.classList.add('hex-row', '-clearfix');

    for (let column = 0; column < width; column++) {
      const hexEl = document.createElement('div');
      hexEl.classList.add('hex', '-blink');

      rowEl.appendChild(hexEl);
    }

    hexDisplayEl.appendChild(rowEl);
  }
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.hasOwnProperty('debug')) {
  fullscreenEl.classList.add('debug');
}

const DEFAULT_HEX_GRID_WIDTH  = 14;
const DEFAULT_HEX_GRID_HEIGHT = 5;
const gridWidth               = params.hasOwnProperty('w') ? params.w : DEFAULT_HEX_GRID_WIDTH;
const gridHeight              = params.hasOwnProperty('h') ? params.h : DEFAULT_HEX_GRID_HEIGHT;
generateHexGrid(gridWidth, gridHeight);

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
