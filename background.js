const reloadPages = () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      const url = new URL(tab.url);
      if (url.hostname.includes("www.google.") && url.pathname.startsWith("/search")) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
}

chrome.management.onEnabled.addListener(reloadPages);
chrome.management.onInstalled.addListener(reloadPages);
chrome.management.onDisabled.addListener(reloadPages);
chrome.management.onUninstalled.addListener(reloadPages);
