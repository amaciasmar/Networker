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

//API post request for login
app.post('/login', (req, res) => {
    const info = JSON.parse(req.body);
    con.query('SELECT * FROM app_user where lower(password)=%s AND lower(username) = %s', info.password.toLowerCase(), info.username.toLowerCase(), (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length == 0){
        res.send('Incorrect username or password.')
      }
      res.status(200).json(results.rows)
  })
})

//API post request for sign up
app.post('/sign_up', (req, res) => {
    const info = JSON.parse(req.body);
    let sign_up_query = 'insert into app_user(username, password, email, first_name, last_name, summary, phone_number, mentor, mentee, education, location, meeting_preference) values (%s, %s, %s, %s, %s, %s, %d, %b, %b, %s, %s, %s)' % (info.username, info.password, info.email, info.first_name, info.last_name, info.summary, info.phone_number, info.mentor, info.mentee, info.education, info.location, info.meeting_preference)
    con.query(sign_up_query, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

//sends frontend all the the information needed for the profile page.
app.get('/profile/:id', (req, res) => {
    const id = parseInt(req.params.id)
    con.query('SELECT email, first_name, last_name, summary, education, location, meeting_preference FROM app_user where user_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
    con.query('SELECT interest_name FROM interests WHERE interest_id = SELECT interest_id FROM user_interests where user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
  })

  con.query('SELECT endorsement, review FROM endorsements WHERE endorsement_id = SELECT endorsement_id FROM user_endorsements where endorsed_user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
})
con.query('SELECT company, position FROM employment_history WHERE employment_history_id = SELECT employment_history_id FROM user_employment_history where user_id = $1', [id], (error, results) => {
  if (error) {
    throw error
  }
  res.status(200).json(results.rows)
})
})

//returns all the information needed for the home page
//which is information about 9 random users
app.get('/', (req, res) => {
  const info = JSON.parse(req.body);
    let employment_query = 'SELECT company, position FROM employment_history where employment_history_id = SELECT employment_history_id From user_employment_history where user_id = $1'
    //add randomness random_id, random_id+1, random_id+2,...,random_id+8
    let count = 0;
    con.query('SELECT COUNT(user_id) FROM app_user', (error, results) => {
      if (error) {
        throw error
      }
      count = results.rows[0].count-9
    })
    let id = Math.floor(Math.random()*(count-1))+1
    for (let i = 0; i <= id + 9; i++) {
    con.query('SELECT first_name, last_name, mentor, mentee, education, location, meeting_preference FROM app_user where user_id = $1', [id+i], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
    con.query(employment_query, [id+i], (error, results) => {
        if (error) {
          throw error
        }
    })
    let interests_query = 'SELECT interest_name FROM interests where interest_id = SELECT interest_id FROM user_interests where user_id = $1'
    con.query(interests_query, [id+i], (error, results) => {
        if (error) {
          throw error
        }
      })
    }
})

//Displays 9 random users that have signed up to be mentees
//This function is used wehn mentee button is pressed
app.get('/search/mentees', (req, res) => {
    const info = JSON.parse(req.body);
      let count = 0;
    con.query('SELECT COUNT(user_id) FROM app_user', (error, results) => {
      if (error) {
        throw error
      }
      count = results.rows[0].count-9
    })
    let id = Math.floor(Math.random()*(count-1))+1
    for(let i = 0; i < id+9; i++) {
      let employment_query = 'SELECT company, position FROM employment_history where employment_history_id = SELECT employment_history_id From user_employment_history where user_id = ' + (id+i)
      if(info.search == 'A-Z'){
      con.query('SELECT first_name, last_name, mentor, mentee, education, location, meeting_preference FROM app_user where user_id = $1 AND mentee = true ORDER BY last_name ASC', [id+i], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
      } else {
        con.query('SELECT first_name, last_name, mentor, mentee, education, location , meeting_preference FROM app_user where user_id = $1 AND mentee = true ORDER BY last_name DESC', [id+i], (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
      }
      con.query(employment_query, (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
      })
      let interests_query = 'SELECT interest_name FROM interests where interest_id = SELECT interest_id FROM user_interests where user_id = ' + (id+i)
      con.query(interests_query, (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).json(results.rows)
        })
      }
})

//Displays 9 random users that have signed up to be mentors
//this function is used when mentor button is pressed
app.get('/search/mentors', (req, res) => {
  const info = JSON.parse(req.body);
    let count = 0;
    con.query('SELECT COUNT(user_id) FROM app_user', (error, results) => {
      if (error) {
        throw error
      }
      count = results.rows[0].count-9
      console.log(count);
    })
    let id = Math.floor(Math.random()*(count-1))+1
    for (let i = 0; i < id+9; i++) {
      let employment_query = 'SELECT company, position FROM employment_history where employment_history_id = SELECT employment_history_id From user_employment_history where user_id = ' + (id + i)
        if(info.search == 'A-Z'){
        con.query('SELECT first_name, last_name, mentor, mentee, education, location, meeting_preference FROM app_user where user_id = $1 AND mentor = true ORDER BY last_name ASC', [(id + i)], (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
        } else {
          con.query('SELECT first_name, last_name, mentor, mentee, education, location, meeting_preference FROM app_user where user_id = $1 AND mentor = true ORDER BY last_name DESC', [(id + i)], (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows)
          })
        }
        con.query(employment_query, (error, results) => {
            if (error) {
              throw error
            }
        })
        let interests_query = 'SELECT interest_name FROM interests where interest_id = SELECT interest_id FROM user_interests where user_id = ' + (id + i)
        con.query(interests_query, (error, results) => {
            if (error) {
              throw error
            }
          
          })
    }
        
    })

//below is a set of functions that will provide the results for a user using the search bar.
//this function will return information when a person's name is searched
function person_card(req, res) {
  const id = parseInt(req.params.id)
    con.query('SELECT first_name, last_name, summary, education, location, meeting_preference FROM app_user where user_id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
    con.query('SELECT interest_name FROM interests WHERE interest_id = SELECT interest_id FROM user_interests where user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
  })
  /*
  con.query('SELECT endorsement, review FROM endorsements WHERE endorsement_id = SELECT endorsement_id FROM user_endorsements where endorsed_user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
  */
  con.query('SELECT company, position FROM employment_history WHERE employment_history_id = SELECT employment_history_id FROM user_employment_history where user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
};
//This function will return information on a discussion group when discussion groups are searched
function group_card(){
  const id = parseInt(req.params.id)

}

function topic_card() {
  
}

//Search bar results function
function search_bar() {
  search_query = 'SELECT email, first_name, last_name, summary, education, location, meeting_preference FROM app_user'
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// POST route
app.post('/api/data', (req, res) => {
    const data = req.body;
    // Process the data
    res.json({ message: 'Data received', data });
});

