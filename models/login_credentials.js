module.exports = (sequelize,DataTypes)=>{
    const loginCredentials = sequelize.define(
        'login_credentials',{
            id:{
                type: DataTypes.INTEGER(),
                primaryKey:true,
                autoIncrement:true,
            },
            firstname:DataTypes.STRING(20),
            lastname:DataTypes.STRING(20),
            username:{type: DataTypes.STRING(40),unique:true},
            password:DataTypes.STRING(100)
        }
    );
    return loginCredentials
}