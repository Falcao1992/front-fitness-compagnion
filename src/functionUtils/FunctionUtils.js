import {ErrorMsgStyled} from "../styledComponents/UniformPageComponents";
import React from "react";

export const handleErrMsg = (errorMsg) => {
    if (errorMsg) {
        return <ErrorMsgStyled>{errorMsg}</ErrorMsgStyled>
    }
}
