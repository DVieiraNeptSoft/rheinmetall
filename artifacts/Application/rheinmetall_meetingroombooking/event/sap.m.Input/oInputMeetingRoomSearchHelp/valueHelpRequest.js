if (oDateTimePickerBegin.getDateValue() === null || oDateTimePickerEnd.getDateValue() === null) {
    sap.m.MessageToast.show("Please select a start and an end date/time for the booking.");
    return;
}

apigetMeetingRoomsAvailability();