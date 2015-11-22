$(function() {
    // FAQ hackery
    $("h4.faq").click(function() {
        console.log("clicked");
        console.log($(this).next());
        $(this).next().toggleClass("hidden");
    });
});
