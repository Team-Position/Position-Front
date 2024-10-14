// 버튼 클릭 시 on 클래스 토글
document
    .getElementById("interview-write-selected-job")
    .addEventListener("click", (e) => {
        // 대상 요소 선택
        const targetElement = document.querySelector(
            ".interview-write-option-content.interview-write-job-category-section"
        );

        // on 클래스 추가
        targetElement.classList.toggle("on");
    });

// document.getElementById("interviewDateYear").addEventListener("change", (e) => {
//     const year = this.value;
//     const monthSelect = document.getElementById("interviewDateMonth");

//     // 모든 월 옵션 초기화
//     monthSelect.innerHTML = `
//             <option value>월 선택</option>
//             <option value="01">01월</option>
//             <option value="02">02월</option>
//             <option value="03">03월</option>
//             <option value="04">04월</option>
//             <option value="05">05월</option>
//             <option value="06">06월</option>
//             <option value="07">07월</option>
//             <option value="08">08월</option>
//             <option value="09">09월</option>
//             <option value="10">10월</option>
//             <option value="11">11월</option>
//             <option value="12">12월</option>
//         `;

//     // 연도에 따라 월을 필터링
//     if (year === "2021") {
//         // 2021년은 11월과 12월만 가능
//         monthSelect.innerHTML = `
//                 <option value>월 선택</option>
//                 <option value="11">11월</option>
//                 <option value="12">12월</option>
//             `;
//     } else if (year === "2024") {
//         // 2024년은 1월부터 10월까지만 가능
//         monthSelect.innerHTML = `
//                 <option value>월 선택</option>
//                 <option value="01">01월</option>
//                 <option value="02">02월</option>
//                 <option value="03">03월</option>
//                 <option value="04">04월</option>
//                 <option value="05">05월</option>
//                 <option value="06">06월</option>
//                 <option value="07">07월</option>
//                 <option value="08">08월</option>
//                 <option value="09">09월</option>
//                 <option value="10">10월</option>
//             `;
//     }
//     // 2022년, 2023년은 모든 월 가능 (기본값 유지)
// });

document.getElementById("interviewDateYear").addEventListener("change", (e) => {
    const year = this.value;
    const monthSelect = document.getElementById("interviewDateMonth");
    let months = [];

    // 연도에 따라 월을 필터링
    if (year === "2021") {
        // 2021년은 11월과 12월만 가능
        months = ["11", "12"];
    } else if (year === "2024") {
        // 2024년은 1월부터 10월까지만 가능
        months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    } else {
        // 2022년, 2023년은 1월부터 12월까지 가능
        months = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ];
    }

    // 월 선택 초기화 및 옵션 동적 생성
    monthSelect.innerHTML = `<option value="">월 선택</option>`; // 기본 옵션 추가
    months.forEach((month) => {
        const option = document.createElement("option");
        option.value = month;
        option.text = `${month}월`;
        monthSelect.appendChild(option);
    });
});

// 직무,직업쪽 자바스크립트

// 1단계 자바스크립트
document
    .querySelector(".interview-write-btn-add-modify")
    .addEventListener("click", function () {
        const jobCategorySection = document.querySelector(
            ".interview-write-box-jobs"
        );

        if (jobCategorySection.classList.contains("on")) {
            jobCategorySection.classList.remove("on");
            jobCategorySection.style.display = "none";
        } else {
            jobCategorySection.classList.add("on");
            jobCategorySection.style.display = "block";
        }
    });

// 2단계: box-jobs와 box-detail-jobs 사이 토글
document
    .querySelector(".interview-write-btn-job")
    .addEventListener("click", function () {
        const boxJobs = document.querySelector(".interview-write-box-jobs");
        const boxDetailJobs = document.querySelector(
            ".interview-write-box-detail-jobs"
        );

        // box-jobs 숨기고, box-detail-jobs 보여주기
        boxJobs.style.display = "none";
        boxDetailJobs.style.display = "block";
    });

// 3단계: box-detail-jobs가 표시되도록 설정
document.addEventListener("DOMContentLoaded", function () {
    const boxDetailJobs = document.querySelector(
        ".interview-write-box-detail-jobs"
    );
    if (boxDetailJobs) {
        boxDetailJobs.style.display = "none"; // 초기 상태 설정
    }
});

// (+)버튼 row-item을 클릭하면 expend 클래스를 토글하는 이벤트 리스너
document.querySelectorAll(".row-item").forEach(function (item) {
    item.addEventListener("click", function () {
        // 클릭된 row-item에 expend 클래스 토글
        item.classList.toggle("expend");
    });
});
