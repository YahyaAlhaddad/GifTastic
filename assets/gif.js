window.onload = function(){
    var animals = ["dog","cat" ,"turtle","tiger","monkey","squirrel","giraffe","mouse","chipmunk","deer","crow","lion","snake","woodpecker","sheep","buffalo","crocodile","goat","gorilla"];
        var animalButton = [];

        function nbutton(x){
            var button =$("<button>");
            button.text(x);
            button.addClass("btn btn-primary btn-lg animal");
            $("#buttons").append(button);
        }
        for (var i = 0; i < animals.length; i++) {
            nbutton(animals[i]);
        }
        
    $( "form" ).submit(function(event) {
        var input = $("input:first").val().trim();
        nbutton(input);
        animalButton.push(newButton);
        return false;
    });

    $("#buttons").on("click", '.animal',function(){
        var clickedButton = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedButton + "&api_key=CbJ3BeNuxbxU6DQXm6nFjlTGtSwbC6Td&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var result = response.data;
        
            for (var j = 0; j < result.length; j++) {
                var rating = result[j].rating;
                var imageDiv = $("<div class= 'images'>");
                var animalImage = $("<img>");

                animalImage.addClass("gifImage");
                var still = result[j].images.fixed_height_still.url;
                var animated = result[j].images.fixed_height.url;
                
                animalImage.attr("src", result[j].images.fixed_height_still.url);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state","still");

                var rateValue = $("<p>").text("Rating: " + rating);

                imageDiv.append(rateValue);
                imageDiv.append(animalImage);
                $("#animals").prepend(imageDiv);
            }
        });
    });
    $(document).on("click",".gifImage", function(){
        var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })
}
