$(function() {

    function showSpinner() {
        $("div.overlay").show()
        $("div.spinner").show();
    }
    function hideSpinner() {
        $("div.overlay").hide()
        $("div.spinner").hide();
    }

    var API_BASE_URL = "https://rapanuistore.com/api-access-point/";
    var faces = $("button.facebtn");
    faces.click(function() {
        showSpinner();

        var id = $(this).attr("face-id");
        console.log("mousedown");


        var image_url = window.location.protocol + "//" + window.location.host + "/shirtimage/" + id;
        //var image_url = "http://i.imgur.com/RASu9l8.png";

        // Set the modal image to be the image for this face.
        $("div.confirm-modal-body").html('<img class="face-preview" src="' + image_url + '"/>');

        // Get the URL
        var url_data = {
            api_key: "ea77dc0f36685aa03dc880c780719309",
            image_url: image_url,
            colour: "white",
            product_name: "A very " + $(this).attr("data-clipboard-text") + "shirt"
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

    });


});
