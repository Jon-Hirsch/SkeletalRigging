import Bone from '../../src/js/Bone';
import { degreesToRadians } from '../../src/js/helpers';

const context = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn()
};

describe('Bone', () => {
  describe('addChild', () => {
    let parentBone, childBone;
    beforeEach(() => {
      parentBone = new Bone(300, 320, 200, 0.5, context);
      childBone = new Bone(300, 320, 200, 0.5, context);
    });

    test('addChild ands a bone to the children array', () => {
      parentBone.addChild(childBone);
      expect(parentBone.children[0]).toEqual(childBone);
    });

    test('addChild sets the current bone as the childs parent', () => {
      parentBone.addChild(childBone);
      expect(childBone.parent).toEqual(parentBone);
    });
  });

  describe('calculateCoordinates', () => {
    describe('when the bone has no parent', () => {
      let bone;
      beforeEach(() => {
        bone = new Bone(10, 10, 10, degreesToRadians(90), context);
        bone.calculateCoordinates();
      });

      test('correctly calculates the angle', () => {
        expect(bone.absoluteAngle).toEqual(degreesToRadians(90));
      });

      test('correctly calculates starting coordinates', () => {
        expect(bone.absoluteX).toEqual(10);
        expect(bone.absoluteY).toEqual(10);
      });

      test('correctly calculates ending coordinates', () => {
        expect(bone.endX).toEqual(10);
        expect(bone.endY).toEqual(20);
      });
    });

    describe('when the bone has a parent', () => {
      let childBone, parentBone;
      beforeEach(() => {
        parentBone = new Bone(10, 10, 10, degreesToRadians(90), context);
        childBone = new Bone(10, 10, 10, degreesToRadians(90), context);
        parentBone.addChild(childBone);
        parentBone.calculateCoordinates();
        childBone.calculateCoordinates();
      });

      test('correctly calculates the angle based on the parents angle', () => {
        expect(childBone.absoluteAngle).toEqual(degreesToRadians(180));
      });

      test('correctly calculates starting coordinates based on the parents coordinates and angle', () => {
        expect(childBone.absoluteX).toEqual(20);
        expect(childBone.absoluteY).toEqual(10);
      });

      test('correctly calculates ending coordinates based on the parents coordinates and angle', () => {
        expect(childBone.endX).toEqual(10);
        // the JavaScript math gets wonky and is off by 0.0000000002 so we round.
        expect(Math.round(childBone.endY)).toEqual(10);
      });
    });

    describe('when the bone has children', () => {
      test('calls calculateCoordinates for each child', () => {
        const parentBone = new Bone(10, 10, 10, degreesToRadians(90), context);
        const child1 = new Bone(10, 10, 10, degreesToRadians(90), context);
        const child2 = new Bone(10, 10, 10, degreesToRadians(90), context);
        child1.calculateCoordinates = jest.fn();
        child2.calculateCoordinates = jest.fn();
        parentBone.addChild(child1);
        parentBone.addChild(child2);
        parentBone.calculateCoordinates();
        expect(child1.calculateCoordinates).toHaveBeenCalled();
        expect(child2.calculateCoordinates).toHaveBeenCalled();
      });
    });
  });

  describe('draw', () => {
    test('calls draw for each child', () => {
      const parentBone = new Bone(10, 10, 10, degreesToRadians(90), context);
      const child1 = new Bone(10, 10, 10, degreesToRadians(90), context);
      const child2 = new Bone(10, 10, 10, degreesToRadians(90), context);
      child1.draw = jest.fn();
      child2.draw = jest.fn();
      parentBone.addChild(child1);
      parentBone.addChild(child2);
      parentBone.draw();
      expect(child1.draw).toHaveBeenCalled();
      expect(child2.draw).toHaveBeenCalled();
    });
  });

  describe('pointToward', () => {
    test('points a bone towards a set of coordinates', () => {
      const bone = new Bone(10, 10, 10, 0, context);
      bone.pointToward(10, 50);
      expect(bone.absoluteAngle).toEqual(degreesToRadians(90));
      expect(bone.endX).toEqual(10);
      expect(bone.endY).toEqual(20);
    });

    test('correctly adjusts the calculations if the bone has a parent', () => {
      const parentBone = new Bone(10, 10, 10, degreesToRadians(90), context);
      const childBone = new Bone(0, 0, 10, degreesToRadians(90), context);
      parentBone.addChild(childBone);
      parentBone.calculateCoordinates();
      childBone.pointToward(10, 50);
      expect(childBone.absoluteAngle).toEqual(degreesToRadians(90));
      expect(childBone.endX).toEqual(10);
      expect(childBone.endY).toEqual(30);
    });
  });

  describe('checkMouse', () => {
    test('returns true if the given coordinates are within the radius of the bones click point', () => {
      const bone = new Bone(10, 10, 10, 0, context);
      expect(bone.checkMouse(20, 10)).toEqual(true);
    });

    test('returns true if the given coordinates are within the radius of the bones click point', () => {
      const bone = new Bone(10, 10, 10, 0, context);
      expect(bone.checkMouse(0, 10)).toEqual(false);
    });
  });
});