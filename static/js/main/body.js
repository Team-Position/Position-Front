window.addEventListener("changeTabMenu", function () {
    const topSwiper = $(".wrap_slides").get(0).swiper;
    if (topSwiper) {
        topSwiper.update();
        topSwiper.slideTo(0);
    } else {
        new Swiper(".wrap_slides", {
            slidesPerView: "auto",
            cssMode: true,
            observer: true,
            on: {
                init: function () {},
            },
            navigation: {
                nextEl: ".main_cont .btn_next",
                prevEl: ".main_cont .btn_prev",
            },
        });
    }
});
