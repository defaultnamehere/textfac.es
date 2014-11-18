

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

var $selected = $("select option:selected");
var selectedGag = $selected.val();
var zalgoStrength = 1;
var charFunctionMap = {
    "zalgo" : function(s) {
        return zalgoChar(s, zalgoStrength);
    },
    "strikethrough" : strikethroughChar,
    "gagboys" : gagBoysChar,
    "flip" : flipChar,
    "normal" : function(s) { return s; },
    "smallcaps" :smallCapsChar,
    "fullwidth" : fullWidthChar
}

// Step right up getcha gags here freshly baked this morning.
function switchSlogan() {
    var slogan = randomChoice(GAG_SLOGANS);
    $('.slogan-gag').html(slogan + ' ↺' );
}

function getSelectedGag() {
    return charFunctionMap[selectedGag];
}

function setup() {
    var faces = $("button.facebtn");
    var clip = new ZeroClipboard(faces, {moviePath : "../static/js/zeroclipboard/ZeroClipboard.swf"});
    var $gagTextArea = $('textarea.gag-text');

    // Initialise those popovers
    faces.popover({
        // pop pop
        content: "Copied to clipboard!",
        placement: "right"
    });

    // Here we go this is how the click to copy works. You got me, it's literally Adobe Flash.
    // Please, if you know a better cross-browser way to do this, let me know @_notlikethis.
    clip.glue(faces);

    // TODO Why is this a POST with a GET param? Good question.
    clip.on("mousedown", function(client, args) {
        $(this).popover('toggle');
        var id = $(this).attr("face-id")
        $.ajax("/increment?id=" + id, {
            type: "POST"
            });
    });

    clip.on("mouseout", function() {
        $(this).popover('hide');
    });

    // Deal with bookmark cookie.
    if (!$.cookie("bookmarked")) {
        $.cookie("bookmarked", "yep", {
            // In the distant future, textfac.es falls into complete chaos when everyone's cookies expire. Only one white man has the courage to face the chaos. Coming this summer: Cookie Monster.
            "expires" : 10 * 365 
        });

        //Show the banner.
        $('.bookmark-banner').show();
    }

    $('.slogan-gag').on('click', switchSlogan);
    $('#btn-reapply').on('click', function() { return false; });
    switchSlogan();
    // Oh it turns out js and browers are actually broken and strip carriage returns when you use .val(). So here's a "workaround" (hack) to fix that.
    $.valHooks.textarea = {
      get: function( elem ) {
        return elem.value.replace( /\r?\n/g, "\r\n" );
      }
    };

    $("select").change(function() {
        var $selected = $("select.gags option:selected");
        selectedGag = $selected.val();
        if (selectedGag == "zalgo") {
            $("#zalgo-options").show();
            zalgoStrength = parseInt($("select.zalgo-level option:selected").val());
        }
        else {
            $("#zalgo-options").hide();
        }
    });

    // Catch the keypress, and modify the character before it hits the text box
    $gagTextArea.bind("keypress", function(event) {
        if (event.which == 13) {
            event.preventDefault();
        }


        //TODO Symbols are broken lol

        // Get the gag that's selected
        var gagify = getSelectedGag();
        var char = String.fromCharCode(event.which);
        if (selectedGag === "flip") {
            $gagTextArea.val(gagify(char) + $gagTextArea.val());
        }
        else if (selectedGag === "fullwidth") {
            $gagTextArea.html($gagTextArea.html() + gagify(char));
        }
        else {
            $gagTextArea.val($gagTextArea.val() + gagify(char));
        }

       event.stopPropagation();
       return false;

    });
    var stringAfterHash = window.location.hash.substr(1);
    if (["textgags", "faces", "symbols"].indexOf(stringAfterHash) !== -1) {
        $('a[href="#' + stringAfterHash + '"]').tab('show')
    }

}
setup();
