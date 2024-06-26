import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
export default (sequelize) => {
  // defino el modelo
  return sequelize.define('dogs', {
    id :{
      primaryKey: true,
      type : DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    weight:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    lifespan:{
      type: DataTypes.INTEGER,
      allowNull:false
    }


  },{timestamps: false});
};
