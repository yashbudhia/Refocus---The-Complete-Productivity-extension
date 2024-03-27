

// Send a message to the background script requesting tabData
chrome.runtime.sendMessage({ action: "getTabData" }, function (response) {
  if (response) {
    // Send the tabData object to the web page
    window.postMessage({ action: "tabData", data: response }, "*");
  }
});
