import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "isDateValid", async: true })
export class IsDateValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const obj = validationArguments.object as any;

    console.log("check 1");

    if (!obj.startDate !== !obj.endDate) {
      return false;
    }

    console.log("check 2");

    if (!obj.startDate && !obj.endDate) return true;

    const startDate = new Date(obj.startDate);
    const endDate = new Date(obj.endDate);
    const duration = obj.duration;

    console.log("check 3");

    if (startDate > endDate) {
      return false;
    }

    console.log("check 4");

    if (duration === 0) return true;

    console.log("check 5");

    if ((endDate.getTime() - startDate.getTime()) / (1000 * 60) < duration) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "startDate must be earlier than endDate, and (endDate - startDate) must be greater than or equal to duration (in minutes).";
  }
}
