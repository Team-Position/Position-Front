const category = {
    "호텔·여행·항공": [
        {
            name: "호텔",
            code: "10803",
            subCategories: ["룸서비스", "프론트", "청소"],
        },
        {
            name: "콘도",
            code: "10804",
            subCategories: ["청소", "프론트", "레스토랑"],
        },
        {
            name: "카지노",
            code: "10805",
            subCategories: ["게임운영", "보안", "고객서비스"],
        },
        {
            name: "여행사",
            code: "10806",
            subCategories: ["항공예약", "호텔예약", "투어가이드"],
        },
        {
            name: "항공사",
            code: "10807",
            subCategories: ["탑승수속", "승무원", "수하물관리"],
        },
        { name: "관광", code: "10813", subCategories: ["관광안내", "가이드"] },
        { name: "관광통역", code: "10814", subCategories: ["통역", "안내"] },
        { name: "면세점", code: "10818", subCategories: ["판매", "고객관리"] },
        {
            name: "유학·이민",
            code: "10819",
            subCategories: ["상담", "서류대행"],
        },
    ],
    "외식업·식음료": [
        {
            name: "레스토랑",
            code: "20801",
            subCategories: ["주방", "서빙", "관리"],
        },
        { name: "패스트푸드", code: "20802", subCategories: ["주방", "캐셔"] },
        { name: "카페", code: "20803", subCategories: ["바리스타", "캐셔"] },
    ],
    "레저·스포츠·여가": [
        {
            name: "골프장",
            code: "30801",
            subCategories: ["캐디", "프론트", "클럽관리"],
        },
        {
            name: "테니스장",
            code: "30802",
            subCategories: ["코트관리", "프론트"],
        },
        {
            name: "수영장",
            code: "30803",
            subCategories: ["수영강사", "안전요원"],
        },
    ],
};

// 중카테고리 클릭 시 소카테고리 표시
const displaySubSubCategory = (subCategories, targetElement) => {
    let subSubCategoryHTML = "<ul class='list-depth3'>";
    subCategories.forEach((subCat) => {
        subSubCategoryHTML += `
            <li class="item-depth3">
                <label class="sri-check small sri-radio">
                    <input
                        type="checkbox"
                        class="inp-check"
                        value="${subCat}"
                    />
                    <span class="txt-check txt-point">${subCat}</span>
                </label>
            </li>
        `;
    });
    subSubCategoryHTML += "</ul>";

    // 소카테고리를 해당 중카테고리의 .sub-depth3 내부에 삽입
    targetElement.querySelector(".sub-depth3 .sub_code_108").innerHTML =
        subSubCategoryHTML;
};

// 대분류 및 중분류 카테고리 동적 생성
const displayCategories = () => {
    let subCategoryHTML = "";
    Object.keys(category).forEach((mainCategory) => {
        subCategoryHTML += `<li class="item-depth1"><strong>${mainCategory}</strong><ul>`;

        // 중카테고리 생성
        category[mainCategory].forEach((item) => {
            subCategoryHTML += `
                <li class="item-depth2">
                    <label class="sri-check small sri-radio" for="bcode-${
                        item.code
                    }">
                        <input
                            type="radio"
                            id="bcode-${item.code}"
                            name="bcode"
                            class="inp-check"
                            value="${item.name}"
                            data-subcategories='${JSON.stringify(
                                item.subCategories
                            )}'
                        />
                        <span class="txt-check txt-point">${item.name}</span>
                    </label>
                    <div class="sub-depth3">
                        <div class="sub_code_${item.code}"></div>
                    </div>
                </li>
            `;
        });

        subCategoryHTML += `</ul></li>`;
    });

    document.getElementById("subCategory").innerHTML = subCategoryHTML;

    // 중카테고리 클릭 시 소카테고리 표시
    document
        .querySelectorAll(".sri-check input[type='radio']")
        .forEach((radio) => {
            radio.addEventListener("click", (e) => {
                const subCategories = JSON.parse(
                    e.target.getAttribute("data-subcategories")
                );
                const targetElement = e.target.closest("li"); // 클릭한 중카테고리 요소
                displaySubSubCategory(subCategories, targetElement); // 소분류 표시
            });
        });
};

// 처음 로드 시 대분류 및 중분류 카테고리 표시
displayCategories();

// 닫기 버튼 클릭 시 레이어 숨기기
document.querySelectorAll(".btn-layer-close, .btn-close").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.getElementById("layer-desire-industry").style.display = "none";
    });
});

// 선택 버튼 클릭 시 레이어 보여주기
document.querySelector(".btn-job-category").addEventListener("click", () => {
    document.getElementById("layer-desire-industry").style.display = "block";
});
