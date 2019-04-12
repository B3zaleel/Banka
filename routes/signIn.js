
module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users] = [models.users];

  /**
   * @api {post} /api/v1/auth/signin Sign In
   * @apiGroup Authorization
   * @apiParam {String} email The email of the user.
   * @apiParam {String} password The password of the user.
   * @apiParamExample {json} Input Example
   * {
   *    "email": "marcus@qmail.com",
   *    "password": "drowssap1234"
   * }
   * @apiSuccess {Integer} status The HTTP response code.
   * @apiSuccess {Integer} id The id of authenticated user.
   * @apiSuccess {String} firstName The first name of authenticated user.
   * @apiSuccess {String} lastName The last name of authenticated user.
   * @apiSuccess {String} email The email of authenticated user.
   * @apiSuccessExample {json} Success Example
   * {
   *    "status": 200,
   *    "data": {
   *        "id": 2,
   *        "firstName": "Marcus",
   *        "lastName": "Wood",
   *        "email": "marcus@qmail.com"
   *    }
   * }
   * @apiError {Integer} status The HTTP error status code.
   * @apiError {String} error The error message.
   * @apiErrorExample {json} Error Example
   * {
   *    "status": 401,
   *    "error": "Incorrect password"
   * }
   */
  bankaAPI.post('/api/v1/auth/signin', (req, res) => {
    const [email, password] = [
      req.body.email, req.body.password,
    ];

    if (users.hasEmail(email)) {
      const passwordCorrect = users.hasCorrectPassword(email, password);
      if (passwordCorrect) {
        const userData = users.getUserData(email, password);
        const successResult = {
          status: 200,
          data: {
            token: '45erkjherht45495783',
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
          },
        };
        res.status(200).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: 'Incorrect password.',
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: 'The given account does not exist.',
      };
      res.status(401).json(errorResult);
    }
  });
};
