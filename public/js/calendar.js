
$(document).ready(function() {
	var dialog;
	dialog = $("#appointment_form").dialog({
		autoOpen: false,
		height: 600,
		width: 400,
		modal: true,
		buttons: [{
			text: "Send",
			"class":'send_button',
			click: function() {
				createAppointment();
			}
		},
			{
			text: "Delete",
			"class":'delete_button',
			click: function() {
				$("#dialog_confirm").dialog( "open" );
			}
		}],
		close: function() {
			closeDialog();
		}
	});
  
  	var dialog_alert;
	dialog_alert = $("#dialog_confirm").dialog({
		autoOpen: false,
		modal: true,
		buttons: [{
			text: "Delete event",
			click: function() {
				$("#dialog_confirm").dialog( "close" );
				deleteAppointment();
			}
		},
			{
			text: "Cancel",
			click: function() {
				$("#dialog_confirm").dialog( "close" );
			}
		}],
		close: function() {
			$("#dialog_confirm").dialog( "close" );
		}
	});
  
	function closeDialog(){
		$("#appointment_form").dialog( "close" );
		$('#appt_date').val('');
		$('#appt_time').val('');
		$('#appt_duration').val('');
		$('#appt_description').val('');
		$('#appt_customer_name').val('');
		$('#appt_customer_last_name').val('');
		$('#appt_customer_phone').val('');
		$('#appt_customer_email').val('');
		$('.delete_button').css("display", "none");
		$('#errors').html("");
		$('#errors').css("display", "none");
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
			url: 'appointments/find',
			type: "POST",
			data: formData,
			success: function(data) {
				/*idea:
					first I send the data to the server in order to check if such date is not taken by another appt_id (server side logic)
					I get a response, for example if it's taken I'd be expecting to receive  a string "taken",
					if the response string is no equals to "taken" I will then proceed to create/update as needed
					otherwise, an error will be displayed indicating that such date is already taken.
				*/
				if(data != "taken"){
					if($('#appt_id').val().length == 0){
						$.ajax({
							url: 'appointments/create',
							type: "POST",
							data: formData,
							success: function() {
								//assuming the server check if an event is already created on 1 date, it will return -1
							}
						});
					} else {
						formData.appt_id = $('#appt_id').val();
						$.ajax({
							url: 'appointments/update',
							type: "POST",
							data: formData,
							success: function() {
								//update was successful
							}
						});
					}
					closeDialog();
					$('#calendar').fullCalendar('refetchEvents');
				} else{
					$('#errors').html("Such date is already taken, please try another date");
					$('#errors').css("display", "inline-block");
				}
			}
		});	
	}

	function deleteAppointment(){
		if($('#appt_id').val().length != 0){
			var formData =
				{
					'appt_id' : $('#appt_id').val()
				};
			$.ajax({
				url: 'appointments/cancel',
				type: "POST",
				data: formData,
				success: function() {
					//delete was successful
				}
			});
		}
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
            var formData =
			{
                "appt_id" : calEvent.id
            };
            $('#appt_id').val(calEvent.id);
			$.ajax({
				url: 'appointments/show',
				type: "POST",
				data: formData,
				success: function(data) {
					$('#appt_id').val(data.appt_id);
					$('#appt_date').val(data.appt_date.format("YYYY-MM-DD"));
					$('#appt_time').val(data.appt_date.format("HH:mm"));
					$('#appt_duration').val(data.appt_duration);
					$('#appt_description').val(data.appt_description);
					$('#appt_customer_name').val(data.appt_customer_name);
					$('#appt_customer_last_name').val(data.appt_customer_last_name);
					$('#appt_customer_phone').val(data.appt_customer_phone);
					$('#appt_customer_email').val(data.appt_customer_email);
				}
			});
			$('.delete_button').css("display", "inline-block");
			$("#appointment_form").dialog( "open" );
		}
	},
    dayClick: function(date, jsEvent, view) {
		if(view.name == "month"){
			$('#calendar').fullCalendar( 'changeView', 'agendaDay' );
			$('#calendar').fullCalendar('gotoDate',date);
			$('#calendar').fullCalendar( 'refetchEvents' );
		}else{
			$('#appt_date').val(date.format("YYYY-MM-DD"));
			$('#appt_time').val(date.format("HH:mm"));
			$('#appt_duration').val(30);
			$("#appointment_form").dialog( "open" );
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
    timezone: "local",
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