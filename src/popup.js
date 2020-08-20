"use strict";

// All checkbox elements
const allStyles = document.getElementById("allStyles");
allStyles.addEventListener("click", preferenceChanged);

const githubReadme = document.getElementById("githubReadme");
githubReadme.addEventListener("click", preferenceChanged);

const longBorder = document.getElementById("longBorder");
longBorder.addEventListener("click", preferenceChanged);

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
