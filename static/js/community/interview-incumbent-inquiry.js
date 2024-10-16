const shareButton = document.querySelector(".btn_share");
const shareList = document.querySelector(".list_share");

shareButton.addEventListener("mouseenter", () => {
    shareList.classList.add("visible");
});

shareList.addEventListener("mouseleave", () => {
    shareList.classList.remove("visible");
});

shareButton.addEventListener("mouseleave", (e) => {
    if (!shareList.contains(e.relatedTarget)) {
        shareList.classList.remove("visible");
    }
});
