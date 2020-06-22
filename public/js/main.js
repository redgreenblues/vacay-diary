$(() => {
    $(document).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(document).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    };

    // for (let i = 1; i < $('select#destination option'); i++) {
    //     if ($('select#destination option')[i].value === $('select#destination').value) { 
    //         $('select#destination option')[i].attr('selected', 'selected');
    //     }
    // }  
})