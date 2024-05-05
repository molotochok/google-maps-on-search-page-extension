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

async function getTabWithContainer(index) {
  const tabLabel = await waitForElement(".YmvwI", index);
  if (!tabLabel) return [null, null];

  let tab = tabLabel;
  let container = tabLabel.parentElement;
  while (container.childElementCount < 2) {
    tab = container;
    container = container.parentElement;
  }

  return [tab, container];
}

setTimeout((async function(){
  const [secondTab, container] = await getTabWithContainer(1);
  if (!secondTab || !container) return;

  const tab = secondTab.cloneNode(true);
  tab.querySelector(".YmvwI").textContent = "Maps";

  const anchor = tab.querySelector("a");
  anchor.href = "https://www.google.com/maps/search/" + document.querySelector('#APjFqb')?.textContent ?? "";

  container.insertBefore(tab, secondTab);
}), 50);
