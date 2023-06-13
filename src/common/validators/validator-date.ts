import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const startDate = (args.object as any)[relatedPropertyName];
    const finalDate = value;

    if (!startDate || !finalDate) {
      return false;
    }

    return new Date(startDate) <= new Date(finalDate);
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} must be less than or equal to ${args.property}`;
  }
}

export function IsDateRangeValid(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsDateRangeValid',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsValidDateConstraint,
    });
  };
}
