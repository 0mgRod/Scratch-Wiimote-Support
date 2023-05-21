(function (ext) {

    var wii_remote = null;

    ext.connectWiiController = function () {
        if (typeof cwiid === "undefined") {
            alert("The cwiid library is not loaded. Make sure you have it installed.");
            return;
        }

        if (wii_remote) {
            return;
        }

        wii_remote = new cwiid.Wiimote();

        // Enable button reporting
        wii_remote.rpt_mode = cwiid.RPT_BTN;

        // Attach event listeners
        wii_remote.on("button", function (btn, state) {
            if (btn === cwiid.BTN_A && state) {
                ext.whenAButtonPressed();
            }
        });
    };

    ext.whenAButtonPressed = function () {
        // Broadcast the event when the A button is pressed
        ext._status = true;
        ext._whenButtonPressed();
        ext._status = false;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [" ", "Connect Wii Controller", "connectWiiController"],
            ["h", "when A button pressed", "whenAButtonPressed"],
        ],
    };

    // Register the extension
    ScratchExtensions.register("Wii Controller", descriptor, ext);

})(window);
