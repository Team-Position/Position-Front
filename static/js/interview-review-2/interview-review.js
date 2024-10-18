// // 모든 interview-box-review 요소에 클릭 이벤트 리스너를 추가합니다
// document.querySelectorAll(".interview-box-review").forEach((item) => {
//     item.addEventListener("click", function () {
//         // open 클래스를 토글하여 드롭다운을 활성화하거나 비활성화
//         item.classList.toggle("open");
//     });
// });
const interviewToggleBoxes = document.querySelectorAll(".interview-box-review");
interviewToggleBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        console.log(e.target);
        interviewToggleBoxes.forEach((box) => {
            box.classList.remove("open");
        });
        box.classList.add("open");
    });
});
