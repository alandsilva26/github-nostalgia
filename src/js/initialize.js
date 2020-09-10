"use strict";

const styles = [
  "changeAvatarToRoundedSquare",
  "hideLongBorder",
  "addCustomSmallBorder",
  "moveStatusIconPos",
  "hideGithubReadme",
];

const displayNames = [
  "Change avatar shape",
  "Hide long border",
  "Add Small border",
  "Move status icon pos",
  "Hide Github Readme",
];

let ul = document.getElementById("github-preference");
console.log(ul);
for (let i = 0; i < styles.length; i++) {
  ul.appendChild(createPreferenceItem(styles[i], displayNames[i]));
}

// Set values to checkboxes
chrome.storage.sync.get(
  [
    "changeAvatarToRoundedSquare",
    "hideLongBorder",
    "addCustomSmallBorder",
    "moveStatusIconPos",
    "hideGithubReadme",
  ],
  function (data) {
    console.log("SHAMUS", data["changeAvatarToRoundedSquare"]);
    for (let pref in data) {
      console.log(pref);
      document.querySelector(`#${pref}`).checked = data[pref];
    }
  }
);

function createPreferenceItem(id, text) {
  //parent list element
  let li = document.createElement("li");
  li.classList.add("list-group-item");

  //parent div
  let containerDiv = document.createElement("div");
  containerDiv.classList.add("form-check");

  //child input
  let inE = document.createElement("input");
  inE.classList.add("form-check-input");
  inE.type = "checkbox";
  inE.value = id;
  inE.id = id;
  inE.name = "github-preference";

  //child label
  let lab = document.createElement("label");
  lab.classList.add("form-check-label");
  lab.setAttribute("for", id);
  lab.innerText = text;

  containerDiv.appendChild(inE);
  containerDiv.appendChild(lab);

  li.appendChild(containerDiv);

  return li;
}

{
  /* <li class="list-group-item">
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value=""
      id="allStyles"
      name="preferenceCheckbox"
      checked
    />
    <label class="form-check-label" for="allStyles">
      Change all styles
    </label>
  </div>
</li>; */
}
