/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `CustomerController.login()`
   */
    login: function (req, res) {
    
        // See `api/responses/login.js`
        return res.login({
          email: req.param('email'),
          password: req.param('password'),
          successRedirect: '/',
          invalidRedirect: '/login'
        });
    },
    
    
      /**
       * `CustomerController.logout()`
       */
    logout: function (req, res) {
    
        // "Forget" the customer from the session.
        req.session.me = null;
    
        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        if (req.wantsJSON) {
          return res.ok('Logged out successfully!');
        }
    
        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('/');
    },
    
    
      /**
       * `CustomerController.signup()`
       */
    signup: function (req, res) {
    
        // Attempt to signup a customer using the provided parameters
        Customer.signup({
          first_name: req.param('first_name'),
          last_name: req.param('last_name'),
          email: req.param('email'),
          password: req.param('password')
        }, function (err, customer) {
          // res.negotiate() will determine if this is a validation error
          // or some kind of unexpected server error, then call `res.badRequest()`
          // or `res.serverError()` accordingly.
          if (err) return res.negotiate(err);
    
          // Go ahead and log this customer in as well.
          // Subsequent requests from this customer agent will have `req.session.me` set.
          req.session.me = customer.id;
    
          // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
          // send a 200 response letting the customer agent know the signup was successful.
          if (req.wantsJSON) {
            return res.ok('Signup successful!');
          }
    
          // if this is an HTML-wanting browser, redirect to /welcome.
          return res.redirect('/welcome');
        });
      }
	
};

