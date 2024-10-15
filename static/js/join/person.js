const modalClose = document.querySelector(".close_btn");
const modal = document.querySelector("#p_member_nudge");
const basis = document.querySelector(".collectionBasisContents");
const basisClose = document.querySelector(".btn_close_birth_date_msg");
const basisOpen = document.querySelector(".btn_birth_date_msg");
const idInput = document.querySelector("#id");
const idMessage = document.querySelector("#idFocusMsg"); // 아이디 입력창 클릭 시 나오는 검은 글씨
const idMessageWarn = document.querySelector("#idCheckMsg1"); // 유효성 검사 빨간 글씨
const idMessageRep = document.querySelector("#idCheckMsg2"); // 아이디 중복 빨간 글씨
const idMessageSafe = document.querySelector("#idCheckMsg3"); // 사용 가능 아이디 문구
const idInputBox = document.querySelector(".TypoBox"); // TypoBox 선택

// 아이디 중복 모달창 닫기
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// 만 15세 창 열기/닫기
basisOpen.addEventListener("click", () => {
    basis.style.display = "block";
});

basisClose.addEventListener("click", () => {
    basis.style.display = "none";
});

// 아이디 입력창 클릭 시 메시지 표시
idInput.addEventListener("focus", () => {
    idMessage.style.display = "block"; // 아이디 입력 안내 메시지 표시
    idInputBox.classList.remove("invalid"); // 입력창 포커스 시 invalid 제거
    hideValidationMessages(); // 다른 경고 메시지 숨기기
});

// 입력값이 변경될 때 유효성 검사 수행
idInput.addEventListener("input", () => validateId());

// 아이디 유효성 검사 함수
const validateId = () => {
    const idPattern = /^[a-zA-Z0-9_]{4,20}$/; // 4~20자 영문, 숫자, 밑줄 허용

    if (idPattern.test(idInput.value)) {
        hideValidationMessages(); // 유효한 경우 모든 경고 메시지 숨기기
        idMessage.style.display = "none";
        idMessageSafe.style.display = "block"; // 사용 가능 메시지 표시
        idInputBox.classList.remove("invalid"); // invalid 제거
    } else {
        hideValidationMessages(); // 다른 메시지 숨기기
        idMessage.style.display = "none";
        idMessageWarn.style.display = "block"; // 경고 메시지 표시
        idInputBox.classList.add("invalid"); // TypoBox에 invalid 추가
    }
};

// 포커스 해제 시 유효성 검사 결과 유지
idInput.addEventListener("blur", () => {
    validateId(); // 값이 있으면 유효성 검사 수행
});

// 모든 유효성 검사 메시지 숨기기 함수
const hideValidationMessages = () => {
    idMessageWarn.style.display = "none";
    idMessageRep.style.display = "none";
    idMessageSafe.style.display = "none";
};
// ===========================================================================

const passwordInput = document.querySelector("#password1");
const passwordWarn = document.querySelector("#password1_warning_txt"); // 일반 경고
const passwordRepWarn = document.querySelector("#password1_warning_txt_rep"); // 반복 문자 경고
const passwordSafe = document.querySelector("#password1_good_txt"); // 유효한 메시지
const passwordEye = document.querySelector("#masking_password"); // 눈알 버튼
const passwordFocus = document.querySelectorAll(".focus_txt"); // 안내 문구
const passwordInputBox = document.querySelector(".pass_box"); // 부모 요소

// 비밀번호 입력 시 안내 메시지와 눈알 처리
passwordInput.addEventListener("focus", (e) => {
    // 경고 메시지가 표시 중이면 안내 문구를 숨김
    const isWarningVisible =
        passwordWarn.style.display === "block" ||
        passwordRepWarn.style.display === "block";

    if (!isWarningVisible) {
        passwordFocus[1].style.display = "block"; // 안내 문구 표시
    } else {
        passwordFocus[1].style.display = "none"; // 경고 시 안내 문구 숨김
    }
});

// 비밀번호 입력 중 눈알 아이콘 표시
passwordInput.addEventListener("input", () => {
    if (passwordInput.value) {
        passwordEye.style.display = "block"; // 값이 있으면 눈알 표시
    } else {
        passwordEye.style.display = "none"; // 값이 없으면 눈알 숨김
    }
    validatePassword(); // 유효성 검사 실행
});

// 눈알 아이콘 클릭 시 비밀번호 표시 토글
passwordEye.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text"; // 토글
    passwordEye.classList.toggle("on", !isPasswordVisible); // 클래스 추가/제거
});

// 비밀번호 유효성 검사 함수
const validatePassword = () => {
    const password = passwordInput.value;
    const hasUpperCase = /[A-Z]/.test(password); // 대문자 포함 여부
    const hasLowerCase = /[a-z]/.test(password); // 소문자 포함 여부
    const hasNumber = /[0-9]/.test(password); // 숫자 포함 여부
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 포함 여부
    const isValidLength = password.length >= 8 && password.length <= 16;
    const hasRepeatedChars = /(.)\1\1/.test(password); // 연속된 동일 문자 검사

    const validCount = [
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
    ].filter(Boolean).length;

    if (hasRepeatedChars) {
        // 연속된 동일 문자가 있을 때
        passwordRepWarn.style.display = "block"; // 반복 문자 경고 표시
        passwordWarn.style.display = "none"; // 기본 경고 숨김
        passwordSafe.style.display = "none"; // 유효 메시지 숨김
        passwordFocus[1].style.display = "none";
        passwordInputBox.classList.add("invalid"); // invalid 클래스 추가
    } else if (isValidLength && validCount >= 3) {
        // 유효한 비밀번호일 때
        passwordRepWarn.style.display = "none"; // 반복 문자 경고 숨김
        passwordWarn.style.display = "none"; // 기본 경고 숨김
        passwordSafe.style.display = "block"; // 유효 메시지 표시
        passwordFocus[1].style.display = "none";

        passwordInputBox.classList.remove("invalid"); // invalid 클래스 제거
    } else {
        // 유효하지 않은 비밀번호일 때
        passwordRepWarn.style.display = "none"; // 반복 문자 경고 숨김
        passwordWarn.style.display = "block"; // 기본 경고 표시
        passwordSafe.style.display = "none"; // 유효 메시지 숨김
        passwordFocus[1].style.display = "none";

        passwordInputBox.classList.add("invalid"); // invalid 클래스 추가
    }
};

// 경고 메시지 숨기기/표시 함수
const hidePasswordMessages = (show) => {
    passwordWarn.style.display = show ? "block" : "none";
    passwordRepWarn.style.display = show ? "block" : "none";
    passwordSafe.style.display = show ? "none" : "none";

    if (show) {
        passwordInputBox.classList.add("invalid"); // 경고 시 invalid 클래스 추가
    } else {
        passwordInputBox.classList.remove("invalid"); // 숨길 때 클래스 제거
    }
};

// =========================================================================================
const descBtn = document.querySelector("#sms_sent_code"); // 인증 요청 버튼
const phoneComplete = document.querySelector("#name"); // 이름 섹션
const phoneComplete2 = document.querySelector("#birth"); // 생년월일 섹션
const completeMessage = document.querySelector("#sms_cellnum_desc"); // 인증 완료 메시지

// 인증 요청 버튼 클릭 이벤트
descBtn.addEventListener("click", () => {
    simulateAuthentication(); // 테스트용 함수 호출
});

// 인증 완료 처리 함수
const completePhoneVerification = () => {
    phoneComplete.style.display = "block"; // 이름 섹션 표시
    phoneComplete2.style.display = "block"; // 생년월일 섹션 표시
    completeMessage.style.height = "block"; // 인증 완료 메시지 표시
};

// 인증 프로세스 시뮬레이션 (테스트용)
const simulateAuthentication = () => {
    setTimeout(() => {
        completePhoneVerification(); // 인증 성공 처리
    }, 2000); // 2초 후 인증 완료 처리
};

//  =============================================================================================
const emailInput = document.querySelector("#sms_email_id");
const wrongEmail = document.querySelector("#sms_msg_email1");
const btnLink = document.querySelector("#email_msg");
const emailAutoList = document.querySelector(".email_list");
const submitBtn = document.querySelector("#btn_submit");
const emailDomains = document.querySelectorAll(".email_domain");
const txtInputs = document.querySelectorAll(".txt_input"); // strong 태그 안의 텍스트들

// 이메일 유효성 검사 정규표현식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일 입력 시 btn_link에 'on' 클래스 추가
emailInput.addEventListener("focus", () => {
    btnLink.classList.add("on");
});

// focus 해제 시 'on' 클래스 제거
emailInput.addEventListener("blur", () => {
    btnLink.classList.remove("on");
});

// 이메일 입력 시 자동완성 리스트 갱신
emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value;

    // 입력된 부분을 자동완성 리스트의 strong 태그에 반영
    txtInputs.forEach((txtInput) => {
        txtInput.textContent = emailValue; // strong 태그 안에 입력값 반영
    });

    // 유효성 검사
    if (emailPattern.test(emailValue)) {
        wrongEmail.style.display = "none"; // 경고 메시지 숨기기
        emailAutoList.style.display = "none"; // 자동완성 숨기기
        submitBtn.disabled = false; // 유효할 경우 버튼 활성화
    } else {
        wrongEmail.style.display = "block"; // 경고 메시지 표시
        emailAutoList.style.display = emailValue ? "block" : "none"; // 값이 있을 때만 자동완성 표시
        submitBtn.disabled = true; // 유효하지 않으면 버튼 비활성화
    }
});

// 자동완성 리스트에서 도메인 선택 시 처리
emailDomains.forEach((domainElement) => {
    domainElement.addEventListener("click", (event) => {
        const selectedDomain = event.target.textContent.split("@")[1]; // '@' 뒤 도메인만 가져옴
        const inputValue = emailInput.value; // 현재 입력된 값

        // 완성된 이메일 주소로 업데이트
        emailInput.value = `${inputValue}@${selectedDomain}`;

        wrongEmail.style.display = "none"; // 경고 메시지 숨기기
        emailAutoList.style.display = "none"; // 자동완성 숨기기
    });
});

// ==================================체크박스===================================
const agreeAllCheckbox = document.querySelector("#agreeAllPersonal");
const mandatoryCheckboxes = document.querySelectorAll(
    ".agree_article.depth2 input[type='checkbox'][id^='agree_']"
); // 필수 항목
const optionalCheckboxes = document.querySelectorAll(
    ".agree_article.depth2 input[type='checkbox']:not([id^='agree_'])"
); // 선택 항목
const submitBtn2 = document.querySelector("#btn_submit"); // 회원가입 버튼

// 전체 동의 클릭 시 모든 항목 체크
agreeAllCheckbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    mandatoryCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked));
    optionalCheckboxes.forEach((checkbox) => (checkbox.checked = isChecked));
    toggleSubmitButton(); // 회원가입 버튼 상태 업데이트
});
// 전체 동의 상태 업데이트 함수
const updateAllAgreeStatus = () => {
    const allMandatoryChecked = [...mandatoryCheckboxes].every(
        (box) => box.checked
    );
    const allOptionalChecked = [...optionalCheckboxes].every(
        (box) => box.checked
    );
    agreeAllCheckbox.checked = allMandatoryChecked && allOptionalChecked;
};

// 필수 항목 변경 시 전체 동의 상태와 버튼 활성화 업데이트
mandatoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        updateAllAgreeStatus();
        toggleSubmitButton();
    });
});

// 선택 항목 변경 시 전체 동의 상태 업데이트
optionalCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateAllAgreeStatus);
});

const toggleSubmitButton = () => {
    const isIdValid = validateId(); // 아이디 유효성 검사
    const isPasswordValid = validatePassword(); // 비밀번호 유효성 검사
    const isEmailValid = emailPattern.test(emailInput.value); // 이메일 유효성 검사
    const isPhoneVerified = phoneComplete.style.display === "block"; // 휴대폰 인증 여부
    const allMandatoryChecked = [...mandatoryCheckboxes].every(
        (checkbox) => checkbox.checked
    ); // 필수 항목 체크 여부

    // 모든 조건이 충족되면 is-disabled 클래스 제거
    if (
        isIdValid &&
        isPasswordValid &&
        isEmailValid &&
        isPhoneVerified &&
        allMandatoryChecked
    ) {
        if (submitBtn.classList.contains("is-disabled")) {
            submitBtn.classList.remove("is-disabled");
        }
    } else {
        if (!submitBtn.classList.contains("is-disabled")) {
            submitBtn.classList.add("is-disabled");
        }
    }
};

// 필드와 체크박스에 이벤트 연결
[idInput, passwordInput, emailInput].forEach((input) =>
    input.addEventListener("input", toggleSubmitButton)
);

mandatoryCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", toggleSubmitButton)
);
