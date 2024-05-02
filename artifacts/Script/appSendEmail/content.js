await sendEmail(
    req.body.email,
    null,
    null,
    "support@neptune-software.com",
    "30BD7D91-9F6D-EE11-9937-0022489E2195",
    {
        roomID: req.body.roomID,
        roomBookedBegin: req.body.roomBookedBegin,
        roomBookedEnd: req.body.roomBookedEnd,
    }
);

log.info("Email should be sent");

complete();
