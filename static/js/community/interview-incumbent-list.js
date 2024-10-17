const ulElement = document.querySelector(".wrap_list_interview");

for (let i = 0; i < 9; i++) {
    const liElement = document.createElement("li");
    liElement.innerHTML = `
        <a href="/zf_user/career-information/senior-view?doc_idx=${
            24045 + i
        }&page=1" class="inlist_box">
            <p class="sub_title">
                <span class="in_subtit">브랜딩, 브랜드마케팅, 마케팅</span>
                <em class="flag_applying">채용중</em>
            </p>
            <p class="title">
                <em>브랜딩과 마케팅커뮤니케이션의 전반적인 업무를 총괄해요</em>
            </p>
            <div class="box_info">
                <div class="txt_detail">
                    <p class="company_name">에스디생명공학</p>
                    <p class="company_part">
                        <em class="inpart">마케팅팀</em>
                        <em class="inname">김리원</em>
                    </p>
                    <p class="day_line">
                        <span class="day">24.09.20</span>
                        <span class="view_count">${1011 + i}</span>
                    </p>
                </div>
                <div class="img_view">
                    <span class="img">
                        <img src="https://pds.saramin.co.kr/career-information/asset_thumbnail/202409/20/sk3ns4_ffxp-2so1pr_asset.png" 
                        alt="직무인터뷰 관계자 사진" />
                    </span>
                </div>
            </div>
        </a>
    `;

    ulElement.appendChild(liElement);
}

const categoryItems = document.querySelectorAll(".list_category li");

categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
        categoryItems.forEach((el) => el.classList.remove("on"));

        item.classList.add("on");
    });
});
