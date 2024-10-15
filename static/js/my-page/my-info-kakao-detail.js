const editButton = document.querySelector(".photo_edit_btn");
const photoButton = document.querySelector(".btn_photo");

photoButton.addEventListener("click", () => {
    if (editButton.style.display === "block") {
        editButton.style.display = "none"; // 이미 열려있으면 닫기
    } else {
        editButton.style.display = "block"; // 닫혀있으면 열기
    }
    event.stopPropagation(); // 이벤트 전파 중단
});

document.addEventListener("click", (event) => {
    // 클릭한 영역이 photo_edit_btn이나 btn_photo가 아닌 경우
    if (
        !editButton.contains(event.target) &&
        !photoButton.contains(event.target)
    ) {
        editButton.style.display = "none";
    }
});

// 모든 수정 버튼에 대해 이벤트 리스너 등록
document
    .querySelectorAll(".BtnType.SizeS.btn_modify")
    .forEach((modifyButton) => {
        modifyButton.addEventListener("click", (event) => {
            const fieldRow = event.target.closest("tr.field"); // 클릭한 버튼의 부모 tr.field 찾기
            const fieldBody = fieldRow.querySelector(
                "div.field_body:not(.inactive)"
            ); // 활성화된 field_body
            const fieldBodyInactive = fieldRow.querySelector(
                "div.field_body.inactive"
            ); // 비활성화된 field_body
            const confirmButton = fieldRow.querySelector(
                ".BtnType.SizeS.btn_confirm"
            ); // 확인 버튼
            const cancelButton = fieldRow.querySelector(
                ".BtnType.SizeS.btn_modify_cancel"
            ); // 취소 버튼

            fieldRow.classList.add("active"); // tr에 active 클래스 추가
            fieldBody.classList.add("inactive"); // 첫 번째 field_body에 inactive 추가
            fieldBodyInactive.classList.remove("inactive"); // 두 번째 field_body의 inactive 제거

            confirmButton.removeAttribute("disabled"); // confirmButton의 disabled 제거
            cancelButton.removeAttribute("disabled"); // cancelButton의 disabled 제거
            modifyButton.setAttribute("disabled", true); // 수정 버튼에 disabled 추가
        });
    });

// 모든 취소 버튼에 대해 이벤트 리스너 등록
document
    .querySelectorAll(".BtnType.SizeS.btn_modify_cancel")
    .forEach((cancelButton) => {
        cancelButton.addEventListener("click", (event) => {
            const fieldRow = event.target.closest("tr.field"); // 클릭한 버튼의 부모 tr.field 찾기
            const activeFieldBody = fieldRow.querySelector(
                "div.field_body:not(.inactive)"
            ); // 활성화된 field_body
            const inactiveFieldBody = fieldRow.querySelector(
                "div.field_body.inactive"
            ); // 비활성화된 field_body
            const confirmButton = fieldRow.querySelector(
                ".BtnType.SizeS.btn_confirm"
            ); // 확인 버튼
            const modifyButton = fieldRow.querySelector(
                ".BtnType.SizeS.btn_modify"
            ); // 수정 버튼

            // 활성화된 field_body에서 inactive 클래스 추가
            if (activeFieldBody) {
                activeFieldBody.classList.add("inactive");
            }

            // 비활성화된 field_body에서 inactive 클래스 제거
            if (inactiveFieldBody) {
                inactiveFieldBody.classList.remove("inactive");
            }

            fieldRow.classList.remove("active"); // tr의 active 클래스 제거
            confirmButton.setAttribute("disabled", true); // confirmButton에 disabled 추가
            cancelButton.setAttribute("disabled", true); // cancelButton에 disabled 추가
            modifyButton.removeAttribute("disabled"); // 수정 버튼의 disabled 제거
        });
    });
