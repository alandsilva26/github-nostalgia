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
