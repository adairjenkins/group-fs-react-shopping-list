const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
router.get('/', (req, res) => {
    console.log('Getting...');

    const queryText = `
    SELECT * FROM "items"
    ORDER BY "purchased", "name";`

    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500);
    })
    
})

router.delete('/:id', (req, res) => {
    console.log('delete an item', req.params.id);
    let id =req.params.id;
    const queryText = `
    DELETE FROM "items"
    WHERE "id" = $1;
    `;

    const values =[id];

    pool.query(queryText, values)
    .then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
    
});

module.exports = router;