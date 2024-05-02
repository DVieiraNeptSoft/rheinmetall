sap.ui.getCore().attachInit(function (startParams) {
    SinglePlanningCalendar.addView(SinglePlanningCalendarMonthView);
    SinglePlanningCalendar.addView(SinglePlanningCalendarWeekView);

    selectBookedRoom.removeAllItems();

    // Add items
    selectBookedRoom.addItem(
        new sap.ui.core.Item({ key: "Strategic Room", text: "Strategic Room" })
    );
    selectBookedRoom.addItem(
        new sap.ui.core.Item({ key: "Private Meeting Room", text: "Private Meeting Room" })
    );
    selectBookedRoom.addItem(
        new sap.ui.core.Item({ key: "General Meeting Room", text: "General Meeting Room" })
    );

    // Set selected item
    selectBookedRoom.setSelectedKey("Strategic Room");
});
