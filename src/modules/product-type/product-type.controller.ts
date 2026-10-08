import type { Request, Response } from "express";
import { productTypesService } from "./product-type.service";

const createProductTypes = async (req: Request, res: Response) => {
  try {
    const result = await productTypesService.createProductTypesIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Product Types Created successfully!",
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

const getAllProductTypes = async (req: Request, res: Response) => {
  try {
    const result = await productTypesService.getAllProductTypesFromDB();

    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
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

const getSingleProductType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productTypesService.getSingleProductTypeFromDB(
      id as string,
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Product Type Not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Type retrived successfully!",
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

const updateProductType = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await productTypesService.updateProductTypeFromDB(
      req.body,
      id as string,
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Product Type Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Type updated successfully!",
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

const deleteProductType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productTypesService.deleteProductTypeFromDB(
      id as string,
    );

    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Product Type Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Type deleted successfully!",
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

export const productTypesController = {
  createProductTypes,
  getAllProductTypes,
  getSingleProductType,
  updateProductType,
  deleteProductType
};
