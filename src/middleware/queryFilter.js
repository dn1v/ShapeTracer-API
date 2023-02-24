
const queryFilter = function (req, res, next) {
    const match = {}

    const rangeOperator = req.query.rangeOperator
    
    if (req.query.dateFrom) match['createdAt'] = {'$gte': new Date(req.query.dateFrom) }

    if (req.query.dateTo) match['createdAt'] = {'$lte': new Date(req.query.dateTo) }

    if (['lte', 'gte'].includes(rangeOperator)) {
        Object.keys(req.query).map(key => match[key] = {['$' + rangeOperator]: req.query[key]})
    } 

    if (!rangeOperator) Object.keys(req.query).map(key => match[key] = req.query[key])
    
    req.match = match

    next()

};

// const queryFilter = function (req, res, next) {
//     const match = {}

//     const rangeOperator = req.query.rangeOperator
    
//     const dateFilters = []

//     if (req.query.dateFrom) dateFilters.push({'createdAt': {'$gte': new Date(req.query.dateFrom) }})

//     if (req.query.dateTo) dateFilters.push({'createdAt': {'$lte': new Date(req.query.dateTo) }})

//     if (dateFilters.length > 0) match['$and'] = dateFilters;

//     if (['lte', 'gte'].includes(rangeOperator)) {
//         Object.keys(req.query).map(key => {
//             if (key !== 'dateFrom' && key !== 'dateTo') {
//                 match[key] = {['$' + rangeOperator]: req.query[key]}
//             }
//         })
//     } 

//     if (!rangeOperator) Object.keys(req.query).map(key => {
//         if (key !== 'dateFrom' && key !== 'dateTo') {
//             match[key] = req.query[key]
//         }
//     })
    
//     req.match = match

//     next()

// };
module.exports = queryFilter


