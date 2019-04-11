const dataValidators = require('../libs/dataValidators');

module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users, accounts, transactions] = [models.users,
    models.accounts, models.transactions,
  ];

  bankaAPI.post('/api/v1/cashier/:cashierId/transactions/:accountNumber/:transactionType', (req, res) => {
    const [cashierId, accountNumber, transactionType, transactionAmount] = [
      Number.parseInt(req.params.cashierId, 10), Number.parseInt(req.params.accountNumber, 10),
      req.params.transactionType, req.body.amount];

    const cashierValidator = users.validateCashierId(cashierId);
    const accountNumberValidator = accounts.validateAccountNumber(accountNumber);
    const transactionTypeValidator = dataValidators.validateTransactionType(transactionType);
    const allValidations = [cashierValidator, accountNumberValidator,
      transactionTypeValidator];
    const allValidationsChecker = dataValidators.checkAllValidations(allValidations);

    if (allValidationsChecker.valid) {
      const transactionDetails = {
        accountNumber,
        type: transactionType,
        amount: transactionAmount,
        cashier: cashierId,
      };
      const transactionResult = transactions.tryMakeTransaction(transactionDetails, accounts);

      if (transactionResult.success) {
        const successResult = {
          status: 200,
          data: {
            transactionId: transactionResult.result.id,
            accountNumber,
            amount: transactionAmount,
            cashier: cashierId,
            transactionType,
            accountBalance: transactionResult.result.newBalance.toString(),
          },
        };
        res.status(200).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: transactionResult.reason,
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: allValidationsChecker.reason,
      };
      res.status(401).json(errorResult);
    }
  });
};
