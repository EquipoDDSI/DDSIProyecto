//**************************************************************************
// Routes for tfg

// Method   Route           Body Params (raw json)              Action
// ______________________________________________________________________________      
//  GET     /                                                   List all tfg
//  GET     /:codeTfg                                           Select one tfg
//  DELETE  /:codeTfg                                           Delete a tfg
//  PUT     /:codeTfg       nombre, descripcion                 Update a tfg
//  POST    /               nombre,descripcion                  Upload a tfg

//   [NOTE] : To use body params (raw json) you need to include 
//             "Content type : application/json" in the header.

//**************************************************************************
const express = require('express');
const mysqlConnection = require('../database');
const router  = express.Router();
//--------------------------------------------------------------------------

// List all tfg
router.get('/tfg/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM tfg', (err,rows,fields)=>{
        if(!err)
            res.json(rows);
        else 
            console.log(err);
    })
})

// Select a tfg
router.get('/tfg/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM tfg WHERE codeTfg=?', [id], (err,rows,fields)=>{
        if(!err)
            res.json(rows[0]);
        else 
            console.log(err);
    })
})

// Create a tfg
router.post('/tfg/', (req, res) => {
    const {nombre, descripcion} = req.body;
    const query = `
        CALL tfgAddOrEdit (0, ?, ?);
    `;
    mysqlConnection.query(query, [nombre, descripcion], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Tfg guardada'});
        else 
            console.log(err);
    });
})

// Update a tfg
router.put('/tfg/:codeTfg', (req, res) => {
    const {nombre, descripcion} = req.body;
    const {codeTfg} = req.params;

    const query = `
        CALL tfgAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [codeTfg, nombre, descripcion], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Tfg actualizada'});
        else 
            console.log(err);
    });
})

// Delete a tfg
router.delete('/tfg/:codeTfg', (req,res)=>{
    const {codeTfg} = req.params;

    mysqlConnection.query('DELETE FROM tfg WHERE codeTfg=?', [codeTfg], (err, rows, fields) => {
        if(!err)
            res.json({status: 'Tfg eliminada'});
        else
            console.log(err);
    })
})

//--------------------------------------------------------------------------
// It exports the prev-defined routes
module.exports = router;