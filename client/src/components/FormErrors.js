import React from "react";

export const FormErrors = (props) => {
    return(
        <div>
            { Object.keys(props.formErrors).map((fieldName, i) => {
                    if (props.formErrors[fieldName].length > 0) {
                        return <p key={i} className="input-error">{props.formErrors[fieldName]}</p>
                    } else {
                        return <div key={i} />
                    }
                })}
        </div>
    )
};