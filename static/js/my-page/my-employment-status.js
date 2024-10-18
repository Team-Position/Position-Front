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

const applicantHistoryBtns = document.querySelectorAll(".btn_history");
const historySections = document.querySelectorAll(".col_history");

applicantHistoryBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const history = historySections[index];

        if (history.style.display === "none" || history.style.display === "") {
            history.style.display = "block";
        } else {
            history.style.display = "none";
        }
    });
});

const selectAll = document.getElementById("selectAll");
const individualCheckboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox_id'
);

selectAll.addEventListener("change", () => {
    const isChecked = selectAll.checked;
    individualCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

individualCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const allChecked = Array.from(individualCheckboxes).every(
            (cb) => cb.checked
        );
        selectAll.checked = allChecked;
    });
});

const selectAllCheckbox = document.getElementById("selectAll");
const individualCheckboxes2 = document.querySelectorAll("input.checkbox_idx");

selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;
    individualCheckboxes2.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

// 개별 체크박스 상태 변경 시 전체선택 체크박스 상태 동기화
individualCheckboxes2.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const allChecked = Array.from(individualCheckboxes2).every(
            (cb) => cb.checked
        );
        selectAllCheckbox.checked = allChecked;
    });
});

const hideButton = document.getElementById("list_hide_btn");
const tipContent = document.querySelector(".TipCont.TopLeft");

tipContent.style.display = "none";

hideButton.addEventListener("mouseover", () => {
    tipContent.style.display = "block";
});

hideButton.addEventListener("mouseout", () => {
    tipContent.style.display = "none";
});
