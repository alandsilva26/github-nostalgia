"use strict";

// All checkbox elements
const allStyles = document.getElementById("allStyles");
allStyles.addEventListener("click", preferenceChanged);

const githubReadme = document.getElementById("githubReadme");
githubReadme.addEventListener("click", preferenceChanged);

const longBorder = document.getElementById("longBorder");
longBorder.addEventListener("click", preferenceChanged);

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

// Set values to checkboxes
chrome.storage.sync.get(
  [
    "all",
    "githubReadme",
    "longBorder",
    "addSmUnderline",
    "smallBorderRadius",
    "changePos",
  ],
  function (data) {
    console.log(data[0]);
    console.log(data.all);
    allStyles.checked = data.all;
    githubReadme.checked = data.githubReadme;
    longBorder.checked = data.longBorder;
  }
);

function preferenceChanged() {
  chrome.tabs.query({}, function (tabs) {
    const payload = {
      allStyles: allStyles.checked,
      githubReadme: githubReadme.checked,
      longBorder: longBorder.checked,
    };
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].url.includes("github.com")) {
        console.log("HERE");
        console.log(tabs[i].url);
        chrome.tabs.sendMessage(tabs[i].id, payload);
        chrome.tabs.reload(tabs[i].id);
      }
    }
  });
  handleLabels();
}

function handleLabels() {
  console.log(githubReadme.nextSibling);
}
