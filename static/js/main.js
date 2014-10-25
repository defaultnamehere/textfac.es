
// hi every1 my name is katy nd as u can see i am quite random! *holds up spork*
var random_choice = function(list) {
    // ... I can't believe I have to implement this.
    return list[Math.floor(Math.random() * list.length)];
}

GAG_SLOGANS = [
    'Step right up getcha text faces here!',
    'pls no copy pasterino',
    'You came to the <em>right</em> dongerhood.',
    'All the faces, but not <em>in</em> your face.',
    'See also <a href="http://gabegaming.com">gabegaming.com</a>',
    '5 million hits woo!',
    'For best results apply directly to Twitch chat.',
    'Dank memes.',
    '( ͡° ͜ʖ ͡°)',
    'Your source for empty rectangles.',
    '<em>Not</em> made in the Bay area.',
    'Changing the way we communicate (for the better?)',
    'Suggestions welcome.',
    '"omg how did you make that face?"',
    'See <a href="http://oneu.se">oneu.se</a> for my other novelty one-use websites.',
    '2.0!',
    'Tweet me! <a href="http://twitter.com/_notlikethis/">@_notlikethis</a>',
    'Because Googling for these things is hard.',
    'Because you\'re worth it.',
    'Mo\' faces, mo\' value.',
    'Unicooooode.',
    'Your fonts are probably broken.',
    'Nice meme.',
    '┬┴┬┴┤(･_├┬┴┬┴',
    '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅] Do you have change for a donger bill?',
    'Putting the ( ͡° ͜ʖ ͡°) in "comedy".',

];

var faces= $("button.facebtn");

faces.popover({
    content: "Copied to clipboard!",
    placement: "right"
});

// Here we go this is how the click to copy works. You got me, it's literally Adobe Flash.
var clip = new ZeroClipboard(faces, {moviePath : "../static/js/zeroclipboard/ZeroClipboard.swf"});
clip.glue(faces);

// TODO Why is this a POST with a GET param? Good question.
clip.on("mousedown", function(client, args) {
    $(this).popover('toggle');
    var id = $(this).attr("face-id")
    $.ajax("/increment?id=" + id, {
        type: "POST"
        });
});

clip.on("mouseout", function(client, args) {
    $(this).popover('hide');
    $(this).css('background-color', '#FFFFFF');
    $(this).css('color', '#333333');
});

faces.popover().on('hide.bs.popover', function () {
    faces.css('background-color', '#FFFFFF');
    faces.css('color', '#333333');
});

clip.on("mouseover", function(client, args) {
    $(this).css('background-color', '#408FFF');
    $(this).css('color', '#FFFFFF');
});


// Deal with bookmark cookie.
if (!$.cookie("bookmarked")) {
    $.cookie("bookmarked", "yep", {
        // In the distant future, textfac.es falls into complete chaos when everyone's cookies expire. Only one man has the courage to face the chaos. Coming this summer: Cookie Monster.
        "expires" : 10 * 365 
    });

    //Show the banner.
    $('.bookmark-banner').show();
}


// Add the random gag slogan
function switchSlogan() {
    var slogan = random_choice(GAG_SLOGANS);
    $('.slogan-gag').html(slogan + ' ↺' );
}
$('.slogan-gag').on('click', switchSlogan);
switchSlogan();

