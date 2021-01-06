import * as React from "react";

export interface Values {
  [key: string]: any;
}

export interface SubmitResult {
  success: boolean;
  errors?: Errors;
}

interface Errors {
  [key: string]: string[];
}

interface State {
  values: Values;
  errors: Errors;
  submitting: boolean;
  submitted: boolean;
}

interface FormProps {
  defaultValues: Values;
  validationRules: ValidationProp;
  onSubmit: (values: Values) => Promise<SubmitResult>;
}

interface FormContext {
  errors: Errors;
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

interface FieldProps {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
}

interface Validation {
  validator: Validator;
  arg?: any;
}

interface ValidationProp {
  [key: string]: Validation | Validation[];
}

export type Validator = (
  fieldName: string,
  values: Values,
  args?: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: Values,
  args?: any
): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This must be populated"
    : "";

export const minLength: Validator = (
  fieldName: string,
  values: Values,
  length: number
): string =>
  values[fieldName] && values[fieldName].length < length
    ? `This must be at least ${length} characters`
    : "";

const FormContext = React.createContext<FormContext>({
  errors: {},
  values: {}
});

export class Form extends React.Component<FormProps, State> {
  constructor(props: FormProps) {
    super(props);
    const errors: Errors = {};
    Object.keys(props.defaultValues).forEach(fieldName => {
      errors[fieldName] = [];
    });
    this.state = {
      submitted: false,
      submitting: false,
      errors,
      values: props.defaultValues
    };
  }

  public static Field: React.FC<FieldProps> = props => {
    const { name, label, type, options } = props;

    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
      context: FormContext
    ) => {
      if (context.setValue) {
        context.setValue(props.name, e.currentTarget.value);
      }
    };

    const handleBlur = (
      e:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLTextAreaElement>
        | React.FocusEvent<HTMLSelectElement>,
      context: FormContext
    ) => {
      if (context.validate) {
        context.validate(props.name, e.currentTarget.value);
      }
    };

    return (
      <FormContext.Consumer>
        {context => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {/* Text or Email Inputs */}
            {(type === "Text" || type === "Email") && (
              <input
                type={type.toLowerCase()}
                id={name}
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              />
            )}

            {/* TextArea Inputs */}
            {type === "TextArea" && (
              <textarea
                id={name}
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              />
            )}

            {/* Select Inputs */}
            {type === "Select" && (
              <select
                value={context.values[name]}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
              >
                {options &&
                  options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            {context.errors[name] &&
              context.errors[name].length > 0 &&
              context.errors[name].map(error => (
                <span key={error} className="form-error">
                  {error}
                </span>
              ))}
          </div>
        )}
      </FormContext.Consumer>
    );
  };

  private setValue = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({ values: newValues });
  };

  private validate = (fieldName: string, value: any): string[] => {
    const rules = this.props.validationRules[fieldName];
    const errors: string[] = [];
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = rule.validator(fieldName, this.state.values, rule.arg);
        if (error) {
          errors.push(error);
        }
      });
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.arg);
        if (error) {
          errors.push(error);
        }
      }
    }
    const newErrors = { ...this.state.errors, [fieldName]: errors };
    this.setState({ errors: newErrors });
    return errors;
  };

  private validateForm(): boolean {
    const errors: Errors = {};
    let haveError: boolean = false;
    Object.keys(this.props.defaultValues).map(fieldName => {
      errors[fieldName] = this.validate(
        fieldName,
        this.state.values[fieldName]
      );
      if (errors[fieldName].length > 0) {
        haveError = true;
      }
    });
    this.setState({ errors });
    return !haveError;
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({ submitting: true });
      const result = await this.props.onSubmit(this.state.values);
      this.setState({
        errors: result.errors || {},
        submitted: result.success,
        submitting: false
      });
    }
  };

  public render() {
    const context: FormContext = {
      errors: this.state.errors,
      values: this.state.values,
      validate: this.validate,
      setValue: this.setValue
    };

    return (
      <FormContext.Provider value={context}>
        <form className="form" noValidate={true} onSubmit={this.handleSubmit}>
          {this.props.children}
          <div className="form-group">
            <button
              type="submit"
              disabled={this.state.submitting || this.state.submitted}
            >
              Submit
            </button>
          </div>
        </form>
      </FormContext.Provider>
    );
  }
}

Form.Field.defaultProps = {
  type: "Text"
};
