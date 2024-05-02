var beginDate = oDateTimePickerBegin.getDateValue();

var updatedDate = new Date(beginDate.getTime() + 30 * 60 * 1000); // Adding 15 mins

oDateTimePickerEnd.setDateValue(updatedDate);

unToggleButtons("30m");