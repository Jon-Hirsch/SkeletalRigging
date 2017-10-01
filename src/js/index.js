import CanvasManager from './CanvasManager';

document.addEventListener('DOMContentLoaded', initSkeletalRigging);

function initSkeletalRigging () {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const container = document.getElementById('SkeletalRiggingContainer');
  if (container) {
    container.appendChild(canvas);
    const manager = new CanvasManager(canvas);
    manager.start();
  }
}