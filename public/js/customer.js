//TODO change ajax urls
$(document).ready(function() {
	$("#searchBtn").click(function(){
		searchForCustomers(
			$("#search_input").val()
		);
	});
	$("#search_results_wrapper").on("click", "tr", function() {
		showCustomer(
			$(this).find("td").data("customer_id")
		);
  	});
	$("#updateBtn").click(function(){
		var formData =
			{
			"customer_name" : $("#customer_data > #customer_name").val(),
	  		"customer_last_name" : $("#customer_data > #customer_last_name").val(),
	  		"customer_email" : $("#customer_data > #customer_email").val(),
	  		"customer_phone" : $("#customer_data > #customer_phone").val()
			};
		updateCustomer($("#customer_data > #appt_id").val(),formData);
	});
});

function searchForCustomers(searchString){
  //TODO ajax to find
  // display result list "search_results"
  var formData =
      {
        "search_input": searchString
      };
  
  $.ajax({
	url: "customers/find",
	type: "POST",
	data: formData,
	success: function(data) {
		
		/* still considering wether to show the table title row on html load or only after the user clicked the search button with a value
		  var rowTitle = $("<tr />");
			$("#search_results").append(rowTitle); 
			rowTitle.append("<th>Name</th>");
			rowTitle.append("<th>Last Name</th>");
			rowTitle.append("<th>Email</th>");
			rowTitle.append("<th>Phone</th>");
		  */
		
		for (var i = 0; i < data.length; i++) {
			var row = $("<tr />");
			$("#search_results").append(row); 
			row.append("<td data-customer_id=" + data.customer_id + ">" + data.customer_name + "</td>");
			row.append("<td>" + data.customer_last_name + "</td>");
			row.append("<td>" + data.customer_email + "</td>");
			row.append("<td>" + data.customer_phone + "</td>");
		}
	},
	error: function() {
		alert("Failed to communicate with server");
	}
  });
}

function showCustomer(id){
  //TODO ajax get customer data when search result item is clicked, load in fields
  //Suggstion, using same logic we did in Calendar.js by adding a hidden td with the id
  var formData =
      {
        "customer_id": id
      };

  $.ajax({
	url: "customers/show",
	type: "POST",
	data: formData,
	success: function(data) {
	  $("#appt_id").val(id);
	  $("#customer_data > #customer_name").val(data.customer_name);
	  $("#customer_data > #customer_last_name").val(data.customer_last_name);
	  $("#customer_data > #customer_email").val(data.customer_email);
	  $("#customer_data > #customer_phone").val(data.customer_phone);
	},
	error: function() {
		alert("Failed to communicate with server");
	}
  });
}

function updateCustomer(id, data){
  //TODO ajax update
  //are you sure this function should recived data (json) before? why not just do it here inside formData
  var formData =
  {
	"customer_id": id,
	"customer_details" : data
  };

  $.ajax({
	url: "customers/update",
	type: "POST",
	data: formData,
	success: function() {
		//update was successful
	},
	error: function() {
		alert("Failed to communicate with server");
	}
  });
}