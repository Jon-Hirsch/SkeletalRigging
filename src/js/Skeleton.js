import Bone from './Bone';
import { degreesToRadians } from './helpers';

export default class Skeleton {
  constructor(context, scale) {
    this.bones = [];

    const chestBone = new Bone(300, 320, 200, degreesToRadians(270), context, scale);
    this.bones.push(chestBone);

    const leftUpperArm = new Bone(75, 0, 75, degreesToRadians(-90), context, scale);
    chestBone.addChild(leftUpperArm);
    this.bones.push(leftUpperArm);

    const leftForearm = new Bone(0, 0, 75, degreesToRadians(45), context, scale);
    leftUpperArm.addChild(leftForearm);
    this.bones.push(leftForearm);

    const rightUpperArm = new Bone(75, 0, 75, degreesToRadians(90), context, scale);
    chestBone.addChild(rightUpperArm);
    this.bones.push(rightUpperArm);

    const rightForearm = new Bone(0, 0, 75, degreesToRadians(-45), context, scale);
    rightUpperArm.addChild(rightForearm);
    this.bones.push(rightForearm);

    const leftUpperLeg = new Bone(200, 0, 75, degreesToRadians(215), context, scale);
    chestBone.addChild(leftUpperLeg);
    this.bones.push(leftUpperLeg);

    const leftLowerLeg = new Bone(0, 0, 75, degreesToRadians(-25), context, scale);
    leftUpperLeg.addChild(leftLowerLeg);
    this.bones.push(leftLowerLeg);

    const rightUpperLeg = new Bone(200, 0, 75, degreesToRadians(-215), context, scale);
    chestBone.addChild(rightUpperLeg);
    this.bones.push(rightUpperLeg);

    const rightLowerLeg = new Bone(0, 0, 75, degreesToRadians(25), context, scale);
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
