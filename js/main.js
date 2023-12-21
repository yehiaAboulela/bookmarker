"use strict";

const siteNameInput = document.getElementById("bookmarkName");
const siteUrlInput = document.getElementById("siteURL");
const addSiteBtn = document.getElementById("addSiteBtn");

const tableBody = document.getElementById("tableBody");

const validationAlert = document.getElementById("validationAlert");
let sitesList = [];
if (localStorage.getItem("sitesList")) {
  sitesList = JSON.parse(localStorage.getItem("sitesList"));
  displaySites();
}
//display functions=========>
const pushToArr = function () {
  let site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };

  sitesList.push(site);
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
};

const clearInputs = function () {
  siteNameInput.value = "";
  siteUrlInput.value = "";
};

function displaySites() {
  let cartona = ``;

  for (let i = 0; i < sitesList.length; i++) {
    cartona += `
          <tr>
            <td>${i + 1}</td>
            <td>${sitesList[i].name}</td>
            <td>
              <a href="${
                sitesList[i].url
              }" target="_blank" class="btn visit-btn"
                ><i class="fa fa-eye pe-2"></i>Visit</a
              >
            </td>
            <td>
              <button class="btn delete-Btn" onclick="deleteSite(${i})">
                <i class="fa fa-trash-alt pe-2"></i>Delete
              </button>
            </td>
          </tr>
    `;
  }
  tableBody.innerHTML = cartona;
}

//delete function==========>
const deleteSite = function (i) {
  sitesList.splice(i, 1);
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
  displaySites();
};

//validation functions========>
const nameValidation = function (name) {
  const regexName = /^\w{3,}/;
  return regexName.test(name);
};

const urlValidation = function (url) {
  const regexUrl = /^((ftp|http|https):\/\/)www\.(\w+)\.([a-z]{2,})/;
  return regexUrl.test(url);
};

//submit event listener=====>
addSiteBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    nameValidation(siteNameInput.value) &&
    urlValidation(siteUrlInput.value)
  ) {
    pushToArr();
    displaySites();
    clearInputs();
  } else {
    validationAlert.classList.add("alert-active");
  }
});

//real time validation==========>
siteNameInput.oninput = function () {
  if (nameValidation(siteNameInput.value)) {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
  }
};

siteUrlInput.oninput = function () {
  if (urlValidation(siteUrlInput.value)) {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
  }
};

//alert=========>
validationAlert.addEventListener("click", function (e) {
  if (e.target.id === "validationAlert" || e.target.id === "alertExit") {
    validationAlert.classList.remove("alert-active");
  }
});
