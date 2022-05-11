const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('xabz5kbbjw33bcma', 'yni43fbeukih28z9', 'zhpcvjj9w90e7fyd', {
    host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    logging: false,
});

const Pitstop = sequelize.define('Pitstop', {
    abr: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { timestamps: false});

const Route = sequelize.define('Route',{
    time: {
        type: DataTypes.CHAR(5),
        allowNull: false,
    },
    num: {
        type: DataTypes.CHAR(7),
        allowNull: false,
    },
    isWorkday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},{ timestamps: false});

const RouteGroup = sequelize.define('RouteGroup', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{timestamps: false})

const RouteLink = sequelize.define('RouteLinks',{
    num: {
        type: DataTypes.CHAR(7),
        allowNull: false,
    },
    href: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false});

RouteGroup.hasMany(RouteLink);
RouteGroup.hasMany(Route);

Route.belongsTo(RouteGroup);
RouteLink.belongsTo(RouteGroup);

(async () => {

})();

module.exports = {Route, RouteGroup, RouteLink, sequelize}