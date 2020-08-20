chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set(
    { all: true, githubReadme: true, longBorder: true },
    function () {
      console.log("Set inital values");
    }
  );
});
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("HELLO");
//   chrome.storage.sync.set({ all: request.all }, function () {
//     console.log("Updated values");
//   });
// });
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("something happening from the extension");
//   if(request.f)
// });
