const buttons = document.querySelectorAll(".BtnType");

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        // 모든 li에서 'Select' 클래스를 제거
        const listItems = document.querySelectorAll(".tabWrap li");
        listItems.forEach((item) => {
            item.classList.remove("Select");
        });

        // 클릭한 버튼이 속한 li에 'Select' 클래스 추가
        this.parentElement.classList.add("Select");
    });
});

const items = document.querySelector(".slider.jobs");
const slides = document.querySelectorAll(".slider.jobs li");
const prevButton = document.querySelector(".btn_prev");
const nextButton = document.querySelector(".btn_next");

let count = 1; // 현재 슬라이드 인덱스
const totalSlides = slides.length - 3; // 총 슬라이드 개수
const slideWidth = 316; // 모든 슬라이드 이동 거리

const updateSlidePosition = () => {
    let translateX = -(slideWidth * (count - 1)); // 현재 슬라이드 인덱스에 따라 이동 거리 계산

    items.style.transition = "transform 0.5s";
    items.style.transform = `translateX(${translateX}px)`;

    // 이전 버튼 활성화/비활성화 상태 업데이트
    if (count === 1) {
        prevButton.disabled = true; // 첫 번째 슬라이드에서 비활성화
        prevButton.classList.add("swiper-button-disabled");
    } else {
        prevButton.disabled = false; // 비활성화 해제
        prevButton.classList.remove("swiper-button-disabled");
    }

    // 다음 버튼 활성화/비활성화 상태 업데이트
    if (count === totalSlides) {
        nextButton.disabled = true; // 마지막 슬라이드에서 비활성화
        nextButton.classList.add("swiper-button-disabled");
    } else {
        nextButton.disabled = false; // 비활성화 해제
        nextButton.classList.remove("swiper-button-disabled");
    }
};

// 이전 버튼 클릭 이벤트
prevButton.addEventListener("click", () => {
    if (count > 1) {
        count--; // 인덱스 감소
        updateSlidePosition(); // 슬라이드 위치 업데이트
    }
});

// 다음 버튼 클릭 이벤트
nextButton.addEventListener("click", () => {
    if (count < totalSlides) {
        count++; // 인덱스 증가
        updateSlidePosition(); // 슬라이드 위치 업데이트
    }
});

// 초기 슬라이드 위치 설정
updateSlidePosition();

// 선택된 거에 해당하는 데이터 보여줌
const tabs = document.querySelectorAll(".tabWrap.TabBox li");
const sliders = document.querySelectorAll(".wrap_slider");

tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
        // 모든 li에서 Select 클래스 제거
        tabs.forEach((t) => t.classList.remove("Select"));

        // 선택된 li에 Select 클래스 추가
        this.classList.add("Select");

        // 모든 wrap_slider 숨기기
        sliders.forEach((slider) => {
            slider.classList.remove("active");
        });

        // 선택된 li의 data-target에 해당하는 wrap_slider 보이기
        const targetId = this.getAttribute("data-target");
        const targetSlider = document.getElementById(targetId);
        if (targetSlider) {
            targetSlider.classList.add("active");
        }
    });
});
