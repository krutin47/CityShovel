const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var database = require('../utils/database');
var sendMail = require('../utils/sendingEmail');

// login API
router.route('/login').post((req, res) => {
	
    if (!req.body.email.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Email-ID input is wrong..!'}));
    if (!req.body.password.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Password input is wrong..!'}));
    
    console.log(req.body.email);
    
    const email = req.body.email;
	const password = req.body.password;

    //checking if any User post exists in the database 
    const checkingEmail = 'SELECT * from user WHERE email="' + email + '";';
    
    database.then((connection) => {
        connection.query( checkingEmail, (error, results, fields) => {
            console.log(results);
            
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error) return res.send(JSON.stringify({"status": 400, "error": error}));
            
            // if there is no result then we don't have the record with EmailID and password
            if (results < 1) return res.send(JSON.stringify({"status": 404, "error": "NO User with same EmailID and Password exists..!!"}));
            
            const fetchedUser = results[0];
			console.log(fetchedUser.password);

            // Check password
			bcrypt.compare(password, fetchedUser.password).then(isMatch => {
				if (isMatch) {
					// User matched
					// Create JWT Payload
					const payload = {
                        userId: fetchedUser.userId,
                        email: fetchedUser.email
						// topic: fetchedUser.topic
					};
					
					// Sign token
					jwt.sign(
						payload,
						keys.secretOrKey,
						{
							expiresIn: "1 day"
						},
						(err, token) => {

                            //if there is any error performing the query it will be thrown and will be out of this call.
                            if (err) return res.send(JSON.stringify({"status": 400, "error": err}));

                            const loginHistory = 'INSERT INTO loginhistory values(0,'+ fetchedUser.userId  +', now())'
                            
                            connection.query( loginHistory, (lh_errors, lh_results, lh_fields) => {
                                
                                //if there is any error performing the query it will be thrown and will be out of this call.
                                if (lh_errors) return res.send(JSON.stringify({"status": 400, "error": lh_errors}));

                                //if there is no error than we will get the response with success status.
                                if(lh_results){
                                    return res.json({
                                        status: 200,
                                        error: null,
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            })
						}
					);
				} else {
				return res
					.status(400)
					.json({ error: "Password incorrect" });
				}
			});
		});
	});
});

// ADD new record
router.route('/register').post((req, res, next) => {
    
    if (!req.body.email.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Email-ID input is wronge..!'}));
    if (!req.body.firstName.trim()) return res.send(JSON.stringify({"status": 400, "error": 'First Name input is wronge..!'}));
    if (!req.body.lastName.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Last Name input is wronge..!'}));
    if (!req.body.password.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Password input is wronge..!'}));
    if (!req.body.address.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Address input is wronge..!'}));
    if (!req.body.contact.trim()) return res.send(JSON.stringify({"status": 400, "error": 'contact input is wronge..!'}));

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const address = req.body.address;
    const contact = req.body.contact;
    const role = req.body.role;

    //Role:
    // 1: shoveler
    // 2: House Owner(i.e., Old Person)
    
    //checking if any User post exists in the database 
    const checkingSQL = 'SELECT * from user WHERE email="' + email + '";';
    
    database.then((connection) => {
        connection.query( checkingSQL, (error, results, fields) => {
            
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error) return res.send(JSON.stringify({"status": 400, "error": error}));               
            
            if(results.length > 0){
               return res.json('Oops! Email id is already taken.');
            } else{
                
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (error_, hash) => {
                        if (error_) return res.send(JSON.stringify({"status": 400, "error": errors_}));					
                        
                        const sql = 'INSERT INTO user ' +
                                    'VALUES (0,"' + email + '", "' + firstName + '", "'+ lastName + '", "' + hash + '", "' + address + '", "' + contact + '","'+ role +'");';
                        
                        // Adding A User to user table
                        connection.query( sql, (errors, resultset, fields) => {
                            
                            //if there is any error performing the query it will be thrown and will be out of this call.
                            if (errors){ return res.send(JSON.stringify({"status": 400, "error": errors}));}
                            
                            //if there is no error than we will get the response with success status.
                            if(resultset) {
                                return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": resultset}));                    
                            } 
                        });
                    });
                });
                
            }
        });
    });
});

// To check for Specific Employee
// router.route('/logout/:token').get((req, res) => {
	
// 	jwt.verify(req.params.token, keys.secretOrKey, function(err, decoded) {
// 		console.log(decoded) // decoded token
// 		if(!err){
// 			const sql = 'update user_status set isonline = 0 where email = "' + decoded.email + '";';
// 			database.then((connection) => {
// 				connection.query( sql, (error, results, fields) => {
					
// 					//if there is any error performing the query it will be thrown and will be out of this call.
// 					if (error) return res.send(JSON.stringify({"status": 400, "error": error}));
					
// 					return res.json(results);
// 				});
// 			});
// 		} else {
// 			res.json('Error! ' + err);
// 		}
// 	})
// });

router.route('/update').post((req, res) => {
    
    if (!req.body.email.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Email-ID input is wronge..!'}));
    if (!req.body.firstName.trim()) return res.send(JSON.stringify({"status": 400, "error": 'First Name input is wronge..!'}));
    if (!req.body.lastName.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Last Name input is wronge..!'}));
    if (!req.body.address.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Address input is wronge..!'}));
    if (!req.body.contact.trim()) return res.send(JSON.stringify({"status": 400, "error": 'contact input is wronge..!'}));

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const contact = req.body.contact;
    
    const findUser = 'SELECT * from user WHERE email="' + email + '";';

    database.then((connection) => {    
        connection.query( findUser, (error, result, fields) => {
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error){ return res.send(JSON.stringify({"status": 400, "error": error}));}
    
            if(result){
                const updateQuery = 'UPDATE user SET firstName ="' + firstName + '", lastName ="' + lastName + '", address ="' + address + '", contact ="' + contact + '" WHERE email="' + email + '";';
        
                connection.query( updateQuery, (err, rs, field) => {
                    //if there is any error performing the query it will be thrown and will be out of this call.
                    if (err){ return res.send(JSON.stringify({"status": 400, "error": err}));}
        
                    //if there is no error than we will get the response with success status.
                    if(rs) {
                        return res.send(JSON.stringify({"status": 200, "error": null, "message":"Updated the User record in the database", "response": rs}));                    
                    }
                })
            } else {
                return res.send(JSON.stringify({"status": 400, "error": 'No such record in the database'}));
            }
        });
    }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
});
  
router.route('/forgot').post((req, res) => {
    
    const email = req.body.email;
    console.log("email", email)

    const findUser = 'SELECT * from user WHERE email="' + email + '";';
    
    database.then((connection) => {     
        connection.query( findUser, (error, result, fields) => {
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error){ return res.send(JSON.stringify({"status": 400, "error": error}));}
            
            console.log('result ---->');
            console.log(result);

            if(result){
                const findRestpassword = 'SELECT * from resetpassword WHERE idresetpassword="' + result[0].userId + '";';
        
                connection.query( findRestpassword, (rp_error, rp_results, field) => {
                    //if there is any error performing the query it will be thrown and will be out of this call.
                    if (rp_error){ return res.send(JSON.stringify({"status": 400, "error": rp_error}));}
        
                    //payload must be created
                    const payload = {
                        userId: result[0].userId,
                        email: result[0].email,
                    };
                    console.log("payload", payload)
                    console.log("keys.secretOrKey", keys.secretOrKey);
        
                    //sign the token with 3 days of expirations
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: '3 days' // 3 days in seconds
                        },
                        (err, token) => {

                            //if there is any error performing the query it will be thrown and will be out of this call.
                            if (err) return res.send(JSON.stringify({"status": 400, "error": err}));
                        
                            // if user have already requested for request than update the token
                            if (rp_results.length > 0) {
                                
                                const updateResetPasswordRequest = 'UPDATE resetpassword SET token="'+ token +'" WHERE idresetpassword=' + rp_results[0].idresetpassword + ';';

                                connection.query( updateResetPasswordRequest, (upr_error, upr_result, field) => {
                                    //if there is any error performing the query it will be thrown and will be out of this call.
                                    if (upr_error){ return res.send(JSON.stringify({"status": 400, "error": upr_error}));}
                        
                                    //if there is no error than we will get the response with success status.
                                    if(upr_result) {
                                        sendMail.forgotPassword(email, token);
                                        return res.send(JSON.stringify({"status": 200, "error": null, "message":"Updated the Password Reset record in the database", "response": upr_result}));                    
                                    }
                                })
                            } else {
    
                                const newResetPasswordRequest = 'INSERT INTO resetpassword VALUES('+ result[0].userId +',"'+ token +'")'
                                
                                connection.query( newResetPasswordRequest, (nrp_error, nrp_result, field) => {
                                    //if there is any error performing the query it will be thrown and will be out of this call.
                                    if (nrp_error){ return res.send(JSON.stringify({"status": 400, "error": nrp_error}));}
                        
                                    //if there is no error than we will get the response with success status.
                                    if(nrp_result) {
                                        sendMail.forgotPassword(email, token);
                                        return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added the Password Reset record in the database", "response": nrp_result}));                    
                                    }
                                })
                            }
                        }
                    );    
                })
            } else {
                return res.send(JSON.stringify({"status": 400, "error": 'No such record in the database'}));
            }
        });
    }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
});
  
//Reset User Password API
router.route('/reset').post((req, res) => {

    if (!req.body.password.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Password input is wronge..!'}));

    console.log("in the reset API....")
    const _token = req.body._token;
    const password = req.body.password;
    
    jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
        console.log(decoded) // decoded token
        if(!err){
        
            const findUser = 'SELECT * FROM user WHERE userId ='+ decoded.userId +';';
            
            database.then((connection) => {
                connection.query( findUser, (error, results, fields) => {
                    //if there is any error performing the query it will be thrown and will be out of this call.
                    if(error){ return res.send(JSON.stringify({"status": 400, "error": err})); }
            
                    if(results.length > 0) {

                        // Hash password before saving in database
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            bcrypt.hash(password, salt, (error_, hash) => {
                                // console.log(hash);
                                if (error_) return res.send(JSON.stringify({"status": 400, "error": errors_}));
                                
                                const updateQuery = 'UPDATE user SET password ="' + hash + '" WHERE userId ='+ decoded.userId + ';';
            
                                connection.query( updateQuery, (err, rs, field) => {
                                    //if there is any error performing the query it will be thrown and will be out of this call.
                                    if (err){ return res.send(JSON.stringify({"status": 400, "error": err}));}
                        
                                    //if there is no error than we will get the response with success status.
                                    if(rs) {
                                        const deletePasswordResetRequest= 'DELETE FROM resetpassword WHERE idresetpassword='+ decoded.userId +';' 

                                        connection.query( deletePasswordResetRequest, (dpr_error, dpr_result, field) => {
                                            //if there is any error performing the query it will be thrown and will be out of this call.
                                            if (dpr_error){ return res.send(JSON.stringify({"status": 400, "error": dpr_error}));}
                                            
                                            if(dpr_result){
                                                return res.send(JSON.stringify({"status": 200, "error": null, "message":"Updated the User record in the database", "response": rs}));                    
                                            }
                                        })
                                    }
                                })
                            });
                        });
                    }
                });
            }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
        }
    });
});

module.exports = router;