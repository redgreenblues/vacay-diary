const dateFormatter = date => {
    let monthNames = ['January', 'February', 'March', 'April',  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
    let day = new Date(date).getDate();
    let month = monthNames[new Date(date).getMonth()];
    let year = new Date(date).getFullYear();

    return `${day} ${month} ${year}`;
};

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
    }

   
})