const dataValidators = require('../libs/dataValidators');

module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users] = [models.users];

  /**
   * @api {post} /api/v1/admin/:adminId/createAccount Create Staff Account
   * @apiGroup Authorization
   * @apiParam {String} firstName The first name of the new staff.
   * @apiParam {String} lastName The last name of the new staff.
   * @apiParam {String} email The email of the new staff.
   * @apiParam {String} password The password of the new staff.
   * @apiParam {String} confirmPassword The password confirmation of the new staff.
   * @apiParam {Boolean} isAdmin The administrative status of the new staff.
   * @apiParamExample {json} Input Example
   * {
   *    "firstName": "Jane",
   *    "lastName": "Gallagher",
   *    "email": "jagher@qmail.com",
   *    "password": "password",
   *    "confirmPassword": "password",
   *    "isAdmin": false
   * }
   * @apiSuccess {Integer} status The HTTP success status code.
   * @apiSuccess {Integer} token The staff's authorization token.
   * @apiSuccess {Integer} firstName The staff's first name.
   * @apiSuccess {Integer} lastName The staff's last name.
   * @apiSuccess {Integer} email The staff's email.
   * @apiSuccessExample {json} Success Example
   * {
   *    "status": 200,
   *    "data": {
   *        "token": "45erkjherht45495783",
   *        "firstName": "Jane",
   *        "lastName": "Gallagher",
   *        "email": "jagher@qmail.com"
   *    }
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {String} error The error message.
   * @apiErrorExample {json} Error Example
   * {
   *    "status": 401,
   *    "error": "The passwords are not equal."
   * }
   */
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
