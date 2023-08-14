/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance } from "axios";
import { useState } from "react";

type PrimaryKeys = {
  [key: string]: string | undefined;
};

const useCrud = (
  apiBaseUrl: string
): {
  data: any;
  createdEntity: (entityData: any) => Promise<any | undefined>;
  editEntity: (id: number, entityData: any) => Promise<any | undefined>;
  deleteEntity: (id: number) => Promise<void>;
  deleteAllEntity: (id: number[]) => Promise<void>;
  listEntity: (pageSize?: number) => Promise<void>;
  searchEntityByPrimaryKeys: (
    primaryKeys: PrimaryKeys
  ) => Promise<any | undefined>;
} => {
  const [data, setData] = useState([]);

  const baseUrl = apiBaseUrl.startsWith("http")
    ? apiBaseUrl
    : `http://127.0.0.1:8000${apiBaseUrl}`;
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const searchEntityByPrimaryKeys = async (
    primaryKeys: PrimaryKeys,
    query: string
  ): Promise<any | undefined> => {
    try {
      // 'api/personas/relacionadas/buscar/'
      //Editar query correspondiente al backend
      // const searchUrl = `/relacionadas/buscar/?q=v&${primaryKeys}`;
      const searchUrl = `${baseUrl}/listado/?query=${query}&${primaryKeys}`;
      //   Object.keys(primaryKeys).map(key => `${key}=${primaryKeys[key]}`).join('&');
      console.log("searchUrl", searchUrl);
      const response = await axiosInstance.get(searchUrl);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createdEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post("/crear/", entityData);
      const createdEntity = response.data;
      return createdEntity;
    } catch (error) {
      console.log(error);
    }
  };

  const editEntity = async (
    // id: number,
    entityData: any
  ): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post(`/editar/`, entityData);
      const updateEntity = response.data;
      return updateEntity;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntity = async (id: number): Promise<void> => {
    try {
      // POST
      // http://127.0.0.1:8000/api/personas/eliminar/
      // "idDelete":77
      const response = await axiosInstance.delete(
        `/eliminar/?_p1=${id}&query=05`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllEntity = async (id: number[]): Promise<void> => {
    try {
      // const isDelete = {
      //   idsDelete: id,
      // };
      const idsDelete = id.join(",");
      const response = await axiosInstance.delete(
        `/eliminar/?_p1=${idsDelete}&query=05`
      );
      return response.data;
    } catch (error) {
      console.log("deleteError", error.response.data.error);
      return error;
    }
  };

  const listEntity = async (
    pageSize?: number,
    query: string
  ): Promise<void> => {
    try {
      const endpoint = pageSize
        ? `/listado/?query=${query}&page=${pageSize}`
        : `/listado/?query=${query}`;
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    data,
    createdEntity,
    editEntity,
    searchEntityByPrimaryKeys,
    deleteEntity,
    listEntity,
    deleteAllEntity,
  };
};

export default useCrud;
