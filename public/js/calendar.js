
$(document).ready(function() {
  var dialog;
  dialog = $( "#appointment_form" ).dialog({
    autoOpen: false,
    height: 600,
    width: 400,
    modal: true,
    buttons: [{
      text: "Send",
      click: function() {
        createAppointment();
      }
    }],
    close: function() {
      closeDialog();
    }
  });
	
	function closeDialog(){
		$( "#appointment_form" ).dialog( "close" );
		$('#appt_date').val('');
		$('#appt_time').val('');
		$('#appt_duration').val('');
		$('#appt_description').val('');
		$('#appt_customer_name').val('');
		$('#appt_customer_last_name').val('');
		$('#appt_customer_phone').val('');
		$('#appt_customer_email').val('');
	}

	function createAppointment(){
		var formData = 
		{
			'appt_date' : new Date($('#appt_date').val() + ' ' + $('#appt_time').val()),
			'appt_duration': $('#appt_duration').val(),
			'appt_description': $('#appt_description').val(),
			'appt_customer_name': $('#appt_customer_name').val(),
			'appt_customer_last_name': $('#appt_customer_last_name').val(),
			'appt_customer_phone': $('#appt_customer_phone').val(),
			'appt_customer_email': $('#appt_customer_email').val()
		};	
		$.ajax({
			url: 'appointments/create',
			type: "POST",
			data: formData,
			success: function() {
			
			}
		});
		closeDialog();
		$('#calendar').fullCalendar('refetchEvents');
	}
	
  $('#calendar').fullCalendar({
    eventClick: function(calEvent, jsEvent, view) {
		if(view.name == "month"){
			$('#calendar').fullCalendar( 'changeView', 'agendaDay' );
			$('#calendar').fullCalendar('gotoDate',calEvent.start);
			$('#calendar').fullCalendar( 'refetchEvents' );
		} else{
			$( "#appointment_form" ).dialog( "open" );
		}
	},
    dayClick: function(date, jsEvent, view) {
		if(view.name == "month"){
			$('#calendar').fullCalendar( 'changeView', 'agendaDay' );
			$('#calendar').fullCalendar('gotoDate',date);
			$('#calendar').fullCalendar( 'refetchEvents' );
		}else{
			$('#appt_date').val(date.format("YYYY-MM-DD"));
			$('#appt_time').val(date.format("hh:mm"));
			$('#appt_duration').val(30);
			$( "#appointment_form" ).dialog( "open" );
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