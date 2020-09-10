function addCustomSmallBorder(preference) {
  $SmNav = $("div.UnderlineNav.width-full.box-shadow-none");
  if (preference) {
    $SmNav.addClass("border-bottom");
  } else {
    $SmNav.removeClass("border-bottom");
  }
}

export default addCustomSmallBorder;
