/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IconButton, Option, Select, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FiRefreshCw } from "react-icons/fi";
import { useEntityUtils } from "../../hooks";

interface ISelectInputProps {
  label: string;
  control: any;
  name: string;
  showRefresh?: boolean;
  data?: any;
  onChange?: (value: string) => void;
  setHandleSearch?: (value: string) => void;
  inputName?: string;
  error?: any;
  entidad: string[];
}

const SelectInputComponent: React.FC<ISelectInputProps> = React.memo(
  ({
    label,
    control,
    name,
    showRefresh,
    data,
    error,
    entidad,
    setHandleSearch,
    inputName,
  }) => {
    const [toggle, setToggle] = useState(false);
    const strUrl = entidad && entidad[0];
    const { entities, refreshData } = useEntityUtils(strUrl, entidad[1]);

    useEffect(() => {
      refreshData();
    }, [toggle, refreshData]);

    return (
      <div className="flex w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up ">
        {/* <label className="label-input w-1/3">{label}</label> */}
        <Controller
          name={name}
          control={control}
          defaultValue={data || ""}
          render={({ field }) => (
            // <Select
            //   {...field}
            //   defaultValue="hola"
            //   label={label}
            //   className="custom-input py-2 px-3"
            // >
            //   {entities &&
            //     entities.map((option: [string | undefined, string], index) => (
            //       <Option
            //         value={option[0] !== undefined ? option[0].toString() : ""}
            //         key={index}
            //       >
            //         {option[1]}
            //       </Option>
            //     ))}
            // </Select>
            <select
              {...field}
              onChange={(e) => {
                field.onChange(e);
                console.log("evento", e.target.value);
                if (setHandleSearch) {
                  const selectedValue = e.target.value.toString();
                  if (selectedValue !== "") {
                    console.log("selectedValue", selectedValue),
                      setHandleSearch({ [inputName]: selectedValue });
                  }
                }
              }}
              className="custom-input py-2 px-3 w-[80%]"
            >
              <option value={"0"}>{label}</option>{" "}
              {entities &&
                entities.map((option, index) => (
                  <option
                    key={index}
                    value={option[0] !== undefined ? option[0].toString() : ""}
                  >
                    {option[1]}
                  </option>
                ))}
            </select>
          )}
        />

        {showRefresh && (
          <Tooltip content="Refrescar">
            <IconButton
              onClick={() => setToggle((prev) => !prev)}
              variant="text"
              color="blue-gray"
              className="mx2"
            >
              <FiRefreshCw className="h-6 w-6" />
            </IconButton>
          </Tooltip>
        )}

        {error && (
          <p className="text-xs text-red-500 absolute right-20">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

export default SelectInputComponent;
