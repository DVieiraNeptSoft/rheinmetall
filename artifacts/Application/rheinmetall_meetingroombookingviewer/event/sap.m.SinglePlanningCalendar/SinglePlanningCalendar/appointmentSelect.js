selectedBookedRoom = oEvent.getParameter("appointment");
if (selectedBookedRoom !== undefined) {
    var data = selectedBookedRoom.getBindingContext().getObject();

    modeloPopoverBookingDetails.setData(data);
    modeloPopoverBookingDetails.getData().appIndex = parseInt(
        selectedBookedRoom.getBindingContext().getPath().split("/")[4]
    );

    oPopoverBookingDetails.openBy(selectedBookedRoom);
}