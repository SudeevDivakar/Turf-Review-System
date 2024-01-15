//Function to catch any errors that occur in routes 

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(e => next(e));
    }
}