const dataValidators = require('../libs/dataValidators');

module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users, accounts, transactions] = [models.users, models.accounts, models.transactions];

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

};
