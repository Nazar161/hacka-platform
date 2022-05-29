import React, { ReactElement } from "react";
import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";

interface FormProps<TFormValues> {
  form: UseFormProps<TFormValues>;
  children: ReactElement | ReactElement[];
  onSubmit: SubmitHandler<TFormValues>
}

// this is a generic component

const MyForm = <TFormValues,>({form, children, onSubmit, ...rest}: FormProps<TFormValues>): JSX.Element => {
  
  const { handleSubmit, register } = useForm<TFormValues>(form);

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement<TFormValues>(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props.name
            }
          })
          : child
      })}
    </form>
  )
};

export default MyForm;
