// Window load function .
(function($){
	$(window).load(function(){
		
	});
})(jQuery);	
// End of Window load function .

// A $( document ).ready() block.
$( document ).ready(function() {

	//make a json data
	var commandJson = {
		"dumpFollowerIDs":[
			"-uname", "-limit","-o"
		],
		"dumpGeoDetails":[
			"-pid","-o"
		],
		"dumpHomeTimeLine":[
			"-o"
		]
	};
	for(var item in commandJson){

		$("#commands-select").append("<option value="+item+">"+item+"</option>");
	}
	$("#commands-select").change(function(){
		//console.log($(this).val());
		$(this).find("option:selected").each(function(){
			var v = $(this).attr("value");
			var fields = commandJson[v];
			$('.commands-selected').empty();
			for(var vi in fields){
				var fieldLabel = fields[vi];
				$('.commands-selected').append('<div class="form-group"><label class="label label-default">'+fieldLabel+'</label><input type="text" class="form-control inputcommand" name="'+fieldLabel+'" id="'+fieldLabel+'" required></div>');
			}
		});
	});

//keys configuration
$('#key-conf-id').click(function(){
	$(this).text('Show Keys Configuration');
    if($('.applicationkeys').is(':visible')){
          $(this).text('Show Keys Configuration');
    }else{
          $(this).text('Hide Keys Configuration');
    }
    $('.applicationkeys').slideToggle('medium');
    return false;
});
$('#submitform').click(function(){
	//An object Json command is created
	if($('#consumerKey').val() == ""){
        alert('enter consumerKey');
        
    } else if($('#consumerSecret').val() == ""){
        alert('enter consumerSecret');
    }
    else if($('#accessToken').val() == ""){
     	alert('enter accessToken');
    } 
    else if($('#accessTokenSecret').val() == ""){
        alert('enter accessTokenSecret');
    }
    else{
    	var jsonCommand = new Array();
	$('.commands-selected input ').each(
	    function(index){  
	        var input = $(this);
	        var fieldname = input.attr('name');
	        var fieldvalue = input.val();
	        var col = {};
	        col[fieldname] = fieldvalue;
			jsonCommand.push(col);
	    }
);
	//get applicationkey values and selected command value
	var comselect = $('#commands-select').val();
	var consumerKey = $('#consumerKey').val();
	var consumerSecret = $('#consumerSecret').val();
	var accessToken = $('#accessToken').val();
	var accessTokenSecret = $('#accessTokenSecret').val();
	
	//Json object is created here
		var commandJson = {
		command:comselect,
		//values:[],
		credentials:{
			"consumerKey":consumerKey,
			"consumerSecret":consumerSecret,
			"accessToken":accessToken,
			"accessTokenSecret":accessTokenSecret
		}
	};
	commandJson['values'] = jsonCommand;
	var jsonString = JSON.stringify(commandJson);
	//console.log(myString);
	$("#output-panel").css("display","block");
	//$("#output-panel .panel-body").empty();
	$("#output-panel .panel-body").append('<div class="output-div"><label class="label label-success">Output Json</label></br>'+jsonString+'</div>');
    }
	
});


});  // End of document ready function.



