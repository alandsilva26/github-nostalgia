function hideLongBorder(preference) {
  const $mainTag = $("main#js-pjax-container");
  const $borderDiv = $mainTag.children("div:first");
  console.log(value);
  if (preference) {
    $borderDiv.removeClass("border-bottom");
  } else {
    $borderDiv.addClass("border-bottom");
  }
}
