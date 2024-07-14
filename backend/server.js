const con = require('./databasepg.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

//for login functionality
app.post('/login', (req, res) => {
    const info = JSON.parse(req.body);
    con.query('SELECT * FROM app_user where lower(username)=%s', info.password.toLowerCase(), (error, results) => {
        if (error) {
          throw error
        }
        if (results.rows.length == 0){
            res.send('User does not exist.')
        }
        res.status(200).json(results.rows)
  })
    con.query('SELECT * FROM app_user where lower(password)=%s', info.password.toLowerCase(), (error, results) => {
            if (error) {
              throw error
            }
            if (results.rows.length == 0){
                res.send('Incorrect username or password.')
            }
            res.status(200).json(results.rows)
  })
})

//for sign up functionality
app.post('/sign_up', (req, res) => {
    const info = JSON.parse(req.body);
    con.query('insert into app_user(username, password, email, first_name, last_name, summary, phone_number, mentor, mentee, education, location) values (%s, %s, %s, %s, %s, %s, %d, %b, %b, %s, %s)', info.username,info.password, info.email, info.first_name, info.last_name, info.summary, info.phone_number, info.mentor, info.mentee, info.education, info.location, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

//gets all of user's info for profile
app.get('/profile/:id', (req, res) => {
    const id = parseInt(request.params.id)
    con.query('SELECT * FROM app_user where user_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
})

//gets some of user's info
app.get('/', (req, res) => {
    const id = parseInt(request.params.id)
    con.query('SELECT first_name, last_name, mentor, mentee, education, location FROM app_user where user_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    con.query('SELECT employment_history_id FROM user_employment_history where user_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        con.query('SELECT company, position FROM employment_history where employment_history_id = $1', [results], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
          })
    })
    con.query('SELECT interest_id FROM user_interests where user_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        con.query('SELECT interest_name FROM interests where interest_id = $1', [results], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
          })
      })
})

//only mentees
app.get('/mentees', (req, res) => {
    const id = parseInt(request.params.id)
    con.query('SELECT * FROM app_user where mentee = true', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
})

app.get('/mentors', (req, res) => {
    const id = parseInt(request.params.id)
    con.query('SELECT * FROM app_user where mentor = true', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// POST route
app.post('/api/data', (req, res) => {
    const data = req.body;
    // Process the data
    res.json({ message: 'Data received', data });
});

