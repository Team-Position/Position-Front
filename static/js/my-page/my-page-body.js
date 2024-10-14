// const buttons = document.querySelectorAll(".BtnType");

// buttons.forEach((button) => {
//     button.addEventListener("click", function () {
//         // 모든 li에서 'Select' 클래스를 제거
//         const listItems = document.querySelectorAll(".tabWrap li");
//         listItems.forEach((item) => {
//             item.classList.remove("Select");
//         });

//         // 클릭한 버튼이 속한 li에 'Select' 클래스 추가
//         this.parentElement.classList.add("Select");
//     });
// });

// 고정 슬라이드 이동 거리
const slideWidth = 316;

let activeSlider = document.querySelector(".wrap_slider.active .slider");
let activeSlides = activeSlider.querySelectorAll("li");

let count = 1; // 현재 슬라이드 인덱스
let totalSlides = activeSlides.length - 3; // 총 슬라이드 개수 - 보여지는 슬라이드 수

// 슬라이더 위치 업데이트 함수
const updateSlidePosition = () => {
    const translateX = -(slideWidth * (count - 1));

    activeSlider.style.transition = "transform 0.5s";
    activeSlider.style.transform = `translateX(${translateX}px)`;

    const prevButton = document.querySelector(".btn_prev");
    const nextButton = document.querySelector(".btn_next");

    // 버튼 상태 업데이트
    const isPrevDisabled = count === 1;
    const isNextDisabled = count === totalSlides;

    // 두 버튼이 모두 비활성화인 경우
    if (isPrevDisabled && isNextDisabled) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }
    // 하나라도 활성화된 경우
    else {
        prevButton.style.display = "block";
        nextButton.style.display = "block";

        // 개별 버튼의 disabled 상태 업데이트
        prevButton.disabled = isPrevDisabled;
        nextButton.disabled = isNextDisabled;
    }
};

// 버튼 클릭 이벤트
document.querySelector(".btn_prev").addEventListener("click", () => {
    if (count > 1) {
        count--;
        updateSlidePosition();
    }
});

document.querySelector(".btn_next").addEventListener("click", () => {
    if (count < totalSlides) {
        count++;
        updateSlidePosition();
    }
});

// 탭 클릭 이벤트
const tabs = document.querySelectorAll(".tabWrap.TabBox li");
tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
        // 모든 탭에서 'Select' 클래스 제거
        tabs.forEach((t) => t.classList.remove("Select"));
        this.classList.add("Select");

        // 모든 슬라이더 숨기기
        document.querySelectorAll(".wrap_slider").forEach((slider) => {
            slider.classList.remove("active");
        });

        // 선택한 슬라이더 보이기
        const targetId = this.getAttribute("data-target");
        const targetSlider = document.getElementById(targetId);
        targetSlider.classList.add("active");

        // 활성화된 슬라이더와 슬라이드 리스트 업데이트
        activeSlider = targetSlider.querySelector(".slider");
        activeSlides = activeSlider.querySelectorAll("li");
        totalSlides = activeSlides.length - 3; // 슬라이드 개수 재설정
        count = 1; // 인덱스 초기화

        // 슬라이드 위치 초기화
        updateSlidePosition();
    });
});

// 초기 슬라이드 위치 설정
updateSlidePosition();

// const items = document.querySelector(".slider.jobs");
// const slides = document.querySelectorAll(".slider.jobs li");
// const prevButton = document.querySelector(".btn_prev");
// const nextButton = document.querySelector(".btn_next");

// let count = 1; // 현재 슬라이드 인덱스
// const totalSlides = slides.length - 3; // 총 슬라이드 개수
// const slideWidth = 316; // 모든 슬라이드 이동 거리

// const updateSlidePosition = () => {
//     let translateX = -(slideWidth * (count - 1)); // 현재 슬라이드 인덱스에 따라 이동 거리 계산

//     items.style.transition = "transform 0.5s";
//     items.style.transform = `translateX(${translateX}px)`;

//     // 이전 버튼 활성화/비활성화 상태 업데이트
//     if (count === 1) {
//         prevButton.disabled = true; // 첫 번째 슬라이드에서 비활성화
//         prevButton.classList.add("swiper-button-disabled");
//     } else {
//         prevButton.disabled = false; // 비활성화 해제
//         prevButton.classList.remove("swiper-button-disabled");
//     }

//     // 다음 버튼 활성화/비활성화 상태 업데이트
//     if (count === totalSlides) {
//         nextButton.disabled = true; // 마지막 슬라이드에서 비활성화
//         nextButton.classList.add("swiper-button-disabled");
//     } else {
//         nextButton.disabled = false; // 비활성화 해제
//         nextButton.classList.remove("swiper-button-disabled");
//     }
// };

// // 이전 버튼 클릭 이벤트
// prevButton.addEventListener("click", () => {
//     if (count > 1) {
//         count--; // 인덱스 감소
//         updateSlidePosition(); // 슬라이드 위치 업데이트
//     }
// });

// // 다음 버튼 클릭 이벤트
// nextButton.addEventListener("click", () => {
//     if (count < totalSlides) {
//         count++; // 인덱스 증가
//         updateSlidePosition(); // 슬라이드 위치 업데이트
//     }
// });

// // 초기 슬라이드 위치 설정
// updateSlidePosition();

// // 선택된 거에 해당하는 데이터 보여줌
// const tabs = document.querySelectorAll(".tabWrap.TabBox li");
// const sliders = document.querySelectorAll(".wrap_slider");

// tabs.forEach((tab) => {
//     tab.addEventListener("click", function () {
//         // 모든 li에서 Select 클래스 제거
//         tabs.forEach((t) => t.classList.remove("Select"));

//         // 선택된 li에 Select 클래스 추가
//         this.classList.add("Select");

//         // 모든 wrap_slider 숨기기
//         sliders.forEach((slider) => {
//             slider.classList.remove("active");
//         });

//         // 선택된 li의 data-target에 해당하는 wrap_slider 보이기
//         const targetId = this.getAttribute("data-target");
//         const targetSlider = document.getElementById(targetId);
//         if (targetSlider) {
//             targetSlider.classList.add("active");
//         }
//     });
// });

// const tabs = document.querySelectorAll(".tabWrap.TabBox li");
// const sliders = document.querySelectorAll(".wrap_slider");
// const btnPrev = document.querySelector(".btn_prev");
// const btnNext = document.querySelector(".btn_next");

// tabs.forEach((tab) => {
//     tab.addEventListener("click", function () {
//         // 모든 li에서 Select 클래스 제거
//         tabs.forEach((t) => t.classList.remove("Select"));

//         // 선택된 li에 Select 클래스 추가
//         this.classList.add("Select");

//         // 모든 wrap_slider 숨기기
//         sliders.forEach((slider) => {
//             slider.classList.remove("active");
//         });

//         // 선택된 li의 data-target에 해당하는 wrap_slider 보이기
//         const targetId = this.getAttribute("data-target");
//         const targetSlider = document.getElementById(targetId);
//         if (targetSlider) {
//             targetSlider.classList.add("active");
//         }

//         // 버튼 스타일 업데이트
//         updateButtonVisibility();
//     });
// });

// function updateButtonVisibility() {
//     const activeSlider = document.querySelector(".wrap_slider.active");
//     const currentSliderIndex = Array.from(sliders).indexOf(activeSlider);

//     // 슬라이더 개수가 4개 이하일 경우 버튼 숨기기
//     if (sliders.length <= 4) {
//         btnPrev.classList.add("hidden");
//         btnNext.classList.add("hidden");
//     } else {
//         btnPrev.classList.remove("hidden");
//         btnNext.classList.remove("hidden");
//     }

//     // 버튼의 클릭 이벤트 설정
//     btnPrev.onclick = () => navigateSlider(-1);
//     btnNext.onclick = () => navigateSlider(1);
// }

// function navigateSlider(direction) {
//     const activeSlider = document.querySelector(".wrap_slider.active");
//     const currentSliderIndex = Array.from(sliders).indexOf(activeSlider);
//     const newIndex = currentSliderIndex + direction;

//     if (newIndex >= 0 && newIndex < sliders.length) {
//         // 모든 wrap_slider 숨기기
//         sliders.forEach((slider) => {
//             slider.classList.remove("active");
//         });
//         // 새로운 wrap_slider 보이기
//         sliders[newIndex].classList.add("active");
//         // 선택된 li 업데이트
//         tabs.forEach((tab) => tab.classList.remove("Select"));
//         tabs[newIndex].classList.add("Select");
//     }
// }
