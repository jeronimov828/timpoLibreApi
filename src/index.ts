import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors"
import "reflect-metadata"
import productoController from "./controller/producto.controller";
import router from "./router/producto.router";
import routerPedido from "./router/pedido.router";
import { createConnection } from "typeorm";

dotenv.config();

class server {
    private _app: Application;
    private _port: String | undefined;


    constructor() {
        createConnection().then((conection) => {
            if (conection.isConnected) {
                console.log("Escuchando la base de datos")
                this._app = express();
                this._port = process.env.PORT;
                this.midelware();
                this.router();
                this.listen();
            }
        })
    }

    midelware() {
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.static("public"));
    }

    router() {
        this._app.use("/api", router);
        this._app.use("/api", routerPedido);
    }

    async listen() {
        this._app.listen(this._port, () => {
            console.log("corriendo por el puerto " + this._port)
        })
    }
}

new server();