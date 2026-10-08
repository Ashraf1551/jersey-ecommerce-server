import { pool } from "../../db";
import type { ILeague } from "./leagues.interface";

const createLeagueIntoDB = async (payload: ILeague) => {
  const { name } = payload;

  const result = await pool.query(
    `
    INSERT INTO leagues(name) VALUES($1) RETURNING *
    `,
    [name],
  );

  return result;
};

const getAllLeaguesFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM leagues
        `);
  return result;
};

const getSingleLeagueFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM leagues WHERE id=$1
        `,
    [id],
  );
  return result;
};

const updateLeagueFromDB = async (payload: ILeague, id: string) => {
  const { name } = payload;

  const result = await pool.query(
    `
    UPDATE leagues
    SET
    name=COALESCE($1,name)
    WHERE id=$2 RETURNING *
    `,
    [name, id],
  );

  return result;
};

const deleteLeagueFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM leagues WHERE id=$1
      `,
    [id],
  );
  return result;
};

export const leaguesService = {
  createLeagueIntoDB,
  getAllLeaguesFromDB,
  getSingleLeagueFromDB,
  updateLeagueFromDB,
  deleteLeagueFromDB,
};
