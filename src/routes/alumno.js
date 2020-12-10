//**************************************************************************
// Routes for alumno

// Method   Route           Body Params (raw json)              Action
// ______________________________________________________________________________      
//  GET     /                                                  List all alumno
//  GET     /:codeAlumno                                       Select one alumno
//  DELETE  /:codeAlumno                                       Delete a alumno
//  PUT     /:codeAlumno     nombreAlumno, apellidos                  Update a alumno
//  POST    /                nombreAlumno,apellidos                   Upload a alumno

//   [NOTE] : To use body params (raw json) you need to include 
//             "Content type : application/json" in the header.

//**************************************************************************
const express = require('express');
const mysqlConnection = require('../database');
const router  = express.Router();
//--------------------------------------------------------------------------

// List all alumno
router.get('/alumno/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM alumno', (err,rows,fields)=>{
        if(!err)
            res.json(rows);
        else 
            console.log(err);
    })
})

// Select a alumno
router.get('/alumno/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM alumno WHERE codeAlumno=?', [id], (err,rows,fields)=>{
        if(!err)
            res.json(rows[0]);
        else 
            console.log(err);
    })
})

// Create an alumno
router.post('/alumno/', (req, res) => {
    const {nombreAlumno, apellidoAlumno} = req.body;
    const query = `
        CALL alumnoAddOrEdit (0, ?, ?);
    `;
    mysqlConnection.query(query, [nombreAlumno, apellidoAlumno], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Alumno guardada'});
        else 
            console.log(err);
    });
})

// Update a alumno
router.put('/alumno/:codeAlumno', (req, res) => {
    const {nombreAlumno, apellidoAlumno} = req.body;
    const {codeAlumno} = req.params;

    const query = `
        CALL alumnoAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [codeAlumno, nombreAlumno, apellidoAlumno], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'Alumno actualizada'});
        else 
            console.log(err);
    });
})

// Delete a alumno
router.delete('/alumno/:codeAlumno', (req,res)=>{
    const {codeAlumno} = req.params;

    mysqlConnection.query('DELETE FROM alumno WHERE codeAlumno=?', [codeAlumno], (err, rows, fields) => {
        if(!err)
            res.json({status: 'Alumno eliminada'});
        else
            console.log(err);
    })
})

//--------------------------------------------------------------------------
// It exports the prev-defined routes
module.exports = router;