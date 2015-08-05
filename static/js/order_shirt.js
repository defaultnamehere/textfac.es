
$(function() {
    
    var LOADING_GAGS = [
        "dank",
        "memes"
    ]
    var LOADING_GAG_DURATION_MILLIS = 1000;

    var API_BASE_URL = "https://rapanuistore.com/api-access-point/";

    var selectedShirtColour = "White";
    var selectedFaceColour = "Black";

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

        // Set background colour to white
        $("div.modal-content").removeClass("darkbg");

        $("#confirmModal").modal();
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



        /* TODO uncoomment me
        $.post(backend_url, shirt_settings)
        .done(function(data) {
                window.location = data;
        });
        */
    });

    /*
        // It's fiiiiiiiiiiiiiine.

        // Get the URL
        var url_data = {
            api_key: "ea77dc0f36685aa03dc880c780719309",
            image_url: image_url,
            colour: "white",
            product_name: "A snazzy textfac.es shirt!"
        };

        var url_with_args = API_BASE_URL + "?" + $.param(url_data);

        // Get the URL from rapanui
        $.ajax(url_with_args, {
            type: "GET",
        })
        .done(function(data) {
            $("button.btn-shirt-confirm").click(function() {
                window.location = data;
            });

            $("#confirmModal").modal();
            // Wait for the modal transition to complete before removing the spinner so we don't get the flash of black.
            $('#confirmModal').on('shown.bs.modal', function (e) {
                hideSpinner();
            })
            $('#confirmModal').on('hidden.bs.modal', function (e) {
                hideSpinner();
            })
        });
    */



});
