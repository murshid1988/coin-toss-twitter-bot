//Using Twit library
var Twit = require('twit')

//Getting the config info from config.js
//Check config.sample.js for the sample code
var Config = require('./config.js');

//Creating a new Twit object
var T = new Twit(Config);

//Creating a user stream
var stream = T.stream('user');

//Listenign to Tweets
stream.on('tweet', tweetEvent);

//When a tweet event happens
function tweetEvent(data) {

    //Getting the @ mention
    var replyto = data.in_reply_to_screen_name;

    //Getting the owner of the tweet
    var from = data.user.screen_name;

    //Getting the hashtags in tweet
    var hashtags = data.entities.hashtags;

    //Checking if the tweet is targetted at the bot
    if (replyto == 'referee_bot') {

        //Looping through the hashtags
        hashtags.forEach(function(element) {
            
            //Only going to reply back if the hashtags are either the mentioned one below
            //Unnecessary condion, I know. Just to add a small randomization
            if (element.text == 'flipacoin') {

                //Running the toss function
                var result = toss();

                //Tweeting back with a spicifc hashtag
                tweetback('flippedacoin', result, from);
                
            } else if (element.text == 'tossacoin') {

                var result = toss();
                tweetback('tossedacoin', result, from)
            }
        });
       
    }
}

//Toss function
function toss(){

    //Random number, 1 or 2
    var coin = Math.floor(Math.random() * 2) + 1;
    
    if(coin == 1) {
        return 'HEADS';
    } else {
        return 'TAILS';
    }

}

function tweetback(tag, result, from) {

    var text = 'Hi .@'+ from + '! You have got ' + result +'. #'+tag+ ' #ID'+ Math.floor(Math.random() * 99999) + 1 

     //Tweeting back
    T.post('statuses/update', { status: text}, 
        function(err, data, response) {
        //console.log(data)
    });
}