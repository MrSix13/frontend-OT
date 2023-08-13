/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Tooltip,
} from "@material-tailwind/react";
import { IPerson } from "../../interfaces";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useCrud from "../hooks/useCrud";
import { useEntityUtils } from "../hooks";
import { HiDatabase } from "react-icons/hi";

interface IPrimaryKeyState {
  [key: string]: string | number;
}

interface PrimaryKeySearchProps {
  setState: React.Dispatch<React.SetStateAction<any[]>>;
  primaryKeyInputs: { label: string; type: string; name: string; options?: string[] }[];
  baseUrl: string;
  selectUrl: string;
}

const PrimaryKeySearch: React.FC<PrimaryKeySearchProps> = ({
  setState,
  primaryKeyInputs,
  baseUrl,
  selectUrl,
}) => {
  const { control, handleSubmit } = useForm<IPrimaryKeyState>();
  const [inputValues, setInputValues] = useState<IPrimaryKeyState>({});
  const { searchEntityByPrimaryKeys } = useCrud(baseUrl);

  //PASAR POR PARAMETROS
  const { entities } = useEntityUtils(selectUrl, "02");

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (data: IPrimaryKeyState) => {
    const searchParams = Object.entries(data)
      .map(([key, value]) =>
        value ? `${key}=${encodeURIComponent(value)}` : ""
      )
      .filter((param) => param !== "")
      .join("&");

    try {
      const response = await searchEntityByPrimaryKeys(searchParams, "01");
      setState(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleSubmit(handleSearch)();
    }
  };

  const handleBlur = () => {
    handleSubmit(handleSearch)();
  };

  const renderInputs = () => {
    return primaryKeyInputs.map((input, index) => (
      <Controller
        key={index}
        name={input.name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="mx-2">
            {input.type === "select" ? (
              // ... Código para el select
              <Select
                {...field}
                value={field.value.toString()}
                onChange={(e) => {
                  field.onChange(e);
                  if (e !== "") {
                    handleSearch({ [input.name]: e });
                  }
                }}
                label={input.label}
              >
                <Option value={"0"}>{input.label}</Option> {/* Opción vacía */}
                {entities.map((entity, index) => (
                  <Option key={index} value={entity[0].toString()}>
                    {entity[1]}
                  </Option>
                ))}
              </Select>
            ) : input.type === "radiobuttons" ? (
              <div>
                <label className="block font-medium mb-1">{input.label}</label>
                <div className="flex space-x-2">
                  {input.options?.map((entity, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        {...field}
                        value={entity}
                        checked={field.value === entity[0].toString()}
                        onChange={() => {
                          field.onChange(entity[0].toString());
                        }}
                      />
                      <span className="ml-1">{entity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : input.type === "date" ? (
              <div>
                <label className="block font-medium mb-1">{input.label}</label>
                <input
                  type="date"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  onBlur={handleBlur}
                />
              </div>
            ) : (
              <Input
                {...field}
                label={input.label}
                value={inputValues[input.name] || ""}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(input.name, e.target.value);
                }}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
            )}
          </div>

        )}
      />
    ));
  };
  return (
    <form className="flex mx-10">
      {renderInputs()}
      <Tooltip content="Buscar">
        <IconButton
          variant="text"
          color="blue-gray"
          type="submit"
          onClick={handleSubmit(handleSearch)}
        // className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </IconButton>
      </Tooltip>
    </form>
  );
};

export default PrimaryKeySearch;
