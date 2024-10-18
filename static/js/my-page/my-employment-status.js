const btn = document.querySelector(".question .btn");
const qaSection = document.querySelector(".question .qa");
const questionContainer = document.querySelector(".question");

btn.addEventListener("click", () => {
    questionContainer.classList.toggle("open");
    qaSection.style.display = questionContainer.classList.contains("open")
        ? "block"
        : "none";
});

document.addEventListener("DOMContentLoaded", () => {
    const applicantHistoryBtns = document.querySelectorAll(".btn_history");

    applicantHistoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("rotate");

            console.log(`After: ${btn.classList}`);
        });
    });
});

const hideButton = document.getElementById("list_hide_btn");
const tipContent = document.querySelector(".TipCont.TopLeft");

tipContent.style.display = "none";

hideButton.addEventListener("mouseover", () => {
    tipContent.style.display = "block";
});

hideButton.addEventListener("mouseout", () => {
    tipContent.style.display = "none";
});

const applyData = [
    // {
    //     id: 1,
    //     date: "2024.10.17 16:42",
    //     company: "마린웍스㈜",
    //     position: "플랫폼 서비스 개발",
    //     description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
    //     status: "지원완료",
    //     viewStatus: "미열람",
    // },
    // {
    //     id: 2,
    //     date: "2024.10.17 16:42",
    //     company: "마린웍스㈜",
    //     position: "플랫폼 서비스 개발",
    //     description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
    //     status: "지원취소",
    //     viewStatus: "미열람",
    // },
    // {
    //     id: 3,
    //     date: "2024.10.17 16:42",
    //     company: "마린웍스㈜",
    //     position: "플랫폼 서비스 개발",
    //     description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
    //     status: "지원대기",
    //     viewStatus: "열람",
    // },
];

const listContainer = document.querySelector(".list_status");
const pageBox = document.querySelector(".PageBox");

if (applyData.length > 0) {
    applyData.forEach((data) => {
        const row = document.createElement("div");
        row.classList.add("row", "_apply_list", "open");
        row.id = `apply_list_${data.id}`;

        row.innerHTML = `
            <div class="InpBox">
                <span class="Chk Hide">
                    <input type="checkbox" id="chk_${data.id}" value="${data.id}" class="_recruitapply_chk checkbox_idx" />
                    <label class="Lbl" for="chk_${data.id}">선택</label>
                </span>
            </div>
            <div class="col_date">${data.date}</div>
            <div class="col_summary">
                <strong class="corp">
                    <a href="#" target="_blank">${data.company}</a>
                </strong>
                <div class="recruit">
                    <a href="#" target="_blank">
                        <span class="division">${data.position}</span>
                        <div class="TipBox">
                            <span>${data.description}</span>
                        </div>
                    </a>
                </div>
                 <div class="attached">
                                                <button
                                                    type="button"
                                                    class="data _file_down_resume"
                                                   "
                                                >
                                                    이수증 다운받기
                                                </button>
                                            </div>
                                            <div class="status">
                                                <em class="txt_status">
                                                    ${data.status}
                                                </em>
                                                <span class="txt_sub"
                                                    >${data.viewStatus}</span
                                                >
                                                <button
                                                    type="button"
                                                    class="btn_report _ai_report"
                                                  "
                                                >
                                                    경쟁력분석
                                                </button>
                                            </div>
            </div>
            <div class="col_btns">
                <div class="action"><span class="date_end"></span></div>
                <button type="button" class="BtnType SizeM _apply_cancel">지원취소</button>
                <button type="button" class="btn_history _applicant_history" data-id="${data.id}">지원내역</button>
            </div>
            <div class="col_history" id="history_${data.id}" style="display: none;">
                <ol class="timeline">
                    <li class="now">
                        <span class="date">${data.date}</span>
                        <span class="desc">
                            <strong>지원 완료</strong>
                            <span>지원서류<button type="button" class="txt" onclick="viewApplyResume(${data.id}, 'print');">이력서</button></span>
                            <span>지원 완료<button type="button" class="txt" onclick="cancelLayer('.cancel_layerWrap', 'on', '${data.company}', ${data.id});">지원 취소</button></span>
                        </span>
                    </li>
                </ol>
            </div>
        `;

        listContainer.appendChild(row);
    });

    document.querySelectorAll(".btn_history").forEach((button) => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            const history = document.getElementById(`history_${id}`);
            history.style.display =
                history.style.display === "block" ? "none" : "block";
        });
    });
} else {
    listContainer.innerHTML = `
         <form name="list_form_no_row" id="list_form_no_row">
                                <div class="list_status">
                                    <div class="no_row">
                                        <p class="txt">
                                            <b>입사지원 내역이 없어요</b>
                                            userName님에게 맞는 공고를
                                            소개해줄게요!
                                        </p>
                                        <a
                                            href=""
                                            class="link_go"
                                            >나에게 맞는 공고 보러가기</a
                                        >
                                    </div>
                                </div>
                            </form>
    `;
    pageBox.style.display = "none";
}

const selectAll = document.getElementById("selectAll");
const individualCheckboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox_idx'
);

// 전체선택 체크박스 클릭 이벤트
selectAll.addEventListener("change", () => {
    const isChecked = selectAll.checked;
    individualCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

// 개별 체크박스 상태 변경 이벤트
individualCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const allChecked = Array.from(individualCheckboxes).every(
            (cb) => cb.checked
        );
        selectAll.checked = allChecked;
    });
});
// 로직입니다!
// 모든 개별 체크박스에 대해 반복하면서 이벤트 리스너를 등록
// 각 개별 체크박스에 'change' 이벤트 리스너를 등록
// 모든 개별 체크박스가 선택되었는지 확인
// 각 체크박스가 체크된 상태인지 확인
// 전체 선택 체크박스의 상태를 업데이트
// 모든 체크박스가 체크된 경우 전체 선택 체크박스도 체크됨
// 하나라도 체크 해제된 경우 전체 선택 체크박스도 해제됨
