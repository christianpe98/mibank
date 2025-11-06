import { depositController } from "@/controllers/accounts.controller";
import { authenticationMiddleware } from "@/middleware/authentication.middleware";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /api/accounts/{iban}/deposit:
 *   post:
 *     summary: Deposit money to an account
 *     parameters:
 *       - in: path
 *         name: iban
 *         required: true
 *         schema:
 *           type: string
 *         description: Account IBAN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardNumber
 *               - cardPin
 *               - amount
 *             properties:
 *               cardNumber:
 *                 type: string
 *               cardPin:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Bad request
 */
router.post("/:iban/deposit", authenticationMiddleware, depositController);

export default router;
