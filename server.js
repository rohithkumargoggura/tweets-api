	
const express = require('express');
const Twitter = require('twit');
 
const app = express();
const client = new Twitter({
    consumer_key: "LCjnTjrz928XVWs8ggCQumL1n",
    consumer_secret: "xXMgFRIGQilldbFyhXDnevXHalzzm9UwcrezLCWwVaDFfVOQig",
    access_token: "3010072927-iVSymULHiwiEjeTUxsAT2uPISxi29onX38bynlA",
    access_token_secret: "PQSDq4JnRyE72ArIHKUSBt5CgsUyEKYCrG5lq8TRFya7E"
});
 
 
app.use(require('cors')());
app.use(require('body-parser').json());
 
app.get('/home_timeline', (req, res) => {
    const params = { tweet_mode: 'extended',q: 'since:2019-06-11', count: 20 };
   
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
         
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.get('/mentions_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };
   
    client
      .get(`statuses/mentions_timeline`, params)
      .then(timeline => {
       
        res.send(timeline);
      })
      .catch(error => {
      res.send(error);
    });
      
});

app.post('/post_tweet', (req, res) => {
 
  tweet = {status:"Hello world"};
     
    client
      .post(`statuses/update`, tweet)
      .then(timeline => {
        console.log(timeline);
         
        res.send(timeline);
      })
 
     .catch(error => {
      res.send(error);
    });
       
    
});
 
app.listen(3000, () => console.log('Server running at port 3000'));