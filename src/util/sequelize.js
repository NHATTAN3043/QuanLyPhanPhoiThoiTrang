
module.exports = {
    mutipleSequelizeToObject: function(sequelizeArray) {
        return sequelizeArray.map(sequelizeInstance => sequelizeInstance.get({ plain: true }));
    },
    sequelizeToObject: function(sequelizeInstance){
        return sequelizeInstance ? sequelizeInstance.get({ plain: true }) : sequelizeInstance;
    }

};
