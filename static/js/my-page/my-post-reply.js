const selectAll = document.getElementById("selectAll");
const individualCheckboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox_idx'
);

// 전체선택 체크박스 클릭 이벤트
selectAll.addEventListener("change", () => {
    const isChecked = selectAll.checked;
    individualCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

// 개별 체크박스 상태 변경 이벤트
individualCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const allChecked = Array.from(individualCheckboxes).every(
            (cb) => cb.checked
        );
        selectAll.checked = allChecked;
    });
});
