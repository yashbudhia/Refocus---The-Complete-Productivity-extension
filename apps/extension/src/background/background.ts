// Object to store tab data
var tabData = {};

// Function to update tab data
function updateTabData(tabs) {
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    if (!tabData.hasOwnProperty(tab.id)) {
      tabData[tab.id] = {
        title: tab.title,
        url: tab.url,
        active: tab.active,
        image: tab.favIconUrl,
        openedTimestamp: new Date().toISOString(),
        lastActiveTimestamp: new Date().toISOString(),
        totalTimeSpent: 0,
      };
    } else {
      // Update existing tab data
      tabData[tab.id].title = tab.title;
      tabData[tab.id].url = tab.url;
      tabData[tab.id].active = tab.active;
      tabData[tab.id].image = tab.favIconUrl;
      tabData[tab.id].lastActiveTimestamp = new Date().toISOString();
    }
  }
}

// Function to log time spent on a tab
function logTimeSpent(tabId) {
  if (tabData.hasOwnProperty(tabId)) {
    var tab = tabData[tabId];
    var currentTime = new Date().getTime();
    var openedTime = new Date(tab.openedTimestamp).getTime();
    tab.totalTimeSpent += currentTime - openedTime;
    console.log(
      "Tab",
      tabId,
      "(",
      tab.title,
      ")",
      "opened at",
      tab.openedTimestamp,
      "and closed at",
      new Date().toISOString(),
      "Total time spent:",
      tab.totalTimeSpent / 1000, // Convert milliseconds to seconds
      "seconds"
    );
    delete tabData[tabId];
  }
}

// Listen for tab activation
chrome.tabs.onActivated.addListener(function (activeInfo) {
  var tabId = activeInfo.tabId;
  if (tabData.hasOwnProperty(tabId)) {
    tabData[tabId].lastActiveTimestamp = new Date().toISOString();
  }
});

// Listen for tab update
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  updateTabData([tab]); // Update tab data when a tab is updated
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener(function (tabId) {
  logTimeSpent(tabId);
});

// Initial query for tabs
chrome.tabs.query({}, updateTabData);

// Function to send tabData to the Express server
function sendTabDataToExpress() {
  // Calculate time spent on each tab and update tabData
  for (const tabId in tabData) {
    if (tabData.hasOwnProperty(tabId)) {
      const tab = tabData[tabId];
      if (tab.active) {
        const currentTime = new Date().getTime();
        const lastActiveTime = new Date(tab.lastActiveTimestamp).getTime();
        tab.totalTimeSpent += currentTime - lastActiveTime;
        tab.lastActiveTimestamp = new Date().toISOString();
      }
    }
  }

  // Make a POST request to the Express server endpoint
  fetch("http://localhost:3000/tab-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tabData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send tabData to Express server");
      }
      console.log("TabData sent to Express server successfully");
    })
    .catch((error) => {
      console.error("Error sending tabData to Express server:", error);
    });
}

// Send tabData to Express server periodically
setInterval(sendTabDataToExpress, 1000); // Adjust the interval as needed
