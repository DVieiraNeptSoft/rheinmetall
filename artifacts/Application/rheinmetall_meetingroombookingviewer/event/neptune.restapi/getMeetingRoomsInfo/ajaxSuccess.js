var options = {
    parameters: {
        "where": JSON.stringify({roomStatus: "Approved"}),
    }
};

apigetMeetingRoomsAvailability(options);