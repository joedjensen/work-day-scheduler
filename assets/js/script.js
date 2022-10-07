// grab all necessary elements
var currentDateEl = $("#currentDay")
var calendarEl = $("#calendar")
var toggleEl = $("#disable-hours")
var resetEl = $('#reset-button')
// get current date and format it using dayjs
currentDateEl.text(dayjs().format("dddd, MMMM D"));
// get the currentHour for use in formatting rows
var currentHour = dayjs().hour();
var hourObjectArray;

// check local storage. Use if available. otherwise initialize with names and no eventText
if (localStorage.getItem("hourObjectArray")) {
    hourObjectArray = JSON.parse(localStorage.getItem("hourObjectArray"))
} else {
    hourObjectArray = [
        {
            "name": "9am",
        },
        {
            "name": "10am",
        },
        {
            "name": "11am",
        },
        {
            "name": "12pm",
        },
        {
            "name": "1pm",
        },
        {
            "name": "2pm",
        },
        {
            "name": "3pm",
        },
        {
            "name": "4pm",
        },
        {
            "name": "5pm",
        }
    ]
}


function renderCalendar() {
    // first empty old elements
    calendarEl.empty()
    // loop throuugh objects appending a row with necessary col elements. Uses bootstraps grid
    for (i = 0; i < hourObjectArray.length; i++) {
        rowEl = $('<div>', { "class": "row" })
        hourEl = $('<div>', { "class": "hour col-1" })
        buttonEl = $('<button>', { "class": "saveBtn col-1" })
        buttonImageEl = $('<i>', { "class": "fa fa-save" })
        entryBlockEl = $("<textarea>", { "class": "col-10" })
        // conditional formatting. we add 9 to the index to get the hour value in 24 hour clock and compare that to the current hour
        if (i + 9 < currentHour) {
            entryBlockEl.addClass("past")
            // if the toggle is checked disable textare and buttons for hours in past
            if (toggleEl.is(':checked')) {
                entryBlockEl.prop('disabled', true)
                buttonEl.prop('disabled', true)
                // class used to disable button icon animation in css
                buttonEl.addClass("disabled")
            }
        } else if (i + 9 == currentHour) {
            entryBlockEl.addClass("present")
        } else {
            entryBlockEl.addClass("future")
        }
        buttonEl.append(buttonImageEl)
        // set data-index attribute equal to index. we use this to update the correct object in the array on click
        buttonEl.attr("data-index", i)
        // add name and eventText to appropriate els
        hourEl.text(hourObjectArray[i].name)
        if (hourObjectArray[i].eventText) {
            entryBlockEl.text(hourObjectArray[i].eventText)
        }
        // this is the append
        rowEl.append(hourEl, entryBlockEl, buttonEl)
        calendarEl.append(rowEl)
    }
}

// function attached to save buttons
function saveScore(event) {
    // use the targets data-index to update the eventText of the appropriate object in the array
    //get the text from the previous element
    hourObjectArray[$(this).attr("data-index")]['eventText'] = $(this).prev().val()
    // push to local storage
    localStorage.setItem("hourObjectArray", JSON.stringify(hourObjectArray))
}

// reset function
function clearCalendar() {
    // loop through array deleting eventText
    for (i = 0; i < hourObjectArray.length; i++) {
        delete hourObjectArray[i].eventText
    }
    // push to local storage and rerender calendar
    localStorage.setItem("hourObjectArray", JSON.stringify(hourObjectArray))
    renderCalendar()
}

// render on load and attach necessary click/change functions
renderCalendar()
calendarEl.on("click", ".saveBtn", saveScore)
toggleEl.change(renderCalendar)
resetEl.on("click", clearCalendar)