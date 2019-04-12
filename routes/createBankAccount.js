const dataValidators = require('../libs/dataValidators');

module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users, accounts] = [models.users, models.accounts];

  /**
   * @api {post} /api/v1/user/:userId/accounts Create Bank Account
   * @apiGroup Account Creation
   * @apiParam {Integer} userId The id of the client to create the account for.
   * @apiParam {String} state The state/region the client is using to create the account.
   * @apiParam {String} branch The branch the client is creating the account at.
   * @apiParam {String} type The type of account to create for the client.
   * @apiParam {String} idType The id of the client to use for external validation.
   * @apiParam {Integer} idNumber The id Number of the client's external id.
   * @apiParam {String} idExpiryDate The expiry date of the client's id.(Format: dd/mm/yyyy)
   * @apiParam {Float} openingBalance The client's opening balance.
   * @apiParam {String} address1 The main address of the client.
   * @apiParam {String} address2 The second address of the client.(Optional)
   * @apiParamExample {json} Input
   * {
   *    "state": "Lagos",
   *    "branch": "27 Qanter Lane, Kasoa",
   *    "type": "current",
   *    "idType": "International Passport",
   *    "idNumber": 7788996633,
   *    "idExpiryDate": "23/11/2025",
   *    "openingBalance": 500000.00,
   *    "address1": "17 Qanter Lane, Kasoa",
   *    "address2": "5 Rosemary Drive, Adenta",
   * }
   * @apiSuccess {Integer} status The HTTP success response code.
   * @apiSuccess {Integer} accountNumber The account number generated for the client.
   * @apiSuccess {String} firstName The client's first name.
   * @apiSuccess {String} lastName The client's last name.
   * @apiSuccess {String} email The client's email.
   * @apiSuccess {String} type The type of account the client created.
   * @apiSuccess {Float} openingBalance The client's account opening balance.
   * @apiSuccess {String} status The client's account status.
   * @apiSuccessExample {json} Success
   * {
   *    "status": 201,
   *    "data": {
   *        "accountNumber": 4578963213,
   *        "firstName": "Marcus",
   *        "lastName": "Wood",
   *        "email": "marcood@qmail.com",
   *        "type": "savings",
   *        "openingBalance": 75000.00,
   *        "status": "active"
   *    }
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {String} error The error message.
   * @apiErrorExample {json} Error
   * {
   *    "status": 401,
   *    "error": "The idExpiryDate is below the minimum expiry date."
   * }
   */
  bankaAPI.post('/api/v1/user/:userId/accounts', (req, res) => {
    const [userId, state, branch, type,
      idType, idNumber, idExpiryDate, openingBalance,
      address1, address2] = [
      Number.parseInt(req.params.userId, 10),
      req.body.state, req.body.branch, req.body.type,
      req.body.idType, req.body.idNumber, req.body.idExpiryDate,
      Number.parseFloat(req.body.openingBalance, 10), req.body.address1, req.body.address2,
    ];
    const accountDetails = {
      state,
      branch,
      idType,
      idNumber,
      idExpiryDate,
      type,
      openingBalance,
    };
    const userValidResult = users.validateClientId(userId);
    const accountDetailsResult = accounts.validateDetails(accountDetails);
    const allValidations = [userValidResult, accountDetailsResult];
    const validationResult = dataValidators.checkAllValidations(allValidations);
    if (validationResult.valid) {
      const userData = users.findClientById(userId);
      const accountNumber = accounts.generateAccountNumber();
      const newAccount = {
        id: accounts.count,
        accountNumber,
        createdOn: new Date(),
        owner: userId,
        type,
        status: 'draft',
        balance: openingBalance,
        address1,
        address2,
      };
      accounts.add(newAccount);
      const successResult = {
        status: 201,
        data: {
          accountNumber,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          email: userData.user.email,
          type,
          openingBalance,
          status: 'draft',
        },
      };
      res.status(201).json(successResult);
    } else {
      const errorResult = {
        status: 401,
        error: validationResult.reason,
      };
      res.status(401).json(errorResult);
    }
  });
};
