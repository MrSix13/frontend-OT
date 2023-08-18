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
  error?: any;
  entidad?: string[];
}

const SelectInputComponent: React.FC<ISelectInputProps> = React.memo(
  ({ label, control, name, showRefresh, data, onChange, error, entidad }) => {
    const [toggle, setToggle] = useState(false);

    const { entities, refreshData } = useEntityUtils(entidad[0], entidad[1]);
    console.log("showrefresh", showRefresh);
    useEffect(() => {
      refreshData();
    }, [toggle, refreshData]);

    return (
      <div
        className={`flex items-center mb-2 mx-4 mt-select mt-select-dropdown-up ${
          error & "border border-red-400"
        }`}
      >
        {/* <label className="label-input w-1/3">{label}</label> */}
        <Controller
          name={name}
          control={control}
          defaultValue={data ? data : ""}
          render={({ field }) => (
            <Select
              {...field}
              value={field.value}
              defaultValue="hola"
              label={label}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              className="custom-input py-2 px-3"
            >
              {entities &&
                entities.map((option, index) => (
                  <Option value={option[0].toString()} key={index}>
                    {option[1]}
                  </Option>
                ))}
            </Select>
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
