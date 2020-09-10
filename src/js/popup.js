"use strict";

// All checkbox elements
for (let i = 0; i < styles.length; i++) {
  document
    .querySelector(`#${styles[i]}`)
    .addEventListener("click", preferenceChanged);
}

function getPayload() {
  let payload = {};
  for (let i in styles) {
    payload[styles[i]] = document.querySelector(`#${styles[i]}`).checked;
  }
  console.log(payload);
  return payload;
}

function preferenceChanged() {
  chrome.tabs.query({}, function (tabs) {
    let payload;
    payload = getPayload();
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].url.includes("github.com")) {
        // console.log("HERE");
        // console.log(tabs[i].url);
        chrome.tabs.sendMessage(tabs[i].id, payload);
        chrome.tabs.reload(tabs[i].id);
      }
    }
  });
  // handleLabels();
}

// function handleLabels() {
//   console.log(githubReadme.nextSibling);
// }

chrome.tabs.query({ active: true, currentWindow: true }, function (tabArray) {
  if (tabArray[0].url.includes("youtube.com")) {
    const codeString =
      'document.getElementsByClassName("ytp-time-current")[0].textContent';
    // const code = "console.log(21)";
    // const codeString = 'document.getElementsByTagName("body")[0].innerHTML';
    chrome.tabs.executeScript(
      tabArray[0].id,
      { code: codeString },
      (result) => {
        let arr = result.toString().split(":");
        let sec =
          parseInt(arr[0]) * 3600 + parseInt(arr[1]) * 60 + parseInt(arr[2]);
        let url = tabArray[0].url;
        const regex = /t=[\d]{0,}$/;
        if (regex.test(url)) {
          url.replace(regex, `t=${sec}`);
        } else {
          url = url + `&t=${sec}`;
        }
        document.getElementById("youtube-url").innerHTML = url;
        document.getElementById("youtube-url").setAttribute("href", url);
      }
    );
  }
});
