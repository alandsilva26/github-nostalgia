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

export default changeAvatarToRoundedSquare;
