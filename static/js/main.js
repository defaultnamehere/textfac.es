var faces= $("button.facebtn");

faces.popover({
    content: "Copied to clipboard!",
    placement: "right"
});

var clip = new ZeroClipboard(faces, {moviePath : "../static/js/zeroclipboard/ZeroClipboard.swf"});

clip.glue(faces);

clip.on("mousedown", function(client, args) {
    $(this).popover('toggle');
    var id = $(this).attr("face-id")
    $.ajax("/increment?id=" + id, {
        type: "POST"
        });
});

clip.on("mouseout", function(client, args) {
    $(this).popover('hide');
    $(this).css('background-color', '');
    $(this).css('color', '#333333');
    $(this).addClass('bg-img');
});

clip.on("mouseover", function(client, args) {
    $(this).removeClass('bg-img');
    $(this).css('background-color', '#408FFF');
    $(this).css('color', '#FFFFFF');
});


// Deal with bookmark cookie.

if (!$.cookie("bookmarked")) {
    //Set the cookie.
    $.cookie("bookmarked", "yep", {
        // In the distant future, textfac.es falls into complete chaos when everyone's cookies expire. Only one man has the courage to face the chaos. Coming this summer: Cookie Monster.
        "expires" : 10 * 365 
    });

    //Show the banner.
    $('.bookmark-banner').show();
}
