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

// document.addEventListener("DOMContentLoaded", () => {
//     // btn_add evtWriteItem 버튼 선택
//     const addButton = document.querySelector(".btn_add.evtWriteItem");

//     // btn_modify evtOpenLastSchoolNudge 클래스 요소 선택
//     const modifyElement = document.querySelector(
//         ".btn_modify.evtOpenLastSchoolNudge"
//     );

//     // resume_list 클래스 요소 선택
//     const resumeList = document.querySelector(".resume_list");

//     // btn_add evtWriteItem 버튼 클릭 이벤트 등록
//     addButton.addEventListener("click", () => {
//         // btn_modify evtOpenLastSchoolNudge의 display 속성 토글
//         if (
//             modifyElement.style.display === "none" ||
//             modifyElement.style.display === ""
//         ) {
//             modifyElement.style.display = "flex";
//         } else {
//             modifyElement.style.display = "none";
//         }

//         // resume_list의 display 속성 토글
//         if (
//             resumeList.style.display === "none" ||
//             resumeList.style.display === ""
//         ) {
//             resumeList.style.display = "block"; // display를 block으로 변경
//         } else {
//             resumeList.style.display = "none"; // display를 none으로 변경
//         }
//     });
// });

// const div1 = createElememt("div");
// div1.innerHTML =`

// `;

// const views = {
//     A:div1
// }
// innerHTML = views["A"];

// // JavaScript 코드: 요소 생성 및 뷰 설정
// const div1 = document.createElement("div");
// div1.innerHTML = `
//   <h1>View A</h1>
//   <p>This is the content of View A.</p>
// `;

// const views = {
//     A: div1,
//     B: document.createElement("div"),
//     C: document.createElement("div"),
// };

// // View B와 C도 필요한 경우 콘텐츠 추가
// views.B.innerHTML = `<h1>View B</h1><p>This is View B content.</p>`;
// views.C.innerHTML = `<h1>View C</h1><p>This is View C content.</p>`;

// // 특정 뷰를 선택해 #app 요소에 삽입
// const app = document.getElementById("app");
// app.innerHTML = views["B"].outerHTML; // View A를 표시

// // JavaScript 코드: 각 뷰 요소 생성
// // btn_add evtWriteItem 버튼 선택
// const addButton = document.querySelector(".btn_add.evtWriteItem");

// // btn_modify evtOpenLastSchoolNudge 클래스 요소 선택
// const modifyElement = document.querySelector(
//     ".btn_modify.evtOpenLastSchoolNudge"
// );
// // resume_list 클래스 요소 선택
// const resumeList = document.querySelector(".resume_list");
// const closeButton = document.querySelector(".evtLayerClose");

// const div1 = document.createElement("div");
// div1.innerHTML = `
//     <div
//                                             id="resumeSchoolItem_1729054917577"
//                                             class="resume_edit wrapHiddenForm"
//                                             data-tpl="school-item"
//                                         >
//     <div class="item_row">
//                                                 <div class="InpBox SizeL item_m">
//                                                     <label
//                                                         for="schoolType_1729054917577"
//                                                         class="blind"
//                                                         >학력구분</label
//                                                     >
//                                                     <select
//                                                         name="school_type"
//                                                         id="schoolType_1729054917577"
//                                                         class="evtChangeSchoolType"
//                                                     >
//                                                         <option value=""
//                                                         selected="selected">
//                                                             학력 구분 선택 *
//                                                         </option>
//                                                         <option
//                                                             value="primary"

//                                                         >
//                                                             초등학교 졸업
//                                                         </option>
//                                                         <option value="middle">
//                                                             중학교 졸업
//                                                         </option>
//                                                         <option value="high">
//                                                             고등학교 졸업
//                                                         </option>
//                                                         <option value="university">
//                                                             대학ㆍ대학원 이상 졸업
//                                                         </option>
//                                                         <option value="academy">
//                                                             기타 학력 졸업
//                                                         </option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                             <div class="resume_save notCached">
//                                                 <button
//                                                     type="button"
//                                                     class="BtnType SizeL BlueInvert evtLayerClose w50"
//                                                 >
//                                                     취소</button
//                                                 ><button
//                                                     type="button"
//                                                     class="BtnType SizeL evtLayerSave w50"
//                                                 >
//                                                     저장
//                                                 </button>
//                                             </div>
//                                             </div>
//     `;

// const div2 = document.createElement("div");
// div2.innerHTML = `
//     <h1>View B</h1>
//     <p>This is the content of View B.</p>
//     `;

// const div3 = document.createElement("div");
// div3.innerHTML = `
//     <h1>View C</h1>
//     <p>This is the content of View C.</p>
//     `;

// // 각 뷰를 객체에 저장
// const views = {
//     A: div1,
//     B: div2,
//     C: div3,
// };

// // #app 요소를 가져옴
// const app = document.getElementById("app");

// // 특정 뷰를 표시하는 함수
// function showView(viewName) {
//     app.innerHTML = ""; // 기존 콘텐츠 비우기
//     app.appendChild(views[viewName]); // 새로운 뷰 추가
// }

// // // 기본적으로 View A 표시
// // showView("A");

// // 각 버튼에 클릭 이벤트 추가
// addButton.addEventListener("click", () => {
//     addButton.style.display = "none";
//     // btn_modify evtOpenLastSchoolNudge의 display 속성 토글
//     modifyElement.style.display = "none";
//     resumeList.style.display = "none";
//     showView("A");
// });
// // document
// //     .getElementById("btnViewB")
// //     .addEventListener("click", () => showView("B"));
// // document
// //     .getElementById("btnViewC")
// //     .addEventListener("click", () => showView("C"));

// // 이벤트 위임을 사용해 동적으로 생성된 취소 버튼 핸들링
// document.addEventListener("click", (event) => {
//     if (event.target.classList.contains("evtLayerClose")) {
//         // 취소 버튼이 포함된 가장 가까운 부모 .resume_edit 요소를 선택
//         const resumeEdit = event.target.closest(".resume_edit");

//         // 해당 요소가 존재하면 DOM에서 제거
//         if (resumeEdit) {
//             resumeEdit.remove();
//         }

//         // 추가적으로 필요한 UI 상태 변경 처리
//         modifyElement.style.display = "flex";
//         resumeList.style.display = "block";
//         addButton.style.display = "block";
//     }
// });

// // document.addEventListener("click", (event) => {
// //     if (event.target.classList.contains("evtLayerClose")) {
// //         // 이벤트 발생 시점에 resumeEdit 요소를 선택
// //         const resumeEdit = document.querySelector(
// //             ".resume_edit.wrapHiddenForm"
// //         );

// //         if (resumeEdit) {
// //             resumeEdit.style.display = "none";
// //         }
// //         modifyElement.style.display = "flex";
// //         resumeList.style.display = "block";
// //         addButton.style.display = "block";
// //     }
// // });

// // closeButton.addEventListener("click", () => {
// //     resumeEdit.style.display = "none";
// //     modifyElement.style.display = "flex";
// //     resumeList.style.display = "block";
// //     addButton.style.display = "block";
// // });

// // modifyElement.style.display = "flex";
// // resumeList.style.display = "block";

const addButton = document.querySelector(".btn_add.evtWriteItem");
const modifyElement = document.querySelector(
    ".btn_modify.evtOpenLastSchoolNudge"
);
const resumeList = document.querySelector(".resume_list");
const app = document.getElementById("app");

// View A를 생성하는 함수
function createViewA() {
    const div1 = document.createElement("div");
    div1.innerHTML = `
        <div
            id="resumeSchoolItem_${Date.now()}"
            class="resume_edit wrapHiddenForm"
            data-tpl="school-item"
        >
            <div class="item_row">
                <div class="InpBox SizeL item_m">
                    <label for="schoolType" class="blind">학력구분</label>
                    <select name="school_type" class="evtChangeSchoolType">
                        <option value="" selected>학력 구분 선택 *</option>
                        <option value="primary">초등학교 졸업</option>
                        <option value="middle">중학교 졸업</option>
                        <option value="high">고등학교 졸업</option>
                        <option value="university">대학ㆍ대학원 이상 졸업</option>
                        <option value="academy">기타 학력 졸업</option>
                    </select>
                </div>
            </div>
            <div class="resume_save notCached">
                <button type="button" class="BtnType SizeL BlueInvert evtLayerClose w50">취소</button>
                <button type="button" class="BtnType SizeL evtLayerSave w50">저장</button>
            </div>
        </div>
    `;
    return div1;
}

// 특정 뷰를 표시하는 함수
function showView(viewName) {
    app.innerHTML = ""; // 기존 콘텐츠 비우기

    if (viewName === "A") {
        app.appendChild(createViewA()); // 새로운 View A 생성 후 추가
    } else if (viewName === "B") {
        const div2 = document.createElement("div");
        div2.innerHTML = `<h1>View B</h1><p>This is the content of View B.</p>`;
        app.appendChild(div2);
    } else if (viewName === "C") {
        const div3 = document.createElement("div");
        div3.innerHTML = `<h1>View C</h1><p>This is the content of View C.</p>`;
        app.appendChild(div3);
    }
}

// addButton 클릭 시 View A 표시
addButton.addEventListener("click", () => {
    addButton.style.display = "none";
    modifyElement.style.display = "none";
    resumeList.style.display = "none";
    showView("A");
});

// 이벤트 위임을 사용해 동적으로 생성된 취소 버튼 핸들링
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("evtLayerClose")) {
        const resumeEdit = event.target.closest(".resume_edit");

        if (resumeEdit) {
            resumeEdit.remove();
        }

        // UI 상태 복원
        modifyElement.style.display = "flex";
        resumeList.style.display = "block";
        addButton.style.display = "block";
    }
});
