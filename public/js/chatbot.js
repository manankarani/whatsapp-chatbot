function reloadPage() {
    var currentDocumentTimestamp = new Date(
        performance.timing.domLoading
    ).getTime();
    // Current Time //
    var now = Date.now();
    // Total Process Lenght as Minutes //
    var tenSec = 10 * 1000;
    // End Time of Process //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
        location.reload();
    }
}
$(".main-2").hide();
$(".logchat").hide();
var intervalHandle = setInterval(function () {
    d = new Date();
    newImage = document.getElementById("qrimage");
    newImage.src = "/img/out_chatbot.png?t=" + new Date().getTime();
}, 500);