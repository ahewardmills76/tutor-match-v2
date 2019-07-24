const express = require('express');
const cors = require('cors');
const mysql =require('mysql');

const app = express();

const SELECT_ALL_TUTORS_QUERY = 'SELECT * FROM tutors';

const SELECT_TUTORS_BY_SUBJECT_QUERY = 'SELECT tutors.* FROM tutors2subjects INNER JOIN tutors  ON tutors.id = tutors2subjects.tutor_id WHERE tutors2subjects.subject_id = 5'

const connection = mysql.createConnection ({
    host: '127.0.0.1',
    user: 'root' ,
    password: 'PassWord!',
    database: 'tutor_match_db'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});



app.use(cors());

app.get('/',(req, res) => {
res.send('go to /tutors to see a listing of tutors')
});

app.get('/tutors', (req, res) => {
connection.query(SELECT_ALL_TUTORS_QUERY,(err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});

app.get('/tutorsbysubject', (req,res) => {
    connection.query(SELECT_TUTORS_BY_SUBJECT_QUERY,(err, results) => {
        if(err) {
            returnbres.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
console.log('Tutor-match server listening on port 4000')
});