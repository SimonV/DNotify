
$(document).ready(function() {

  $('#calendar').fullCalendar({
    eventClick: function(calEvent, jsEvent, view) {

      $('#calendar').fullCalendar( 'changeView', 'agendaDay' );
      $('#calendar').fullCalendar('gotoDate',calEvent.start);
      $('#calendar').fullCalendar( 'refetchEvents' );

    },
    dayClick: function(date, jsEvent, view) {

      if ($('#calendar').fullCalendar( 'getView').name.localeCompare('month') == 0){

        $('#calendar').fullCalendar( 'changeView', 'agendaDay' );
        $('#calendar').fullCalendar('gotoDate',date);
        $('#calendar').fullCalendar( 'refetchEvents' );


      }else{
        //TODO add appointment
        //alert('add appt');
      }
    },
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaDay'
    },
    businessHours: {
      start: '8:00',
      end: '20:00',
      dow: [ 0, 1, 2, 3, 4, 5 ]
    },
    minTime: "08:00:00",
    maxTime: "20:00:00",
    editable: false,
    eventLimit: false, // allow "more" link when too many events
    selectable: false,
    events: function(start, end, timezone, callback) {
        var formData = {'start': start.toDate(),'end': end.toDate()};

        if ($('#calendar').fullCalendar( 'getView').name.localeCompare('month') == 0){
          $.ajax({
              url: 'appointments/get_monthly_summaries',
              type: "POST",
              data: formData,
              success: function(doc) {
                  var events = doc;
                  callback(events);
              }
          });
        }else{
          $.ajax({
              url: 'appointments/get_daily',
              type: "POST",
              data: formData,
              success: function(doc) {
                  var events = doc;
                  callback(events);
              }
          });
          // TODO fetch events for a single day
          //alert("ddd");
        }
    }
  });
});