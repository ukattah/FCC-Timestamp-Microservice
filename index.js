// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === 'Invalid Date'

// your first API endpoint... 
app.get("/api/:date", (req, res) => { // date placement
  const dateString = req.params.date;
 
  let date = new Date(dateString)

  if (isInvalidDate(date)) {
    date = new Date(+dateString)
  } 
  if (isInvalidDate(date)) {
    res.json({error: 'Invalid Date'})
    return
  }

  let unixTime = date.getTime()
  let utcTime = date.toUTCString()

  res.json({unix: unixTime, utc: utcTime})
})

app.get("/api", (req, res) => { // empty date placement
  const date = new Date()

  let unixTimestamp = date.getTime()
  let utcTimestamp = date.toUTCString()

    res.json({unix: unixTimestamp, utc: utcTimestamp})
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
