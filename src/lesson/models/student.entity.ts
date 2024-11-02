import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '../../database/index';

class Student extends Model {
    public id!: number;
    public name!: string;
}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    }
},
{
    sequelize: sequelizeConnection,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false,
})

export default Student