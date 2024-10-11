const cellTab = document.querySelector("#find_sell");
const emailTab = document.querySelector("#find_mail");
const cellInput = document.querySelector("#li_cell");
const emailInput = document.querySelector("#li_mail");
const enterMail = document.querySelector(".box_input > #email");
const showAddress = document.querySelector(".suggest_email");
const emailLinks = document.querySelectorAll(".link_email"); // NodeList로 변경
const suggestionItems = document.querySelectorAll(".txt_email");

// 디버깅 코드 추가: emailLinks가 올바르게 선택되었는지 확인
console.log(emailLinks); // NodeList가 출력되는지 확인

// 탭 전환 이벤트
cellTab.addEventListener("click", () => toggleTabs(true));
emailTab.addEventListener("click", () => toggleTabs(false));

const toggleTabs = (isCell) => {
    // 클래스 'on' 추가 및 제거
    cellTab.classList.toggle("on", isCell);
    emailTab.classList.toggle("on", !isCell);

    // 휴대폰 번호와 이메일 입력란의 활성화 및 비활성화
    cellInput.style.display = isCell ? "block" : "none";
    emailInput.style.display = isCell ? "none" : "block";
};

// 이메일 입력 시 나타나는 @~ 주소창
enterMail.addEventListener("input", () => {
    if (enterMail.value) {
        showAddress.style.display = "block";
        updateEmailSuggestions(enterMail.value);
    } else {
        showAddress.style.display = "none";
    }
});

// 이메일 자동완성 리스트 업데이트 함수
const updateEmailSuggestions = (inputValue) => {
    suggestionItems.forEach((item) => {
        item.textContent = inputValue; // 사용자가 입력한 값을 자동완성 텍스트로 설정
    });
};

// 자동완성 리스트 항목 클릭 시 입력란에 값 자동 완성
emailLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const emailPart = link.querySelector(".txt_email").textContent;
        const domainPart = link.textContent.replace(emailPart, ""); // 도메인 부분만 가져오기
        enterMail.value = `${emailPart}${domainPart}`;
        showAddress.style.display = "none";
    });
});
