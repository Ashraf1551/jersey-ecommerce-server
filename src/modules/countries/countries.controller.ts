import type { Request, Response } from "express";
import { countriesService } from "./countries.service";

const createCountry = async (req: Request, res: Response) => {
  try {
    const result = await countriesService.createCountryIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Country Created successfully!",
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

const getAllCountries = async (req: Request, res: Response) => {
  try {
    const result = await countriesService.getAllCountriesFromDB();

    res.status(200).json({
      success: true,
      message: "Countries retrieved successfully!",
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

const getSingleCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await countriesService.getSingleCountryFromDB(id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Country Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Country retrieved successfully!",
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

const updateCountry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await countriesService.updateCountryFromDB(
      req.body,
      id as string,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Country Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Country updated successfully!",
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

const deleteCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await countriesService.deleteCountryFromDB(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Country Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Country deleted successfully!",
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

export const countriesController = {
  createCountry,
  getAllCountries,
  getSingleCountry,
  updateCountry,
  deleteCountry,
};
