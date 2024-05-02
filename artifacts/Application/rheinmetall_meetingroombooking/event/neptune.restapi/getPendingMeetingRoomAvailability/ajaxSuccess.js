var dataForApproval = modeloMultiModelPendingMeetingRoomsAvailability.getData();
var bookedRoomData = modeloSimpleFormBooking.getData();

const filteredNewRequest = ModelData.FindFirst(
    dataForApproval,
    ["roomID", "roomBookedBegin", "roomBookedEnd"],
    [
        bookedRoomData.roomID,
        bookedRoomData.roomBookedBegin.toISOString(),
        bookedRoomData.roomBookedEnd.toISOString(),
    ],
    "EQ"
);

var wfData = {
    id: "DC4643CF-896D-EE11-9937-0022489E2195",
    objectType: filteredNewRequest.id,
    objectKey: AppCache.userInfo.name + " - " + "Requested Booking for " + bookedRoomData.roomID,
    amount: "",
        // "From: " +
        // bookedRoomData.roomBookedBegin.toLocaleString() +
        // " To: " +
        // bookedRoomData.roomBookedEnd.toLocaleString(),
    currency: "",
    approver: "",
};
$.ajax({
    type: "POST",
    contentType: "application/json",
    url: "/api/functions/WorkflowInbox/Start",
    data: JSON.stringify(wfData),

    success: function (data) {
        App.setBusy(false);

        // Use MessageToast
        // sap.m.MessageToast.show("Leave submitted for approval.");

        // clearNewRequestFields();
        // oApp.back();oApp.back();
        // oApp.to(oPageSaved);

        clearAllFields();

        DialogBookedRoom.close();
    },
    error: function (result, status) {
        sap.m.MessageToast.show("Failed to submit...");
        oApp.setBusy(false);
    },
});
