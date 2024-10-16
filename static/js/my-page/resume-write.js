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

const addButton = document.querySelector(".btn_add.evtWriteItem");
const modifyElement = document.querySelector(
    ".btn_modify.evtOpenLastSchoolNudge"
);
const resumeList = document.querySelector(".resume_list");
const app = document.getElementById("app");

// UI 상태를 복원하는 함수
function restoreUI() {
    modifyElement.style.display = "flex";
    resumeList.style.display = "block";
    addButton.style.display = "block";
}

// View A를 생성하는 함수
function createViewA() {
    const div1 = document.createElement("div");
    div1.innerHTML = `
        <div id="resumeSchoolItem_${Date.now()}" class="resume_edit wrapHiddenForm" data-tpl="school-item">
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

    const selectElement = div1.querySelector("select");
    selectElement.addEventListener("change", (event) => {
        if (event.target.value === "primary") {
            showView("B"); // View B 표시
        }
    });

    return div1;
}

// View B를 생성하는 함수
function createViewB() {
    const div2 = document.createElement("div");
    div2.innerHTML = `
                    <div id="resumeSchoolItem_1729054917577" 
                class="resume_edit wrapHiddenForm" 
                data-tpl="school-primary">
                
                <div class="item_row item_center item_career" data-row_type="none">
                    <div class="InpBox SizeL item_m">
                        <label for="schoolType_1729062897407" class="blind">학력구분</label>
                        <select name="school_type" id="schoolType_1729062897407" 
                                class="evtChangeSchoolType">
                            <option value="">학력 구분 선택 *</option>
                            <option value="primary" selected="">초등학교 졸업</option>
                            <option value="middle">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox" value="n" 
                                id="qualificationN_1729062897407" 
                                class="evtChangeQualification" />
                            <label class="Lbl test1" for="qualificationN_1729062897407">
                                중입 검정고시(초졸)
                            </label>
                        </span>
                    </div>
                </div>
                <div class="item_row item_center item_close" data-row_type="qualification" style="display: none;">
                    <div class="InpBox SizeL item_s">
                        <label for="schoolTypeQualification_1729080866918" class="blind">학력구분</label>
                        <select name="school_type" id="schoolTypeQualification_1729080866918" class="evtChangeSchoolType">
                            <option value="">학력 구분 선택 *</option>
                            <option value="primary" selected="selected">초등학교 졸업</option>
                            <option value="middle">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode_1729080866918" class="blind">지역</label>
                            <select name="school_qual_area_code[]" id="schoolAreaCode_1729080866918">
                                <option value="" selected="selected">지역 선택</option>
                                <option value="101000">서울</option>
                                <option value="102000">경기</option>
                                <option value="103000">광주</option>
                                <option value="104000">대구</option>
                                <option value="105000">대전</option>
                                <option value="106000">부산</option>
                                <option value="107000">울산</option>
                                <option value="108000">인천</option>
                                <option value="109000">강원</option>
                                <option value="110000">경남</option>
                                <option value="111000">경북</option>
                                <option value="112000">전남</option>
                                <option value="113000">전북</option>
                                <option value="114000">충북</option>
                                <option value="115000">충남</option>
                                <option value="116000">제주</option>
                                <option value="117000">전국</option>
                                <option value="118000">세종</option>
                                <option value="210000">아시아·중동</option>
                                <option value="220000">북·중미</option>
                                <option value="230000">남미</option>
                                <option value="240000">유럽</option>
                                <option value="250000">오세아니아</option>
                                <option value="260000">아프리카</option>
                                <option value="270000">남극대륙</option>
                                <option value="280000">기타해외</option>
                            </select>
                    </div>

                    <div class="TypoBox item item_s LblTop">
                        <label for="qualGraduationDt_1729080866918" class="Lbl">합격년월 *</label>
                        <input type="text" name="qual_graduation_dt[]" value="" id="qualGraduationDt_1729080866918" class="Typo SizeL onlyNumber DatePic datePicker" data-dateformat="yymm" maxlength="6" inputmode="decimal" pattern="[0-9]*" placeholder="YYYYMM" required="">
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox" value="y" id="qualificationY_1729080866918" class="evtChangeQualification" checked="">
                            <label class="Lbl test2" for="qualificationY_1729080866918">중입 검정고시(초졸)</label>
                        </span>
                    </div>
                </div>

                <div class="item_row detail" data-row_type="none">
                    <div class="TypoBox TypeBtn item_m LblTop">
                        <label class="Lbl" for="schoolNm_1729062897407">학교명 *</label>
                        <input type="text" name="school_nm[]" value="" 
                            id="schoolNm_1729062897407" class="Typo SizeL" 
                            maxlength="100" placeholder="학교명 *" required="" />
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolGraduationGb_1729062897407" class="blind">졸업여부</label>
                        <select name="school_graduation_gb[]" 
                                id="schoolGraduationGb_1729062897407" required="">
                            <option value="">졸업여부 *</option>
                            <option value="1">졸업</option>
                            <option value="5">중퇴</option>
                        </select>
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolEntranceDt_1729062897407" class="Lbl">입학년월</label>
                        <input type="text" name="school_entrance_dt[]" value="" 
                            id="schoolEntranceDt_1729062897407" class="Typo SizeL onlyNumber DatePic datePicker" 
                            data-dateformat="yymm" maxlength="6" inputmode="decimal" 
                            pattern="[0-9]*" placeholder="YYYYMM" required="" />
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolGraduationDt_1729062897407" class="Lbl">졸업년월</label>
                        <input type="text" name="school_graduation_dt[]" value="" 
                            id="schoolGraduationDt_1729062897407" class="Typo SizeL onlyNumber DatePic datePicker" 
                            data-dateformat="yymm" maxlength="6" placeholder="YYYYMM" 
                            inputmode="decimal" pattern="[0-9]*" required="" />
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode_1729062897407" class="blind">지역</label>
                        <select name="school_area_code[]" id="schoolAreaCode_1729062897407">
                            <option value="">지역 선택</option>
                            <option value="101000">서울</option>
                            <option value="102000">경기</option>
                            <option value="103000">광주</option>
                            <option value="104000">대구</option>
                            <option value="105000">대전</option>
                            <option value="106000">부산</option>
                            <option value="107000">울산</option>
                            <option value="108000">인천</option>
                            <option value="109000">강원</option>
                            <option value="110000">경남</option>
                            <option value="111000">경북</option>
                            <option value="112000">전남</option>
                            <option value="113000">전북</option>
                            <option value="114000">충북</option>
                            <option value="115000">충남</option>
                            <option value="116000">제주</option>
                            <option value="117000">전국</option>
                            <option value="118000">세종</option>
                            <option value="210000">아시아·중동</option>
                            <option value="220000">북·중미</option>
                            <option value="230000">남미</option>
                            <option value="240000">유럽</option>
                            <option value="250000">오세아니아</option>
                            <option value="260000">아프리카</option>
                            <option value="270000">남극대륙</option>
                            <option value="280000">기타해외</option>
                        </select>
                    </div>
                </div>
                <div class="resume_save notCached">
                    <button type="button" class="BtnType SizeL BlueInvert evtLayerClose w50">취소</button>
                    <button type="button" class="BtnType SizeL evtLayerSave w50">저장</button>
                </div>
            </div>
    `;

    const selectElement = div2.querySelector("select");
    selectElement.addEventListener("change", (event) => {
        if (event.target.value === "") {
            showView("A"); // View A로 돌아가기
        }
    });

    return div2;
}

// 특정 뷰를 표시하는 함수
function showView(viewName) {
    app.innerHTML = ""; // 기존 콘텐츠 비우기
    if (viewName === "A") {
        app.appendChild(createViewA());
    } else if (viewName === "B") {
        app.appendChild(createViewB());
    }
}

// Add 버튼 클릭 시 View A 표시
addButton.addEventListener("click", () => {
    addButton.style.display = "none";
    modifyElement.style.display = "none";
    resumeList.style.display = "none";
    showView("A"); // View A 표시
});

// 동적 취소 버튼 이벤트 처리
document.addEventListener("click", (event) => {
    // 체크박스 상태 설정
    const checkboxN = document.getElementById("qualificationN_1729062897407");
    const checkboxY = document.getElementById("qualificationY_1729080866918");

    // 항상 초기 상태로 설정
    if (checkboxN) checkboxN.checked = false; // 첫 번째 체크박스: 항상 해제
    if (checkboxY) checkboxY.checked = true; // 두 번째 체크박스: 항상 선택
    if (event.target.classList.contains("evtLayerClose")) {
        const resumeEdit = event.target.closest(".resume_edit");
        if (resumeEdit) resumeEdit.remove();
        restoreUI(); // UI 상태 복원
    }
});

document.addEventListener("click", (event) => {
    // 클릭된 요소의 클래스 로그
    console.log("클릭된 요소:", event.target);
    console.log("클릭된 요소의 클래스:", event.target.className);

    // 클릭된 요소가 "Lbl"인 경우
    if (event.target.classList.contains("Lbl")) {
        // "test1" 클래스를 가진 경우
        if (event.target.classList.contains("test1")) {
            // item_row item_center item_career 요소 찾기
            const itemCareer = document.querySelector(
                ".item_row.item_center.item_career"
            );

            // item_row item_center item_close 요소 찾기
            const itemClose = document.querySelector(
                ".item_row.item_center.item_close"
            );

            // item_row 요소들 찾기
            const itemRow = document.querySelector(".item_row.detail");

            itemCareer.classList.add("item_close");
            itemCareer.style.display = "none";

            // itemClose에서 item_close 제거 및 display flex로 설정
            if (itemClose) {
                itemClose.classList.remove("item_close");
                itemClose.style.display = "flex";
            }

            if (itemRow) {
                itemRow.classList.add("item_close");
                itemRow.style.display = "none";
            }
        }

        // "test2" 클래스를 가진 경우
        if (event.target.classList.contains("test2")) {
            // itemCareerClose는 item_close 클래스를 포함하는 요소
            const itemCareerClose = document.querySelector(
                ".item_row.item_center.item_career.item_close"
            );

            // itemClose는 item_center만 있는 요소 (item_close가 아닌)
            const itemClose = document.querySelector(
                ".item_row.item_center:not(.item_close)"
            );

            // item_row 요소들 찾기
            const itemRowClose = document.querySelector(
                ".item_row.detail.item_close"
            );

            // 동작
            if (itemCareerClose) {
                itemCareerClose.classList.remove("item_close");
                itemCareerClose.style.display = "flex";
            } else {
                console.log("itemCareerClose가 null입니다."); // 이 부분이 로그에 표시될 수 있습니다.
            }

            if (itemClose) {
                itemClose.classList.add("item_close");
                itemClose.style.display = "none";
            } else {
                console.log("itemClose가 null입니다."); // 이 부분이 로그에 표시될 수 있습니다.
            }

            if (itemRowClose) {
                itemRowClose.classList.remove("item_close");
                itemRowClose.style.display = "flex";
            } else {
                console.log("itemRowClose가 null입니다."); // 이 부분이 로그에 표시될 수 있습니다.
            }
        }
    }
});

// 검정고시 선택
// document.addEventListener("click", (event) => {
//     console.log("클릭된 요소:", event.target);
//     // 클릭된 요소가 Lbl인 경우
//     if (event.target.classList.contains("Lbl")) {
//         // item_row item_center item_career 요소 찾기
//         const itemCareer = document.querySelector(
//             ".item_row.item_center.item_career"
//         );
//         const itemCareerClose = document.querySelector(
//             ".item_row.item_center.item_career.item_close"
//         );

//         // item_row item_center item_close 요소 찾기
//         const itemClose = document.querySelector(
//             ".item_row.item_center.item_close"
//         );

//         // item_row 요소들 찾기
//         const itemRow = document.querySelector(".item_row.detail");

//         // 클릭 시 동작
//         if (itemCareer.classList.contains("item_close")) {
//             // itemCareer에서 item_close 클래스를 제거하고 display를 flex로 설정
//             itemCareerClose.classList.remove("item_close");
//             itemCareerClose.style.display = "flex";

//             // itemClose에 item_close 추가 및 display none 설정
//             if (itemClose) {
//                 itemClose.classList.add("item_close");
//                 itemClose.style.display = "none";
//             }
//             if (itemRow) {
//                 itemRow.classList.remove("item_close");
//                 itemRow.style.display = "flex";
//             }
//         } else {
//             // 다시 클릭한 경우
//             // itemCareer에 item_close 클래스를 추가하고 display를 none으로 설정
//             itemCareer.classList.add("item_close");
//             itemCareer.style.display = "none";

//             // itemClose에서 item_close 제거 및 display flex로 설정
//             if (itemClose) {
//                 itemClose.classList.remove("item_close");
//                 itemClose.style.display = "flex";
//             }

//             if (itemRow) {
//                 itemRow.classList.add("item_close");
//                 itemRow.style.display = "none";
//             }
//         }
//     }
// });

// 이전 작업
// const addButton = document.querySelector(".btn_add.evtWriteItem");
// const modifyElement = document.querySelector(
//     ".btn_modify.evtOpenLastSchoolNudge"
// );
// const resumeList = document.querySelector(".resume_list");
// const app = document.getElementById("app");

// // View A를 생성하는 함수
// function createViewA() {
//     const div1 = document.createElement("div");
//     div1.innerHTML = `
//         <div
//             id="resumeSchoolItem_${Date.now()}"
//             class="resume_edit wrapHiddenForm"
//             data-tpl="school-item"
//         >
//             <div class="item_row">
//                 <div class="InpBox SizeL item_m">
//                     <label for="schoolType" class="blind">학력구분</label>
//                     <select name="school_type" class="evtChangeSchoolType">
//                         <option value="" selected>학력 구분 선택 *</option>
//                         <option value="primary">초등학교 졸업</option>
//                         <option value="middle">중학교 졸업</option>
//                         <option value="high">고등학교 졸업</option>
//                         <option value="university">대학ㆍ대학원 이상 졸업</option>
//                         <option value="academy">기타 학력 졸업</option>
//                     </select>
//                 </div>
//             </div>
//             <div class="resume_save notCached">
//                 <button type="button" class="BtnType SizeL BlueInvert evtLayerClose w50">취소</button>
//                 <button type="button" class="BtnType SizeL evtLayerSave w50">저장</button>
//             </div>
//         </div>
//     `;

//     // select 요소의 change 이벤트 리스너 추가
//     const selectElement = div1.querySelector("select");
//     selectElement.addEventListener("change", (event) => {
//         if (event.target.value === "primary") {
//             // div1을 숨기고 div2를 표시
//             app.innerHTML = ""; // 기존 콘텐츠 비우기
//             showView("B"); // div2를 보여줌
//         }
//         if (event.target.value === "middle") {
//             // 현재 있는거를 숨기고 div3를 표시
//             app.innerHTML = ""; // 기존 콘텐츠 비우기
//             showView("C"); // div3를 보여줌
//         }
//     });

//     return div1;
// }

// // 특정 뷰를 표시하는 함수
// function showView(viewName) {
//     if (viewName === "B") {
//         const div2 = document.createElement("div");
//         div2.innerHTML = `
//             <h1>View B</h1>
//             <p>This is the content of View B.</p>
//         `;
//         app.appendChild(div2);
//     } else if (viewName === "C") {
//         const div3 = document.createElement("div");
//         div3.innerHTML = `
//             <h1>View C</h1>
//             <p>This is the content of View C.</p>
//         `;
//         app.appendChild(div3);
//     }
// }

// // addButton 클릭 시 View A 표시
// addButton.addEventListener("click", () => {
//     addButton.style.display = "none";
//     modifyElement.style.display = "none";
//     resumeList.style.display = "none";
//     app.appendChild(createViewA()); // View A를 추가
// });

// // 이벤트 위임을 사용해 동적으로 생성된 취소 버튼 핸들링
// document.addEventListener("click", (event) => {
//     if (event.target.classList.contains("evtLayerClose")) {
//         const resumeEdit = event.target.closest(".resume_edit");

//         if (resumeEdit) {
//             resumeEdit.remove();
//         }

//         // UI 상태 복원
//         modifyElement.style.display = "flex";
//         resumeList.style.display = "block";
//         addButton.style.display = "block";
//     }
// });

// const addButton = document.querySelector(".btn_add.evtWriteItem");
// const modifyElement = document.querySelector(
//     ".btn_modify.evtOpenLastSchoolNudge"
// );
// const resumeList = document.querySelector(".resume_list");
// const app = document.getElementById("app");

// // View A를 생성하는 함수
// function createViewA() {
//     const div1 = document.createElement("div");
//     div1.innerHTML = `
//         <div
//             id="resumeSchoolItem_${Date.now()}"
//             class="resume_edit wrapHiddenForm"
//             data-tpl="school-item"
//         >
//             <div class="item_row">
//                 <div class="InpBox SizeL item_m">
//                     <label for="schoolType" class="blind">학력구분</label>
//                     <select name="school_type" class="evtChangeSchoolType">
//                         <option value="" selected>학력 구분 선택 *</option>
//                         <option value="primary">초등학교 졸업</option>
//                         <option value="middle">중학교 졸업</option>
//                         <option value="high">고등학교 졸업</option>
//                         <option value="university">대학ㆍ대학원 이상 졸업</option>
//                         <option value="academy">기타 학력 졸업</option>
//                     </select>
//                 </div>
//             </div>
//             <div class="resume_save notCached">
//                 <button type="button" class="BtnType SizeL BlueInvert evtLayerClose w50">취소</button>
//                 <button type="button" class="BtnType SizeL evtLayerSave w50">저장</button>
//             </div>
//         </div>
//     `;
//     return div1;
// }

// // 특정 뷰를 표시하는 함수
// function showView(viewName) {
//     app.innerHTML = ""; // 기존 콘텐츠 비우기

//     if (viewName === "A") {
//         app.appendChild(createViewA()); // 새로운 View A 생성 후 추가
//     } else if (viewName === "B") {
//         const div2 = document.createElement("div");
//         div2.innerHTML = `<h1>View B</h1><p>This is the content of View B.</p>`;
//         app.appendChild(div2);
//     } else if (viewName === "C") {
//         const div3 = document.createElement("div");
//         div3.innerHTML = `<h1>View C</h1><p>This is the content of View C.</p>`;
//         app.appendChild(div3);
//     }
// }

// // addButton 클릭 시 View A 표시
// addButton.addEventListener("click", () => {
//     addButton.style.display = "none";
//     modifyElement.style.display = "none";
//     resumeList.style.display = "none";
//     showView("A");
// });

// // 이벤트 위임을 사용해 동적으로 생성된 취소 버튼 핸들링
// document.addEventListener("click", (event) => {
//     if (event.target.classList.contains("evtLayerClose")) {
//         const resumeEdit = event.target.closest(".resume_edit");

//         if (resumeEdit) {
//             resumeEdit.remove();
//         }

//         // UI 상태 복원
//         modifyElement.style.display = "flex";
//         resumeList.style.display = "block";
//         addButton.style.display = "block";
//     }
// });
