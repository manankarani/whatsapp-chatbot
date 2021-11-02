function create_venom(venom) {

    const chromiumArgs = [
        "--single-process",
        "--disable-web-security",
        "--no-sandbox",
        "--disable-web-security",
        "--aggressive-cache-discard",
        "--disable-cache",
        "--disable-application-cache",
        "--disable-offline-load-stale-cache",
        "--disk-cache-size=0",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-extensions",
        "--disable-sync",
        "--disable-gpu",
        "--disable-translate",
        "--hide-scrollbars",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-first-run",
        "--safebrowsing-disable-auto-update",
        "--ignore-certificate-errors",
        "--ignore-ssl-errors",
        "--ignore-certificate-errors-spki-list",
    ];

    bot = venom.create(
        "chatbot",
        (base64Qr, asciiQR, attempts, urlCode) => {
          console.log(asciiQR); // Optional to log the QR in the terminal
          var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
    
          if (matches.length !== 3) {
            return new Error("Invalid input string");
          }
          response.type = matches[1];
          response.data = new Buffer.from(matches[2], "base64");
    
          var imageBuffer = response;
    
          require("fs").writeFile(
            "public/img/out_chatbot.png",
            imageBuffer["data"],
            "binary",
            function (err) {
              if (err != null) {
                console.log(err);
              }
            }
          );
        },
        (statusSession, session) => {
            console.log("Status Session: ", statusSession);
        },
        {
            autoClose: 0,
            browserArgs: chromiumArgs,
            headless: true,
            devtools: false,
            useChrome: false,
            debug: false,
            logQR: false,
            disableSpins: true,
            disableWelcome: true,
          }
        );
    return bot
}

module.exports = {
    create_venom
}
