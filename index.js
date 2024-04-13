import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

.post('/ask', (req, res) => {
    let text = req.body.text;
    console.log(text);
    async function postData() {
        const todoObject = {"contents": [{"parts":[{"text": text}]}]};
      
        const options = {
          method: 'POST',
          body: JSON.stringify(todoObject),
          headers: { 'Content-Type': 'application/json' }
        }
      
        const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyDAtrcWon2Qsui-tqSjP8aJU7Y5h_mnuRo';
      
        try {
          const response = await fetch(url, options)
          const jsonResponse = await response.json();
          const responsetext = jsonResponse.candidates[0].content.parts[0].text;
          res.send(responsetext)
          console.log("Send");
        } catch(err) {
          res.send(err)
        }
      }
      
     postData();
     console.log("hello");
})

app.listen(3000, () => {
  console.log(`app listening on port 3000`)
})