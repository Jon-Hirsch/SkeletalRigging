import CanvasManager from './CanvasManager';

initSkeletalRigging();

function initSkeletalRigging() {
  const container = document.getElementById('SkeletalRiggingContainer');
  if (container) {
    populateContainer(container);
    window.addEventListener(
      'resize',
      debounce(() => populateContainer(container))
    );
  }
}

function populateContainer(container) {
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.style.border = '1px solid';
  resizeCanvas(canvas);
  container.appendChild(canvas);
  const manager = new CanvasManager(canvas);
  manager.draw();
}

function resizeCanvas(canvas) {
  if (window.innerWidth < 375) {
    canvas.width = 300;
    canvas.height = 300;
  } else if (window.innerWidth < 850) {
    const size = (window.innerWidth / 850) * 600;
    canvas.width = size;
    canvas.height = size;
  } else {
    canvas.width = 600;
    canvas.height = 600;
  }
}

function debounce(callback) {
  let timer;

  return (params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(params);
    }, 200);
  };
}
