const cellTab = document.querySelector("#find_cell");
const emailTab = document.querySelector("#find_email");
const cellInput = document.querySelector("#li_cell");
const emailInput = document.querySelector("#li_mail");

cellTab.addEventListener("click", () => toggleTabs(true));
emailTab.addEventListener("click", () => toggleTabs(false));
