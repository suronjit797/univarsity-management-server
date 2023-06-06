import express  from "express";
import { validatorMiddleware } from "../../middleware/validatorMiddleware";
import { semesterValidationZod } from "./semesterValidation";
import * as semesterController from "./semesterController";

const router = express.Router();

router.post('/create', validatorMiddleware(semesterValidationZod), semesterController.createSemester)

export default router