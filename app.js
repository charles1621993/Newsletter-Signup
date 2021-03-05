const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({  extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const  firstName = req.body.fname;
  const  lastName = req.body.lname;
  const  email = req.body.email;
  console.log(firstName, lastName, email)

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data)

  const url = "https://us1.admin.mailchimp.com/lists/60214d8291"

  const options ={
    method:"POST",
    auth:"de15f017c23e92f916780f5155286718-us1"
  }
  const request = https.request(url, options, function(response) {

    response.on("data", function(data){
      console.log(data);
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData)
  request.end();

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})

// API key
// de15f017c23e92f916780f5155286718-us1


// audience id
// 60214d8291
