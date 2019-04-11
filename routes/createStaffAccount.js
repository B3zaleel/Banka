
module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users] = [models.users];

  bankaAPI.post('/api/v1/admin/:adminId/createAccount', (req, res) => {
    const [adminId,
      email, firstName, lastName,
      password, confirmPassword, isAdmin] = [
      Number.parseInt(req.params.adminId, 10),
      req.body.email, req.body.firstName, req.body.lastName,
      req.body.password, req.body.confirmPassword, req.body.isAdmin,
    ];

    if (users.hasEmail(email) === false) {
      const adminValidation = users.validateAdminId(adminId);
      const passwordsValidations = dataValidators.validatePasswords(password, confirmPassword);
      const allValidations = [
        adminValidation, passwordsValidations,
      ];
      const validationResult = dataValidators.checkAllValidations(allValidations);
      if (validationResult.valid) {
        const newStaff = {
          token: '45erkjherht45495783',
          id: users.count,
          email,
          firstName,
          lastName,
          password,
          type: 'staff',
          isAdmin,
        };
        users.add(newStaff);
        const successResult = {
          status: 200,
          data: {
            token: newStaff.token,
            firstName,
            lastName,
            email,
          },
        };
        res.status(200).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: validationResult.reason,
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: 'The given email is already being used.',
      };
      res.status(401).json(errorResult);
    }
  });
};
