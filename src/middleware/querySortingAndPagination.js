const paginationAndSorting = function (req, res, next) {

    const limit = req.query.limit
    const skip = limit * parseInt(req.query.skip)
    sort = {}

    if (req.query.sortBy) {
        req.query.sortBy.split('&').map(keyValue => {
            const arr = keyValue.split(':')
            sort[arr[0]] = arr[1]
        })
    }

    req.options = { limit, skip, sort }
    
    next()

}

module.exports = paginationAndSorting