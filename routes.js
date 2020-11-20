module.exports = function(app) {
    
    app.use('/api/appoinments',require('./api/appoinments'));
    app.use('/api/slots', require('./api/slots'));
 
}