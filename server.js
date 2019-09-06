const express = require("express");
const Twitter = require("twit");

const app = express();

const CryptoJS = require("crypto-js");
const oauth = require("oauth");
const _twitterConsumerKey = "LCjnTjrz928XVWs8ggCQumL1n";
const _twitterConsumerSecret =
  "xXMgFRIGQilldbFyhXDnevXHalzzm9UwcrezLCWwVaDFfVOQig";
const twitterCallbackUrl = "http://localhost:4200/webpack-dev-server";

const client = new Twitter({
  consumer_key: "LCjnTjrz928XVWs8ggCQumL1n",
  consumer_secret: "xXMgFRIGQilldbFyhXDnevXHalzzm9UwcrezLCWwVaDFfVOQig",
  access_token: "3010072927-iVSymULHiwiEjeTUxsAT2uPISxi29onX38bynlA",
  access_token_secret: "PQSDq4JnRyE72ArIHKUSBt5CgsUyEKYCrG5lq8TRFya7E"
});

app.use(require("cors")());
app.use(require("body-parser").json());

// app.get("/api/user", (req, res) => {
//   client
//     .get("account/verify_credentials")
//     .then(user => {
//       res.send(user);
//     })
//     .catch(error => {
//       res.send(error);
//     });
// });

const consumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  _twitterConsumerKey,
  _twitterConsumerSecret,
  "1.0A",
  twitterCallbackUrl,
  "HMAC-SHA1"
);
app.get("/connect", (req, res) => {
  consumer.getOAuthRequestToken(function(
    error,
    oauthToken,
    oauthTokenSecret,
    results
  ) {
    if (error) {
      console.log("error");
      res.send(error, 500);
    } else {
      console.log("else");
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      const redirect = {
        redirectUrl: `https://twitter.com/oauth/authorize?oauth_token=${req.session.oauthRequestToken}`
      };
      res.send(redirect);
    }
  });
});

app.get("/saveAccessTokens", (req, res) => {
  consumer.getOAuthAccessToken(
    req.query.oauth_token,
    req.session.oauthRequestTokenSecret,
    req.query.oauth_verifier,
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (error) {
        logger.error(error);
        res.send(error, 500);
      } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        return res.send({ message: "token saved" });
      }
    }
  );
});

app.get("/home_timeline", (req, res) => {
  const params = { tweet_mode: "extended", q: "since:2019-06-11", count: 20 };

  client
    .get(`statuses/home_timeline`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
      res.send(error);
    });
});

app.get("/mentions_timeline", (req, res) => {
  const params = { tweet_mode: "extended", count: 10 };

  client
    .get(`statuses/mentions_timeline`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
      res.send(error);
    });
});

app.post("/post_tweet", (req, res) => {
  tweet = { status: "Hello world" };

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

app.listen(3000, () => console.log("Server running at port 3000"));
