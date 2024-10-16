document.addEventListener("DOMContentLoaded", () => {
    // 프라이버시 보기 버튼 선택
    const showPrivacyButton = document.querySelector(".showPrivacy");

    // 사용자 정보를 숨기는 div 선택
    const userHideDiv = document.querySelector(".user_hide");

    // 이메일과 전화번호 선택
    const emailItem = document.querySelector(".user_email");
    const phoneItem = document.querySelector(".user_phone");

    // 원본 데이터 저장
    const originalEmail = emailItem.textContent.trim(); // 'sanghun1016@naver.com'
    const originalPhone = phoneItem.textContent.trim(); // '010-1234-5678'

    // 이메일 마스킹 함수
    function maskEmail(email) {
        const [user, domain] = email.split("@");
        const maskedUser = user.slice(0, 4) + "*".repeat(user.length - 4);
        return `${maskedUser}@${domain}`;
    }

    // 전화번호 마스킹 함수
    function maskPhone(phone) {
        const parts = phone.split("-");
        if (parts.length === 3) {
            // 중간 번호를 '*'로 대체하여 최종 전화번호 형식 생성
            return `${parts[0]}-****-${parts[2]}`;
        }
        return phone; // 기본 전화번호 형식이 아닐 경우 원본 반환
    }

    // 버튼 클릭 이벤트 등록
    showPrivacyButton.addEventListener("click", () => {
        // 'on' 클래스 토글
        userHideDiv.classList.toggle("on");

        // 이메일과 전화번호 값 변경
        if (userHideDiv.classList.contains("on")) {
            emailItem.textContent = maskEmail(originalEmail);
            phoneItem.textContent = maskPhone(originalPhone);
        } else {
            emailItem.textContent = originalEmail; // 원본 이메일로 복원
            phoneItem.textContent = originalPhone; // 원본 전화번호로 복원
        }
    });
});
