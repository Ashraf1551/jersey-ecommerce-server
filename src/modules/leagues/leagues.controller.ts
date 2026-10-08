import type { Request, Response } from "express";
import { leaguesService } from "./leagues.service";

const createLeague = async (req: Request, res: Response) => {
  try {
    const result = await leaguesService.createLeagueIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "League Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllLeagues = async (req: Request, res: Response) => {
  try {
    const result = await leaguesService.getAllLeaguesFromDB();

    res.status(200).json({
      success: true,
      message: "Leagues retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleLeague = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await leaguesService.getSingleLeagueFromDB(id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "League Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "League retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateLeague = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await leaguesService.updateLeagueFromDB(
      req.body,
      id as string,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "League Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "League updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteLeague = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await leaguesService.deleteLeagueFromDB(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "League Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "League deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const leaguesController = {
  createLeague,
  getAllLeagues,
  getSingleLeague,
  updateLeague,
  deleteLeague,
};
