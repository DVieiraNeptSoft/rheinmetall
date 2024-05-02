function submitForm() {
    // Get Data from FORM
    let formData = FORMS.getData();

    // Get the Form Validation
    var validation = formData.valid;

    //console.log(formData);  // You need this to get the ids of the fields in forms

    if (validation) {
        // If it's valid form
        // Get Data from FORM - And set to completed if all required fields are OK
        let formCompleted = FORMS.getData(true);

        //send data to table
        var options = {
            data: {
                roomID: formData.data["6f4af0d6-daa6-4f80-d3ba-3633a32b5052"],
                roomComment: formData.data["f0e63429-4481-49ce-b023-83d0276f219e"],
                roomRating: formData.data["d9f7dc9b-3cba-4713-a51a-4e0563807256"],
            },
        };

        apisaveMeetingRoomFeedback(options);

    } else {
        sap.m.MessageToast.show("Please fill all the required fields.");
        return;
    }
}
