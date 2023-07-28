const express = require('express');
const app = express();
const sql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');
const { Connection, Request } = require('tedious');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const config = {
  server: 'DESKTOP-D0HCBJN\\SQLEXPRESS',
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

//----------------------------ADMIN LOGIN-------------

app.post('/AdminLogin', (req, res) => {
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




app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  sql.connect(config)
    .then(() => {
      return sql.query`SELECT StaffId FROM Staff WHERE username = ${username} AND password = ${password}`; // Replace Doctor with the actual table name
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


//patient registration
app.post('/PatientRegistration', (req, res) => {
  let name = req.body.name;
  let dateOfBirth =req.body.dateOfBirth;
  let gender = req.body.gender;
  let address = req.body.address;
  let phone = req.body.phone;
  let insurance = req.body.insurance;

  sql.connect(config)
    .then(() => {
      return sql.query`INSERT INTO PatientRecords (Name,Dob,Gender,Phone,Address,InsuranceNumber) Values (${name},${dateOfBirth},${gender},${phone},${address},${insurance})`; // Replace Doctor with the actual table name
    })
    .then((result) => {
      if (result.rowsAffected[0] === 0) {
        res.send('INSERT Failed');
      } else {
        res.send('INSERT Successful');
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

app.get('/patients/:patientId', async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('patientId', sql.Int, patientId)
      .query('SELECT * FROM PatientRecords WHERE PatientRecordId = @patientId'); // Replace PatientRecords with the actual table name

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Patient ID not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching patient details' });
  }
});


// Route to fetch department values
app.get('/departments', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Department'); // Replace Department with the actual table name

    if (result.recordset.length > 0) {
      // Extracting department names from the result
      const departmentNames = result.recordset.map((row) => row.departmentName);
      res.json(departmentNames);
    } else {
      res.status(404).json({ error: 'No departments found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching departments' });
  }
});

app.get('/doctors/:department', async (req, res) => {

  const { department } = req.params;

  try {

    const pool = await sql.connect(config);

    const result = await pool.request()

      .input('department', sql.NVarChar, department)

      .query('SELECT * FROM Doctors WHERE DepartmentId IN (SELECT departmentId FROM Department WHERE departmentname = @department)');




    res.json(result.recordset);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'An error occurred while fetching doctors' });

  }

});



app.post('/appointments', async (req, res) => {
  try {
    const { patientrecordid, doctorid, date, time, paymentid } = req.body;

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('patientrecordid', sql.Int, patientrecordid) // Assuming patientrecordid is an integer (use the appropriate SQL type)
      .input('doctorid', sql.Int, doctorid) // Assuming doctorid is an integer (use the appropriate SQL type)
      .input('date', sql.Date, date) // Assuming date is a Date object (use the appropriate SQL type)
      .input('time', sql.Time, time) // Assuming time is a string in 'HH:mm:ss' format (use the appropriate SQL type)
      .input('paymentId', sql.NVarChar(10), paymentid) // Assuming paymentId is a string with max length 10 (change the length as needed)
            .query('INSERT INTO Appointments (PatientRecordId, DoctorId, date, paymentId, time ) VALUES (@patientrecordid, @doctorid, @date,@paymentid, @time )');

    if (result.rowsAffected[0] === 0) {
      res.send('INSERT Failed');
    } else {
      res.send('INSERT Successful');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/appointments', async (req, res) => {
  console.log('req.query.date:', req.query.date);
  console.log('req.query.doctorid:', req.query.doctorid);

  let date = req.query.date;
  let doctorid = req.query.doctorid;
  // Convert date from 'DD/MM/YYYY' to 'YYYY-MM-DD' format
  const [day, month, year] = date.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('doctorid', sql.Int, parseInt(doctorid)) // Convert doctorid to an integer
      .input('date', sql.Date, new Date(formattedDate)) // Convert date to a Date object
      .query('SELECT * FROM appointments WHERE date = @date AND doctorId = @doctorid');

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
});

// Get appointment details by ID
app.get('/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('appointmentId', sql.Int, appointmentId)
      .query('SELECT * FROM appointments WHERE AppointmentId = @appointmentId');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching appointment details' });
  }
});

// Update appointment details by ID
app.put('/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;
  const { date, time } = req.body;

  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('appointmentId', sql.Int, appointmentId)
      .input('date', sql.Date, new Date(date)) // Assuming date is in 'YYYY-MM-DD' format
      .input('time', sql.NVarChar, time) // Assuming time is in 'HH:mm:ss' format
      .query('UPDATE appointments SET date = @date, time = @time WHERE AppointmentId = @appointmentId');

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
});

// Delete appointment by ID
app.delete('/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const pool = await sql.connect(config);

    await pool
      .request()
      .input('appointmentId', sql.Int, appointmentId)
      .query('DELETE FROM appointments WHERE AppointmentId = @appointmentId');

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
});






app.listen(8080, () => {
  console.log('App running');
});
