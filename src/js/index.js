import CanvasManager from './CanvasManager';

document.addEventListener('DOMContentLoaded', initSkeletalRigging);

function initSkeletalRigging () {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  document.getElementById('SkeletalRiggingContainer').appendChild(canvas);
  const manager = new CanvasManager(canvas)

}