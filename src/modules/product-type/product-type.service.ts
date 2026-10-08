import { pool } from "../../db";
import type { IProductType } from "./product-type.interface";

const createProductTypesIntoDB = async (payload: IProductType) => {
  const { name } = payload;

  const result = await pool.query(
    `
    INSERT INTO product_types(name) VALUES($1) RETURNING *
    `,
    [name],
  );

  return result;
};

const getAllProductTypesFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM product_types  
        `);
  return result;
};

const getSingleProductTypeFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM product_types WHERE id=$1  
        `,
    [id],
  );
  return result;
};

const updateProductTypeFromDB = async (payload: IProductType, id: string) => {
  const { name } = payload;

  const result = await pool.query(
    `
    UPDATE product_types
    SET 
    name=COALESCE($1,name)
    WHERE id=$2 RETURNING *
    `,
    [name, id],
  );

  return result;
};

const deleteProductTypeFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM product_types WHERE id=$1  
      `,
    [id],
  );
  return result;
};

export const productTypesService = {
  createProductTypesIntoDB,
  getAllProductTypesFromDB,
  getSingleProductTypeFromDB,
  updateProductTypeFromDB,
  deleteProductTypeFromDB
};
