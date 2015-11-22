
$(function() {
    var LOADING_GAGS = [
        "Sending your shirt through internet tubes....",
        "DansGame kappa kappa",
        "Checking meme quality....",
        "Informing the NSA ( ͡° ͜ʖ ͡°)",
        "Trying to straighten the spinning circle up there....",
        "I wish computers could drink coffee, 'cause I'm running out of steam",
        "Verifying face with World Wide Text Face Consortium....",
        "Whizzing along the information super highway....",
        "Reticulating splines....",
        "(▀̿Ĺ̯▀̿ ̿) sup",
        "Doing the magic....",
        "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",
        "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅] got change for a donger bill?",
        "| (• ◡•)| (❍ᴥ❍ʋ) <--- copyright-abiding Adventure Pals",
        "┬┴┬┴┤(･_├┬┴┬┴ hey kid wanna buy a t-shirt",
        "(•_•) ( •_•)>⌐■-■ (⌐■_■) LET'S ROLL",
        "( ಠ ͜ʖರೃ) just a moment, fine person!",
        "Our elves are furiously carrying your order to the shirt-makers....",
        "Writing some more of these gags....",
        "These are kinda hard to read huh, especially when they're really really long like this one is.",
        "Hold on a sec....",
        "Just a minute....",
        "This should take about 10 seconds....",
        "Phew, this is hard work!",
        "Zipping....",
        "Zapping....",
        "Whoa, that spinning circle sure is wobbly",
        "Wake up make memes sleep repeat",
        "You gotta admit that this is pretty cool",
        "No wait I don't want to go back down help m-",
        "I feel like a piece of toast popping right now",
        "Oh hey there what's u- oh I guess I gotta go now bye!",
        "Sorry, this hardly ever takes this long....",
        "Going as fast as we can....",
        "Uploading to SkyNet...",
        "Never giving you up....",
        "Generating you a shirt....",
        "Downloading more RAM....",
        "'Making the world a better place'",
        "Installing malware just kidding",
        "Asking the Internet to make you a shirt....",
        "So anyway what are you doing later",
        "Elephant backwards is gullible",
        "Shirts are 99% virus free!",
        "This might take a sec...",
        "AYY LMAO"
    ];

    var LOADING_GAG_DURATION_MILLIS = 1000;

    var API_BASE_URL = "https://rapanuistore.com/api-access-point/";

    var selectedShirtColour = "White";
    var selectedFaceColour = "black";

    // The id of the current face open in a modal.
    var id = "";

    var $loadingGag = $("div.loading-gag");
    var faces = $("button.facebtn");
    var previewShirt = $("img.custom-shirt-preview");

    // hi every1 my name is katy nd as u can see i am quite random! *holds up spork*
    function randomChoice(list) {
        // ... I can't believe I have to implement this.
        return list[Math.floor(Math.random() * list.length)];
    }
    function randInt (min, max) {
        return Math.floor((Math.random() * max)) + min;
    }

    function switchLoadingGag() {
        // Call itself again when it's time to switch to a new gag.
        $loadingGag.slideUp()

        // Change the gag, and slide it back up.
        window.setTimeout(function() {
            $loadingGag.children("p").text(randomChoice(LOADING_GAGS));
            $loadingGag.slideDown();

        }, 500);

        // Then call this function again.
        window.setTimeout(switchLoadingGag, 1000);
    }

    function showSpinner() {
        $("div.overlay").show();
        $("div.spinner").show();

    }

    function setFaceImageColour(id, colour) {

        var image_url = window.location.protocol + "//" + window.location.host + "/shirtimage/" + id + "/" + colour;

        // Set the modal image to be the image for this face.
        $("div.face-preview").html('<img class="face-preview" src="' + image_url + '"/>');
    }

    faces.click(function() {

        // Store which face we have open.
        id = $(this).attr("face-id");

        // Set foreground colour to black
        setFaceImageColour(id, "black");

        // Load the white image as well, for later.
        $.get(window.location.protocol + "//" + window.location.host + "/shirtimage/" + id + "/" + "white");

        // Set background colour to white
        $("div.modal-content").removeClass("darkbg");
        //$("#confirmModal").modal();


    });

    $("img.shirt-image").click(function() {
        previewShirt.attr("src", $(this).attr("src"));
        selectedShirtColour = $(this).attr("data-shirt-colour");
    });

    $("div.colours > img").click(function() {
        var colour = $(this).attr("data-face-colour");
        setFaceImageColour(id, colour);
        selectedFaceColour = colour;

        // Toggle the background colour
        if (colour === "white") {
            $("div.modal-content").addClass("darkbg");
        }
        else {
            $("div.modal-content").removeClass("darkbg");
        }
    });

    $("button.btn-shirt-submit").click(function() {

        showSpinner();
        switchLoadingGag();

        // Is this a hack? Probably. Don't tell MDN.
        var customise = $("this").hasClass("customise");

        var shirt_settings = {
            "shirt_colour" : selectedShirtColour,
            "face_colour": selectedFaceColour,
            "face_id": id,
            "customise": customise
        }

        var backend_url = window.location.protocol + "//" + window.location.host + "/get_shirt_url";

        $.post(backend_url, shirt_settings)
        .done(function(data) {
                window.location = data;
        });
    });

});
