import $ from 'jquery';
import 'bootstrap';

export default function initApp() {

    let root = {
       $win  : $(window),
       $doc  : $(document),
       $body : $("html, body")
    }

    var $header = $('.app-header');

    var scrollHeader = function() {
        console.log('Scroll')
    }

    root.$win.on('scroll', function() {
        if(root.$win.scrollTop() >= 100) {
            $header.addClass('app-header--scrolled');
            return;
        }
        else {
            $header.removeClass('app-header--scrolled');
        }

    })

    //
    // (function({ $win }) {
    //
    //
    // })(root);
}


