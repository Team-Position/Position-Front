const selectAll = document.getElementById("selectAll");
const jobList = document.getElementById("jobList");

// 서버에서 받을 데이터
const applyData = [
    {
        id: 1,
        company: "마린웍스㈜",
        position: "플랫폼 서비스 개발",
        description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
        status: "신입 · 경력",
        education: "대학교(4년)↑",
        employmentType: "정규직",
        location: "서울 종로구",
        deadline: "~ 10/21(월)",
    },
    {
        id: 2,
        company: "테크빌리지",
        position: "AI 연구 개발",
        description: "머신러닝 및 딥러닝 모델 개발",
        status: "경력",
        education: "대학교(4년)↑",
        employmentType: "계약직",
        location: "서울 강남구",
        deadline: "~ 10/21(월)",
    },
    {
        id: 3,
        company: "테크빌리지",
        position: "AI 연구 개발",
        description: "머신러닝 및 딥러닝 모델 개발",
        status: "경력",
        education: "대학교(4년)↑",
        employmentType: "계약직",
        location: "서울 강남구",
        deadline: "~10/24(수)",
    },
];

const replyData = [
    {
        id: 1,
        company: "마린웍스㈜ 댓글 데이터",
        position: "플랫폼 서비스 개발",
        description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
        status: "신입 · 경력",
        education: "대학교(4년)↑",
        employmentType: "정규직",
        location: "서울 종로구",
        deadline: "~ 10/21(월)",
    },
    {
        id: 1,
        company: "마린웍스㈜ 댓글 데이터",
        position: "플랫폼 서비스 개발",
        description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
        status: "신입 · 경력",
        education: "대학교(4년)↑",
        employmentType: "정규직",
        location: "서울 종로구",
        deadline: "~ 10/21(월)",
    },
    {
        id: 1,
        company: "마린웍스㈜ 댓글 데이터",
        position: "플랫폼 서비스 개발",
        description: "IoT, 제어, 빅데이터 및 C# 기반 어플리케이션 개발자 채용",
        status: "신입 · 경력",
        education: "대학교(4년)↑",
        employmentType: "정규직",
        location: "서울 종로구",
        deadline: "~ 10/21(월)",
    },
];

// 동적으로 공고 리스트 생성
applyData.forEach((data) => {
    const li = document.createElement("li");
    li.className = "row recruit_summary_basic";
    li.innerHTML = `
    <div class="InpBox scrap_check">
      <span class="Chk Hide">
        <input type="checkbox" id="recruit_check_${data.id}" class="idx_chk checkbox_idx" value="${data.id}" />
        <label class="Lbl" for="recruit_check_${data.id}">선택</label>
      </span>
    </div>
    <div class="col_corp type02">
      <a target="_blank" id="${data.id}" class="relay-recruit-view relay-recruit-data">
        ${data.company}
      </a>
    </div>
    <div class="col_informs">
      <strong class="tit">
        <a href="/zf_user/jobs/relay/recruit-view?view_type=read_jobs&rec_idx=${data.id}" target="_blank">
          ${data.description}
        </a>
      </strong>
      <button class="like_btn scrap-${data.id}" scraped="n" rec_idx="${data.id}">
        <span class="blind">찜하기 버튼</span>
      </button>
      <ul class="inform">
        <li>${data.status}</li>
        <li>${data.education}</li>
        <li>${data.employmentType}</li>
        <li>${data.location}</li>
      </ul>
    </div>
    <div class="col_relation">
      <p class="reason">내 선호조건과 비슷</p>
      <span class="data">
        <strong class="point">${data.location} X IT개발·데이터</strong>
      </span>
    </div>
    <div class="col_btns">
      <button class="sri_btn_ml">
        <span class="sri_btn_immediately">입사지원</span>
      </button>
      <span class="date">
        ${data.deadline}
      </span>
    </div>
  `;
    jobList.appendChild(li);
});

const replyTab = document.getElementById("replyTab");
const postTab = document.getElementById("postTab");

function renderList(data) {
    jobList.innerHTML = "";
    data.forEach((item) => {
        const li = document.createElement("li");
        li.className = "row recruit_summary_basic";
        li.innerHTML = `
      <div class="InpBox scrap_check">
        <span class="Chk Hide">
          <input type="checkbox" id="recruit_check_${item.id}" class="idx_chk checkbox_idx" value="${item.id}" />
          <label class="Lbl" for="recruit_check_${item.id}">선택</label>
        </span>
      </div>
      <div class="col_corp type02">
        <a target="_blank" id="${item.id}" class="relay-recruit-view relay-recruit-data">
          ${item.company}
        </a>
      </div>
      <div class="col_informs">
        <strong class="tit">
          <a href="#" target="_blank">${item.description}</a>
        </strong>
        <ul class="inform">
          <li>${item.status}</li>
          <li>${item.education}</li>
          <li>${item.employmentType}</li>
          <li>${item.location}</li>
        </ul>
      </div>
      <div class="col_relation">
        <p class="reason">내 선호조건과 비슷</p>
        <span class="data">
          <strong class="point">${item.location} X IT개발·데이터</strong>
        </span>
      </div>
      <div class="col_btns">
        <button class="sri_btn_ml">
          <span class="sri_btn_immediately">입사지원</span>
        </button>
        <span class="date">
        ${item.deadline}
        </span>
      </div>
    `;
        jobList.appendChild(li);
    });
}

// 찜하기 버튼(스크랩) 클릭 이벤트
jobList.addEventListener("click", (event) => {
    if (event.target.closest(".like_btn")) {
        const button = event.target.closest(".like_btn");
        const isScraped = button.getAttribute("scraped") === "y";
        button.setAttribute("scraped", isScraped ? "n" : "y");
        button.classList.toggle("active");
        console.log(`스크랩 상태: ${isScraped ? "해제" : "등록"}`);
    }
});

// 전체 선택 체크박스 로직
const individualCheckboxes = document.querySelectorAll(
    'input[type="checkbox"].checkbox_idx'
);

selectAll.addEventListener("change", () => {
    const isChecked = selectAll.checked;
    individualCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
});

individualCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const allChecked = Array.from(individualCheckboxes).every(
            (cb) => cb.checked
        );
        selectAll.checked = allChecked;
    });
});
const tabBox = document.querySelector(".TabBox");

const setActiveTab = (selectedTab) => {
    const tabs = tabBox.querySelectorAll("li");

    // 모든 탭에서 .Select 클래스 제거
    tabs.forEach((tab) => tab.classList.remove("Select"));

    // 선택된 탭에 .Select 클래스 추가
    selectedTab.parentElement.classList.add("Select");
};

replyTab.addEventListener("click", () => {
    renderList(replyData);
    setActiveTab(replyTab);
});
postTab.addEventListener("click", () => {
    renderList(applyData);
    setActiveTab(postTab);
});
