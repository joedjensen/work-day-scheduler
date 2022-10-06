var currentDateEl = $("#currentDay")
var calendarEl = $("#calendar")
currentDateEl.text(dayjs().format("dddd, MMMM D"));
var currentHour = dayjs().hour();
var hourObjectArray;
if (localStorage.getItem("hourObjectArray")) {
    hourObjectArray = JSON.parse(localStorage.getItem("hourObjectArray"))
} else {
     hourObjectArray =[
        {
            "name" : "9am",
            "eventText": "code"
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
}

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
    buttonEl.attr("data-index",i)
    hourEl.text(hourObjectArray[i].name)
    if (hourObjectArray[i].eventText) {
        entryBlockEl.text(hourObjectArray[i].eventText)
    }
    console.log(entryBlockEl)
    rowEl.append(hourEl)
    rowEl.append(entryBlockEl)
    rowEl.append(buttonEl)
    calendarEl.append(rowEl)
}

$("button").on("click", saveScore)

function saveScore(event) {
    hourObjectArray[$(this).attr("data-index")]['eventText'] = $(this).prev().val()
    localStorage.setItem("hourObjectArray" , JSON.stringify(hourObjectArray))
}
