//**************************************************************************
// Routes for tfm

// Method   Route           Body Params (raw json)              Action
// ______________________________________________________________________________      
//  GET     /                                                   List all tfm
//  GET     /:codeTfm                                           Select one tfm
//  DELETE  /:codeTfm                                           Delete a tfm
//  PUT     /:codeTfm       nombre, descripcion                 Update a tfm
//  POST    /               nombre,descripcion                  Upload a tfm

//   [NOTE] : To use body params (raw json) you need to include 
//             "Content type : application/json" in the header.

//**************************************************************************
const express = require('express');
const mysqlConnection = require('../database');
const router  = express.Router();
//--------------------------------------------------------------------------

// List all tfm
router.get('/tfm/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM tfm', (err,rows,fields)=>{
        if(!err)
            res.json(rows);
        else 
            console.log(err);
    })
})

// Select a tfm
router.get('/tfm/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM tfm WHERE codeTfm=?', [id], (err,rows,fields)=>{
        if(!err)
            res.json(rows[0]);
        else 
            console.log(err);
    })
})

// Create a tfm
router.post('/tfm/', (req, res) => {
    const {nombre, descripcion} = req.body;
    const query = `
        CALL tfmAddOrEdit (0, ?, ?);
    `;
    mysqlConnection.query(query, [nombre, descripcion], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Tfm guardada'});
        else 
            console.log(err);
    });
})

// Update a tfm
router.put('/tfm/:codeTfm', (req, res) => {
    const {nombre, descripcion} = req.body;
    const {codeTfm} = req.params;

    const query = `
        CALL tfmAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [codeTfm, nombre, descripcion], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Tfm actualizada'});
        else 
            console.log(err);
    });
})

// Delete a tfm
router.delete('/tfm/:codeTfm', (req,res)=>{
    const {codeTfm} = req.params;

    mysqlConnection.query('DELETE FROM tfm WHERE codeTfm=?', [codeTfm], (err, rows, fields) => {
        if(!err)
            res.json({status: 'Tfm eliminada'});
        else
            console.log(err);
    })
})

//--------------------------------------------------------------------------
// It exports the prev-defined routes
module.exports = router;