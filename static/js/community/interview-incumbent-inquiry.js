const shareButton = document.querySelector(".btn_share");
const shareList = document.querySelector(".list_share");

shareButton.addEventListener("mouseenter", () => {
    shareList.classList.add("visible");
});

shareList.addEventListener("mouseleave", () => {
    shareList.classList.remove("visible");
});

shareButton.addEventListener("mouseleave", (e) => {
    if (!shareList.contains(e.relatedTarget)) {
        shareList.classList.remove("visible");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("job-list");

    for (let i = 0; i < 3; i++) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td class="notification_info">
                <div class="job_tit">
                    <a class="str_tit" title="재무회계 과장급 채용"
                       href="/zf_user/jobs/relay/view?view_type=etc&rec_idx=49214578"
                       target="_blank"
                       onmousedown="try{n_trackEvent('public', 'job-interview' , 'view_company', '');}catch(e){}">
                        <span>재무회계 과장급 채용</span>
                    </a>
                 <a 
                    title="스크랩" 
                    style="cursor: pointer" 
                    onmousedown="try{n_trackEvent('public', 'job-interview', 'scrap_company', '');}catch(e){}" 
                    rec_idx="49214578" 
                    imgtype="default" 
                    class="btn_scrap" 
                    scraped="n">
                    <img src="https://www.saraminimage.co.kr/common/bul_sri_star.png" alt="스크랩 버튼">
                </a>

                </div>
                <div class="job_sector">
                    <span>재무회계 </span>
                    <span>추가 1</span>
                    <span>추가 2</span>
                </div>
            </td>
            <td class="recruit_condition">
                <p class="career">경력 7년↑</p>
                <p class="education">대학교(4년)↑</p>
            </td>
            <td class="company_info">
                <p class="employment_type">정규직</p>
                <p class="work_place">서울 강서구</p>
            </td>
            <td class="support_info">
                <p class="deadlines">채용시</p>
                <p class="support_type">
                    <button class="sri_btn_xs" title="클릭하면 입사지원할 수 있는 창이 뜹니다."
                        onclick="try{quickApplyForm('49214578','','t_category=pc_job_interview&t_content=company', ''); return false;} catch (e) {}; return false;"
                        onmousedown="try{n_trackEvent('apply','list','quick_apply');}catch(e){}">
                        <span class="sri_btn_immediately">입사지원</span>
                    </button>
                </p>
            </td>
        `;

        tbody.appendChild(tr);
    }
});

const tbody = document.getElementById("job-list");

tbody.addEventListener("click", (event) => {
    const target = event.target.closest(".btn_scrap");

    if (target) {
        const img = target.querySelector("img");
        const scraped = target.getAttribute("scraped");

        if (scraped === "n") {
            img.src =
                "https://www.saraminimage.co.kr/common/bul_sri_star_on.png";
            target.setAttribute("scraped", "y");
        } else {
            img.src = "https://www.saraminimage.co.kr/common/bul_sri_star.png";
            target.setAttribute("scraped", "n");
        }
    }
});
