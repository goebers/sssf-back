'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/*
passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    this.getUserById(id, () => {
        done(err, user);
    });
});
*/

passport.use(new LocalStrategy( (username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return done(null, false, {message: 'Unknown user'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            

            if(isMatch) {
                console.log('oikein meni');
                return done(null, user), {message: 'Correct password'};
            } else {
                console.log('vituiks meni');
                return done(null, false, {message: 'Invalid password'});
            }
        });
        
        // debug
        console.log('Found login user:')
        console.log(user);
    });
}));

module.export = passport;