const pageHeaderElement = document.getElementById('pageHeaderPanel');
const pageBodyElement = document.getElementById('pageBodyPanel');
const pageFooterElement = document.getElementById('pageFooterPanel');
const authDDPanel = document.getElementById('authDDPanel');

const loadFooterDate = () => {
  const dateLbl = document.getElementById('footerCopyrightLbl');
  dateLbl.innerHTML = `©${new Date().getFullYear()} - Banka Ltd`;
};
// The window height: 545px
const adjustHeight = () => {
  const totalHeight = 40 + pageBodyElement.clientHeight + 62;
  if (totalHeight < window.innerHeight) {
    const heightDiff = window.innerHeight - totalHeight;
    const newHeight = pageBodyElement.clientHeight + heightDiff;
    pageBodyElement.style.height = `${newHeight}px`;
    if (pageBodyElement.firstElementChild !== null) {
      pageBodyElement.firstElementChild.style.height = `${newHeight}px`;
    }
  }
};

window.addEventListener('load', (loadEvent) => {
  loadFooterDate();
  adjustHeight();
  const bodyElement = document.getElementsByTagName('body')[0];
  bodyElement.addEventListener('mousedown', (ev) => {
    if (ev.target.getAttribute('data-info') !== 'auth_dd') {
      authDDPanel.style.display = 'none';
    }
  });
});

window.addEventListener('scroll', (scrollEvent) => {
    if(scrollY >= 9){
        pageHeaderElement.style.boxShadow = '0px 0px 0px 3px rgba(0, 5, 0, 0.2)';
        // pageHeaderElement.style.boxShadow = '0px 0px 0px 8px rgba(12, 247, 3, 0.2)';
    }
    else{
        pageHeaderElement.style.boxShadow = '0 0 0 1.5px rgba(0,0,0,0.2)';
    }
});

window.addEventListener('resize', (ev) => {
  adjustHeight();
});

const toggleNavBarAuthMenu = () => {
  if (authDDPanel.getAttribute('data-state') === 'close') {
    authDDPanel.setAttribute('data-state', 'open');
  } else if (authDDPanel.getAttribute('data-state') === 'open') {
    authDDPanel.setAttribute('data-state', 'close');
  } else {
    authDDPanel.setAttribute('data-state', 'open');
  }
  // if (authDDPanel.style.display === 'none') {
  //   authDDPanel.style.display = 'block';
  // } else if (authDDPanel.style.display === 'block') {
  //   authDDPanel.style.display = 'none';
  // } else {
  //   authDDPanel.style.display = 'block';
  // }
};

const readTextFile = (fileBlob) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    return e.target.result;
  };
  reader.readAsText(fileBlob);
};
