var bookedRoom = modeloModelArrayRoomsAvailability.getData();
var bookedRoomInfo = modeloModelArrayRoomsInfo.getData();

var filteredbookedRoomInfo = ModelData.FindFirst(bookedRoomInfo, "roomID", bookedRoom[0].roomID, "EQ");

var formObj = {},
    roomEquipmentString;

// formObj = Object.assign({}, bookedRoomInfo[0]);
formObj = Object.assign({}, filteredbookedRoomInfo);

//Building the bullet list
formObj.roomEquipment.forEach(function (meetingRoomEquipment, b) {
    if (b === 0) {
        roomEquipmentString = "\u2022 " + meetingRoomEquipment.equipment;
    } else {
        roomEquipmentString =
            roomEquipmentString + "\n\u2022 " + meetingRoomEquipment.equipment;
    }
});

formObj.roomEquipment = roomEquipmentString;
debugger;
formObj.roomBookedBegin = new Date(bookedRoom[0].roomBookedBegin).toLocaleString();
formObj.roomBookedEnd = new Date(bookedRoom[0].roomBookedEnd).toLocaleString();
formObj.userEmail = bookedRoom[0].userEmail;
formObj.roomStatus = bookedRoom[0].roomStatus;

modeloSimpleForm.setData(formObj);
