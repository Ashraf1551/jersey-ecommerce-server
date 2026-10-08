import type { Request, Response } from "express";
import { clubsService } from "./clubs.service";

const createClub = async (req: Request, res: Response) => {
  try {
    const result = await clubsService.createClubIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Club Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllClubs = async (req: Request, res: Response) => {
  try {
    const result = await clubsService.getAllClubsFromDB();

    res.status(200).json({
      success: true,
      message: "Clubs retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await clubsService.getSingleClubFromDB(id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Club Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Club retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateClub = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await clubsService.updateClubFromDB(
      req.body,
      id as string,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Club Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteClub = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await clubsService.deleteClubFromDB(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Club Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getClubsByLeague = async (req: Request, res: Response) => {
  const { leagueId } = req.params;
  try {
    const result = await clubsService.getClubsByLeagueFromDB(
      leagueId as string,
    );

    res.status(200).json({
      success: true,
      message: "Clubs retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const clubsController = {
  createClub,
  getAllClubs,
  getSingleClub,
  updateClub,
  deleteClub,
  getClubsByLeague,
};
