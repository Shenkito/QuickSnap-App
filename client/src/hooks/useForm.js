import { useState } from "react"

// The custom hook for forms (for example see Login)

export function useForm(submitHandler, initialValues) {
    const [values, setValues] =  useState(initialValues);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        submitHandler(values)
    }
    
    return {
        values,
        onChange,
        onSubmit
    }
}