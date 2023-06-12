// timeout for loading screen
setTimeout( function() {
  const loadingPage = document.querySelector('.loading-page');
  const sketchPage = document.querySelector('.main-container');
  loadingPage.remove();
  sketchPage.style.display = 'flex';
}, 9000);


const btn = document.querySelectorAll('button');
const para = document.querySelector('.value-para');
const slider = document.querySelector('.slider');
const mainDiv = document.querySelector('.sketch-panel');
const randomRGB = document.querySelector('.randomRGB');
const colorPick = document.querySelector('#color-pick');
const resetBtn = document.querySelector('.clr');
const eraser = document.querySelector('.eraser');
const grd = document.querySelector('.grd');
const settingPanel = document.querySelector('.settings');
const darkModeToggle = document.querySelector("[alt='light-mode-icon']");
const lightModeToggle = document.querySelector("[alt='dark-mode-icon']");

// Check if dark mode preference is stored in local storage
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode if it's enabled
if (!isDarkMode) {
  toggleLightMode();
} else {
  toggleDarkMode();
};

// Dark mode func
darkModeToggle.addEventListener('click', toggleLightMode);
lightModeToggle.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  document.body.style.background = 'url(./img/white-pattern-bg.avif)';
  document.body.style.color = '#696969';
  document.body.style.transition = '0.3s';
  para.style.cssText = 'background: url(./img/white-pattern-bg.avif); color: #696969;';
  
  btn.forEach(btn => {
    btn.style.background = 'url(./img/white-pattern-bg.avif)';
    btn.style.color = '#696969';
  });

  lightModeToggle.style.display = 'none';
  darkModeToggle.style.display = 'block';

  localStorage.setItem('darkMode', 'true');
};

function toggleLightMode() {
  document.body.style.background = 'url(./img/inverted-black-bg.png)';
  document.body.style.color = '#fff';
  document.body.style.transition = '0.3s';
  para.style.cssText = 'background: url(./img/inverted-black-bg.png); color: #fff';

  btn.forEach(btn => {
    btn.style.background = 'url(./img/inverted-black-bg.png)';
    btn.style.color = '#fff';
  });

  darkModeToggle.style.display = 'none';
  lightModeToggle.style.display = 'block';

  localStorage.setItem('darkMode', 'false');
};

let isMouseDown = false; // flag to track mouse status

// initializing sketch func
function createSquares() {
    sqValue = slider.value
    mainDiv.innerHTML = '';
    mainDiv.style.gridTemplateColumns = `repeat(${sqValue}, 1fr)`;
    mainDiv.style.gridTemplateRows = `repeat(${sqValue}, 1fr)`;

    for (let i = 0; i < sqValue * sqValue; i++) {
        const squares = document.createElement('div');
        squares.style.transition = '0.2s'
        mainDiv.appendChild(squares);
        squares.classList.toggle('removed-grid-squares');

        squares.addEventListener('mousedown', () => {
          isMouseDown = true;
        });

        squares.addEventListener('mouseup', () => {
          isMouseDown = false;
        });


        squares.addEventListener('mousemove', (e) => {
          if (isMouseDown) {
            e.target.style.backgroundColor = colorPick.value;
          }
        });

        grd.addEventListener('click', function () {
          squares.classList.toggle('grid-squares')
          squares.classList.toggle('removed-grid-squares')
        });
    }
};

function setGridSize(size) {
  para.textContent = `${size} x ${size}`;
  createSquares(size);
};

slider.addEventListener('input', function (e) {
  const value = e.target.value;
  setGridSize(value);
});

function getRandomRGB() {
  const red = Math.round(Math.random() * 255);
  const green = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

randomRGB.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;

  for (let i = 0; i < value * value; i++) {
    child[i].addEventListener('mouseover', function (e) {
      if (isMouseDown) {
        e.target.style.backgroundColor = getRandomRGB();
      }
    });
    child[i].addEventListener('mouseup', () => {
      isMouseDown = false;
    });
  }
});

colorPick.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;
  
  for (let i = 0; i < value * value; i++) {
    child[i].addEventListener('mouseover', function (e) {
      if (isMouseDown) {
        e.target.style.backgroundColor = colorPick.value;
      }
    });
    child[i].addEventListener('mouseup', () => {
      isMouseDown = false;
    });
  }
});

eraser.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;
  
  for (let i = 0; i < value * value; i++) {
    child[i].addEventListener('mouseover', function (e) {
      if (isMouseDown) {
        e.target.style.backgroundColor = '#fff';
      }
    });
    child[i].addEventListener('mouseup', () => {
      isMouseDown = false;
    })
  }
});

resetBtn.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;

  for (let i = 0; i < value * value; i++) {
    child[i].style.backgroundColor = '#fff';
  }
});

function initialize() {
  const initialSize = 20;
  setGridSize(initialSize);
};

initialize();