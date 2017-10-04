import Bone from './Bone';
import { degreesToRadians } from './helpers';

export default class Skeleton {
  constructor(context) {
    this.bones = [];

    const chestBone = new Bone(300, 320, 200, degreesToRadians(270), context);
    this.bones.push(chestBone);

    const leftUpperArm = new Bone(75, 0, 75, degreesToRadians(-90), context);
    chestBone.addChild(leftUpperArm);
    this.bones.push(leftUpperArm);

    const leftForearm = new Bone(0, 0, 75, degreesToRadians(45), context);
    leftUpperArm.addChild(leftForearm);
    this.bones.push(leftForearm);

    const rightUpperArm = new Bone(75, 0, 75, degreesToRadians(90), context);
    chestBone.addChild(rightUpperArm);
    this.bones.push(rightUpperArm);

    const rightForearm = new Bone(0, 0, 75, degreesToRadians(-45), context);
    rightUpperArm.addChild(rightForearm);
    this.bones.push(rightForearm);

    const leftUpperLeg = new Bone(200, 0, 75, degreesToRadians(215), context);
    chestBone.addChild(leftUpperLeg);
    this.bones.push(leftUpperLeg);

    const leftLowerLeg = new Bone(0, 0, 75, degreesToRadians(-25), context);
    leftUpperLeg.addChild(leftLowerLeg);
    this.bones.push(leftLowerLeg);

    const rightUpperLeg = new Bone(200, 0, 75, degreesToRadians(-215), context);
    chestBone.addChild(rightUpperLeg);
    this.bones.push(rightUpperLeg);

    const rightLowerLeg = new Bone(0, 0, 75, degreesToRadians(25), context);
    rightUpperLeg.addChild(rightLowerLeg);
    this.bones.push(rightLowerLeg);

    this.calculateCoordinates();
  }

  draw() {
    this.bones[0].draw();
  }

  calculateCoordinates() {
    this.bones[0].calculateCoordinates();
  }
}