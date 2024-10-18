const fileInput1 = document.getElementById("dumi_file_res");
const fileAddBtn = document.getElementById("fileAddBtn");
const uploadedFileRow = document.getElementById("uploadedFileRow");
const fileList = document.getElementById("fileList");
const filePreview = document.getElementById("filePreview");

// 파일 선택 시 처리
fileInput1.addEventListener("change", () => {
    const file = fileInput1.files[0]; // 첫 번째 파일만 처리
    if (file) {
        const { name, size, type } = file;
        const fileSizeKB = Math.round(size / 1024);

        // 파일 이름과 확장자 추출
        const fileName = name.split(".").slice(0, -1).join(".");
        const fileExtension = name.split(".").pop();

        // 파일 정보 항목 생성
        const listItem = document.createElement("li");
        listItem.classList.add("list", "file");
        listItem.innerHTML = `
            <p class="tit">
                <span>${fileName}</span>.${fileExtension}
            </p>
            <span class="data">${fileSizeKB}KB</span>
            <button type="button" class="btn_delete evtDeleteResFile">
                <svg>
                    <use xlink:href="#search_delete"></use>
                </svg>
            </button>
        `;

        fileList.appendChild(listItem);
        uploadedFileRow.style.display = "block";

        // 이미지 파일인 경우 미리보기 표시
        if (type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;

                // 기존 내용 제거 후 이미지 추가
                filePreview.innerHTML = "";
                filePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            // 이미지가 아닌 경우 기본 메시지 유지
            filePreview.innerHTML =
                '<p class="txt_no_preview">썸네일을 찾을 수 없습니다.</p>';
        }

        // 파일 삭제 버튼 이벤트 추가
        listItem
            .querySelector(".evtDeleteResFile")
            .addEventListener("click", () => {
                listItem.remove();
                filePreview.innerHTML =
                    '<p class="txt_no_preview">썸네일을 찾을 수 없습니다.</p>';
                if (fileList.children.length === 0) {
                    uploadedFileRow.style.display = "none";
                }
                previewFile.style.display = "none";
                addFileArea.style.display = "block";
            });
    }
});

// 파일 추가 모달창
const modalFileBtn = document.querySelector(".btn_file_add");
const wrapResumeNudge = document.getElementById("wrapResumeNudge");
const closeModalBtns = document.querySelectorAll(".evtBtnClose");

modalFileBtn.addEventListener("click", () => {
    wrapResumeNudge.style.display = "block";
});
closeModalBtns.forEach((button) => {
    button.addEventListener("click", () => {
        wrapResumeNudge.style.display = "none";
    });
});
// 파일 등록시 버튼 disable 삭제(활성화)
const fileInput = document.getElementById("dumi_file_res");
const uploadButton = document.getElementById("uploadBtn");
const modalUpload = document.getElementById("resume_file_uploaded_layer");
const btnConfirm = document.querySelector(".btn_confirm"); //파일 등록 완료시 모달창 확인 버튼
const fileSuccessModal = document.getElementById("resume_file_uploaded_layer");
const previewFile = document.querySelector(".preview_file_area");
const addFileArea = document.querySelector(".add_file_area");
const dimmed = document.getElementById("dimmed"); //파일 등록 완료시 뒷 배경

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        uploadButton.removeAttribute("disabled");
    } else {
        uploadButton.setAttribute("disabled", "");
    }
});
uploadButton.addEventListener("click", () => {
    wrapResumeNudge.style.display = "none";
    modalUpload.style.display = "block";
    previewFile.style.display = "block";
    addFileArea.style.display = "none";
    dimmed.style.display = "block";
});
// 등록 완료시 모달 창에서 확인 버튼 클릭시
btnConfirm.addEventListener("click", () => {
    fileSuccessModal.style.display = "none";
    dimmed.style.display = "none";
});

// 이력서 팁 보기
const toggleBtn = document.querySelector(".tip_recommend.show_resume_title"); // 클릭할 버튼
const toggleContent = document.querySelector(
    ".TipCont.BottomLeft.resume_title_option"
); // 팁 내용
const closeTip = document.querySelector(".BtnClose");
// 팁 내용 버튼
const buttons = document.querySelectorAll(".txt");
const titleInput = document.getElementById("title"); // 팁 내용 뿌려주는 input 태그

// 각 버튼에 클릭 이벤트 리스너 추가
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // 클릭한 버튼의 텍스트를 input 태그에 설정
        titleInput.value = button.textContent.replace(/\s+/g, " ");
        toggleContent.style.display = "none";
    });
});

toggleBtn.addEventListener("click", () => {
    // display 속성을 토글
    toggleContent.style.display =
        toggleContent.style.display === "block" ? "none" : "block";
});

closeTip.addEventListener("click", () => {
    // 항상 숨김
    toggleContent.style.display = "none"; // 숨김
});

// 스킬에서 선택하면 아래에 데이터 뿌리기
document.querySelectorAll(".evtReturnAutoComplete").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
        const skillList = document.querySelector(".soft_add"); // 스킬 목록 영역
        const progressCircle = document.querySelector(".induceSkill .svg"); // SVG 요소

        // 레이블에서 텍스트 가져오기
        const label = e.target.nextElementSibling; // 체크박스의 다음 형제 요소는 레이블
        const skillValue = label.querySelector(".keyword").textContent; // "야구"와 같은 텍스트 가져오기

        // 스킬 개수에 따라 SVG 클래스 업데이트하는 함수
        function updateSvgClass() {
            const skillCount = skillList.children.length;
            // 기존 단계 클래스 제거
            progressCircle.classList.remove(
                "step1",
                "step2",
                "step3",
                "step4",
                "step5"
            );
            // 스킬 수에 따라 새로운 단계 클래스 추가
            if (skillCount > 0 && skillCount <= 5) {
                progressCircle.classList.add(`step${skillCount}`);
            }
        }

        // SVG 클래스 제거하는 함수
        function removeSvgClass() {
            const skillCount = skillList.children.length;
            // 기존 단계 클래스 제거
            progressCircle.classList.remove(
                "step1",
                "step2",
                "step3",
                "step4",
                "step5"
            );
        }

        if (e.target.checked) {
            // 체크박스가 선택된 경우, 스킬 추가
            const skillItem = document.createElement("span");
            skillItem.className = "skill_item basicSkillItem";
            skillItem.innerHTML = `
                <button type="button" class="skill_modify evtLayerSkillItemDetail">
                    <em class="skillNm">${skillValue}</em>
                    <svg><use xlink:href="#view_modify"></use></svg>
                </button>
                <button type="button" class="skill_delete evtDeleteSkillItem">
                    <svg><use xlink:href="#resume_skill_close"></use></svg>
                </button>
            `;

            // 삭제 버튼 클릭 시 해당 스킬 삭제
            skillItem
                .querySelector(".evtDeleteSkillItem")
                .addEventListener("click", () => {
                    e.target.checked = false; // 체크박스 해제
                    skillItem.remove(); // 스킬 아이템 삭제
                    // updateSvgClass(); // 삭제 시 SVG 클래스 업데이트
                    removeSvgClass(); // SVG 클래스 제거

                    const skillCount = skillList.children.length; // 현재 스킬 개수 확인
                    // 삭제된 후 상태에 따라 클래스 추가
                    if (skillCount < 5) {
                        progressCircle.classList.add(`step${skillCount + 1}`);
                    }
                    progressCircle.classList.add("reverse"); // 삭제 시 reverse 클래스 추가
                });

            skillList.appendChild(skillItem); // 스킬 목록에 추가
            progressCircle.classList.remove("reverse"); // 추가 시 reverse 클래스 제거
            updateSvgClass(); // 추가 후 SVG 클래스 업데이트
        } else {
            // 체크박스가 해제된 경우, 해당 스킬 삭제
            const skillToRemove = Array.from(skillList.children).find(
                (item) =>
                    item.querySelector(".skillNm").textContent === skillValue
            );
            if (skillToRemove) {
                skillToRemove.remove(); // 스킬 아이템 삭제
                removeSvgClass(); // SVG 클래스 제거
                const skillCount = skillList.children.length; // 현재 스킬 개수 확인
                // 삭제된 후 상태에 따라 클래스 추가
                if (skillCount < 5) {
                    progressCircle.classList.add(`step${skillCount + 1}`);
                }
                progressCircle.classList.add("reverse"); // 삭제 시 reverse 클래스 추가
            }
        }
    });
});

// 스킬 입력(검색)할때
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchSkill");
    const btnDelete = document.querySelector(".btn_delete.autoCompleteUi");
    const autoSearch = document.querySelector(
        ".area_auto_search.company_search.autoCompleteList.autoCompleteUi"
    );
    const skillList = document.querySelector(".wrapBasicSkill");

    searchInput.addEventListener("input", () => {
        const inputValue = searchInput.value.trim();

        if (inputValue) {
            btnDelete.style.display = "block";
            autoSearch.style.display = "block";
            skillList.style.marginTop = "250px";
        } else {
            btnDelete.style.display = "none";
            autoSearch.style.display = "none";
            skillList.style.marginTop = "40px";
        }

        // 버튼 클릭 시 input 값 비우기 및 버튼 숨기기
        btnDelete.addEventListener("click", () => {
            searchInput.value = "";
            btnDelete.style.display = "none";
            autoSearch.style.display = "none";
            skillList.style.marginTop = "40px";
            searchInput.focus(); // 입력 필드에 포커스 유지
        });
    });
});

// 스킬
// 요소의 display 스타일을 변경하는 함수
const setDisplay = (element, display) => {
    if (element) element.style.display = display;
};

// 버튼 클릭 핸들러
const handleButtonClick = (event) => {
    const clickedButton = event.currentTarget; // 클릭된 버튼
    const parentContainer = clickedButton.closest(".resume_skill"); // 부모 컨테이너 탐색

    // 각 요소를 부모 컨테이너 내에서 찾기
    setDisplay(parentContainer.querySelector(".btn_add.evtWriteItem"), "none"); // 클릭된 버튼 숨김
    setDisplay(parentContainer.querySelector(".TipBox"), "block"); // TipBox 표시
    setDisplay(parentContainer.querySelector(".resume_list"), "none"); // resume_list 숨김
    setDisplay(
        parentContainer.querySelector(".resume_edit.wrapHiddenForm"),
        "block"
    ); // resume_edit 표시
};
// 삭제 버튼 클릭 핸들러
const handleDeleteButtonClick = (event) => {
    const clickedButton = event.currentTarget; // 클릭된 삭제 버튼
    const parentContainer = clickedButton.closest(".resume_skill"); // 부모 컨테이너 탐색

    // 부모 컨테이너 내 요소의 display 스타일 복구
    setDisplay(parentContainer.querySelector(".btn_add.evtWriteItem"), "block"); // 추가 버튼 표시
    setDisplay(parentContainer.querySelector(".TipBox"), "none"); // TipBox 숨김
    setDisplay(parentContainer.querySelector(".resume_list"), "block"); // resume_list 표시
    setDisplay(
        parentContainer.querySelector(".resume_edit.wrapHiddenForm"),
        "none"
    ); // resume_edit 숨김
};

// 모든 삭제 버튼에 이벤트 리스너 등록
document
    .getElementById("skill-close-btn")
    .addEventListener("click", handleDeleteButtonClick);

// 모든 버튼에 이벤트 리스너 등록
document.querySelectorAll(".btn_add.evtWriteItem").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});

//숨겨진 내스킬 추가
document
    .querySelector(".skill_hide_add")
    .addEventListener("click", handleButtonClick);

// 스킬 수정 버튼 클릭
document
    .getElementById("skill-update-btn")
    .addEventListener("click", handleButtonClick);

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
const evtEditItem = document.querySelector(".BtnType.view_modify.evtEditItem");

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
        <div id="resumeSchoolItem" class="resume_edit wrapHiddenForm"">
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
        const value = event.target.value;

        if (value === "primary") {
            showView("B"); // View B 표시
        } else if (value === "university") {
            showView("C"); // View C 표시
        } else if (value === "academy") {
            showView("D"); // View D 표시
        } else if (value === "middle") {
            showView("B_1"); // View B_1 표시
        } else if (value === "high") {
            showView("B_2"); // View B_1 표시
        }
    });

    return div1;
}

// View B를 생성하는 함수
function createViewB() {
    const div2 = document.createElement("div");
    div2.innerHTML = `
                    <div id="resumeSchoolItem" 
                class="resume_edit wrapHiddenForm">
                
                <div class="item_row item_center item_career">
                    <div class="InpBox SizeL item_m">
                        <label for="schoolType" class="blind">학력구분</label>
                        <select name="school_type" id="schoolType" 
                                class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary" selected="">초등학교 졸업</option>
                            <option value="middle">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox"
                                id="qualificationN" 
                                class="evtChangeQualification" />
                            <label class="Lbl test1" for="qualificationN">
                                중입 검정고시(초졸)
                            </label>
                        </span>
                    </div>
                </div>
                <div class="item_row item_center item_close" style="display: none;">
                    <div class="InpBox SizeL item_s check">
                        <label for="schoolTypeQualification" class="blind">학력구분</label>
                        <select name="school_type" id="schoolTypeQualification" class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary" selected="selected">초등학교 졸업</option>
                            <option value="middle">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode" class="blind">지역</label>
                            <select id="schoolAreaCode">
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
                        <label for="qualGraduationDt" class="Lbl">합격년월 *</label>
                        <input type="text" id="qualGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker check" maxlength="6" pattern="[0-9]*" placeholder="YYYYMM" required="">
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox" id="qualificationY" class="evtChangeQualification" checked="">
                            <label class="Lbl test2" for="qualificationY">중입 검정고시(초졸)</label>
                        </span>
                    </div>
                </div>

                <div class="item_row detail">
                    <div class="TypoBox TypeBtn item_m LblTop">
                        <label class="Lbl" for="schoolNm">학교명 *</label>
                        <input type="text" name="school_nm[]" value="" 
                            id="schoolNm" class="Typo SizeL check" 
                            maxlength="100" placeholder="학교명 *" required="" />
                    </div>

                    <div class="InpBox SizeL item_s check">
                        <label for="schoolGraduationGb" class="blind">졸업여부</label>
                        <select id="schoolGraduationGb" required="">
                            <option value="">졸업여부 *</option>
                            <option value="1">졸업</option>
                            <option value="5">중퇴</option>
                        </select>
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolEntranceDt" class="Lbl">입학년월</label>
                        <input type="text" 
                            id="schoolEntranceDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                            maxlength="6" 
                            pattern="[0-9]*" placeholder="YYYYMM" required="" />
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolGraduationDt" class="Lbl">졸업년월</label>
                        <input type="text" name="school_graduation_dt[]" value="" 
                            id="schoolGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                             maxlength="6" placeholder="YYYYMM" 
                            pattern="[0-9]*" required="" />
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode" class="blind">지역</label>
                        <select id="schoolAreaCode">
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

    const selectElements = div2.querySelectorAll("select"); // 모든 select 요소 선택

    selectElements.forEach((selectElement) => {
        selectElement.addEventListener("change", (event) => {
            const value = event.target.value;
            if (value === "basic") {
                showView("A"); // View A 표시
            } else if (value === "primary") {
                showView("B"); // View B 표시
            } else if (value === "university") {
                showView("C"); // View C 표시
            } else if (value === "academy") {
                showView("D"); // View D 표시
            } else if (value === "middle") {
                showView("B_1"); // View B_1 표시
            } else if (value === "high") {
                showView("B_2"); // View B_1 표시
            }
        });
    });

    return div2;
}
// View B를 생성하는 함수
function createViewB_1() {
    const div2_1 = document.createElement("div");
    div2_1.innerHTML = `
                    <div id="resumeSchoolItem" 
                class="resume_edit wrapHiddenForm">
                
                <div class="item_row item_center item_career">
                    <div class="InpBox SizeL item_m">
                        <label for="schoolType" class="blind">학력구분</label>
                        <select name="school_type" id="schoolType" 
                                class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary">초등학교 졸업</option>
                            <option value="middle"  selected="">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox"
                                id="qualificationN" 
                                class="evtChangeQualification" />
                            <label class="Lbl test1" for="qualificationN">
                                고입 검정고시(중졸)
                            </label>
                        </span>
                    </div>
                </div>
                <div class="item_row item_center item_close" style="display: none;">
                    <div class="InpBox SizeL item_s check">
                        <label for="schoolTypeQualification" class="blind">학력구분</label>
                        <select name="school_type" id="schoolTypeQualification" class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary">초등학교 졸업</option>
                            <option value="middle" selected="selected">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode" class="blind">지역</label>
                            <select id="schoolAreaCode">
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
                        <label for="qualGraduationDt" class="Lbl">합격년월 *</label>
                        <input type="text" id="qualGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker check" maxlength="6" pattern="[0-9]*" placeholder="YYYYMM" required="">
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox" id="qualificationY" class="evtChangeQualification" checked="">
                            <label class="Lbl test2" for="qualificationY">고입 검정고시(중졸)</label>
                        </span>
                    </div>
                </div>

                <div class="item_row detail">
                    <div class="TypoBox TypeBtn item_m LblTop">
                        <label class="Lbl" for="schoolNm">학교명 *</label>
                        <input type="text" name="school_nm[]" value="" 
                            id="schoolNm" class="Typo SizeL check" 
                            maxlength="100" placeholder="학교명 *" required="" />
                    </div>

                    <div class="InpBox SizeL item_s check">
                        <label for="schoolGraduationGb" class="blind">졸업여부</label>
                        <select id="schoolGraduationGb" required="">
                            <option value="">졸업여부 *</option>
                            <option value="1">졸업</option>
                            <option value="5">중퇴</option>
                        </select>
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolEntranceDt" class="Lbl">입학년월</label>
                        <input type="text" 
                            id="schoolEntranceDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                            maxlength="6" 
                            pattern="[0-9]*" placeholder="YYYYMM" required="" />
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolGraduationDt" class="Lbl">졸업년월</label>
                        <input type="text" name="school_graduation_dt[]" value="" 
                            id="schoolGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                             maxlength="6" placeholder="YYYYMM" 
                            pattern="[0-9]*" required="" />
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode" class="blind">지역</label>
                        <select id="schoolAreaCode">
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

    const selectElements = div2_1.querySelectorAll("select"); // 모든 select 요소 선택

    selectElements.forEach((selectElement) => {
        selectElement.addEventListener("change", (event) => {
            const value = event.target.value;
            if (value === "basic") {
                showView("A"); // View A 표시
            } else if (value === "primary") {
                showView("B"); // View B 표시
            } else if (value === "university") {
                showView("C"); // View C 표시
            } else if (value === "academy") {
                showView("D"); // View D 표시
            } else if (value === "middle") {
                showView("B_1"); // View B_1 표시
            } else if (value === "high") {
                showView("B_2"); // View B_1 표시
            }
        });
    });

    return div2_1;
}
// View B를 생성하는 함수
function createViewB_2() {
    const div2_2 = document.createElement("div");
    div2_2.innerHTML = `
                    <div id="resumeSchoolItem" 
                class="resume_edit wrapHiddenForm">
                
                <div class="item_row item_center item_career">
                    <div class="InpBox SizeL item_m">
                        <label for="schoolType" class="blind">학력구분</label>
                        <select name="school_type" id="schoolType" 
                                class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary">초등학교 졸업</option>
                            <option value="middle">중학교 졸업</option>
                            <option value="high"   selected="">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox"
                                id="qualificationN" 
                                class="evtChangeQualification" />
                            <label class="Lbl test1" for="qualificationN">
                                대입 검정고시(고졸)
                            </label>
                        </span>
                    </div>
                </div>
                <div class="item_row item_center item_close" style="display: none;">
                    <div class="InpBox SizeL item_s check">
                        <label for="schoolTypeQualification" class="blind">학력구분</label>
                        <select name="school_type" id="schoolTypeQualification" class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary">초등학교 졸업</option>
                            <option value="middle" >중학교 졸업</option>
                            <option value="high" selected="selected">고등학교 졸업</option>
                            <option value="university">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode" class="blind">지역</label>
                            <select id="schoolAreaCode">
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
                        <label for="qualGraduationDt" class="Lbl">합격년월 *</label>
                        <input type="text" id="qualGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker check" maxlength="6" pattern="[0-9]*" placeholder="YYYYMM" required="">
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input type="checkbox" id="qualificationY" class="evtChangeQualification" checked="">
                            <label class="Lbl test2" for="qualificationY">대입 검정고시(고졸)</label>
                        </span>
                    </div>
                </div>

                <div class="item_row detail">
                    <div class="TypoBox TypeBtn item_m LblTop">
                        <label class="Lbl" for="schoolNm">학교명 *</label>
                        <input type="text" name="school_nm[]" value="" 
                            id="schoolNm" class="Typo SizeL check" 
                            maxlength="100" placeholder="학교명 *" required="" />
                    </div>

                    <div class="InpBox SizeL item_s check">
                        <label for="schoolGraduationGb" class="blind">졸업여부</label>
                        <select id="schoolGraduationGb" required="">
                            <option value="">졸업여부 *</option>
                            <option value="1">졸업</option>
                            <option value="5">중퇴</option>
                        </select>
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolEntranceDt" class="Lbl">입학년월</label>
                        <input type="text" 
                            id="schoolEntranceDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                            maxlength="6" 
                            pattern="[0-9]*" placeholder="YYYYMM" required="" />
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label for="schoolGraduationDt" class="Lbl">졸업년월</label>
                        <input type="text" name="school_graduation_dt[]" value="" 
                            id="schoolGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                             maxlength="6" placeholder="YYYYMM" 
                            pattern="[0-9]*" required="" />
                    </div>

                    <div class="InpBox SizeL item_s">
                        <label for="schoolAreaCode" class="blind">지역</label>
                        <select id="schoolAreaCode">
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

    const selectElements = div2_2.querySelectorAll("select"); // 모든 select 요소 선택

    selectElements.forEach((selectElement) => {
        selectElement.addEventListener("change", (event) => {
            const value = event.target.value;
            if (value === "basic") {
                showView("A"); // View A 표시
            } else if (value === "primary") {
                showView("B"); // View B 표시
            } else if (value === "university") {
                showView("C"); // View C 표시
            } else if (value === "academy") {
                showView("D"); // View D 표시
            } else if (value === "middle") {
                showView("B_1"); // View B_1 표시
            } else if (value === "high") {
                showView("B_2"); // View B_1 표시
            }
        });
    });

    return div2_2;
}
// View C를 생성하는 함수
function createViewC() {
    const div3 = document.createElement("div");
    div3.innerHTML = `
            <div id="resumeSchoolItem" class="resume_edit wrapHiddenForm">
                <div class="item_row item_center">
                    <div class="InpBox SizeL item_m">
                        <label for="schoolType" class="blind">학력구분</label>
                        <select name="school_type" id="schoolType" class="evtChangeSchoolType">
                            <option value="basic">학력 구분 선택 *</option>
                            <option value="primary">초등학교 졸업</option>
                            <option value="middle">중학교 졸업</option>
                            <option value="high">고등학교 졸업</option>
                            <option value="university" selected="">대학ㆍ대학원 이상 졸업</option>
                            <option value="academy">기타 학력 졸업</option>
                        </select>
                    </div>

                    <div class="InpBox SizeL item_s check">
                        <label for="schoolGb" class="blind">대학구분</label>
                        <select id="schoolGb">
                            <option value="">대학구분 *</option>
                            <option value="college">대학(2,3년)</option>
                            <option value="university">대학교(4년)</option>
                            <option value="master">대학원(석사)</option>
                            <option value="doctor">대학원(박사)</option>
                        </select>
                    </div>

                    <div class="TypoBox TypeBtn item_m">
                        <label class="blind" for="schoolNm">학교명 *</label>
                        <input 
                            type="text" 
                            id="schoolNm" class="Typo SizeL check" 
                            maxlength="100" placeholder="학교명 *" required="" 
                            
                        />
                    </div>

                    <div class="InpBox item_check">
                        <span class="Chk SizeL">
                            <input 
                                type="checkbox" id="btnEntranceGb" 
                                class="evtClickEntranceGb"
                            />
                            <label for="btnEntranceGb" class="Lbl">편입</label>
                        </span>
                        <input type="hidden" value="1" />
                    </div>
                </div>

                <div class="item_row">
                    <div class="TypoBox item_m LblTop">
                        <label class="Lbl" for="schoolMajor">전공 *</label>
                        <input 
                            type="text" 
                            id="schoolMajor" class="Typo SizeL check" 
                            maxlength="50" placeholder="전공 *" required="" 
                        />
                    </div>

                    <div class="InpBox SizeL item_s check">
                        <label for="schoolGraduationGb" class="blind"></label>
                        <select id="schoolGraduationGb" required="">
                            <option value="">졸업여부 *</option>
                            <option value="1">졸업</option>
                            <option value="2">재학중</option>
                            <option value="3">휴학중</option>
                            <option value="4">수료</option>
                            <option value="5">중퇴</option>
                            <option value="7">자퇴</option>
                            <option value="6">졸업예정</option>
                        </select>
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label class="Lbl" for="schoolEntranceDt">입학년월</label>
                        <input 
                            type="text"
                            id="schoolEntranceDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                             maxlength="6" placeholder="YYYYMM" 
                            pattern="[0-9]*" required="" 
                        />
                    </div>

                    <div class="TypoBox item_s LblTop">
                        <label class="Lbl" for="schoolGraduationDt">졸업년월</label>
                        <input 
                            type="text" 
                            id="schoolGraduationDt" class="Typo SizeL onlyNumber DatePic datePicker" 
                             maxlength="6" placeholder="YYYYMM" 
                            pattern="[0-9]*" required="" 
                        />
                    </div>

                    <div class="InpBox SizeL item_s" style="display: none">
                        <label for="schoolDayNight" class="blind">주/야간</label>
                        <select id="schoolDayNight" class="additionalItem">
                            <option value="">주/야간 선택</option>
                            <option value="day">주간</option>
                            <option value="night">야간</option>
                        </select>
                    </div>
                </div>

                <div class="resume_save notCached">
                    <button type="button" class="BtnType SizeL BlueInvert evtLayerClose w50">취소</button>
                    <button type="button" class="BtnType SizeL evtLayerSave w50">저장</button>
                </div>
        </div>

    `;

    const selectElement = div3.querySelector("select");
    selectElement.addEventListener("change", (event) => {
        const value = event.target.value;
        if (value === "basic") {
            showView("A"); // View A 표시
        } else if (value === "primary") {
            showView("B"); // View B 표시
        } else if (value === "university") {
            showView("C"); // View C 표시
        } else if (value === "academy") {
            showView("D"); // View D 표시
        } else if (value === "middle") {
            showView("B_1"); // View B_1 표시
        } else if (value === "high") {
            showView("B_2"); // View B_1 표시
        }
    });

    return div3;
}

// View D를 생성하는 함수
function createViewD() {
    const div4 = document.createElement("div");
    div4.innerHTML = `
        <div id="resumeSchoolItem" class="resume_edit wrapHiddenForm">
            <div class="item_row item_center">
                <div class="InpBox SizeL item_m">
                    <label for="schoolType_1729132115363" class="blind">학력구분</label>
                    <select name="school_type" id="schoolType_1729132115363" class="evtChangeSchoolType">
                        <option value="basic">학력 구분 선택 *</option>
                        <option value="primary">초등학교 졸업</option>
                        <option value="middle">중학교 졸업</option>
                        <option value="high">고등학교 졸업</option>
                        <option value="university">대학ㆍ대학원 이상 졸업</option>
                        <option value="academy" selected="">직업전문학원ㆍ학교 및 기타학력 졸업</option>
                    </select>
                </div>
                <div class="InpBox SizeL item_s check">
                    <label for="academyAdmittedEducationCd_1729132115363" class="blind"></label>
                    <select name="academy_admitted_education_cd[]" id="academyAdmittedEducationCd_1729132115363">
                        <option value="">인정학력 *</option>
                        <option value="2">대학(2,3년)</option>
                        <option value="3">대학교(4년)</option>
                    </select>
                </div>
                <div class="TypoBox TypeBtn item_m">
                    <label for="academyNm_1729132115363" class="blind">학교/학원명 *</label>
                    <input type="text" name="academy_nm[]" id="academyNm_1729132115363" 
                        class="Typo SizeL check" maxlength="100" placeholder="학교/학원명 *" />
                </div>
            </div>
            <div class="item_row">
                <div class="TypoBox item_m">
                    <label for="academyMajor_1729132115363" class="blind">전공분야</label>
                    <input type="text" name="academy_major[]" id="academyMajor_1729132115363" 
                        class="Typo SizeL check" maxlength="50" placeholder="전공분야 *" />
                </div>
                <div class="InpBox SizeL item_s check">
                    <label for="academyGraduationGb_1729132115363" class="blind">졸업구분</label>
                    <select name="academy_graduation_gb[]" id="academyGraduationGb_1729132115363" required="">
                        <option value="">졸업구분 *</option>
                        <option value="1">졸업</option>
                        <option value="2">재학중</option>
                        <option value="3">휴학중</option>
                        <option value="4">수료</option>
                        <option value="5">중퇴</option>
                        <option value="7">자퇴</option>
                        <option value="6">졸업예정</option>
                    </select>
                </div>
                <div class="TypoBox item_s LblTop">
                    <label for="academyEntranceDt_1729132115363" class="Lbl">입학년월 *</label>
                    <input type="text" name="academy_entrance_dt[]" id="academyEntranceDt_1729132115363" 
                        class="Typo SizeL onlyNumber DatePic datePicker check" data-dateformat="yymm" 
                        maxlength="6" placeholder="YYYYMM" inputmode="numeric" pattern="[0-9]*" required="" />
                </div>
                <div class="TypoBox item_s LblTop">
                    <label for="academyGraduationDt_1729132115363" class="Lbl">졸업년월 *</label>
                    <input type="text" name="academy_graduation_dt[]" id="academyGraduationDt_1729132115363" 
                        class="Typo SizeL onlyNumber DatePic datePicker check" data-dateformat="yymm" 
                        maxlength="6" placeholder="YYYYMM" inputmode="numeric" pattern="[0-9]*" required="" />
                </div>
                <div class="InpBox SizeL item_s check">
                    <label for="academyAreaCode_1729132115363" class="blind">지역</label>
                    <select name="academy_area_code[]" id="academyAreaCode_1729132115363">
                        <option value="">지역 *</option>
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

    const selectElement = div4.querySelector("select");
    selectElement.addEventListener("change", (event) => {
        const value = event.target.value;
        if (value === "basic") {
            showView("A"); // View A 표시
        } else if (value === "primary") {
            showView("B"); // View B 표시
        } else if (value === "university") {
            showView("C"); // View C 표시
        } else if (value === "academy") {
            showView("D"); // View D 표시
        } else if (value === "middle") {
            showView("B_1"); // View B_1 표시
        } else if (value === "high") {
            showView("B_2"); // View B_1 표시
        }
    });

    return div4;
}
// 특정 뷰를 표시하는 함수
function showView(viewName) {
    app.innerHTML = ""; // 기존 콘텐츠 비우기
    const views = {
        A: createViewA,
        B: createViewB,
        C: createViewC,
        D: createViewD,
        B_1: createViewB_1,
        B_2: createViewB_2,
    };

    const viewFunction = views[viewName];
    if (viewFunction) {
        app.appendChild(viewFunction());
    }
}

// Add 버튼 클릭 시 View A 표시
addButton.addEventListener("click", () => {
    addButton.style.display = "none";
    modifyElement.style.display = "none";
    resumeList.style.display = "none";
    showView("A"); // View A 표시
});

// 수정 버튼 클릭시
evtEditItem.addEventListener("click", () => {
    addButton.style.display = "none";
    modifyElement.style.display = "none";
    resumeList.style.display = "none";
    // 사용자가 전에 입력했던 거 가져와야 함
    showView("C"); // View A 표시
});

// 1. Typo SizeL input 요소들에 실시간 입력 이벤트 위임
document.addEventListener("input", (event) => {
    if (event.target.matches("input.Typo.SizeL.check")) {
        const input = event.target;
        if (!input.value.trim()) {
            input.classList.add("Invalid"); // 값이 비어있으면 Invalid 추가
        } else {
            input.classList.remove("Invalid"); // 값이 있으면 Invalid 제거
        }
    }
    if (
        event.target.matches(".Typo.SizeL.onlyNumber.DatePic.datePicker.check")
    ) {
        const input = event.target;
        if (!input.value.trim()) {
            input.classList.add("Invalid"); // 값이 비어있으면 Invalid 추가
        } else {
            input.classList.remove("Invalid"); // 값이 있으면 Invalid 제거
        }
    }
});

// 2. InpBox SizeL item_s 내부 select 요소들에 실시간 변경 이벤트 위임
document.addEventListener("change", (event) => {
    if (event.target.matches(".InpBox.SizeL.item_s.check select")) {
        const selectElement = event.target;
        const closestInpBox = selectElement.closest(".InpBox.SizeL.item_s");

        if (selectElement.value === "") {
            // 값이 선택되지 않은 경우 Invalid 추가
            if (closestInpBox) closestInpBox.classList.add("Invalid");
        } else {
            // 값이 선택된 경우 Invalid 제거
            if (closestInpBox) closestInpBox.classList.remove("Invalid");
        }
    }
});

// 동적 취소 버튼 이벤트 처리
document.addEventListener("click", (event) => {
    // 체크박스 상태 설정
    const checkboxN = document.getElementById("qualificationN");
    const checkboxY = document.getElementById("qualificationY");

    // 항상 초기 상태로 설정
    if (checkboxN) checkboxN.checked = false; // 첫 번째 체크박스: 항상 해제
    if (checkboxY) checkboxY.checked = true; // 두 번째 체크박스: 항상 선택

    if (event.target.classList.contains("evtLayerClose")) {
        const resumeEdit = event.target.closest(".resume_edit");
        // if (resumeEdit) resumeEdit.remove();
        if (resumeEdit) resumeEdit.style.display = "none";
        restoreUI(); // UI 상태 복원
    }

    // 버튼에 클릭 이벤트 추가
    if (event.target.classList.contains("evtLayerSave")) {
        // 1. Typo SizeL 클래스가 있는 input 요소들 검사
        const typoInputs = document.querySelectorAll("input.Typo.SizeL.check");
        typoInputs.forEach((input) => {
            if (!input.value.trim()) {
                // 값이 비어있을 경우
                input.classList.add("Invalid"); // input에 Invalid 추가
            } else {
                input.classList.remove("Invalid"); // 값이 있으면 Invalid 제거
            }
        });

        // 2. InpBox SizeL item_s 내부의 select 요소들 검사
        const inpBoxSelects = document.querySelectorAll(
            ".InpBox.SizeL.item_s.check select"
        );
        inpBoxSelects.forEach((selectElement) => {
            const closestInpBox = selectElement.closest(".InpBox.SizeL.item_s");
            if (selectElement.value === "") {
                // 값이 선택되지 않은 경우
                if (closestInpBox) closestInpBox.classList.add("Invalid");
            } else {
                // 값이 선택된 경우 Invalid 제거
                if (closestInpBox) closestInpBox.classList.remove("Invalid");
            }
        });
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
