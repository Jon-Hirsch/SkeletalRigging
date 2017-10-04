import Skeleton from '../../src/js/Skeleton';

const context = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn(),
};

describe('Skeleton', () => {
  describe('draw', () => {
    test('calls draw on the first bone in its list of bones', () => {
      const skeleton = new Skeleton(context);
      skeleton.bones[0].draw = jest.fn();
      skeleton.draw();
      expect(skeleton.bones[0].draw).toHaveBeenCalled();
    });
  });

  describe('calculateCoordinates', () => {
    test('calls calculateCoordinates on the first bone in its list of bones', () => {
      const skeleton = new Skeleton(context);
      skeleton.bones[0].calculateCoordinates = jest.fn();
      skeleton.calculateCoordinates();
      expect(skeleton.bones[0].calculateCoordinates).toHaveBeenCalled();
    });
  });
});