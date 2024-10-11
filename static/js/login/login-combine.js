const personTab = document.querySelector(".btn_tab.t_per");
const companyTab = document.querySelector(".btn_tab.t_com");
const personLogin = document.querySelector(".area_intergranted_login.person");
const companyLogin = document.querySelector(".area_intergranted_login.company");
const loginRater = document.querySelector(".link_rater");
const autologinCheckBox = document.querySelector(
    '[name="autologin_check_box"]'
);

personTab.addEventListener("click", () => toggleTabs(true));
companyTab.addEventListener("click", () => toggleTabs(false));

const toggleTabs = (isPerson) => {
    personTab.classList.toggle("active", isPerson);
    companyTab.classList.toggle("active", !isPerson);

    personTab.setAttribute("aria-selected", isPerson ? "true" : "false");
    companyTab.setAttribute("aria-selected", isPerson ? "false" : "true");

    personTab.setAttribute("tabindex", isPerson ? "0" : "-1");
    companyTab.setAttribute("tabindex", isPerson ? "-1" : "0");

    personLogin.style.display = isPerson ? "block" : "none";
    companyLogin.style.display = isPerson ? "none" : "block";

    loginRater.style.display = isPerson ? "none" : "block";

    autologinCheckBox.style.display = isPerson ? "block" : "none";
};
