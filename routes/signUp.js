
module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users] = [models.users];

  /**
   * @api {post} /api/v1/auth/signup Sign Up
   * @apiGroup Authorization
   * @apiParam {String} lastName The last name of the client.
   * @apiParam {String} firstName The first name of the client.
   * @apiParam {String} email The email of the client.
   * @apiParam {String} password The password of the client.
   * @apiParam {String} confirmpassword The password confirmation of the client.
   * @apiParam {String} sex The sex of the client.
   * @apiParam {Integer} phoneNumber The phone number of the client.
   * @apiParam {String} dateOfBirth The date of birth of the client.(Format: dd/mm/yyyy)
   * @apiParamExample {json} Input Example
   * {
   *    "lastName": "Gallagher",
   *    "firstName": "Joan",
   *    "email": "jgallagher@qmail.com",
   *    "password": "1234Joan",
   *    "confirmPassword": "1234Joan",
   *    "sex": "female",
   *    "phoneNumber": 862223789,
   *    "dateOfBirth": "12/05/1979"
   * }
   * @apiSuccess {Integer} status The HTTP success status code.
   * @apiSuccess {String} token The client authorization token.
   * @apiSuccess {Integer} id The client id.
   * @apiSuccess {String} firstName The client's first name.
   * @apiSuccess {String} lastName The client's last name.
   * @apiSuccess {String} email The client's email.
   * @apiSuccessExample {json} Success Example
   * {
   *    "status": 201,
   *    "data": {
   *         "token": "45erkjherht45495783",
   *         "id": 13,
   *         "firstName": "Marcus",
   *         "lastName": "Wood",
   *         "email": "marcood@qmail.com"
   *      }
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {Integer} error The error message.
   * @apiErrorExample {json} Error Example
   * {
   *    "status": 401,
   *    "error": "The passwords are not equal."
   * }
   */
  bankaAPI.post('/api/v1/auth/signup', (req, res) => {
    const [lastName, firstName,
      email, password, confirmPassword,
      sex,
      phoneNumber,
    ] = [
      req.body.lastName, req.body.firstName,
      req.body.email, req.body.password, req.body.confirmPassword,
      req.body.sex,
      req.body.phoneNumber,
    ];
    const dobParts = req.body.dateOfBirth.split(/[/-]/);
    const dateOfBirth = new Date(`${dobParts[1]}/${dobParts[0]}/${dobParts[2]}`);

    if (users.hasEmail(email) === false) {
      const userDetails = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        sex,
        phoneNumber,
        password,
        confirmPassword,
      };
      // validate user details.
      const validationResult = users.validateUser(userDetails);
      if (validationResult.valid) {
        const newUser = {
          token: '45erkjherht45495783',
          id: users.count,
          email,
          firstName,
          lastName,
          password,
          type: 'client',
          isAdmin: false,
          sex,
          dateOfBirth,
          phoneNumber,
        };
        users.add(newUser);
        const successResult = {
          status: 201,
          data: {
            token: newUser.token,
            id: newUser.id,
            firstName,
            lastName,
            email,
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
    } else {
      const errorResult = {
        status: 401,
        error: 'The given email is already being used.',
      };
      res.status(401).json(errorResult);
    }
  });
};
