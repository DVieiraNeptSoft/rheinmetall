if (sap.n) {
    sap.n.Shell.attachInit(function (data) {
        console.log("WORKFLOW DATA IN APP:");

        var options = {
            parameters: {
                where: JSON.stringify({ id: data.objectType }),
            },
        };

        apioRestAPIGetMeetingRoomAvailability(options);

        console.log(data);

        jQuery.sap.addUrlWhitelist("blob");
    });
}
