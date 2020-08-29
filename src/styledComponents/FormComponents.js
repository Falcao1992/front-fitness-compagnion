import styled from "styled-components";
import {TextField} from "@material-ui/core";
import {KeyboardDatePicker} from '@material-ui/pickers';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto .7rem;
    
    // modif avec sidebar
    height: ${props => props.sidebar && "100%"};
    justify-content: ${props => props.sidebar && "space-evenly"};
    
    label {
        color: ${props => props.theme.colors.third};
    }
    input {
        color: ${props => props.theme.colors.primary};
        background-color: ${props => props.theme.colors.dark};
    }
`

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    margin-bottom: .6rem !important;
`

export const ContainerMultiNumberField = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: .6rem;
    color: rgba(0, 0, 0, 0.54);
`

export const BlockInputLabelStyled = styled.div`
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    small {
        color: ${props => props.theme.colors.error};;
        background-color: ${props => props.theme.colors.primary};
        padding: .35rem;
        text-align: center;
        font-weight: 700;
    }
`

export const LabelInputStyled = styled.label`
    text-align: center;
    font-size: .8rem;
    width: 100%;
    padding: .5rem .5rem .1rem;
    font-family: "Roboto", sans-serif;
    background-color: ${props => props.theme.colors.dark};
    opacity: ${props => props.disabled && "0.8"};
    
`

export const InputStyled = styled.input`
    opacity: ${props => props.disabled && "0.8"};
    background-color: transparent;
    text-align: center;
    border: none;
    padding: .5rem 0;
    color: rgba(0, 0, 0, 0.54);
    
    :focus {
        outline-color: ${props => props.theme.colors.third};
    }
`

export const BlockRadio = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.dark};
    margin-bottom: .6rem;
    padding: .5rem;
    
    > div {
        flex-direction: row;
    }
    
    > legend {
        color: ${props => props.theme.colors.third};
        padding-left: .5rem;
    }
`

export const BlockButtons = styled.div`
    display: flex;
    flex-direction: ${props => props.column && "column"};
    justify-content: space-between;
    width: 70%;
    margin: 0 auto;
`

export const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
    width: 100%;
    background-color: ${props => props.theme.colors.dark};
    padding: .7rem !important;
    margin: 0 0 .6rem !important;
    label {
       padding: .7rem 1rem;
    }
    input {
        background-color: transparent;
        text-align: center;
        padding: .35rem;
    }
    
    button {
        color: ${props => props.theme.colors.third};
        padding-right: .7rem;
    }
`
