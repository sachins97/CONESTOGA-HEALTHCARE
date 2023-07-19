const express = require('express');
const app = express();
const sql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const config = {
  server: 'DESKTOP-3NQT7IB\\SSQL',
  driver: 'msnodesqlv8',
  database: 'Hospital',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    enableArithAbort: true, // Use Windows authentication
  },
};

app.use(express.urlencoded({ extended: true }));

app.post('/DoctorLogin', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  sql.connect(config)
    .then(() => {
      return sql.query`SELECT DoctorId FROM Doctors WHERE username = ${username} AND password = ${password}`; // Replace Doctor with the actual table name
    })
    .then((result) => {
      if (result.recordset.length === 0) {
        res.send('Login Failed');
      } else if (result.recordset.length === 1) {
        res.send('Login Successful');
      } else {
        res.send('Multiple users found with the same credentials');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    })
    .finally(() => {
      sql.close();
    });
});

app.post('/alogin', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  sql.connect(config)
    .then(() => {
      return sql.query`SELECT AdminId FROM Admins WHERE username = ${username} AND password = ${password}`; // Replace Doctor with the actual table name
    })
    .then((result) => {
      if (result.recordset.length === 0) {
        res.send('Login Failed');
      } else if (result.recordset.length === 1) {
        res.send('Login Successful');
      } else {
        res.send('Multiple users found with the same credentials');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    })
    .finally(() => {
      sql.close();
    });
});

app.listen(8080, () => {
  console.log('App running');
});
