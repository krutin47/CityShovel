const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var database = require('../utils/database');

// Fetch shoveler API
router.route('/fetch_shoveler').get((req, res) => {
    
    // const _token = req.body._token;

    // jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
    //     //if there is any error performing the query it will be thrown and will be out of this call.
    //     if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

    //     decoded.userId
    // });

    const fetchShoveler = 'SELECT * FROM user WHERE role=1'
    database.then((connection) => {
        connection.query( fetchShoveler, (error, results, fields) => {
            //if there is any error performing the query it will be thrown and will be out of this call.
            if(error){ return res.send(JSON.stringify({"status": 400, "error": err})); }
    
            if(results) {
                return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": results}));                    
            }
        });
    }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
});

// Fetch House owner API
router.route('/fetch_HouseOwner').get((req, res) => {
    
    // const _token = req.body._token;

    // jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
    //     //if there is any error performing the query it will be thrown and will be out of this call.
    //     if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

    //     decoded.userId
    // });

    const fetchHouesOwner = 'SELECT * FROM user WHERE role=2'
    
    database.then((connection) => {
        connection.query( fetchHouesOwner, (error, results, fields) => {
            //if there is any error performing the query it will be thrown and will be out of this call.
            if(error){ return res.send(JSON.stringify({"status": 400, "error": err})); }
    
            if(results) {
                return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": results}));                    
            }
        });
    }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
});

// Fetch Most Rated and Reviewed Shoveler API
router.route('/fetch_avg_shoveler').get((req, res) => {
    
    // const _token = req.body._token;

    // jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
    //     //if there is any error performing the query it will be thrown and will be out of this call.
    //     if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

    //     decoded.userId
    // });

    const fetchMostRatedShoveler = 'SELECT u.userId, u.email, u.firstName, u.LastName, u.address, u.contact, avg(rating) as average, count(ratedUser) as count '+
                            'FROM mydb.rating r JOIN mydb.user u '+
                            'ON r.ratedUser = u.userId '+
                            'where u.role = 1 '+
                            'group by r.ratedUser '+
                            'order by average desc, count desc '+
                            'LIMIT 3; ';
    
    database.then((connection) => {
        connection.query( fetchMostRatedShoveler, (error, results, fields) => {
            //if there is any error performing the query it will be thrown and will be out of this call.
            if(error){ return res.send(JSON.stringify({"status": 400, "error": error})); }
    
            if(results) {
                return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": results}));                    
            }
        });
    }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});                    
});

// Fetch Most Rated and Reviewed HouseOwner API
router.route('/fetch_avg_HouseOwner').get((req, res) => {
    
    // const _token = req.body._token;

    // jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
    //     //if there is any error performing the query it will be thrown and will be out of this call.
    //     if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

    //     decoded.userId
    // });

    const fetchMostRatedHouseOwner = 'SELECT u.userId, u.email, u.firstName, u.LastName, u.address, u.contact, avg(rating) as average, count(ratedUser) as count '+
                            'FROM mydb.rating r JOIN mydb.user u '+
                            'ON r.ratedUser = u.userId '+
                            'where u.role = 2 '+
                            'group by r.ratedUser '+
                            'order by average desc, count desc '+
                            'LIMIT 3; '

    database.then((connection) => {
        connection.query( fetchMostRatedHouseOwner, (error, results, fields) => {
            //if there is any error performing the query it will be thrown and will be out of this call.
            if(error){ return res.send(JSON.stringify({"status": 400, "error": error})); }
    
            if(results) {
                return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": results}));                    
            }
        });
    }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
});

// Fetch Login History of The User API
router.route('/fetch_login_history').post((req, res) => {
    
    const _token = req.body._token;

    jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
        //if there is any error performing the query it will be thrown and will be out of this call.
        if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

        const fetchLoginHistory = 'SELECT * FROM mydb.loginhistory WHERE userId ='+ decoded.userId +' order by loginDate desc;'

        database.then((connection) => {
            connection.query( fetchLoginHistory, (error, results, fields) => {
                //if there is any error performing the query it will be thrown and will be out of this call.
                if(error){ return res.send(JSON.stringify({"status": 400, "error": err})); }
        
                if(results) {
                    return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": results}));                    
                }
            });
        }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
    });
});

// Fetch Last Login Time of The User API
router.route('/fetch_last_login').post((req, res) => {
    
    const _token = req.body._token;

    jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
        //if there is any error performing the query it will be thrown and will be out of this call.
        if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

        const fetchLoginHistory = 'SELECT * FROM mydb.loginhistory WHERE userId ='+ decoded.userId +' order by loginDate desc LIMIT 2;'

        database.then((connection) => {
            connection.query( fetchLoginHistory, (error, results, fields) => {
                //if there is any error performing the query it will be thrown and will be out of this call.
                if(error){ return res.send(JSON.stringify({"status": 400, "error": error})); }
        
                if(results) {

                    var milisec = Math.abs(results[1].loginDate - results[0].loginDate); 

                    var seconds = Math.floor(milisec/1000);
                    console.log(seconds);
                    var minutes = Math.floor(seconds/60);
                    console.log(minutes);
                    var hours = Math.floor(minutes/60);
                    console.log(hours);
                    var days = Math.floor(hours/24);
                    console.log(days);

                    return res.send(JSON.stringify({
                        "status": 200, 
                        "error": null, 
                        "message":"Added new User record in the database", 
                        "response": 'Last Login was '+ days +' days '+ hours +' hours '+ minutes +' minutes '+ seconds +' seconds ago'
                    }));                    
                }
            });
        }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
    });
});

// Rate The User API
router.route('/rate_user').post((req, res) => {
    
    const _token = req.body._token;
    const ratedUser = req.body.ratedUser;
    const rating = req.body.rating;

    jwt.verify(_token, keys.secretOrKey, function(err, decoded) {
        //if there is any error performing the query it will be thrown and will be out of this call.
        if(err) { return res.send(JSON.stringify({"status": 400, "error": err})); }

        const rateUser = 'INSERT INTO rating VALUES (0,'+ decoded.userId +', '+ ratedUser +', '+ rating +');'

        database.then((connection) => {
            connection.query( rateUser, (error, results, fields) => {
                //if there is any error performing the query it will be thrown and will be out of this call.
                if(error){ return res.send(JSON.stringify({"status": 400, "error": err})); }
        
                // var diff = Math.abs(new Date() - new Date(dateStr.replace(/-/g,'/')));
                if(results) {
                    return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": results}));                    
                }
            });
        }).catch((err) => {return res.send(JSON.stringify({"status": 400, "error": err, "message":"Connection ERROR!! database not connected"}));});
    });
});

module.exports = router;
