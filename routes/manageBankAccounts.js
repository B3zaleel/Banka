const dataValidators = require('../libs/dataValidators');

module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users, accounts, transactions] = [models.users, models.accounts, models.transactions];

  /**
   * @api {patch} /api/v1/staff/:staffId/account/:accountNumber Change Account Status
   * @apiGroup Account Management
   * @apiParam {Integer} staffId The id of the admin/staff performing the status update.
   * @apiParam {Integer} accountNumber The account number to update.
   * @apiParam {String} status The new status to be given to the account.
   * @apiParamExample {json} Input Example
   * {
   *    "status": "active"
   * }
   * @apiSuccess {Integer} status The HTTP success status code.
   * @apiSuccess {Integer} accountNumber The account number that was updated.
   * @apiSuccess {String} status The new status of the bank account.
   * @apiSuccessExample {json} Success Example
   * {
   *    "status": 200,
   *    "data": {
   *        "accountNumber": 7885639847,
   *        "status": "active"
   *    }
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {String} error The error message.
   * @apiErrorExample {json} Error Example
   * {
   *    "status": 401,
   *    "error": "The given account number does not exist."
   * }
   */
  bankaAPI.patch('/api/v1/staff/:staffId/account/:accountNumber', (req, res) => {
    const [staffId, accountNumber, status] = [
      Number.parseInt(req.params.staffId, 10),
      Number.parseInt(req.params.accountNumber, 10),
      req.body.status];
    const staffAccountValidation = users.validateStaffId(staffId);
    const statusTypeValidation = dataValidators.validateAccountStatus(status);

    const actionValidations = [staffAccountValidation,
      statusTypeValidation];
    const allActionResults = dataValidators.checkAllValidations(actionValidations);
    if (allActionResults.valid) {
      const accountStatusChangeResult = accounts.tryChangeAccountStatus(accountNumber, status);

      if (accountStatusChangeResult.success) {
        const accountData = accounts.getAccountData(accountNumber);
        const successResult = {
          status: 200,
          data: {
            accountNumber: accountData.accountNumber,
            status: accountData.status,
          },
        };
        res.status(200).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: accountStatusChangeResult.reason,
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: allActionResults.reason,
      };
      res.status(401).json(errorResult);
    }
  });

  /**
   * @api {delete} /api/v1/staff/:staffId/accounts/:accountNumber Delete Bank Account
   * @apiGroup Account Management
   * @apiParam {Integer} staffId The id of the admin/staff deleting the account.
   * @apiParam {json} accountNumber The account number to delete.
   * @apiSuccess {Integer} status The HTTP success response code.
   * @apiSuccess {String} message The action succeeded message.
   * @apiSuccessExample {json} Success
   * {
   *    "status": 200,
   *    "message": "Account deleted successfully."
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {String} error The error message.
   * @apiErrorExample {json} Error
   * {
   *    "status": 412,
   *    "error": "The given bank account does not exist."
   * }
   */
  bankaAPI.delete('/api/v1/staff/:staffId/accounts/:accountNumber', (req, res) => {
    const [staffId, accountNumber] = [
      Number.parseInt(req.params.staffId, 10),
      Number.parseInt(req.params.accountNumber, 10)];
    const staffAccountValidation = users.validateStaffId(staffId);

    if (staffAccountValidation.valid) {
      const accountDeletionResult = accounts.tryDeleteAccount(accountNumber, transactions);
      if (accountDeletionResult.success) {
        const successResult = {
          status: 200,
          message: 'Account successfully deleted.',
        };
        res.status(200).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: accountDeletionResult.reason,
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: staffAccountValidation.reason,
      };
      res.status(401).json(errorResult);
    }
  });
};
