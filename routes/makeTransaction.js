const dataValidators = require('../libs/dataValidators');

module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users, accounts, transactions] = [models.users,
    models.accounts, models.transactions,
  ];

  /**
   * @api {post} /api/v1/cashier/:cashierId/transactions/:accountNumber/:transactionType Make Transaction
   * @apiGroup Account Services
   * @apiParam {Integer} cashierId The id of the cashier making the transaction.
   * @apiParam {Integer} accountNumber The account number the transaction is being made with.
   * @apiParam {String} transactionType The type of transaction to make (debit / credit).
   * @apiParam {Float} amount The amount to be used in the transaction.
   * @apiParamExample {json} Input Example
   * {
   *    "amount": 12785.00
   * }
   * @apiSuccess {Integer} transactionId The id of the transaction.
   * @apiSuccess {Integer} accountNumber The accountNumber used to make the transaction.
   * @apiSuccess {Float} amount The amount used in the transaction.
   * @apiSuccess {Integer} cashierId The id of the cashier that made the transaction.
   * @apiSuccess {String} transactionType The type of the transaction made.
   * @apiSuccess {Float} accountBalance The funds remaining in the account used to make the transaction.
   * @apiSuccessExample {json} Success Example
   * {
   *    "status": 200,
   *    "data": {
   *        "transactionId": 5,
   *        "accountNumber": 8763984477,
   *        "amount": 12785.00,
   *        "cashierId": 1,
   *        "transactionType": "credit",
   *        "accountBalance": 70000.00
   *    }
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {String} error The error message.
   * @apiErrorExample {json} Error Example
   * {
   *    "status": 402,
   *    "error": "Insufficient funds."
   * }
   */
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
