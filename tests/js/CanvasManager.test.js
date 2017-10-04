import CanvasManager from '../../src/js/CanvasManager';

const context = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn(),
  clearRect: jest.fn()
};

const canvas = {
  getContext: () => context,
  addEventListener: jest.fn(),
  getBoundingClientRect: () => ({ top: 10, left: 10 }),
  style: {}
};

describe('CanvasManager', () => {
  describe('draw', () => {
    test('clears the canvas', () => {
      const canvasManager = new CanvasManager(canvas);
      canvasManager.draw();
      expect(context.clearRect).toHaveBeenCalled();
    });

    test('clears the draw method of the skeleton', () => {
      const canvasManager = new CanvasManager(canvas);
      canvasManager.skeleton.draw = jest.fn();
      canvasManager.draw();
      expect(canvasManager.skeleton.draw).toHaveBeenCalled();
    });
  });

  describe('handleMouseDown', () => {
    test('sets the current drag bone to equal the current hover bone', () => {
      const canvasManager = new CanvasManager(canvas);
      canvasManager.currentHoverBone = 'hover bone';
      canvasManager.handleMouseDown();
      expect(canvasManager.currentDragBone).toEqual('hover bone');
    });
  });

  describe('handleMouseUp', () => {
    test('sets the current drag bone to null', () => {
      const canvasManager = new CanvasManager(canvas);
      canvasManager.currentDragBone = 'drag bone';
      canvasManager.handleMouseUp();
      expect(canvasManager.currentDragBone).toEqual(null);
    });
  });

  describe('handleMouseMove', () => {
    describe('if a bone is being dragged', () => {
      let canvasManager;
      beforeEach(() => {
        canvasManager = new CanvasManager(canvas);
        canvasManager.currentDragBone = { pointToward: jest.fn() };
      });
      test('it calls the bones pointToward method with the mouse coordinates relative to the canvas', () => {
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20 });
        expect(canvasManager.currentDragBone.pointToward).toHaveBeenCalledWith(10, 10);
      });

      test('it calls draw', () => {
        canvasManager.draw = jest.fn();
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20 });
        expect(canvasManager.draw).toHaveBeenCalled();
      });
    });

    describe('if a bone is not being dragged', () => {
      let canvasManager;
      beforeEach(() => {
        canvasManager = new CanvasManager(canvas);
      });

      test('it sets currentHoverBone to any bone that has its drag point at the mouse coordinates', () => {
        canvasManager.skeleton.bones[1].endX = 10;
        canvasManager.skeleton.bones[1].endY = 10;
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20 });
        expect(canvasManager.currentHoverBone).toEqual(canvasManager.skeleton.bones[1]);
      });

      test('it sets the canvas cursor style to pointer if a hover bone is found', () => {
        canvasManager.skeleton.bones[1].endX = 10;
        canvasManager.skeleton.bones[1].endY = 10;
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20 });
        expect(canvasManager.canvas.style.cursor).toEqual('pointer');
      });

      test('it sets the canvas cursor style to default if a hover bone is not found', () => {
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20 });
        expect(canvasManager.canvas.style.cursor).toEqual('default');
      });
    });
  });
});