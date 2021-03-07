import $ from 'jquery';
window.$ = window.jQuery = $;
import 'slick-carousel'
// import 'bootstrap';

export default function initApp() {

    let root = {
       $win  : $(window),
       $doc  : $(document),
       $body : $([document.documentElement, document.body])
    }

    // Utils
    var $anchorLinks = $('.anchor-link');
    $anchorLinks.on('click', function(event) {
        event.preventDefault();
        var $target = $(event.target);
        scrollToAchor($target);
    })

    function scrollToAchor($target) {
        if(!$target) return;
        if($target.attr('href') === '#' || $target.attr('href') === '/') return;
        var $anchor = $($target.attr('href'));
        root.$body.animate({
            scrollTop: $anchor.offset().top - 60
        }, 2000);
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

    // Menu
    var $menuToggler = $('.app-header__navbar-toggler');
    var $menu = $('.app-menu');
    var $menuNav = $('.app-menu__nav');

    function toggleMenu() {
        root.$body.toggleClass('modal-open');
        $menu.fadeToggle(150);
        $menuNav.toggleClass('app-menu__nav--open');
    }

    $menuToggler.on('click', toggleMenu);
    $menu.on('click', function(event) {
        var $target = $(event.target);
        if(!!$target.closest('.app-menu__nav').length && !$target.is($anchorLinks)) return;
        toggleMenu();
        if($target.is($anchorLinks)) scrollToAchor($target);
    });

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

    // Calc
    function calc() {

        var $result = $('#result');
        var $error  = $('#error');
        var $resultValue = $('#result-value');

        var total = [null, null, null];
        var vars = ['place', 'square', 'room'];
        var square = [
            [
                '23000',
                '46000',
                '69000',
                '92000'
            ],
            [
                '25100',
                '50200',
                '75300',
                '104000'
            ]
        ];

        $result.hide();

        $(document).on('change', '#service', function() {

            var thisValue = $(this).val();

            if( !thisValue ) {

                $('#square').attr('disabled', true);

            } else {

                $('#square').attr('disabled', false);

                for (var i = square[thisValue-1].length; i > 0; i--) {
                    document.getElementById("square").options[i].value = square[thisValue-1][i-1];
                }
            }
        });

        //////////////////////////////

        $(document).on('change', '.form-select', function() {

            for (var i = 0; i < vars.length; i++) {

                var e   = document.getElementById(vars[i]);
                var val = e.options[e.selectedIndex].value;

                if ( !val ) {
                    total[i] = null;
                } else {
                    total[i] = val;
                }
            }


            if ( document.getElementById("service").selectedIndex === 0 ) {
                total[1] = null;
            }


            var check = 0;

            for (var i = 0; i < total.length; i++) {
                if ( total[i] !== null ) {
                    check = check + parseInt(total[i]);
                } else {
                    check = 0;
                    break;
                }
            }

            if ( check !== 0 ) {
                if ( Number.isInteger(parseInt(check)) ) {
                    $result.show();
                    $resultValue.html(check);
                    $error.addClass('d-none').removeClass('d-flex');
                }
            } else {
                $result.hide();
                $error.removeClass('d-none').addClass('d-flex');
            }

        });
    }
    calc();

    setTimeout(function(){
        var elem = document.createElement('script');
        elem.async = true;
        elem.charset = 'UTF-8';
        elem.crossorigin = 'anonymous'
        elem.id = 'check-code-pozvonim';
        elem.type = 'text/javascript';
        elem.src = '//api.pozvonim.com/widget/callback/v3/dee1d5feb09e2579682b84fd955aaea1/connect';
        document.getElementsByTagName('body')[0].appendChild(elem);
    }, 2500);
}


