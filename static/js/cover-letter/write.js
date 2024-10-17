document
    .querySelector(".title-edit-title-tootip-btn")
    .addEventListener("mouseenter", function () {
        document.querySelector(".tooltip-tooltip").style.display = "block";
    });

document
    .querySelector(".title-edit-title-tootip-btn")
    .addEventListener("mouseleave", function () {
        document.querySelector(".tooltip-tooltip").style.display = "none";
    });

document
    .querySelector("#question-on-off")
    .addEventListener("change", function () {
        const parentDiv = this.closest(".questionedit-question-edit");
        const inputField = document.querySelector(".input-input-2");
        const questionButton = document.querySelector(
            ".questionedit-question-btn"
        );

        if (this.checked) {
            parentDiv.classList.add("questionedit-question-edit-expand");
            inputField.style.display = "block";
            questionButton.style.display = "block";
        } else {
            parentDiv.classList.remove("questionedit-question-edit-expand");
            inputField.style.display = "none";
            questionButton.style.display = "none";
        }
    });
