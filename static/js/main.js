$(function() {

    GAG_SLOGANS = [
        'Step right up getcha text faces here!',
        'pls no copy pasterino',
        'You came to the <em>right</em> dongerhood.',
        'All the faces, but not <em>in</em> your face.',
        'See also <a href="http://gabegaming.com">gabegaming.com</a>',
        'For best results apply directly to Twitch chat.',
        '( ͡° ͜ʖ ͡°)',
        '<em>Not</em> made in the Bay area.',
        'Suggestions welcome.',
        'Better than googling "how to make lenny face".',
        '"omg how did you make that face?"',
        '3.0!',
        'Tweet me! <a href="http://twitter.com/_notlikethis/">@_notlikethis</a>',
        'Because Googling for these things is hard.',
        'Because you\'re worth it.',
        'Mo\' faces, mo\' value.',
        'Unicooooode.',
        'Your fonts are probably broken.',
        '☑Nice meme.',
        '┬┴┬┴┤(･_├┬┴┬┴',
        '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅] Do you have change for a donger bill?',
        'Putting the ( ͡° ͜ʖ ͡°) in "comedy".',
        'ayy lmao',
        'Thanks for reading all these messages.',
        'Click me for another message!.',
        'Did you know there\'s text at the bottom of this page?',
        // >leaving the last comma
        // >js
    ];

    // Deal with bookmark cookie.
    if (!$.cookie("bookmarked")) {
        $.cookie("bookmarked", "yep", {
            // In the distant future, textfac.es falls into complete chaos when everyone's cookies expire. Only one white man has the courage to face the chaos. Coming this summer: Cookie Monster.
            "expires" : 10 * 365,
            "path": "/",
        });

        $('.bookmark-banner').show();
    }


    var $selected = $("select option:selected");
    var selectedGag = $selected.val();

    // Max number of zalgo marks to add to each character.
    var zalgoStrength = 1;

    var identity = function(s) { return s; };
    var charFunctionMap = {
        "zalgo" : function(s) {
            return zalgoChar(s, zalgoStrength);
        },
        "strikethrough" : strikethroughChar,
        "gagboys" : gagBoysChar,
        "flip" : flipChar,
        "normal" : identity,
        "smallcaps" :smallCapsChar,
        "fullwidth" : fullWidthChar,
        "checkbox" : identity,
        "uncheckbox" :identity 

    }

    var sampleGagMap = {

        "zalgo" : "I probably shouldn't but just one more text fa- no. ̤Nͪo̓ ̹m̽oͅr͘e̊ THE DONGERS ma̎y͑b̊e ̧̎on̈́e̍ͩ̊ ̾m̳͉͒o̝̎r̠̀e͊̀ ̑I ̫̝͢c̝͌a̸̛̠͗n̢̼ͩ'̝͙t̀҉ ̠̣͐̎s͓̒ͥ͞to̝͉ͬ̃p̠ ̹M̆̌Ȗ͛S̥̖̼͗ͅT̛͔̪̯ͤ̓ ̈R̥̍̄̓͝A̭̼͔I̶͕S̨̝͕̹̅̈́̈́͘E̷̠̖͙̗̾̄ͣ͡ ̠̣̓̅ͧ̆ͥ͡͝Ḑ̰ͪͣͥ͊͞Ò̟͕̈́͢N̫̞̖͍͎ͫͯ̕Ğ̷̭͛̍̉Ę̤͕̂R̸̯̣̟̔S̫̭̽͛̈̇ ̣̙̆͑ͩ͢A̡̚y̤̣̦̓͆̏ͩY̗̻̗̣ͦ͘͡ ̜͇̿L̹̯͐͝m͚̲͖a͙̒̆͂̒͋Ỏ̫̲͏̨̡A̡̼̹̙̣͋ͤ͂̈̔Y̶̺͖̞̲͐́y̏y̛̗͇ͨy̧͍̮̙̓̿͐ͭY͕̙ͩ̊ͮ̄͗̂̅͘Y̛͎̲ͤy̢̗ͅ҉Y͍̪͍̐̎ͧYy̷̡̭̜y̲̗̬̤ͪ͋̽̎Ỷy͓̲̱͛͡Y̻Y̭Y̻͔̓͋ ͈͙̹͈̟̽̀ͫ̽l͙ͨ̀m̛͚͆͋͋ȧ̲͓͈̊o̹̮͌͗",
        "strikethrough" : "Wow, what a great t̶w̶i̶t̶c̶h̶ ̶c̶h̶a̶t̶ ̶s̶i̶m̶u̶l̶a̶t̶o̶r̶ emoticon website!",
        "flip": "¿sǝǝɹƃǝp 081 uǝǝɹɔɐ ʎɯ ǝʇɐʇoɹ oʇ ʍoɥ ʍouʞ ǝuoʎuɐ sǝop",
        "normal" : "It's just normal text. Use it to build other gags!",
        "fullwidth" : "ＴＥＸＴＧＡＧＢＯＹＳ",
        "smallcaps" : "ɴɪᴄᴇ ᴍᴇᴍᴇ",
        "checkbox" : "(Press Enter) ☐ Not told\n☑ Told\n☑ Tolderone \n☑ Knights of the Told Republic",
        "uncheckbox" : "(Press Enter) ☐ Not told\n☑ Told\n☑ Tolderone \n☑ Knights of the Told Republic"
    }

    // Step right up getcha gags here freshly baked this morning.
    function switchSlogan() {
        var slogan = randomChoice(GAG_SLOGANS);
        $('.slogan-gag').html(slogan + ' ↺' );
    }

    function getSelectedGag() {
        return charFunctionMap[selectedGag];
    }

    function handleFlashFallback() {
        // THAT'S RIGHT, NO MORE ADOBE FLASH IF YOU HAVE A MODERN BROWSER GET HYPE.

        var $faces = $("button.facebtn");

        var clipboard = new Clipboard("button.facebtn");

        clipboard.on('success', function(e) {
            $(e.target).popover('show');

            window.setTimeout(function() {
                $faces.popover('hide');
            }, 500);

            var id = $(e.target).attr("face-id")
            $.ajax({
                url: "click",
                method: "POST",
                data : {
                    id: id
                }
            });
            e.clearSelection();
        });
    }

    function shrinkFacesToFit() {
        var colWidth = $("div.col-md-6").width();

        // Quickly resize the faces which are too wide to fit on one line before the user notices ( ͡° ͜ʖ ͡°)
        $("span.face").each(function() {
            // mfw parseInt ignores the "px"
            // mfw ['10', '10', '10', '10'].map(parseInt)
            var fontSize = parseInt($(this).css('font-size'));

            // Binary search is for suckers right now.
            while ($(this).width() >= colWidth && fontSize > 5) {
                fontSize--;
                $(this).css('font-size', fontSize.toString() + 'px');
            }

        });
    }


    function setup() {

        var faces = $("button.facebtn");

        // Initialise those popovers
        faces.popover({
            // pop pop
            content: "Copied to clipboard!",
            placement: "right"
        });
        handleFlashFallback();

        shrinkFacesToFit();
    }

    function setupTextGags() {
        var $gagTextArea = $("textarea.gag-text");
        var $sampleGag = $("p.sample-gag");
        var $copyBtn = $("button#btn-copy");
        var gagClipboard = new Clipboard($copyBtn.get(0));

        $sampleGag.text(sampleGagMap[selectedGag]);

        gagClipboard.on("success", function(event) {
            $copyBtn.text("Copied!");
            window.setTimeout(function() {
                $copyBtn.text("Copy to clipboard");
            }, 2000);
        });


        $('.slogan-gag').on('click', switchSlogan);
        $('#btn-reapply').on('click', function() {
            var gagify = getSelectedGag();
            var gagifiedText = $.map($gagTextArea.val().split(''), function(char) {
                return gagify(char);
            }).join('');
            $gagTextArea.val(gagifiedText);
            return false;
        });
        switchSlogan();

        // Oh it turns out js and browers are actually broken and strip carriage returns when you use .val(). So here's a "workaround" (hack) to fix that.
        $.valHooks.textarea = {
          get: function( elem ) {
            return elem.value.replace( /\r?\n/g, "\r\n" );
          }
        };

        $("select").change(function() {
            $selected = $("select.gags option:selected");
            selectedGag = $selected.val();
            if (selectedGag === "zalgo") {
                $("#zalgo-options").show();
                zalgoStrength = parseInt($("select.zalgo-level option:selected").val());
            }
            else if (selectedGag === "checkbox") {
                $gagTextArea.val($gagTextArea.val() + "☑ ");
            }
            else if (selectedGag === "uncheckbox") {
                $gagTextArea.val($gagTextArea.val() + "⬜ ");
            }
            else {
                $("#zalgo-options").hide();
            }

            $sampleGag.text(sampleGagMap[selectedGag]);
        });

        // Make sure the "copy" button doesn't actually submit the form.
        $copyBtn.click(function() {
            return false;
        });

        // Catch the keypress, and modify the character before it hits the text box
        $gagTextArea.bind("keypress", function(event) {

            if (event.which == 13) {
                event.preventDefault();
                if (selectedGag === "checkbox") {
                    $gagTextArea.val($gagTextArea.val() + "\n☑ ");
                }
                else if (selectedGag === "uncheckbox") {
                    $gagTextArea.val($gagTextArea.val() + "\n☐");
                }

                // If we're doing newline hackery, return false, otherwise let the enter keypress go through
                if ((selectedGag === "checkbox" || selectedGag === "uncheckbox")) {
                    return false;
                }
            }

            // Get the gag that's selected
            var gagify = getSelectedGag();
            var char = String.fromCharCode(event.which);
            if (selectedGag === "flip") {
                $gagTextArea.val(gagify(char) + $gagTextArea.val());
            }
            else {
                $gagTextArea.val($gagTextArea.val() + gagify(char));
            }
            return false;

        });


    }

    setup();
    setupTextGags();
    console.log("( ͡° ͜ʖ ͡°)") // ayy lmao
});

