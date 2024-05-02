function calcTimezoneOffset(date) {
    const dateWithTimezone = new Date(date);
    const timezoneOffsetInMinutes = dateWithTimezone.getTimezoneOffset();

    // Convert the offset to milliseconds
    const timezoneOffsetInMilliseconds = timezoneOffsetInMinutes * 60 * 1000;

    // Add the offset to the date
    const dateWithOffset = new Date(dateWithTimezone.getTime() + timezoneOffsetInMilliseconds);

    console.log(dateWithOffset.toISOString());
    // Output: 2023-10-13T10:00:00.000Z

    return dateWithOffset;
}

function buildCalendarData(meetingRoomsInfo, bookedRooms) {
    var meetingRoomEquipmentString;

    //Cleaning variables
    meetingRoomsObj = {};
    meetingRoomsArray = [];

    bookedRooms.forEach(function (bookedRoom, a) {
        meetingRoomsObj = Object.assign({}, bookedRoom);

        var bookedRoomDetail = ModelData.FindFirst(
            meetingRoomsInfo,
            "roomID",
            meetingRoomsObj.roomID,
            "EQ"
        );

        bookedRoomDetail.roomEquipment.forEach(function (meetingRoomEquipment, b) {
            if (b === 0) {
                meetingRoomEquipmentString = "\u2022 " + meetingRoomEquipment.equipment;
            } else {
                meetingRoomEquipmentString =
                    meetingRoomEquipmentString + "\n\u2022 " + meetingRoomEquipment.equipment;
            }
        });

        meetingRoomsObj.roomDescription = bookedRoomDetail.roomDescription;

        //Calc Date with timezone offset
        meetingRoomsObj.roomBookedBegin = calcTimezoneOffset(meetingRoomsObj.roomBookedBegin);
        meetingRoomsObj.roomBookedEnd = calcTimezoneOffset(meetingRoomsObj.roomBookedEnd);

        meetingRoomsObj.roomEquipment = meetingRoomEquipmentString;

        meetingRoomsObj.roomCapacity = bookedRoomDetail.roomCapacity;

        switch (meetingRoomsObj.roomID) {
            case "Strategic Room":
                meetingRoomsObj.roomColour = "#aea7f1";
                meetingRoomsObj.roomIcon = "sap-icon://calendar";
                break;

            case "Private Meeting Room":
                meetingRoomsObj.roomColour = "#f23e23";
                meetingRoomsObj.roomIcon = "sap-icon://fa-solid/calendar";
                break;

            case "General Meeting Room":
                meetingRoomsObj.roomColour = "#019b78";
                meetingRoomsObj.roomIcon = "sap-icon://fa-regular/calendar";
                break;
        }

        meetingRoomsObj.roomBookedBeginListView = meetingRoomsObj.roomBookedBegin.toLocaleString();
        meetingRoomsObj.roomBookedEndListView = meetingRoomsObj.roomBookedEnd.toLocaleString();

        meetingRoomsObj.roomListViewTitle = "From: " + meetingRoomsObj.roomBookedBegin.toLocaleString() + "\nTo: " + meetingRoomsObj.roomBookedEnd.toLocaleString();

        meetingRoomsArray.push(meetingRoomsObj);
    });

    modelSinglePlanningCalendar.setData(meetingRoomsArray);

    //Setting initial filtering for calendar
    const bindingCalendar = SinglePlanningCalendar.getBinding("appointments");
    const filter = new sap.ui.model.Filter("roomID", "EQ", selectBookedRoom.getSelectedKey());
    bindingCalendar.filter([filter]);

    //Feeding data to the List
    modelListViewRoomsBooked.setData(meetingRoomsArray);

    //Setting initial sorting for the List
    const oSorter = new sap.ui.model.Sorter("roomBookedEnd", true);
    const bindingList = ListViewRoomsBooked.getBinding("items");
    bindingList.sort(oSorter);
}
