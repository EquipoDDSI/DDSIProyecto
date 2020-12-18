//**************************************************************************
// Routes for cargo

// Method   Route           Body Params (raw json)              Action
// ______________________________________________________________________________      
//  GET     /                                                  List all cargo
//  GET     /:codeCargo                                       Select one cargo
//  DELETE  /:codeCargo                                      Delete a cargo
//  PUT     /:codeCargo     nombreCargo                 Update a cargo
//  POST    /                nombreCargo                   Upload a cargo

//   [NOTE] : To use body params (raw json) you need to include 
//             "Content type : application/json" in the header.

//**************************************************************************
const express = require('express');
const mysqlConnection = require('../database');
const router  = express.Router();
//--------------------------------------------------------------------------

// List all cargo
router.get('/cargo/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM cargo', (err,rows,fields)=>{
        if(!err)
            res.json(rows);
        else 
            console.log(err);
    })
})

// Select a cargo
router.get('/cargo/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM cargo WHERE codeCargo=?', [id], (err,rows,fields)=>{
        if(!err)
            res.json(rows[0]);
        else 
            console.log(err);
    })
})

// Create a cargo
router.post('/cargo/', (req, res) => {
    const {nombreCargo} = req.body;
    const query = `
        CALL cargoAddOrEdit (0, ?);
    `;
    mysqlConnection.query(query, [nombreCargo], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Cargo guardado'});
        else 
            console.log(err);
    });
})

// Update a cargo
router.put('/cargo/:codeCargo', (req, res) => {
    const {nombreCargo} = req.body;
    const {codeCargo} = req.params;

    const query = `
        CALL cargoAddOrEdit (?, ?);
    `;
    mysqlConnection.query(query, [codeCargo, nombreCargo], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Cargo actualizado'});
        else 
            console.log(err);
    });
})

// Delete a cargo
router.delete('/cargo/:codeCargo', (req,res)=>{
    const {codeCargo} = req.params;

    mysqlConnection.query('DELETE FROM cargo WHERE codeCargo=?', [codeCargo], (err, rows, fields) => {
        if(!err)
            res.json({status: 'Cargo eliminado'});
        else
            console.log(err);
    })
})

//--------------------------------------------------------------------------
// It exports the prev-defined routes
module.exports = router;