import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '../../database/index';

class Teacher extends Model {
    public id!: number;
    public name!: string;
}

Teacher.init({
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
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: false,
})

export default Teacher