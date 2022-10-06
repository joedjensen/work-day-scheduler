var currentDateEl = $("#currentDay")
var calendarEl = $("#calendar")
currentDateEl.text(dayjs().format("dddd, MMMM D"));
var currentHour = dayjs().hour();

var hourObjectArray =[
    {
        "name" : "9am",
    },
    {
        "name" : "10am",
    },
    {
        "name" : "11am",
    },
    {
        "name" : "12pm",
    },
    {
        "name" : "1pm",
    },
    {
        "name" : "2pm",
    },
    {
        "name" : "3pm",
    },
    {
        "name" : "4pm",
    },
    {
        "name" : "5pm",
    }
]

for (i=0; i < hourObjectArray.length; i++){
    rowEl = $('<div>' , {"class":"row"})
    hourEl = $('<div>', {"class":"hour col-1"})
    buttonEl = $('<button>' , {"class":"saveBtn col-1"})
    buttonImageEl = $('<i>', {"class": "fa fa-lock"})
    entryBlockEl = $("<textarea>", {"class":"col-10"})
    if (i + 9 < currentHour){
        entryBlockEl.addClass("past")
    } else if (i + 9 == currentHour) {
        entryBlockEl.addClass("present")
    } else {
        entryBlockEl.addClass("future")
    }
    buttonEl.append(buttonImageEl)
    hourEl.text(hourObjectArray[i].name)
    console.log(entryBlockEl)
    rowEl.append(hourEl)
    rowEl.append(entryBlockEl)
    rowEl.append(buttonEl)
    calendarEl.append(rowEl)
}