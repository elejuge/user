
const mysql = require('mysql');
const express = require('express');
const bodyparser =  require('body-parser');

var app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'nativeuser',
	password:'password',
	database:'UserDB' 
})

mysqlConnection.connect((err) => {
	if(!err)
		console.log('DB Connection success.');
	else
		console.log('ERROR: ' + JSON.stringify(err, undefined, 2));
});

var port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server is listening on port '+port));

//get All users
app.get('/users', (req, res, next) => {
	mysqlConnection.query('SELECT * FROM user', (err, rows, fields)=>{
			if(!err){
				if(rows.length>=1){
					res.send(JSON.stringify(rows));
				}else{
					res.statusCode = 204;
					res.send('No data found');
				}
			}else{
				console.log(err);
				res.statusCode = 500;
				res.send('Internal Error');
			}

		});
	});

//get specific user
app.get('/users/:id', (req, res, next) => {
	mysqlConnection.query('SELECT * FROM user WHERE id=?',[req.params.id], (err, rows, fields)=>{
			if(!err){
				if(rows.length>=1){
					res.send(JSON.stringify(rows));
				}else{
					res.statusCode = 204;
					res.send('No data found');
				}
			}else{
				console.log(err);
				res.statusCode = 500;
				res.send('Internal Error');
			}

		});
	});

//delete specific user
app.delete('/users/:id', (req, res, next) => {
	mysqlConnection.query('DELETE FROM user WHERE id=?',[req.params.id], (err, rows, fields)=>{
			if(!err){
				if(rows.affectedRows==0){
					res.send('No Users deleted');
				}
				if(rows.affectedRows==1){
					res.send('One user delete (id: '+req.params.id+')');
				}

				if(rows.affectedRows>1){
					res.send('WARN: '+rows.affectedRows+' users deleted!');
				}
			}else{
				console.log(err);
				res.statusCode = 500;
				res.send('Internal Error');
			}

		});
	});

//Create specific user
app.post('/users', (req, res, next) => {
	let user = req.body;
	if(user.first==null || user.first.length==0){
	 	res.send('please set first name');
	 	return;
	}
	if(user.last==null || user.last.length==0) {
		res.send('please set last name');
		return;
	}

	var sql = 'INSERT INTO user (first, last, email, birth, sex, phone, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ';
	mysqlConnection.query(sql,
		[user.first, user.last, user.email, user.birth, user.sex, user.phone, user.address, user.password],
		 (err, rows, fields)=>{
			if(!err){
				user.id = rows.insertId;
				res.send(user);
			}else{
				console.log(err);
				res.statusCode = 500;
				res.send('Internal Error');
			}

		});
	});

//Update specific user
app.put('/users/:id', (req, res, next) => {
	let user = req.body;
	//Validate req body (already exists and all)
	//Validate req body (already exists and all)
	if(user.first==null || user.first.length==0){
	 	res.send('please set first name');
	 	return;
	}
	if(user.last==null || user.last.length==0) {
		res.send('please set last name');
		return;
	}

	var sql = 'UPDATE user SET first =?, last=?, email=?, birth=?, sex=?, phone=?, address=?, password=? WHERE id=?';
	mysqlConnection.query(sql,
		[user.first, user.last, user.email, user.birth, user.sex, user.phone, user.address, user.password, req.params.id],
		 (err, rows, fields)=>{
			if(!err){
				if(rows.affectedRows==0){
					res.send('No Users updated');
				}
				if(rows.affectedRows==1){
					res.send('User updated (id: '+req.params.id+')');
				}

				if(rows.affectedRows>1){
					res.send('WARN: '+rows.affectedRows+' users updated!');
				}
			}else{
				console.log(err);
				res.statusCode = 500;
				res.send('Internal Error');
			}

		});
	});
