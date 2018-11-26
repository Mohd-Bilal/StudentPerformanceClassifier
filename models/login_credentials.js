module.exports = (sequelize,DataTypes)=>{
    const loginCredentials = sequelize.define(
        'login_credentials',{
            id:{
                type: DataTypes.INTEGER(),
                primaryKey:true,
                autoIncrement:true
            },
            username: DataTypes.STRING(40),
            password:DataTypes.STRING(100)
        }
    );
    return loginCredentials
}