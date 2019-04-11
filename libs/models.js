const usersModel = require('../models/users');
const accountsModel = require('../models/accounts');
const transactionsModel = require('../models/transactions');

module.exports = (bankaAPI) => {
  const bankaModels = {
    users: usersModel,
    accounts: accountsModel,
    transactions: transactionsModel,
  };
  bankaAPI.set('models', bankaModels);
};
