import styled from "styled-components";
import {TextField} from "@material-ui/core";

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto;
    
    // modif avec sidebar
    height: ${props => props.sidebar && "100%"};
    justify-content: ${props => props.sidebar && "space-evenly"};
`

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    background-color: rgb(240 248 255 / 90%);
    margin-bottom: .6rem !important;
`

export const ContainerMultiNumberField = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: .6rem;
    color: rgba(0, 0, 0, 0.54);
    
`

export const BlockInputLabelStyled = styled.div`
    background-color: rgb(206 214 221 / 80%);
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const LabelInputStyled = styled.label`
    align-self: center;
    padding: .5rem .5rem .1rem;
    font-family: "Roboto", sans-serif;
    
`

export const InputStyled = styled.input`
    background-color: rgb(240 248 255 / 23%);
    text-align: center;
    border: none;
    padding: .5rem 0;
    color: rgba(0, 0, 0, 0.54);
    
    :focus {
        outline-color: rgba(46, 59, 133, 0.816);;
    }
`

export const BlockRadio = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(206 214 221 / 95%);
    margin-bottom: .6rem;
    padding: .5rem;
    
    > div {
        flex-direction: row;
    }
    
    > legend {
        padding-left: .5rem;
    }
`

export const TextFieldDateStyled = styled(TextField)`
    width: 100%;
    background-color: rgb(206 214 221 / 95%);
    margin-bottom: .6rem !important;
    label {
        padding: 0.5rem .7rem;
    }
    input {
        text-align: center;
        padding: .7rem;
    }
`

export const BlockButtons = styled.div`
    width: 70%;
    margin: 0 auto;
`
