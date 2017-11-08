const Sequelize = require('sequelize');
const postgresUrl = 'postgres://ojgiieyj:B_Umu3eifqfsPAiNNzUNkT_eXDpIHXG5@baasu.db.elephantsql.com:5432/ojgiieyj';

const db = new Sequelize(postgresUrl, {
    operatorsAliases: false
});
db
  .authenticate()
  .then(() => {
      console.log('Connection has been established');
  })
  .catch(err => {
      console.log('Unable to connect to the database');
  });

const Users = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

const UsersLists = db.define('usersLists', {
    listName: {
        type: Sequelize.STRING
    }
});
UsersLists.belongsTo(Users);
Users.hasMany(UsersLists);

db.sync();
