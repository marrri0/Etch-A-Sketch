// timeout for loading screen
setTimeout( function() {
  const loadingPage = document.querySelector('.loading-page');
  const sketchPage = document.querySelector('.main-container');
  loadingPage.remove();
  sketchPage.style.display = 'flex';
}, 7000);


const btn = document.querySelectorAll('button');
const para = document.querySelector('.value-para');
const slider = document.querySelector('.slider');
const mainDiv = document.querySelector('.sketch-panel');
const randomRGB = document.querySelector('.randomRGB');
const colorPick = document.querySelector('#color-pick');
const resetBtn = document.querySelector('.clr');
const eraser = document.querySelector('.eraser');
const settingPanel = document.querySelector('.settings');
const darkModeToggle = document.querySelector("[alt='light-mode-icon']");
const lightModeToggle = document.querySelector("[alt='dark-mode-icon']");

// Check if dark mode preference is stored in local storage
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode if it's enabled
if (isDarkMode) {
  toggleDarkMode();
} else {
  toggleLightMode();
}

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
        squares.classList.add('grid-squares')

        squares.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = colorPick.value;
        });
    }
}

function setGridSize(size) {
  para.textContent = `${size} x ${size}`;
  createSquares(size);
}

slider.addEventListener('input', function (e) {
  const value = e.target.value;
  setGridSize(value);
});

function getRandomRGB() {
  const a = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  const c = Math.round(Math.random() * 255);

  return `rgb(${a}, ${b}, ${c})`;
}

randomRGB.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;

  for (let i = 0; i < value * value; i++) {
    child[i].addEventListener('mouseover', function (e) {
      e.target.style.backgroundColor = getRandomRGB();
    });
  }
});

colorPick.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;
  
  for (let i = 0; i < value * value; i++) {
    child[i].addEventListener('mouseover', function (e) {
      e.target.style.backgroundColor = colorPick.value;
    });
  }
});

eraser.addEventListener('click', function () {
  const value = slider.value;
  const child = mainDiv.children;
  
  for (let i = 0; i < value * value; i++) {
    child[i].addEventListener('mouseover', function (e) {
      e.target.style.backgroundColor = '#fff';
    });
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
  const initialSize = 10;
  setGridSize(initialSize);
}

initialize();