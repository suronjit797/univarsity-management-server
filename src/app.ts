import express, { Application, Request, Response } from "express";

const app: Application = express()
const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
    res.send('<h1> Welcome to PH University </h1>');
})



export default app