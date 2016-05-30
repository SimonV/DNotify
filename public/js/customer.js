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
	  //expecting server to return wethere a json or a ready html table with values
	  //incase server returns a table do not edit next line of code and remove those 2 comments
	  $("#search_results").html(data);
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
	}
  });
}