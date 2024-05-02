var bookedRoomData = modeloSimpleFormBooking.getData();

var options = {
    parameters: {
        where: JSON.stringify({
            roomID: bookedRoomData.roomID,
            roomBookedBegin: bookedRoomData.roomBookedBegin,
            roomBookedEnd: bookedRoomData.roomBookedEnd,
        }),
    },
};

apigetPendingMeetingRoomAvailability(options);