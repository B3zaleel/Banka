
module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users, accounts] = [models.users, models.accounts];

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
