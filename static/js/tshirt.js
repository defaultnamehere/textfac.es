
// Here we go.

//$(function() {

    function drawFace(face) {

        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');

        var cHeight = 2500;
        var cWidth = 2000;
        var textSize = 500;
        // WOW I can't believe this worked the first time I wrote it.
        ctx.font = 'bold ' + textSize +'px Droid Sans';
        // This would be much more efficient as binary search buuuut no.
        while (ctx.measureText(face).width > cWidth) {
            textSize -= 10;
            ctx.font = 'bold ' + textSize +'px Droid Sans';
        }

        // Get the width of the face when drawn in the font.
        var width = ctx.measureText(face).width;
        console.log(width);
        ctx.fillText(face, 1000 - width/2, 1250 ,2000);
        var img = canvas.toDataURL("image/png");
        return img;
    }

//});


// Generate all the faces, and POST the images to a special URL only available on localhost.

var saveAllFaceImages = function() {
    $('button.facebtn').each(function() {
        var faceid = $(this).attr("face-id");
        var face = $(this).attr("data-clipboard-text");

        var image = drawFace(face);
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        $.post("http://localhost:5000/recieveimage", {
                img: image,
                faceid: faceid
        });

    });
}
