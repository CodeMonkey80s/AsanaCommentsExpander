chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.tabId, { "message": "initializeExpandAction" });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.sendMessage(tabId, { "message": "initializeExpandAction" });
});