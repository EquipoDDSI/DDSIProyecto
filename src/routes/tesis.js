//**************************************************************************
// Routes for tesis

// Method   Route           Body Params (raw json)              Action
// ______________________________________________________________________________      
//  GET     /                                                   List all tesis
//  GET     /:codeTesis                                         Select one tesis
//  DELETE  /:codeTesis                                         Delete a tesis
//  PUT     /:codeTesis     nombre, descripcion                 Update a tesis
//  POST    /               codeTesis,nombre,descripcion        Upload a tesis

//   [NOTE] : To use body params (raw json) you need to include 
//             "Content type : application/json" in the header.

//**************************************************************************
const express = require('express');
const mysqlConnection = require('../database');
const router  = express.Router();
//--------------------------------------------------------------------------

// List all tesis
router.get('/tesis/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM tesis', (err,rows,fields)=>{
        if(!err)
            res.json(rows);
        else 
            console.log(err);
    })
})

// Select a tesis
router.get('/tesis/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM tesis WHERE codeTesis=?', [id], (err,rows,fields)=>{
        if(!err)
            res.json(rows[0]);
        else 
            console.log(err);
    })
})

// Create a tesis
router.post('/tesis/', (req, res) => {
    const {codeTesis, nombre, descripcion} = req.body;
    const query = `
        CALL tesisAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [codeTesis, nombre, descripcion], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Tesis guardada'});
        else 
            console.log(err);
    });
})

// Update a tesis
router.put('/tesis/:codeTesis', (req, res) => {
    const {nombre, descripcion} = req.body;
    const {codeTesis} = req.params;

    const query = `
        CALL tesisAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [codeTesis, nombre, descripcion], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Tesis actualizada'});
        else 
            console.log(err);
    });
})

// Delete a tesis
router.delete('/tesis/:codeTesis', (req,res)=>{
    const {codeTesis} = req.params;

    mysqlConnection.query('DELETE FROM tesis WHERE codeTesis=?', [codeTesis], (err, rows, fields) => {
        if(!err)
            res.json({status: 'Tesis eliminada'});
        else
            console.log(err);
    })
})

//--------------------------------------------------------------------------
// It exports the prev-defined routes
module.exports = router;