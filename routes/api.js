import express from "express";
import createItem from "../controllers/itemsController.js"

const router = express.Router()

router.post('/items', createItem)

export default router
