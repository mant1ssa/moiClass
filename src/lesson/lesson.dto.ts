import { Transform } from "class-transformer";
import { IsOptional, Min, Max, IsInt, IsArray, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from "class-validator";

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsNumberOrString implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'number' || typeof value === 'string';
  }

  defaultMessage(args: ValidationArguments) {
    return `Value must be a number or a string.`;
  }
}

export class LessonsGetDTO {
    @IsOptional()
    date!: string;

    @IsOptional()
    @Min(0)
    @Max(2)
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    status!: number

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    teacherIds!: string[]

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    // @Validate(IsNumberOrString)
    studentsCount!: string[]

    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1

    @IsOptional()
    @IsInt()
    @Min(1)
    lessonsPerPage: number = 5
}