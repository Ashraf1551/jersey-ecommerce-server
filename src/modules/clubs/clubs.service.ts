import { pool } from "../../db";
import type { IClub } from "./clubs.interface";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const createClubIntoDB = async (payload: IClub) => {
  const { name, league_id } = payload;

  const league = await pool.query(
    `
      SELECT id FROM leagues WHERE id=$1
        `,
    [league_id],
  );

  if (league.rows.length === 0) {
    const error: any = new Error("League Not found!");
    error.status = 404;
    throw error;
  }

  const result = await pool.query(
    `
    INSERT INTO clubs(name,league_id) VALUES($1,$2) RETURNING *
    `,
    [name, league_id],
  );

  return result;
};

const getAllClubsFromDB = async () => {
  const result = await pool.query(`
      SELECT clubs.id, clubs.name, clubs.league_id, leagues.name AS league_name
      FROM clubs
      JOIN leagues ON clubs.league_id = leagues.id
        `);
  return result;
};

const getSingleClubFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM clubs WHERE id=$1
        `,
    [id],
  );
  return result;
};

const updateClubFromDB = async (payload: IClub, id: string) => {
  const { name, league_id } = payload;

  if (league_id) {
    const league = await pool.query(
      `
        SELECT id FROM leagues WHERE id=$1
          `,
      [league_id],
    );

    if (league.rows.length === 0) {
      const error: any = new Error("League Not found!");
      error.status = 404;
      throw error;
    }
  }

  const result = await pool.query(
    `
    UPDATE clubs
    SET
    name=COALESCE($1,name),
    league_id=COALESCE($2,league_id)
    WHERE id=$3 RETURNING *
    `,
    [name, league_id, id],
  );

  return result;
};

const deleteClubFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM clubs WHERE id=$1
      `,
    [id],
  );
  return result;
};

const getClubsByLeagueFromDB = async (leagueId: string) => {
  if (!UUID_REGEX.test(leagueId)) {
    const error: any = new Error("Invalid leagueId!");
    error.status = 400;
    throw error;
  }

  const league = await pool.query(
    `
      SELECT id FROM leagues WHERE id=$1
        `,
    [leagueId],
  );

  if (league.rows.length === 0) {
    const error: any = new Error("League Not found!");
    error.status = 404;
    throw error;
  }

  const result = await pool.query(
    `
      SELECT clubs.id, clubs.name, clubs.league_id, leagues.name AS league_name
      FROM clubs
      JOIN leagues ON clubs.league_id = leagues.id
      WHERE clubs.league_id=$1
      ORDER BY clubs.name ASC
        `,
    [leagueId],
  );
  return result;
};

export const clubsService = {
  createClubIntoDB,
  getAllClubsFromDB,
  getSingleClubFromDB,
  updateClubFromDB,
  deleteClubFromDB,
  getClubsByLeagueFromDB,
};
