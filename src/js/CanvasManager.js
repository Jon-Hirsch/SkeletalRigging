import Skeleton from './Skeleton';

export default class CanvasManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.skeleton = new Skeleton(this.context);
    this.skeleton.calculateCoordinates();
    this.skeleton.draw();
  }
}