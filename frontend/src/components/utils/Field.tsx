import React, { useState, useCallback, useMemo, useEffect } from "react";
import "@/components/utils/css/config.css";
import type { FormEntry } from "@/data/Forms/types";
import * as z from "zod";
import { NurgleTallyMan } from "@/backend/zod";
import { Eye, EyeOff } from "lucide-react";

export type FieldProp = {
    onChange: (
        name: string,
        value: string | File,
        actionType: "add" | "delete"
    ) => void;
    formType: string;
    className?: string;
    value: string | File;
} & FormEntry;

function Field({
    name,
    type,
    title,
    required,
    //@ts-expect-error Prop mass definiton
    options,
    //@ts-expect-error Prop mass definiton
    fetch,
    value,
    validator,
    link,
    //@ts-expect-error Prop mass definiton
    dropOpt,
    //@ts-expect-error Prop mass definiton
    dropdownHiddenItem,
    //@ts-expect-error Prop mass definiton
    accept,
    fieldsPerLine,

    onChange,
}: FieldProp) {
    const [error, setError] = useState<string | null>(null);

    const handleTextChange = useCallback(
        <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
            event: React.ChangeEvent<T>
        ) => {
            const { name, value } = event.target;
            const res = validator.safeParse(value);
            if (!res.success) {
                setError(
                    z.treeifyError(res.error as z.ZodError).errors.join(", ")
                );
                onChange(name, value, "delete");
            } else {
                setError(null);
                onChange(name, value, "add");
            }
        },
        [onChange, validator]
    );

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, files } = event.target;
            if (!files) return;
            const file = files[0];
            const res = validator.safeParse(file);
            if (!res.success) {
                setError(
                    z.treeifyError(res.error as z.ZodError).errors.join(", ")
                );
                onChange(name, file, "delete");
            } else {
                setError(null);
                onChange(name, file, "add");
            }
        },
        [onChange, validator]
    );

    useEffect(() => {
        if (!value) {
            return;
        }

        const res = validator.safeParse(value);
        if (!res.success) {
            setError(z.treeifyError(res.error as z.ZodError).errors.join(", "));
        } else {
            setError(null);
        }
    }, [validator, value]);

    const [reveal, setReveal] = useState<boolean>(false);

    const handleReveal = () => {
        setReveal((prev) => !prev);
    };

    const instituteOption = useMemo(() => {
        const inst = localStorage.getItem("institution") || "";

        return options && (options as string[]).includes(inst)
            ? [inst]
            : options;
    }, [options]);

    const [dataOptions, setData] = useState<string[]>(options);

    useEffect(() => {
        if (!fetch) return;

        (fetch as Promise<string[]>).then(setData).catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderInput = () => {
        switch (type) {
            case "text":
            case "email":
            case "date":
                return (
                    <input
                        type={type}
                        name={name}
                        value={value as string}
                        required={required}
                        placeholder={title}
                        className={`focus:outline-none border-b-2 font-Poppins border-gray-700 focus:border-red-700 w-64 focus:w-full transition-all  duration-500`}
                        onChange={handleTextChange}
                    />
                );

            case "password":
                return (
                    <div className="w-64">
                        <input
                            type={reveal ? "text" : "password"}
                            name={name}
                            value={value as string}
                            required={required}
                            placeholder={title}
                            className={
                                "focus:outline-none border-b-2 font-Poppins border-gray-700 focus:border-red-700 w-64 focus:w-full transition-all  duration-500 inline pr-7"
                            }
                            onChange={handleTextChange}
                        />
                        <button
                            onClick={handleReveal}
                            type="button"
                            className="w-0 overflow-visible text-gray-500 hover:text-red-700 transition-colors -translate-x-1/2 duration-200 translate-y-1"
                        >
                            {!reveal ? (
                                <Eye
                                    size={20}
                                    strokeWidth={2}
                                    className="-translate-x-6"
                                />
                            ) : (
                                <EyeOff
                                    size={20}
                                    strokeWidth={2}
                                    className="-translate-x-6"
                                />
                            )}
                        </button>
                    </div>
                );

            case "number":
                return (
                    <input
                        type="number"
                        name={name}
                        required={required}
                        value={value as string}
                        className={`focus:outline-none  w-64 shadow-lg p-2 border-gray-600 border-b-2 focus:border-red-700`}
                        onChange={handleTextChange}
                    />
                );

            case "textarea":
                return (
                    <>
                        <textarea
                            name={name}
                            value={value as string}
                            required={required}
                            onChange={handleTextChange}
                            className="border-black p-3 border-2 rounded-lg w-full h-48"
                        />
                        <p className="text-right text-red-700">
                            {" "}
                            Current word count:{" "}
                            {(value as string) === ""
                                ? 0
                                : NurgleTallyMan(value as string)}
                        </p>
                    </>
                );

            case "file":
                return (
                    <>
                        <input
                            type="file"
                            name={name}
                            accept={accept === ".jpg" ? ".jpg,.jpeg" : accept}
                            required={required}
                            onChange={handleFileChange}
                            className={`focus:outline-none color-red-400 }`}
                        />
                        {value instanceof File && (
                            <p className="p-2">
                                <span className="text-red-700 font-semibold font-Poppins">
                                    Selected File:
                                </span>{" "}
                                {value.name}
                            </p>
                        )}
                    </>
                );

            case "radio":
                return !options
                    ? null
                    : (options as string[]).map(
                          (item: string, index: number) => (
                              <div key={index}>
                                  <label>
                                      <input
                                          type="radio"
                                          name={name}
                                          value={item}
                                          checked={value === item}
                                          required={required}
                                          onChange={handleTextChange}
                                      />
                                      {item}
                                  </label>
                              </div>
                          )
                      );

            case "dropdown":
                return (
                    <select
                        name={name}
                        value={value as string}
                        onChange={handleTextChange}
                        required={required}
                        className="w-72 p-2 rounded-md shadow-lg active:shadow-2xl hover:w-full transition-all duration-500 outline-none"
                    >
                        <option hidden>{dropdownHiddenItem}</option>
                        {dropOpt === "single"
                            ? (instituteOption || []).map((opt: string) => (
                                  <option
                                      key={opt}
                                      value={opt}
                                      selected={value === opt}
                                  >
                                      {opt}
                                  </option>
                              ))
                            : dataOptions.map((opt) => (
                                  <option
                                      key={opt}
                                      value={opt}
                                      selected={value === opt}
                                  >
                                      {opt}
                                  </option>
                              ))}
                    </select>
                );

            default:
                return null;
        }
    };

    return (
        <div
            className={`my-3 p-3 inline-block ${
                fieldsPerLine === 2 ? "w-1/2" : "w-full"
            }`}
        >
            <div className="mb-3">
                <label className="font-Poppins">
                    {title}
                    {required && <span className="px-2 text-red-600">*</span>}
                </label>
                {link && (
                    <p>
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-red-700"
                        >
                            Click here
                        </a>
                    </p>
                )}
                {error && <p className="text-red-700">{error}</p>}
            </div>
            {renderInput()}
        </div>
    );
}

function areEqual(prev: FieldProp, next: FieldProp) {
    return (
        prev.value === next.value &&
        prev.validator === next.validator &&
        prev.type === next.type &&
        prev.name === next.name &&
        //@ts-expect-error options
        (prev.options && next.options ? prev.options === next.options : true)
    );
}

export default React.memo(Field, areEqual);
