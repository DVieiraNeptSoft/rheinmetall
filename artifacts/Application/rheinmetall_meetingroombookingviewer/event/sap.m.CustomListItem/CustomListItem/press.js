const context = oEvent.oSource.getBindingContext();  

// Get Entire Model
const data = context.getObject();

modelDialogListBookingDetails.setData(data);

DialogListBookingDetails.open();