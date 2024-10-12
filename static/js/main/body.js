// window.addEventListener("changeTabMenu", function () {
//     const topSwiper = document.querySelector(".wrap_slides")?.swiper;
//     if (topSwiper) {
//         topSwiper.update(); // 슬라이드 업데이트
//         topSwiper.slideTo(0); // 첫 번째 슬라이드로 이동
//     } else {
//         new Swiper(".wrap_slides", {
//             slidesPerView: "auto", // 슬라이드가 자동으로 크기 설정
//             cssMode: true, // CSS 기반 슬라이드 모드
//             observer: true, // DOM 변화를 감지하고 슬라이드 업데이트
//             on: {
//                 init: function () {
//                     // 초기화 시 동작할 로직
//                 },
//             },
//             navigation: {
//                 nextEl: ".main_cont .btn_next", // 다음 슬라이드 버튼
//                 prevEl: ".main_cont .btn_prev", // 이전 슬라이드 버튼
//             },
//         });
//     }
// });

// 탭 메뉴 버튼을 선택 (예: .tab-menu 버튼이 클릭될 때)
// const tabMenuButtons = document.querySelectorAll(".btn_next");

// tabMenuButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//         const topSwiper = document.querySelector(".wrap_slides")?.swiper;
//         if (topSwiper) {
//             topSwiper.update(); // 슬라이드 업데이트
//             topSwiper.slideTo(0); // 첫 번째 슬라이드로 이동
//         } else {
//             new Swiper(".wrap_slides", {
//                 slidesPerView: "auto", // 슬라이드가 자동으로 크기 설정
//                 cssMode: true, // CSS 기반 슬라이드 모드
//                 observer: true, // DOM 변화를 감지하고 슬라이드 업데이트
//                 on: {
//                     init: function () {
//                         // 초기화 시 동작할 로직
//                     },
//                 },
//                 navigation: {
//                     nextEl: ".main_cont .btn_next", // 다음 슬라이드 버튼
//                     prevEl: ".main_cont .btn_prev", // 이전 슬라이드 버튼
//                 },
//             });
//         }
//     });
// });

const items = document.querySelector(".items");
const slides = document.querySelectorAll(".items .item");
const prevButton = document.querySelector(".btn_prev");
const nextButton = document.querySelector(".btn_next");

let count = 1; // 현재 슬라이드 인덱스
const totalSlides = slides.length - 1; // 총 슬라이드 개수
const firstSlideWidth = 216; // 첫 슬라이드 이동 거리
const subsequentSlideWidth = 208; // 나머지 슬라이드 이동 거리
const lastSlideWidth = 50; // 마지막 슬라이드 이동 거리

const updateSlidePosition = () => {
    let translateX;

    if (count === 1) {
        translateX = 0; // 첫 슬라이드일 때는 이동하지 않음
    } else if (count === 2) {
        translateX = -firstSlideWidth; // 두 번째 슬라이드로 이동
    } else if (count < totalSlides) {
        translateX = -(firstSlideWidth + subsequentSlideWidth * (count - 2)); // 나머지 슬라이드 이동
    } else {
        translateX = -(
            firstSlideWidth +
            subsequentSlideWidth * (totalSlides - 3) +
            lastSlideWidth
        ); // 마지막 슬라이드 이동
    }

    items.style.transition = "transform 0.5s";
    items.style.transform = `translateX(${translateX}px)`;

    // 버튼 활성화/비활성화 상태 업데이트
    if (count === 1) {
        prevButton.classList.add("swiper-button-disabled");
        prevButton.setAttribute("aria-disabled", "true");
    } else {
        prevButton.classList.remove("swiper-button-disabled");
        prevButton.setAttribute("aria-disabled", "false");
    }

    if (count === totalSlides) {
        nextButton.classList.add("swiper-button-disabled");
        nextButton.setAttribute("aria-disabled", "true");
    } else {
        nextButton.classList.remove("swiper-button-disabled");
        nextButton.setAttribute("aria-disabled", "false");
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

// 배너 위 탭 요소 선택시
const buttons = document.querySelectorAll(
    "button.tab_recruit, button.tab_jobs_major, button.tab_jobs_public"
);

// 각 버튼에 클릭 이벤트 추가
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // 모든 버튼에서 'active' 클래스 제거
        buttons.forEach((btn) => btn.classList.remove("active"));

        // 클릭된 버튼에만 'active' 클래스 추가
        button.classList.add("active");
    });
});

const btnTrack = document.querySelector(".btn_scrap.track_event");

btnTrack.addEventListener("click", (e) => {
    // Toggle the "on" class
    btnTrack.classList.toggle("on");

    // Toggle the aria-pressed attribute
    const isPressed = btnTrack.getAttribute("aria-pressed") === "true";
    btnTrack.setAttribute("aria-pressed", !isPressed);
});
