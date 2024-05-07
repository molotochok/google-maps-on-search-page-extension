function waitForElement(selector, index) {
  const main = new Promise(resolve => {
    const elements = document.querySelectorAll(selector);
    if (elements && elements.length > index) return resolve(elements[index]);

    const observer = new MutationObserver(_ => {
      const elements = document.querySelectorAll(selector);
      if (elements && elements.length > index) {
        observer.disconnect();
        resolve(elements[index]);
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
  
  let timer;
  return Promise.race([
    main,
    new Promise((r, _rej) => timer = setTimeout(function() { r(null); }, 1000))
  ]).finally(() => clearTimeout(timer));
}

async function getTabsContainer(index) {
  const label = await Promise.any([
    waitForElement('.YmvwI', index), // label in the old design
    waitForElement('.FMKtTb.UqcIvb', index), // label in the new design for All, Images
    waitForElement('.O3S9Rb', index) // label in the new design for News, Videos, Books
  ]);

  if (!label) return null;

  let tab = label;
  let container = label.parentElement;
  while (container.childElementCount < 2) {
    tab = container;
    container = container.parentElement;
  }

  return { tab, label, container };
}

function getAnchor(tab) {
  if (tab.tagName === 'A') return tab;
  return tab.querySelector('a');
}

setTimeout((async function(){
  const tabsContainer = await getTabsContainer(2);
  if (!tabsContainer) return;

  const tab = tabsContainer.tab.cloneNode(true);
  tab.classList.remove('MgQdud');

  const tabLabel = tab.getElementsByClassName(tabsContainer.label.classList.value)[0];
  tabLabel.textContent = 'Maps';
  tabLabel.removeAttribute("selected");

  const anchor = getAnchor(tab);
  anchor.href = 'https://www.google.com/maps/search/' + document.querySelector('#APjFqb')?.textContent ?? '';
  
  tabsContainer.container.insertBefore(tab, tabsContainer.tab.previousElementSibling);
}), 50);
