document.addEventListener("DOMContentLoaded", function () {
    const tabBox = document.querySelector(".TabBox");

    if (tabBox) {
        tabBox.addEventListener("click", function (event) {
            const clickedButton = event.target.closest(".BtnType");

            if (clickedButton) {
                console.log("Clicked button:", clickedButton);
                console.log("Parent li:", clickedButton.parentElement);

                // 모든 li에서 Select 클래스 제거
                document.querySelectorAll(".TabBox li").forEach((li) => {
                    li.classList.remove("Select");
                });

                // 클릭된 버튼의 부모 li에 Select 클래스 추가
                clickedButton.parentElement.classList.add("Select");

                // 로딩 화면 보이기
                const loadingDiv = document.getElementById("ingRecruitLoading");
                if (loadingDiv) {
                    loadingDiv.style.display = "block";

                    // 공고 데이터 불러오는 시간 시뮬레이션 ()
                    setTimeout(() => {
                        loadingDiv.style.display = "none";
                    }, 300);
                }
            }
        });
    }
});
