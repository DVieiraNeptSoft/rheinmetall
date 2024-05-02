var meetingRoomsInfo = modeloMultiModelMeetingRoomsInfo.getData();

// var beginDate = calcTimezoneOffset(modeloSimpleFormBooking.getData().roomBookedBegin.toISOString());
// var endDate = calcTimezoneOffset(modeloSimpleFormBooking.getData().roomBookedEnd.toISOString());

var bookedRooms = ModelData.Find(
    modeloMultiModelMeetingRoomsAvailability.getData(),
    ["roomBookedBegin", "roomBookedEnd"],
    [
        modeloSimpleFormBooking.getData().roomBookedBegin.toISOString(),
        modeloSimpleFormBooking.getData().roomBookedEnd.toISOString(),
    ],
    "Contains"
);

buildAvailableMeetingRoomsList(meetingRoomsInfo, bookedRooms);