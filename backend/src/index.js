//**************************************************************************
// Main
//**************************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 3070);
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors());
    }

    routes() {
        this.app.use(require('./routes/tesis'));
        this.app.use(require('./routes/tfg'));
        this.app.use(require('./routes/tfm'));
        this.app.use(require('./routes/alumno'));
        this.app.use(require('./routes/profesor'));
        this.app.use(require('./routes/cargo'));
    }

    start()  {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
