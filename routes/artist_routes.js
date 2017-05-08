var express = require('express');
var router = express.Router();
var artist_dal = require('../model/artist_dal');

// View All artist
router.get('/all', function(req, res) {
    artist_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('artist/artistViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
       artist_dal.getById(req.query.artist_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('artist/artistViewById', {'result': result});
           }
        });
    }
});

// Return the add a a new artist form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    artist_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('artist/artistAdd', {'artist': result});
        }
    });
});

// Insert a new artist
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.artist_name == "") {
        res.send('Please provide an artist name.');
    }
    else if(req.query.email == "") {
        res.send('Please provide an email.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        artist_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.artist_id == null) {
        res.send('An artist id is required');
    }
    else {
        artist_dal.edit(req.query.artist_id, function(err, result){
            res.render('artist/artistUpdate', {artist: result[0]});
        });
    }
});



router.get('/update', function(req, res) {
    artist_dal.update(req.query, function(err, result){
       res.redirect(302, '/artist/all');
    });
});

// Delete an artist for the given company_id
router.get('/delete', function(req, res){
    if(req.query.artist_id == null) {
        res.send('artist_id is null');
    }
    else {
         artist_dal.delete(req.query.artist_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/artist/all');
             }
         });
    }
});

module.exports = router;