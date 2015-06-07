$(function() {

    GAG_SLOGANS = [
        'Step right up getcha text faces here!',
        'pls no copy pasterino',
        'You came to the <em>right</em> dongerhood.',
        'All the faces, but not <em>in</em> your face.',
        'See also <a href="http://gabegaming.com">gabegaming.com</a>',
        '10 million hits woo!',
        'For best results apply directly to Twitch chat.',
        '( ͡° ͜ʖ ͡°)',
        '<em>Not</em> made in the Bay area.',
        'Suggestions welcome.',
        'Better than googling "how to make lenny face".',
        '"omg how did you make that face?"',
        'See <a href="http://oneu.se">oneu.se</a> for my other novelty one-use websites.',
        '2.0!',
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
        'Now with HTTPS! (The S stands for secure ( ͡° ͜ʖ ͡°))',
        // >leaving the last comma
        // >js
    ];

    var $selected = $("select option:selected");
    var selectedGag = $selected.val();

    // Max number of zalgo marks to add to each character.
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
        "fullwidth" : fullWidthChar,
        "checkbox" : function(s) { return s; },
        "uncheckbox" : function(s) { return s; }

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

    function setup() {
        var faces = $("button.facebtn");
        var clip = new ZeroClipboard(faces, {moviePath : "../static/js/zeroclipboard/ZeroClipboard.swf"});
        var $gagTextArea = $("textarea.gag-text");
        var $copyBtn = $("button#btn-copy");
        var textGagsClip = new ZeroClipboard($copyBtn, {moviePath : "../static/js/zeroclipboard/ZeroClipboard.swf"});
        var $sampleGag = $("p.sample-gag");
        $sampleGag.text(sampleGagMap[selectedGag]);

        // FAQ hackery
        $("h4.faq").click(function() {
            console.log("clicked");
            console.log($(this).next());
            $(this).next().toggleClass("hidden");
        });

        // Here we go this is how the click to copy works. You got me, it's literally Adobe Flash.
        // Please, if you know a better cross-browser way to do this, let me know @_notlikethis.
        clip.glue(faces);
        textGagsClip.glue($copyBtn);

        // Initialise those popovers
        faces.popover({
            // pop pop
            content: "Copied to clipboard!",
            placement: "right"
        });


        textGagsClip.on('mousedown', function() {
            $copyBtn.text("Copied!");
            window.setTimeout(function() {
                $copyBtn.text("Copy to clipboard");
            }, 2000);
            $(this).popover('toggle');
        });

        function updateDataAttribute() {
            $copyBtn.attr("data-clipboard-text", $gagTextArea.val());
        }

        clip.on("mousedown", function(client, args) {
            $(this).popover('toggle');
            var id = $(this).attr("face-id")
            $.ajax("/click", {
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
                "expires" : 10 * 365,
                "path": "/",
                "secure": true // mfw this isn't the default
            });

            //Show the banner.
            $('.bookmark-banner').show();
        }

        $('.slogan-gag').on('click', switchSlogan);
        $('#btn-reapply').on('click', function() {
            var gagify = getSelectedGag();
            var gagifiedText = $.map($gagTextArea.val().split(''), function(char) {
                return gagify(char);
            }).join('');
            $gagTextArea.val(gagifiedText);
            updateDataAttribute();
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
                    updateDataAttribute();
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
            updateDataAttribute()
            return false;

        });

        var stringAfterHash = window.location.hash.substr(1);
        if (["textgags", "faces"].indexOf(stringAfterHash) !== -1) {
            $('a[href="#' + stringAfterHash + '"]').tab('show')
        }

    }
    setup();
    console.log("( ͡° ͜ʖ ͡°)") // ayy lmao
});

