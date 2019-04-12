
const checkCompleteSuccess = (actionResults) => {
  const successfulItems = actionResults.filter(item => item.success === true);
  const unsuccessfulItems = actionResults.filter(item => item.success === false);
  const success = successfulItems.length === actionResults.length;
  const reason = unsuccessfulItems.map(item => item.reason).join(' \r\n ');
  return {
    success,
    reason,
  };
};

const checkAllValidations = (validations) => {
  const validItems = validations.filter(item => item.valid);
  const inValidItems = validations.filter(item => item.valid === false);
  const valid = validItems.length === validations.length;
  const reason = inValidItems.map(item => item.reason).join(' \r\n ');
  return {
    valid,
    reason,
  };
};

const convertValidationToSuccess = (validation) => {
  const [success, reason] = [validation.valid, validation.reason];
  return {
    success,
    reason,
  };
};

const validateSetItem = (setItem, universalSet, universalSetName) => {
  let result = {
    valid: false,
    reason: `${setItem} is not a valid ${universalSetName}.`,
  };
  if (universalSet.findIndex(item => item === setItem.toString().toLowerCase()) > -1) {
    result = {
      valid: true,
      reason: `${setItem} is a valid ${universalSetName}.`,
    };
  }
  return result;
};

const validateSex = (sex) => {
  const validSexes = ['male', 'female'];
  return validateSetItem(sex, validSexes, 'sex');
};

const validateTransactionType = (transactionType) => {
  const validTransactionTypes = ['credit', 'debit'];
  return validateSetItem(transactionType, validTransactionTypes, 'transaction type');
};

const validateAccountStatus = (statusType) => {
  const validAccountStatusTypes = ['active', 'dormant', 'draft'];
  return validateSetItem(statusType, validAccountStatusTypes, 'status type');
};

const validateAccountTransferStatus = (statusType) => {
  let result = {
    valid: false,
    reason: `${statusType} is not a valid status type.`,
  };
  if (statusType === 'draft') {
    result = {
      valid: false,
      reason: 'This details for this account are still under review.',
    };
  } else if (statusType === 'dormant') {
    result = {
      valid: false,
      reason: 'This account cannot perform any transactions at the moment since it is inactive.',
    };
  } else if (statusType === 'active') {
    result = {
      valid: true,
      reason: '',
    };
  }

  return result;
};

const validateMinNumberValue = (numberValue, minimumNumberValue, valueType) => {
  let result = {
    valid: false,
    reason: `${numberValue} is below the minimum ${valueType}.`,
  };
  if (numberValue >= minimumNumberValue) {
    result = {
      valid: true,
      reason: '',
    };
  }
  return result;
};

const dateValidityData = [
  {
    position: 1,
    name: 'January',
    days: 31,
  },
  {
    position: 2,
    name: 'February',
    days: 28,
  },
  {
    position: 3,
    name: 'March',
    days: 31,
  },
  {
    position: 4,
    name: 'April',
    days: 30,
  },
  {
    position: 5,
    name: 'May',
    days: 31,
  },
  {
    position: 6,
    name: 'June',
    days: 30,
  },
  {
    position: 7,
    name: 'July',
    days: 31,
  },
  {
    position: 8,
    name: 'August',
    days: 31,
  },
  {
    position: 9,
    name: 'September',
    days: 30,
  },
  {
    position: 10,
    name: 'October',
    days: 31,
  },
  {
    position: 11,
    name: 'November',
    days: 30,
  },
  {
    position: 12,
    name: 'December',
    days: 31,
  },
];

// format: dd/mm/yyyy
const validateDate = (date) => {
  const regex = /\s*([0]?[1-9]|[12][0-9]|3[01])\s*[/-]\s*(0?[1-9]|1[012])\s*[/-]\s*[0-9]{4,}\s*/;
  let result = {
    valid: false,
    reason: 'Invalid date',
  };
  if (regex.test(date)) {
    const dateParts = date.split(/[/-]/);
    const day = Number.parseInt(dateParts[0].trim(), 10);
    const month = Number.parseInt(dateParts[1].trim(), 10);
    const year = Number.parseInt(dateParts[2].trim(), 10);
    const monthData = dateValidityData.find(item => item.position === month);
    result = {
      valid: true,
      reason: '',
    };
    if (day > monthData.days) {
      if (monthData.position === 2) {
        if (day === 29) {
          result = year % 4 !== 0
            ? {
              valid: false,
              reason: `${year} is not a leap year so ${monthData.name} can't have 29 days.`,
            } : {
              valid: true,
              reason: '',
            };
        } else {
          result = {
            valid: false,
            reason: `The day in ${monthData.name} must be at most ${monthData.days} or 29 if the year is a leap year.`,
          };
        }
      } else {
        result = {
          valid: false,
          reason: `The day in ${monthData.name} must be at most ${monthData.days}.`,
        };
      }
    }
  }

  return result;
};

const validateMaximumDate = (date, maximumDate) => {
  const allValidations = checkAllValidations([validateDate(date), validateDate(maximumDate)]);
  let result = {
    valid: allValidations.valid,
    reason: allValidations.reason,
  };
  if (allValidations.valid) {
    const dateParts = date.split(/[/-]/);
    const maximumDateParts = maximumDate.split(/[/-]/);
    result = {
      valid: true,
      reason: '',
    };

    if (dateParts[2] >= maximumDateParts[2]) {
      result = {
        valid: false,
        reason: `The year must be at most ${maximumDateParts[2].trim()}.`,
      };
      if (dateParts[1] >= maximumDateParts[1]) {
        if (dateParts[0] <= maximumDateParts[0]) {
          result = {
            valid: false,
            reason: `The day must be at most ${maximumDateParts[0].trim()}.`,
          };
        }
      } else {
        result = {
          valid: false,
          reason: `The month must be at most ${maximumDateParts[1].trim()}.`,
        };
      }
    }
  }

  return result;
};

const validateMinimumDate = (date, minimumDate) => {
  const allValidations = checkAllValidations([validateDate(date), validateDate(minimumDate)]);
  let result = {
    valid: allValidations.valid,
    reason: allValidations.reason,
  };
  if (allValidations.valid) {
    const dateParts = date.split(/[/-]/);
    const dateYear = Number.parseInt(dateParts[2], 10);
    const dateMonth = Number.parseInt(dateParts[1], 10);
    const dateDay = Number.parseInt(dateParts[0], 10);
    const minimumDateParts = minimumDate.split(/[/-]/);
    const minDateYear = Number.parseInt(minimumDateParts[2], 10);
    const minDateMonth = Number.parseInt(minimumDateParts[1], 10);
    const minDateDay = Number.parseInt(minimumDateParts[0], 10);
    result = {
      valid: true,
      reason: '',
    };

    if (dateYear < minDateYear) {
      result = {
        valid: false,
        reason: `The year must be at least ${minDateYear}.`,
      };
    } else if (dateYear === minDateYear) {
      if (dateMonth < minDateMonth) {
        result = {
          valid: false,
          reason: `The month must be at least ${minDateMonth}.`,
        };
      } else if (dateMonth === minDateMonth) {
        if (dateDay < minDateDay) {
          result = {
            valid: false,
            reason: `The day must be at least ${minDateDay}.`,
          };
        }
      }
    }
  }

  return result;
};

const validatePassword = (password) => {
  const regexes = [
    /[a-z]/,
    /[A-Z]/,
    /[0-9]/,
    /[*-+/\\<>,.:;"'?|=_)(&^$#@!~`®éåäáæ©ñµþüúíóöø]/,
  ];
  const passwordIsStrong = regexes.every(regex => password.split(regex).length >= 3);
  const result = passwordIsStrong
    ? {
      valid: true,
      reason: '',
    } : {
      valid: false,
      reason: 'The password is too weak.',
    };

  return result;
};

const validatePasswords = (password, confirmPassord) => {
  const validations = [
    validatePassword(password),
    validatePassword(confirmPassord),
  ];
  const allValidations = checkAllValidations(validations);
  let result = {
    valid: allValidations.valid,
    reason: allValidations.reason,
  };
  if (allValidations.valid) {
    if (password !== confirmPassord) {
      result = {
        valid: false,
        reason: 'The passwords are not equal.',
      };
    }
  }
  return result;
};

const validatePhoneNumber = (phoneNumber) => {
  const regex = /(\+([1-9]{1,3}|[1-9][0-9]{2,3}))?[1-9]?[0-9]{10}/;
  let result = {
    valid: false,
    reason: 'Invalid phone number.',
  };
  if (regex.exec(phoneNumber)) {
    result = {
      valid: true,
      reason: '',
    };
  }
  return result;
};

module.exports = {
  validateSetItem: (setItem, universalSet, universalSetName) => validateSetItem(setItem,
    universalSet, universalSetName),
  validateSex: sex => validateSex(sex),
  validateTransactionType: transactionType => validateTransactionType(transactionType),
  validateAccountStatus: statusType => validateAccountStatus(statusType),
  validateAccountTransferStatus: statusType => validateAccountTransferStatus(statusType),
  validateMinNumberValue: (numberValue, minimumNumberValue,
    valueType) => validateMinNumberValue(numberValue,
    minimumNumberValue, valueType),
  validateDate: date => validateDate(date),
  validateMaximumDate: (date, maximumDate) => validateMaximumDate(date, maximumDate),
  validateMinimumDate: (date, minimumDate) => validateMinimumDate(date, minimumDate),
  validatePhoneNumber: phoneNumber => validatePhoneNumber(phoneNumber),
  validatePassword: password => validatePassword(password),
  validatePasswords: (password, confirmPassord) => validatePasswords(password, confirmPassord),
  checkAllValidations: validations => checkAllValidations(validations),
  checkCompleteSuccess: actionResults => checkCompleteSuccess(actionResults),
  convertValidationToSuccess: validation => convertValidationToSuccess(validation),
};
