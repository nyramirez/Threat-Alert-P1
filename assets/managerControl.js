$('html').mousemove(function (e) {

    var wx = $(window).width();
    var wy = $(window).height();

    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    var newx = x - wx / 2;
    var newy = y - wy / 2;

    $('span').text(newx + ", " + newy);

    $('#wrapper div').each(function () {
        var speed = $(this).attr('data-speed');
        if ($(this).attr('data-revert')) speed *= -1;
        TweenMax.to($(this), 1, { x: (1 - newx * speed), y: (1 - newy * speed) });

    });

});


$(document).ready(function () {
    $('#contaianer').css('display', 'none');
    $('#firstDiv').css('background-image', 'url(./assets/pictures/green-forest-trees.jpg)');
    $('#firstDiv').css('height', '94%');
    event.preventDefault();
    $("#btnSubmit").on("click", testIsManager);
});

$("body").on("click", "tr", function() {
    empID = parseInt($(this).attr("id"));
     findArrayID(); 
     getValues();
});