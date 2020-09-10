$(document).ready(function () {
  updateDOM();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.set(
    {
      changeAvatarToRoundedSquare: request.changeAvatarToRoundedSquare,
      hideLongBorder: request.hideLongBorder,
      addCustomSmallBorder: request.addCustomSmallBorder,
      moveStatusIconPos: request.moveStatusIconPos,
      hideGithubReadme: request.hideGithubReadme,
    },
    function () {
      console.log("Preferences updated");
    }
  );
});

function updateDOM() {
  chrome.storage.sync.get(
    [
      "changeAvatarToRoundedSquare",
      "hideLongBorder",
      "addCustomSmallBorder",
      "moveStatusIconPos",
      "hideGithubReadme",
    ],
    function (data) {
      changeAvatarToRoundedSquare(data.changeAvatarToRoundedSquare);
      hideLongBorder(data.hideLongBorder);
      addCustomSmallBorder(data.addCustomSmallBorder);
      moveStatusIconPos(data.moveStatusIconPos);
      hideGithubReadme(data.hideGithubReadme);
    }
  );
}

function addCustomSmallBorder(preference) {
  const $SmNav = $("div.UnderlineNav.width-full.box-shadow-none");
  if (preference) {
    $SmNav.addClass("border-bottom");
  } else {
    $SmNav.removeClass("border-bottom");
  }
}

function changeAvatarToRoundedSquare(preference) {
  const $largeAvatar = $(
    "img.avatar.avatar-user.width-full.border.bg-white:first"
  );
  if (preference) {
    $largeAvatar.addClass("sm-bd-radius");
  } else {
    $largeAvatar.removeClass("sm-bd-radius");
  }
}

function hideGithubReadme(preference) {
  const $readmeDiv = $("div.Box.mt-4");
  if (preference) {
    $readmeDiv.addClass("display-none");
  } else {
    $readmeDiv.removeClass("display-none");
  }
}

function hideLongBorder(preference) {
  const $mainTag = $("main#js-pjax-container");
  const $borderDiv = $mainTag.children("div:first");
  if (preference) {
    $borderDiv.removeClass("border-bottom");
  } else {
    $borderDiv.addClass("border-bottom");
  }
}

function moveStatusIconPos(preference) {
  const $statusIcon = $(
    "div.f5.js-user-status-context.user-status-circle-badge-container"
  );
  if (preference) {
    $statusIcon.addClass("custom-pos");
  } else {
    $statusIcon.removeClass("custom-pos");
  }
}

function listener() {
  console.log("listener fired.");
  updateDOM();
}

$(".UnderlineNav").bind("DOMSubtreeModified", function () {});

var timeout = null;
document.addEventListener(
  "DOMSubtreeModified",
  function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(listener, 100);
  },
  false
);

const colors = ["#32215F", "#53379D", "#A491D8", "#C2B6E5"];
const existingColors = ["#216e39", "#30a14e", "#40c463", "#9be9a8"];

for (let i = 0; i < document.getElementsByTagName("rect").length; i++) {
  let box = document.getElementsByTagName("rect")[i];
  switch (box.getAttribute("fill")) {
    case existingColors[0]:
      // console.log(box);
      box.setAttribute("fill", colors[0]);
      break;
    case existingColors[1]:
      box.setAttribute("fill", colors[1]);
      break;
    case existingColors[2]:
      box.setAttribute("fill", colors[2]);
      break;
    case existingColors[3]:
      box.setAttribute("fill", colors[3]);
      break;
  }
}

let colorPanel = document.getElementsByClassName("contrib-legend text-gray")[0]
  .children[0].children;

for (let i = 1; i < 5; i++) {
  colorPanel[i].style.backgroundColor = colors[4 - i];
}
