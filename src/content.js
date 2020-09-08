$(document).ready(function () {
  "use strict";

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log("HELLO");
    chrome.storage.sync.set(
      {
        all: request.all,
        githubReadme: request.githubReadme,
        longBorder: request.longBorder,
      },
      function () {
        console.log("Updated values");
      }
    );
  });
  updateDOM();
});

function updateDOM() {
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
      console.log(data.all);
      // console.log(data.smallBorderRadius);
      if (data.all) {
        toggleReadme(true);
        toggleLongBorder(true);
        addSmNavBorder();
        changeAvatarToRoundedSquare();
        changeStatusIconPos();
      }
      if (!data.githubReadme) {
        toggleReadme(false);
      }
      if (!data.longBorder) {
        toggleLongBorder(false);
      }
      if (!data.addSmUnderline) {
        addSmNavBorder();
      }
      if (!data.smallBorderRadius) {
        console.log("HERE");
        changeAvatarToRoundedSquare();
      }
      if (!data.changePos) {
        changeStatusIconPos();
      }
    }
  );
}

function toggleReadme(value) {
  const $readmeDiv = $("Div.Box.mt-4");
  if (value) {
    $readmeDiv.addClass("display-none");
  } else {
    $readmeDiv.removeClass("display-none");
  }
  console.log($readmeDiv);
}

function toggleLongBorder(value) {
  const $mainTag = $("main#js-pjax-container");
  const $borderDiv = $mainTag.children("div:first");
  console.log(value);
  if (value) {
    $borderDiv.removeClass("border-bottom");
    console.log($borderDiv);
  } else {
    $borderDiv.addClass("border-bottom");
  }
}

function addSmNavBorder() {
  $SmNav = $("div.UnderlineNav.width-full.box-shadow-none");
  if (!$SmNav.hasClass("border-bottom")) {
    $SmNav.addClass("border-bottom");
  }
}

function changeAvatarToRoundedSquare() {
  const $largeAvatar = $(
    "img.avatar.avatar-user.width-full.border.bg-white:first"
  );
  if (!$largeAvatar.hasClass("sm-bd-radius")) {
    $largeAvatar.addClass("sm-bd-radius");
  }
}

function changeStatusIconPos() {
  const $statusIcon = $(
    "div.f5.js-user-status-context.user-status-circle-badge-container"
  );
  if (!$statusIcon.hasClass("custom-pos")) {
    $statusIcon.addClass("custom-pos");
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
