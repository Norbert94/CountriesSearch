let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let axios = require('axios');

let app = express();
let port = process.env.PORT || 5000;
let url = "https://restcountries.eu/rest/v2";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/world', (req, res) => {
  let fullRequest = url + '/' + req.query.type + '/' + req.query.name

  if (req.query.type === "fullText") {
    fullRequest = url + "/name/" + req.query.name + "?fullText=true"
  }
  console.log(fullRequest);
  axios.get(fullRequest).then(resp => {
    // The whole response has been received. Print out the result.
    
      res.json(resp.data);
  
  }).catch((err) => {
    console.log("Error: " + err.message);
  });
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));