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

// 아이디 중복 모달창 닫는 이벤트
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// 만 15세 창 열고 닫는 이벤트
basisOpen.addEventListener("click", () => {
    basis.style.display = "block";
});

basisClose.addEventListener("click", () => {
    basis.style.display = "none";
});

// 아이디 입력창 클릭
idInput.addEventListener("focus", () => {
    idMessage.style.display = focus ? "block" : "none";
});

// 아이디 유효성 검사
idInput.addEventListener("input", () => validateId());

const validateId = () => {
    const idPattern = /^[a-zA-Z0-9_]{4,20}$/; // 4~20자 영문, 숫자, 밑줄 허용
    if (idPattern.test(idInput.value)) {
        idMessage.style.display = "none";
        idMessageWarn.style.display = "none"; // 유효한 경우 경고 숨기기
        idMessageSafe.style.display = "block"; // 사용 가능 메시지 표시
    } else {
        idMessage.style.display = "none";
        idMessageWarn.style.display = "block"; // 유효하지 않은 경우 경고 표시
        idMessageSafe.style.display = "none"; // 사용 가능 메시지 숨기기
    }
};

// 비밀번호 눈알 토글
const passwordInput = document.querySelector("#password1");
const passwordWarn = document.querySelector("#password1_warning_txt");
const passwordRep = document.querySelector("#password1_warning_txt_rep"); // 반복 경고문
const passwordSafe = document.querySelector("#password1_good_txt");
const passwordEye = document.querySelector("#masking_password"); // 눈알
const passwordFocus = document.querySelector("#password1FocusMsg");

// 비밀번호 유효성 검사 함수
const validatePassword = () => {
    const password = passwordInput.value;

    // 정규표현식: 영문 대소문자, 숫자, 특수문자 포함 여부 검사
    const hasUpperCase = /[A-Z]/.test(password); // 대문자 포함 여부
    const hasLowerCase = /[a-z]/.test(password); // 소문자 포함 여부
    const hasNumber = /[0-9]/.test(password); // 숫자 포함 여부
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 포함 여부

    // 길이 검사 (8~16자리)
    const isValidLength = password.length >= 8 && password.length <= 16;

    // 3가지 이상의 조합 검사
    const validCount = [
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
    ].filter(Boolean).length;

    if (isValidLength && validCount >= 3) {
        // 유효한 비밀번호일 때
        passwordFocus.style.display = "none";
        passwordWarn.style.display = "none";
        passwordSafe.style.display = "block";
    } else {
        // 유효하지 않은 비밀번호일 때
        passwordFocus.style.display = "none";
        passwordWarn.style.display = "block";
        passwordSafe.style.display = "none";
    }
};

// 비밀번호 입력 중 실시간 유효성 검사
passwordInput.addEventListener("input", validatePassword);
