/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance } from "axios";




const useCrud = (
  apiBaseUrl: string
): {
  createdEntity: (entityData: any) => Promise<any | undefined>;
  editEntity: (entityData: any) => Promise<any | undefined>;
  deleteAllEntity: (id: number[]) => Promise<any | undefined>;
  listEntity: (pageSize?: number, query?: string) => Promise<any | undefined>;
  searchEntityByPrimaryKeys: (
    primaryKeys: string,
    query: string
  ) => Promise<any | undefined>;
} => {


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
    primaryKeys: string,
    query: string
  ): Promise<any | undefined> => {
    const searchUrl = `${baseUrl}listado/?query=${query}&${primaryKeys}`;
    try {
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
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const editEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post(`/editar/`, entityData);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const deleteAllEntity = async (id: number[]): Promise<void | unknown> => {
    try {
      const idsDelete = id.join(",");
      const response = await axiosInstance.delete(
        `/eliminar/?_p1=${idsDelete}&query=05`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const listEntity = async (
    pageSize?: number,
    query?: string
  ): Promise<void | unknown> => {
    try {
      const endpoint = pageSize
        ? `/listado/?query=${query}&page=${pageSize}`
        : `/listado/?query=${query}`;
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  return {
    createdEntity,
    editEntity,
    searchEntityByPrimaryKeys,
    listEntity,
    deleteAllEntity,
  };
};

export default useCrud;
