try {
    // log.info(wfData.additionalProperty1);
    var status;

    switch (wfData.fromAction) {
        case "Approve":
            // execute code block 1
            await entities.rheinmetall_meetingroomsavailability
                .createQueryBuilder()
                .update()
                .set({ roomStatus: "Approved" })
                .where("id = :id", { id: wfData.objectType })
                .execute();

            wfData.result = "True";

            status = "Approved";

            break;
        case "Reject":
            //execute code block 2
            await entities.rheinmetall_meetingroomsavailability
                .createQueryBuilder()
                .update()
                .set({ roomStatus: "Rejected" })
                .where("id = :id", { id: wfData.objectType })
                .execute();

            wfData.result = "False";

            status = "Rejected";

            break;
    }

    var mailID;

    //Define which email template will be sent
    if (status === "Approved") {
        mailID = "96789FF9-A26D-EE11-9937-0022489E2195";
    } else {
        mailID = "2A590460-716E-EE11-9937-0022489E2195";
    }

    //getUserEmail
    var mailData = await entities.rheinmetall_meetingroomsavailability.createQueryBuilder()
    .where("id = :id", {id: wfData.objectType})
    .getOne();

    log.info("Mail Data:");
    log.info(mailData);

    await sendEmail(mailData.userEmail, null, null, "support@neptune-software.com", mailID, {
        roomID: mailData.roomID,
        roomBookedBegin: new Date(mailData.roomBookedBegin).toLocaleString(),
        roomBookedEnd: new Date(mailData.roomBookedEnd).toLocaleString(),
        roomStatus: status,
    });

    log.info("Email should be sent");
} catch (e) {
    log.error("WF failed", e);
    wfData.result = false;
} finally {
    complete();
}
