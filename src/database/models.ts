import { DataTypes, Model } from "sequelize";
import sequelize from './index';


class Lesson extends Model {
    public id!: number;
    public date!: Date;
    public title!: string;
    public status!: number;
}

Lesson.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
}, {
    sequelize: sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: false,
});

class Student extends Model {
    public id!: number;
    public name!: string;
}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize: sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false,
})

class Teacher extends Model {
    public id!: number;
    public name!: string;
}

Teacher.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: false,
});

class LessonStudents extends Model {
    public lesson_id!: number;
    public student_id!: number;
    public visit!: boolean;
}

LessonStudents.init({
    lesson_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Lesson,
            key: 'id'
        }
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Student,
            key: 'id'
        }
    },
    visit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    sequelize: sequelize,
    modelName: 'LessonStudents',
    tableName: 'lesson_students',
    timestamps: false,
})

class LessonTeachers extends Model {
    public lesson_id!: number;
    public teacher_id!: number;
}

LessonTeachers.init({
    lesson_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Lesson,
            key: 'id',
        },
        primaryKey: true,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Teacher,
            key: 'id',
        },
        primaryKey: true,
    }
}, {
    sequelize: sequelize,
    modelName: 'LessonTeachers',
    tableName: 'lesson_teachers',
    timestamps: false,
});


function associations() {

    Student.belongsToMany(Lesson, { through: LessonStudents, foreignKey: "student_id" });
    Lesson.belongsToMany(Student, { through: LessonStudents, foreignKey: "lesson_id" });

    Teacher.belongsToMany(Lesson, { through: LessonTeachers, foreignKey: "teacher_id" });
    Lesson.belongsToMany(Teacher, { through: LessonTeachers, foreignKey: "lesson_id" });
}

associations()

export { Lesson, Student, Teacher, LessonStudents, LessonTeachers, associations }