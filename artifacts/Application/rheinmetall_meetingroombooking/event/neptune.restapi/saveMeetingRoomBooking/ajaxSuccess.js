App.setBusy(true);

var bookedRoomData = modeloSimpleFormBooking.getData()

var options = {
    data: {
        roomID: bookedRoomData.roomID,
        roomBookedBegin: bookedRoomData.roomBookedBegin.toLocaleString(),
        roomBookedEnd: bookedRoomData.roomBookedEnd.toLocaleString(),
        email: AppCache.userInfo.email
    }
};

apiappSendEmail(options);

// DialogBookedRoom.open();