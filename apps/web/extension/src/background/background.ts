// Object to store tab data
var tabData = {};

// Function to update tab data
function updateTabData(tabs) {
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    tabData[tab.id] = {
      title: tab.title,
      url: tab.url,
      active: tab.active,
      image: tab.favIconUrl,
      openedTimestamp: new Date().toISOString(), // Store the time when tab is queried
      timestamp: new Date().toISOString(), // Store the current time as the initial timestamp
    };
  }
}

// Function to log time spent on a tab
function logTimeSpent(tabId) {
  if (tabData.hasOwnProperty(tabId)) {
    var tab = tabData[tabId];
    var currentTime = new Date().toISOString(); // Get the current time
    console.log(
      "Tab",
      tabId,
      "(",
      tab.title,
      ")",
      "opened at",
      tab.openedTimestamp,
      "and closed at",
      currentTime
    );
    delete tabData[tabId];
  }
}

// Listen for tab activation
chrome.tabs.onActivated.addListener(function (activeInfo) {
  var tabId = activeInfo.tabId;
  if (tabData.hasOwnProperty(tabId)) {
    tabData[tabId].timestamp = new Date().toISOString(); // Update the timestamp when tab is activated
  }
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener(function (tabId) {
  logTimeSpent(tabId); // Log time spent when tab is removed
});

// Initial query for tabs
chrome.tabs.query({}, updateTabData);

console.log(tabData);

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getTabData") {
    sendResponse(tabData); // Send the tabData object to the content script
  }
});
