const accountsCountLabel = document.getElementById('accountsCountLabel');
const accountsListPanel = document.getElementById('userAccountsPanel');

const renderAccountsData = (accountsResultsInfo) => {
  accountsCountLabel.setAttribute('data-accountsCount', accountsResultsInfo.length);
  accountsCountLabel.innerHTML = `(${accountsResultsInfo.length})`;
  let accountsListContent = [];

  for (let i = 0; i < accountsResultsInfo.length; i += 1) {
    const accountNumber = accountsResultsInfo[i].accountNumber;
    const accountCreatedOn = accountsResultsInfo[i].createdOn;
    const accountBalance = accountsResultsInfo[i].balance;

    accountsListContent.push('<div class="listItemType1"');
    accountsListContent.push(` data-accountNumber="${accountNumber}"`);
    accountsListContent.push(` data-createdOn="${accountCreatedOn}"><div>`);

    accountsListContent.push(`<div><b>Number: </b><label>${accountNumber}</label></div>`);
    accountsListContent.push(`<div><b>Created On: </b><label>${getShortDate(accountCreatedOn)}</label></div>`);
    accountsListContent.push(`<div> <b>Balance: </b><label>${accountBalance}</label></div>`);

    accountsListContent.push('</div></div>');
  }

  accountsListPanel.innerHTML = accountsListContent.join('');
};

window.addEventListener('load', (ev) => {
  const testAccountsData = [
    {
      accountNumber: 7898126547,
      createdOn: new Date(2007, 5, 14),
      type: 'savings',
      status: 'active',
      balance: 789123.06,
    },
  ];

  for (let i = 0; i < 5; i += 1) {
    testAccountsData.push({
      accountNumber: 7898126547,
      createdOn: new Date(2007, 5, 14),
      type: 'savings',
      status: 'active',
      balance: 789123.06,
    });
  }

  renderAccountsData(testAccountsData);
});

// window.addEventListener('resize', (ev) => {
//     ev.stopPropagation();
//     window.resizeTo(window.screen.availWidth, window.screen.availHeight);
// });
