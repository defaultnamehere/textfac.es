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
    $.ajax("/increment?id=" + id);
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
