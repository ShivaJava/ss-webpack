import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel'
import 'bootstrap';

export default function initApp() {

    let root = {
       $win  : $(window),
       $doc  : $(document),
       $body : $("html, body")
    }

    // Header
    var $header = $('.app-header');
    var scrollHeader = function() {
        if(root.$win.scrollTop() >= 100) {
            $header.addClass('app-header--scrolled');
            return;
        }
        else {
            $header.removeClass('app-header--scrolled');
        }
    }
    root.$win.on('scroll', scrollHeader);

    // Sert slider
    var $sertSlider = $('#sertSlider');
    var $productsSlider = $('#productsSlider');
    var slickOptions = {
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    };

    $sertSlider.slick(slickOptions);
    $productsSlider.slick(slickOptions);
}


