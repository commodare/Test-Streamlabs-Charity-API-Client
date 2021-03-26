$(document).ready(function(){

/* This function pulls in JSON data from Streamlabs Charity API and generates a thermometer based on overall campaign progress*/ 
    //var charityID = "249690012852031488";
    var charityID = "177589901091540992";

    $.getJSON("https://streamlabscharity.com/api/v1/causes/" + charityID + "/events", function(data) { 

        let amount_raised;
        let event_goal;
        
        console.log("data REQUEST started!");

        //divide by 100 to convert JSON value to include currency decimal
        amount_raised = data[0].amount_raised;
        //amount_raised = 100000;
        
        event_goal = data[0].goal.amount;
        event_banner_url = data[0].page_settings.header_url;

        //converts JSON data into percentage value that Jquery UI Progress bar will understand

        function calculatePercentage(amountRaised, eventGoal) {

            return amountRaised / eventGoal * 100;
    
        };

        
        
        //grabs campaign banner URL from JSON data and inserts it onto html
        $("#campaignbanner").attr("src", event_banner_url);

        eventProgressPercentage = calculatePercentage(amount_raised, event_goal);

        console.log("amount_raised value = " + amount_raised);
        console.log("event_goal value = " + event_goal);
        console.log("eventProgressPercentage = " + eventProgressPercentage);
        console.log("event_banner_url = " + event_banner_url);
        console.log("data REQUEST finished!");

        $( "#progressbar" ).progressbar({
        
            value: eventProgressPercentage,

            
        });

    });
    

    
        
    // $('#term').focus(function(){
    //    var full = $("#poster").has("img").length ? true : false;
    //    if(full == false){
    //       $('#poster').empty();
    //    }
    // });
      
    

    // var getPoster = function(){

    //     function pullbasedata () {           
         
    //         $.getJSON("https://api.themoviedb.org/3/configuration?api_key=d5f205d2e377e16138957d57237f0b4e", function(data) { 

    //            console.log("data REQUEST started!");
               
    //            // path to image base URL from IMDB API: data.images.base_url;
    //            // path to poster slug from TMDB API: data.images.poster_sizes[3];

    //            base_url = data.images.base_url;
    //            postersize = data.images.poster_sizes[3];

    //            console.log("data REQUEST finished!");
    //            console.log("base url and postersize values = " + base_url + " + " + postersize);
               
    //         });

    //     };
      
    //     function pullnoposterdata() {

    //         $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=d5f205d2e377e16138957d57237f0b4e&language=en-US&page=1&include_adult=false&query=goonies", function(json) {
    //             console.log("pullnoposterdata REQUEST started!");

    //             //json.results[0].poster_path;
    //              $('#poster').html('<h2 class="loading">We\'re afraid nothing was found for that search. Perhaps you were looking for The Goonies? </h2> <img id="thePoster" src=' + base_url + postersize + json.results[0].poster_path + ' />');
            
    //             console.log("pullnoposterdata REQUEST finished!");
    //         });
         

    //     };

    //     function pullPosterData() {

    //         $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=d5f205d2e377e16138957d57237f0b4e&language=en-US&page=1&include_adult=false&query=" + film , function(json) {  

    //         console.log("json.results value for pullPosterdata = "+ json.total_results);
            
    //         posterpath = json.results[0].poster_path;
            
    //         $('#poster').html('<h2 class="loading">Well, gee whiz! We found you a poster, skip!</h2><img id="thePoster" src=' + base_url + postersize + posterpath + ' />');
         
    //         });

    //     };
      
    //     pullbasedata();

    //     var film = $('#term').val();
        
    //     if(film == ""){
 
    //         $('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");
 
    //         } else {

    //         $('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");          
               
    //         console.log("if (film == \"\") else condition started");

    //         //var resultsCount;


    //         function getResultsCount() {
                

    //             $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=d5f205d2e377e16138957d57237f0b4e&language=en-US&page=1&include_adult=false&query=" + film , function(json) {            
                

    //             console.log("json.total_results value in getResultsCount = "+ json.total_results);
                
    //             resultsCount = json.total_results;

    //             if (resultsCount != "0" ) {
                    
    //                 pullPosterData();

    //             } else {
                    
    //                 pullnoposterdata();  

    //             }
        
    //             });
    //         };

            
    //         getResultsCount();

                   
    //         console.log("if (film == \"\") else condition ended");
              
    //         }
 
    //     return false;
    // }
 
    // $('#search').click(getPoster);
    // $('#term').keyup(function(event){
    //     if(event.keyCode == 13){
    //         getPoster();
    //     }
    // });
 
 });