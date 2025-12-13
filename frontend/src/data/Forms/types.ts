export type BaseFormEntry = {
    fieldsPerLine: number;
    required: boolean;
    title: string;
    link?: string;
    name: string;
    page: number;
} & Validate;

export type Validate = {
    /** Just assume this is a zod Validator */
    validator: any;
};

export type FormEntry =
    | (BaseFormEntry & {
          type: "radio";
          options: readonly string[];
      })
    | (BaseFormEntry &
          (
              | {
                    type: "dropdown";
                    dropOpt: "single";
                    dropdownHiddenItem: string;
                    options: readonly string[];
                }
              | {
                    type: "dropdown";
                    dropOpt: "multiple";
                    options: readonly string[];
                    dropdownHiddenItem: string;
                    fetch?: Promise<string[]>;
                }
          ))
    | (BaseFormEntry & { type: "textarea" })
    | (BaseFormEntry & { type: "password"; placeholder?: string })
    | (BaseFormEntry & { type: "file"; accept: ".pdf" | ".jpg" })
    | (BaseFormEntry & { type: "number" })
    | (BaseFormEntry & { type: "text"; placeholder?: string })
    | (BaseFormEntry & { type: "email"; placeholder?: string })
    | (BaseFormEntry & { type: "date"; placeholder?: string });
