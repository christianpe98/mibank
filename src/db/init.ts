import { pool } from "./connection";
import bcrypt from "bcryptjs";

export const initDb = async () => {
  console.log("Initializing database...");

  console.log("Dropping existing tables if any...");
  await pool.query("DROP TABLE IF EXISTS cards CASCADE");
  await pool.query("DROP TABLE IF EXISTS accounts CASCADE");
  await pool.query("DROP TABLE IF EXISTS banks CASCADE");

  console.log("Creating banks table...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS banks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL
    )
  `);

  console.log("Creating accounts table...");
  await pool.query(`
  CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    iban VARCHAR(34) UNIQUE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    bank_id UUID NOT NULL,
    FOREIGN KEY (bank_id) REFERENCES banks(id) ON DELETE CASCADE
  )
  `);

  console.log("Creating cards table...");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cards (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      number VARCHAR(16) UNIQUE NOT NULL,
      pin VARCHAR(255) NOT NULL,
      account_id UUID UNIQUE NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
    )
  `);

  console.log("Inserting seed data...");
  await pool.query(`
    INSERT INTO banks (name) VALUES 
      ('Banco Nacional'), 
      ('Banco Internacional')
  `);

  const banksResult = await pool.query(`SELECT id FROM banks LIMIT 2`);
  const bank1Id = banksResult.rows[0].id;
  const bank2Id = banksResult.rows[1].id;

  await pool.query(
    `INSERT INTO accounts (iban, amount, bank_id) VALUES 
      ('ES1', 1000.00, $1), 
      ('ES2', 2500.50, $2)`,
    [bank1Id, bank2Id]
  );

  const accountsResult = await pool.query(`SELECT id FROM accounts LIMIT 2`);
  const account1Id = accountsResult.rows[0].id;
  const account2Id = accountsResult.rows[1].id;

  console.log("Hashing PINs...");
  const pin1 = await bcrypt.hash("1234", 10);
  const pin2 = await bcrypt.hash("5678", 10);

  await pool.query(
    `INSERT INTO cards (number, pin, account_id) VALUES 
      ('1', $1, $2), 
      ('2', $3, $4)`,
    [pin1, account1Id, pin2, account2Id]
  );

  console.log("Database initialized.");
};

initDb();
