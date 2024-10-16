// 모든 더보기 버튼
document
    .querySelectorAll(".more_btn")
    .forEach((button) =>
        button.addEventListener("click", () => button.classList.toggle("on"))
    );
