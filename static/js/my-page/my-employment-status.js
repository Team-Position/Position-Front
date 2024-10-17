const btn = document.querySelector(".question .btn");
const qaSection = document.querySelector(".question .qa");
const questionContainer = document.querySelector(".question");

btn.addEventListener("click", () => {
    questionContainer.classList.toggle("open");

    if (questionContainer.classList.contains("open")) {
        btn.textContent = "자주찾는 질문 Q&A 닫기";
        qaSection.style.display = "block";
    } else {
        btn.textContent = "입사지원현황 관련 자주찾는 질문 Q&A";
        qaSection.style.display = "none";
    }
});

const applicantHistoryBtns = document.querySelectorAll(".btn_history"); // 지원내역 버튼들
const historySections = document.querySelectorAll(".col_history"); // 히스토리 섹션들

applicantHistoryBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const history = historySections[index];

        // 현재 표시 상태에 따라 토글
        if (history.style.display === "none" || history.style.display === "") {
            history.style.display = "block"; // 보이게 설정
        } else {
            history.style.display = "none"; // 숨기기
        }
    });
});
