const deleteConfirmation = () => {
    $('.deleteBtn').on('click', event => {
        const event_target = event.target;
        event.preventDefault();
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: {
                confirm: 'Confirm',
                cancel: true
            }
        }).then(result => {
            if (result) $(`#${event_target.parentNode.id}`).submit();
            else event.preventDefault();
        })
    })
}

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

    deleteConfirmation();

})