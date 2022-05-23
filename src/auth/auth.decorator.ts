import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsEqualPassword(property: string, options?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsEqualPassword',
      target: object.constractor,
      propertyName,
      options,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [related] = args.constraints;
          const relatedValue = (args.object as any)[related];
          return relatedValue === value;
        },
      },
    });
  };
}
