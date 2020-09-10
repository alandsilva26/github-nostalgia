function hideGithubReadme(preference) {
  const $readmeDiv = $("Div.Box.mt-4");
  if (preference) {
    $readmeDiv.addClass("display-none");
  } else {
    $readmeDiv.removeClass("display-none");
  }
}

export default hideGithubReadme;
