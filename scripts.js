$(document).ready(function(){

    var getData = function (){

        var charitySearchTerm = $('#term').val();

        
        if(charitySearchTerm == ""){
            
            // validate that a search term was entered before trying to search
            console.log("charitySearchTerm value = " + charitySearchTerm);
            $('#campaignarea').html( "<div class='alert alert-warning' role='alert'> Please enter a search term. </div>");

    
            }   else {
                        
               
                console.log("if (charitySearchTerm == \"\") else condition started");
        
                
                /* This function pulls in searchData data from Streamlabs Charity API to check on search results for user input*/ 

                function getEventsData() {
                    
        
                    $.getJSON("https://streamlabscharity.com/api/v1/causes/search?q=" + charitySearchTerm, function(searchData) {            
                
                        console.log('Value of searchData.length = ' + searchData.length);


                        //Checks if returned JSON object has any data
                        if (searchData.length != 0 && searchData[0].events_count !=0) {

                            $('#campaignarea').html( "<div class='alert alert-success alert-dismissible fade show' role='alert'> Event found! <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span></button></div>");
                            
                            let charityId = searchData[0].id;

                            function populateCharityContent() {
            
                                $.getJSON("https://streamlabscharity.com/api/v1/causes/" + charityId + "/events", function(data) { 
                    
                                let amount_raised;
                                let event_goal;
                                
                                console.log("data REQUEST started!");
                    
                                //note: Streamlabs API returns currency as a whole number in total cents raised
                                amount_raised = data[0].amount_raised;

                                //sets event goal to calculate campaign progress percentage
                                event_goal = data[0].goal.amount / 100;

                                //set cause url slug to contruct event page URL

                                cause_url_slug = data[0].cause.slug;

                                //set event url slug to construct event page URL

                                event_url_slug = data[0].slug;

                                // converts values to numbers with commas.
                                function numberWithCommas(x) {
                                    x /= 100;
                                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }

                                var convertedAmountRaised = numberWithCommas(amount_raised);

                                //sets campaign banner image source
                                event_banner_url = data[0].page_settings.header_url;

                                //sets campaign event title header
                                cause_display_name = data[0].cause.display_name;
                                event_display_name = data[0].display_name;
                    
                                //converts searchData data into percentage value that Bootstrap 4 Progress bar will understand
                                function calculatePercentage(amountRaised, eventGoal) {
                    
                                    return amountRaised / eventGoal * 100;
                            
                                };

                                // converts JSON data to value that Bootstrap progress bar can use
                                eventProgressPercentage = Math.round(calculatePercentage(amount_raised, event_goal) / 100);

                                console.log("eventProgressPercentage = " + eventProgressPercentage);

                                // grabs campaign banner URL from searchData data and inserts it onto html
                                $("#campaignbanner").attr("src", event_banner_url);
                                $('#eventdisplayname').html( "<h2>" + event_display_name +"</h2>");
                                $('#causedisplayname').html( "<h4>Benefitting " + cause_display_name +"</h4>");
                                $( ".donatebuttonarea" ).html( "<a class=\"btn btn-primary btn-lg btn-block\" href=\"https://streamlabscharity.com/" + cause_url_slug + "/event/" + event_url_slug + " \"> Donate </a>");
                                

                                // adds label to progress bar with total funds raised
                                if (convertedAmountRaised != 0) {
                                
                                    $( ".progressbararea" ).html( "<div class=\"progress\"> <div class=\"progress-bar-striped bg-success\" role=\"progressbar\" style=\"width:" + eventProgressPercentage + "%\" aria-valuenow=" + eventProgressPercentage + " aria-valuemin=\"0\" aria-valuemax=\"100\"> $" + convertedAmountRaised + " / $" + event_goal + " raised</div></div>");
                                
                                } else {
                                    
                                    $( ".progressbararea" ).html( "" );
                                
                                }                             
                                
                    
                                console.log("amount_raised value = " + amount_raised);
                    
                                console.log("event_goal value = " + event_goal);
                    
                                
                    
                                console.log("event_banner_url = " + event_banner_url);
                    
                                console.log("data REQUEST finished!");
                    
                                });
                    
                            };

                            populateCharityContent();
            
                        }   else if (searchData.length != 0 && searchData[0].events_count == 0){

                            //TODO: iterate through matching searches and populate list of matching results
                            
                            $('#campaignarea').html( "<div class='alert alert-warning alert-dismissible fade show' role='alert'> There are close matches in the Streamlabs database, but none with active events were found. <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span></button></div>");
                            $("#campaignbanner").attr("src", "");
                            $('#eventdisplayname').html( "");
                            $('#causedisplayname').html( "");
                            $( ".progressbararea" ).html( "" );
                            $( ".donatebuttonarea" ).html( "");
                        } else {

                            $('#campaignarea').html( "<div class='alert alert-danger alert-dismissible fade show' role='alert'> No events found. <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</button></span> </div>");
                            
                            $("#campaignbanner").attr("src", "");
                            $('#eventdisplayname').html( "");
                            $('#causedisplayname').html( "");
                            $( ".progressbararea" ).html( "" );
                            $( ".donatebuttonarea" ).html( "");
                        }
            
                    });

                };
            
                getEventsData();

                console.log("if (charitySearchTerm == \"\") else condition ended");

            }
        
    };
              

    $('#search').click(getData);

    $('#term').keyup(function(event){

        if(event.keyCode == 13){

            getData();

        }

    });

});