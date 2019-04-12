define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/user/:userId/accounts",
    "title": "Create Bank Account",
    "group": "Account_Creation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>The id of the client to create the account for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>The state/region the client is using to create the account.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "branch",
            "description": "<p>The branch the client is creating the account at.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of account to create for the client.(savings/current)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idType",
            "description": "<p>The id of the client to use for external validation.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "idNumber",
            "description": "<p>The id number of the client's external id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idExpiryDate",
            "description": "<p>The expiry date of the client's id.(Format: dd/mm/yyyy)</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "openingBalance",
            "description": "<p>The client's opening balance.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>The main address of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>The second address of the client.(Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input Example",
          "content": "{\n   \"state\": \"Lagos\",\n   \"branch\": \"27 Qanter Lane, Kasoa\",\n   \"type\": \"current\",\n   \"idType\": \"International Passport\",\n   \"idNumber\": 7788996633,\n   \"idExpiryDate\": \"23/11/2025\",\n   \"openingBalance\": 500000.00,\n   \"address1\": \"17 Qanter Lane, Kasoa\",\n   \"address2\": \"5 Rosemary Drive, Adenta\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP success response code.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>The account number generated for the client.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The client's first name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The client's last name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The client's email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>The type of account the client created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "openingBalance",
            "description": "<p>The client's account opening balance.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 201,\n   \"data\": {\n       \"accountNumber\": 4578963213,\n       \"firstName\": \"Marcus\",\n       \"lastName\": \"Wood\",\n       \"email\": \"marcood@qmail.com\",\n       \"type\": \"savings\",\n       \"openingBalance\": 75000.00,\n       \"status\": \"active\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP error status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example",
          "content": "{\n   \"status\": 401,\n   \"error\": \"The idExpiryDate is below the minimum expiry date.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/createBankAccount.js",
    "groupTitle": "Account_Creation",
    "name": "PostApiV1UserUseridAccounts"
  },
  {
    "type": "delete",
    "url": "/api/v1/staff/:staffId/accounts/:accountNumber",
    "title": "Delete Bank Account",
    "group": "Account_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "staffId",
            "description": "<p>The id of the admin/staff deleting the account.</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>The account number to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP success response code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The action succeeded message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"status\": 200,\n   \"message\": \"Account deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP error status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "{\n   \"status\": 412,\n   \"error\": \"The given bank account does not exist.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/manageBankAccounts.js",
    "groupTitle": "Account_Management",
    "name": "DeleteApiV1StaffStaffidAccountsAccountnumber"
  },
  {
    "type": "patch",
    "url": "/api/v1/staff/:staffId/account/:accountNumber",
    "title": "Change Account Status",
    "group": "Account_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "staffId",
            "description": "<p>The id of the admin/staff performing the status update.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>The account number to update.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>The new status to be given to the account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input Example",
          "content": "{\n   \"status\": \"active\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP success response code.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>The account number that was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 200,\n   \"data\": {\n       \"accountNumber\": 7885639847,\n       \"status\": \"active\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP error status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example",
          "content": "{\n   \"status\": 401,\n   \"error\": \"The given account number does not exist.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/manageBankAccounts.js",
    "groupTitle": "Account_Management",
    "name": "PatchApiV1StaffStaffidAccountAccountnumber"
  },
  {
    "type": "post",
    "url": "/api/v1/cashier/:cashierId/transactions/:accountNumber/:transactionType",
    "title": "Make Transaction",
    "group": "Account_Services",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "cashierId",
            "description": "<p>The id of the cashier making the transaction.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>The account number the transaction is being made with.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "transactionType",
            "description": "<p>The type of transaction to make (debit / credit).</p>"
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount to be used in the transaction.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input Example",
          "content": "{\n   \"amount\": 12785.00\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "transactionId",
            "description": "<p>The id of the transaction.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>The accountNumber used to make the transaction.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "amount",
            "description": "<p>The amount used in the transaction.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "cashierId",
            "description": "<p>The id of the cashier that made the transaction.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "transactionType",
            "description": "<p>The type of the transaction made.</p>"
          },
          {
            "group": "Success 200",
            "type": "Float",
            "optional": false,
            "field": "accountBalance",
            "description": "<p>The funds remaining in the account used to make the transaction.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 200,\n   \"data\": {\n       \"transactionId\": 5,\n       \"accountNumber\": 8763984477,\n       \"amount\": 12785.00,\n       \"cashierId\": 1,\n       \"transactionType\": \"credit\",\n       \"accountBalance\": 70000.00\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>HTTP error response code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example",
          "content": "{\n   \"status\": 402,\n   \"error\": \"Insufficient funds.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/makeTransaction.js",
    "groupTitle": "Account_Services",
    "name": "PostApiV1CashierCashieridTransactionsAccountnumberTransactiontype"
  },
  {
    "type": "post",
    "url": "/api/v1/admin/:adminId/createAccount",
    "title": "Create Staff Account",
    "group": "Authorization",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The first name of the new staff.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The last name of the new staff.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the new staff.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the new staff.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>The password confirmation of the new staff.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>The administrative status of the new staff.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input Example",
          "content": "{\n   \"firstName\": \"Jane\",\n   \"lastName\": \"Gallagher\",\n   \"email\": \"jagher@qmail.com\",\n   \"password\": \"password\",\n   \"confirmPassword\": \"password\",\n   \"isAdmin\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>HTTP success response code.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "token",
            "description": "<p>The user authorization token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "firstName",
            "description": "<p>The staff's first name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "lastName",
            "description": "<p>The staff's last name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "email",
            "description": "<p>The staff's email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 200,\n   \"data\": {\n       \"token\": \"45erkjherht45495783\",\n       \"firstName\": \"Jane\",\n       \"lastName\": \"Gallagher\",\n       \"email\": \"jagher@qmail.com\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP error status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example",
          "content": "{\n   \"status\": 401,\n   \"error\": \"The passwords are not equal.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/createStaffAccount.js",
    "groupTitle": "Authorization",
    "name": "PostApiV1AdminAdminidCreateaccount"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/signin",
    "title": "Sign In",
    "group": "Authorization",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input Example",
          "content": "{\n   \"email\": \"marcus@qmail.com\",\n   \"password\": \"drowssap1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>HTTP response code.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id of authenticated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of authenticated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of authenticated user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of authenticated user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 200,\n   \"data\": {\n       \"id\": 2,\n       \"firstName\": \"Marcus\",\n       \"lastName\": \"Wood\",\n       \"email\": \"marcus@qmail.com\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>HTTP error status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"status\": 401,\n   \"error\": \"Incorrect password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/signIn.js",
    "groupTitle": "Authorization",
    "name": "PostApiV1AuthSignin"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/signup",
    "title": "Sign Up",
    "group": "Authorization",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The last name of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The first name of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmpassword",
            "description": "<p>The password confirmation of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>The sex of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>The phone number of the client.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateOfBirth",
            "description": "<p>The date of birth of the client.(Format: dd/mm/yyyy)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input Example",
          "content": "{\n   \"lastName\": \"Gallagher\",\n   \"firstName\": \"Joan\",\n   \"email\": \"jgallagher@qmail.com\",\n   \"password\": \"1234Joan\",\n   \"confirmPassword\": \"1234Joan\",\n   \"sex\": \"female\",\n   \"phoneNumber\": 862223789,\n   \"dateOfBirth\": \"12/05/1979\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP success status code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The client authorization token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The client id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The client's first name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The client's last name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The client's email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 201,\n   \"data\": {\n        \"token\": \"45erkjherht45495783\",\n        \"id\": 13,\n        \"firstName\": \"Marcus\",\n        \"lastName\": \"Wood\",\n        \"email\": \"marcood@qmail.com\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>The HTTP error status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Integer",
            "optional": false,
            "field": "error",
            "description": "<p>The error message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error Example",
          "content": "{\n   \"status\": 401,\n   \"error\": \"The passwords are not equal.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/signUp.js",
    "groupTitle": "Authorization",
    "name": "PostApiV1AuthSignup"
  },
  {
    "type": "get",
    "url": "/api/v1/",
    "title": "API Status",
    "group": "Home",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>HTTP response code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API welcome message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Example",
          "content": "{\n   \"status\": 200,\n   \"message\": \"Hello and welcome to the Banka API.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Home",
    "name": "GetApiV1"
  }
] });
