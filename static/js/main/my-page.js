document.querySelectorAll(".btn_member").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("expanded");
    });
});

document.querySelectorAll(".top_btn, .btn_alarm").forEach((button) => {
    button.addEventListener("click", () => {
        // 클릭된 버튼에 'on' 클래스를 토글
        button.classList.toggle("on");
    });
});
