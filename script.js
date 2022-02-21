$(document).ready(function () {
    console.log("ready!");

    const currendDay = moment(new Date());
    const currendDayId = currendDay.format("MMMM-MM-YYYY")


    $('#currentDay').html(currendDay.format("MMMM Do, YYYY"));

    const timeBlocks = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
        "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"]


    for (let i = 0; i < timeBlocks.length; i++) {
        const time = timeBlocks[i];

        const currentTime = moment(new Date());

        const parsedTime = moment(time, 'h A')
        const parsedTimeId = parsedTime.format("h-A")

        const hourDiff = currentTime.diff(parsedTime, 'hours')

        let timeClass = "";

        if (hourDiff < 0) {
            timeClass = "future";
        }
        else if (hourDiff > 0) {
            timeClass = "past"
        }
        else {
            timeClass = "present"
        }

        const eventId = `${currendDayId}-${parsedTimeId}`;

        const eventContent = localStorage.getItem(eventId) ?? "";

        const timeBlockHtml = ` <div class="row time-block">
            <div class="hour">
              ${time}
            </div>
            <textarea class="${timeClass}"  id="${eventId}"> ${eventContent}</textarea>
            <button class="saveBtn" onclick="saveEvent('${eventId}')"><i class="fas fa-save" ></i></button>
          </div>`;

        $(".container").append(timeBlockHtml);
    }

});

function saveEvent(eventId) {

    const eventContent = $(`#${eventId}`).val();

    if (!eventContent)
        return;

    localStorage.setItem(eventId, eventContent);

    alert("event saved!!")
}