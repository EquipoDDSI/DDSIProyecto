//**************************************************************************
// Routes for profesor

// Method   Route           Body Params (raw json)              Action
// ______________________________________________________________________________      
//  GET     /                                                  List all profesor
//  GET     /:codeprofesor                                       Select one profesor
//  DELETE  /:codeprofesor                                       Delete a profesor
//  PUT     /:codeprofesor     nombreprofesor, apellidos                  Update a profesor
//  POST    /                nombreprofesor,apellidos                   Upload a profesor

//   [NOTE] : To use body params (raw json) you need to include 
//             "Content type : application/json" in the header.

//**************************************************************************
const express = require('express');
const mysqlConnection = require('../database');
const router  = express.Router();
//--------------------------------------------------------------------------

// List all profesor
router.get('/profesor/', (req,res)=>{
    mysqlConnection.query('SELECT * FROM profesor', (err,rows,fields)=>{
        if(!err)
            res.json(rows);
        else 
            console.log(err);
    })
})

// Select a profesor
router.get('/profesor/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM profesor WHERE codeProfesor=?', [id], (err,rows,fields)=>{
        if(!err)
            res.json(rows[0]);
        else 
            console.log(err);
    })
})

// Create an profesor
router.post('/profesor/', (req, res) => {
    const {nombreProf, apellidoProf} = req.body;
    const query = `
        CALL profesorAddOrEdit (0, ?, ?);
    `;
    mysqlConnection.query(query, [nombreProf, apellidoProf], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'profesor guardado'});
        else 
            console.log(err);
    });
})

// Update a profesor
router.put('/profesor/:codeProfesor', (req, res) => {
    const {nombreProf, apellidoProf} = req.body;
    const {codeProfesor} = req.params;

    const query = `
        CALL profesorAddOrEdit (?, ?, ?);
    `;
    mysqlConnection.query(query, [codeProfesor, nombreProf, apellidoProf], (err, rows, fields) => {
        if(!err)
            res.json({Status: 'profesor actualizada'});
        else 
            console.log(err);
    });
})

// Delete a profesor
router.delete('/profesor/:codeProfesor', (req,res)=>{
    const {codeProfesor} = req.params;

    mysqlConnection.query('DELETE FROM profesor WHERE codeProfesor=?', [codeProfesor], (err, rows, fields) => {
        if(!err)
            res.json({status: 'profesor eliminado'});
        else
            console.log(err);
    })
})

//--------------------------------------------------------------------------
// It exports the prev-defined routes
module.exports = router;