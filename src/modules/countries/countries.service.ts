import { pool } from "../../db";
import type { ICountry } from "./countries.interface";

const createCountryIntoDB = async (payload: ICountry) => {
  const { name } = payload;

  const result = await pool.query(
    `
    INSERT INTO countries(name) VALUES($1) RETURNING *
    `,
    [name],
  );

  return result;
};

const getAllCountriesFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM countries
        `);
  return result;
};

const getSingleCountryFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM countries WHERE id=$1
        `,
    [id],
  );
  return result;
};

const updateCountryFromDB = async (payload: ICountry, id: string) => {
  const { name } = payload;

  const result = await pool.query(
    `
    UPDATE countries
    SET
    name=COALESCE($1,name)
    WHERE id=$2 RETURNING *
    `,
    [name, id],
  );

  return result;
};

const deleteCountryFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM countries WHERE id=$1
      `,
    [id],
  );
  return result;
};

export const countriesService = {
  createCountryIntoDB,
  getAllCountriesFromDB,
  getSingleCountryFromDB,
  updateCountryFromDB,
  deleteCountryFromDB,
};
