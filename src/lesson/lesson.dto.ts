import { Transform } from "class-transformer";
import { IsOptional, Min, Max, IsInt, IsArray } from "class-validator";

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
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch (e) {
                throw new Error(`Invalid JSON string: ${value}`);
            }
        }
        return value;
    })
    studentsCount!: string[]

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    @Min(1)
    page: number = 1

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    @Min(1)
    lessonsPerPage: number = 5
}