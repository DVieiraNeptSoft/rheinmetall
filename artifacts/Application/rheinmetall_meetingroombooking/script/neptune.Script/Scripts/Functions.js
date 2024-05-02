function buildAvailableMeetingRoomsList(meetingRoomsInfo, bookedMeetingRooms) {
    var meetingRoomEquipmentString, roomEquipmentKeyField;

    //Cleaning variables
    meetingRoomsObj = {};
    meetingRoomsArray = [];

    meetingRoomsInfo.forEach(function (meetingRoom, a) {
        meetingRoomsObj = Object.assign({}, meetingRoom);

        var bookedRoom = ModelData.FindFirst(
            bookedMeetingRooms,
            "roomID",
            meetingRoomsObj.roomID,
            "EQ"
        );

        //if the current room is not booked
        if (bookedRoom === false) {
            meetingRoom.roomEquipment.forEach(function (meetingRoomEquipment, b) {
                if (b === 0) {
                    meetingRoomEquipmentString = "\u2022 " + meetingRoomEquipment.equipment;
                } else {
                    meetingRoomEquipmentString =
                        meetingRoomEquipmentString + "\n\u2022 " + meetingRoomEquipment.equipment;
                }
            });

            meetingRoomsObj.roomEquipment = meetingRoomEquipmentString;

            meetingRoomsObj.isAvailable = "Available For Booking";

            meetingRoomsArray.push(meetingRoomsObj);
        }
    });

    modeloListAvailableMeetingRooms.setData(meetingRoomsArray);

    DialogAvailableMeetingRooms.open();
}

function submitBooking(bookingData) {
    var options = {
        data: {
            roomID: bookingData.roomID,
            roomBookedBegin: bookingData.roomBookedBegin,
            roomBookedEnd: bookingData.roomBookedEnd,
            keyFilter:
                bookingData.roomID +
                "," +
                bookingData.roomBookedBegin.toISOString() +
                "," +
                bookingData.roomBookedEnd.toISOString(),
            roomStatus: "Pending",
            userEmail: AppCache.userInfo.email,
        },
    };

    apisaveMeetingRoomBooking(options);
}

function unToggleButtons(selBTN) {
    switch (selBTN) {
        case "15m":
            oToggleButton30mins.setPressed(false);
            oToggleButton45mins.setPressed(false);
            oToggleButton1hour.setPressed(false);
            break;

        case "30m":
            oToggleButton15mins.setPressed(false);
            oToggleButton45mins.setPressed(false);
            oToggleButton1hour.setPressed(false);
            break;

        case "45m":
            oToggleButton15mins.setPressed(false);
            oToggleButton30mins.setPressed(false);
            oToggleButton1hour.setPressed(false);
            break;

        case "1h":
            oToggleButton15mins.setPressed(false);
            oToggleButton30mins.setPressed(false);
            oToggleButton45mins.setPressed(false);
            break;
    }
}

function calcTimezoneOffset(date) {
    const dateWithTimezone = new Date(date);
    const timezoneOffsetInMinutes = dateWithTimezone.getTimezoneOffset();

    // Convert the offset to milliseconds
    const timezoneOffsetInMilliseconds = timezoneOffsetInMinutes * 60 * 1000;

    // Add the offset to the date
    const dateWithOffset = new Date(dateWithTimezone.getTime() + timezoneOffsetInMilliseconds);

    console.log(dateWithOffset.toISOString());
    // Output: 2023-10-13T10:00:00.000Z
}

function unPressAllButtons() {
    oToggleButton15mins.setPressed(false);
    oToggleButton30mins.setPressed(false);
    oToggleButton45mins.setPressed(false);
    oToggleButton1hour.setPressed(false);
}

function clearAllFields() {
    oDateTimePickerBegin.setValue();
    oDateTimePickerEnd.setValue();
    unPressAllButtons();
    oInputMeetingRoomSearchHelp.setValue();
}
