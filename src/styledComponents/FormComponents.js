import styled from "styled-components";
import {TextField} from "@material-ui/core";
import {KeyboardDatePicker} from '@material-ui/pickers';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto .7rem;
    background-color: ${props => props.theme.colors.dark};
    
    // modif avec sidebar
    height: ${props => props.sidebar && "100%"};
    justify-content: ${props => props.sidebar && "space-evenly"};
    
    label {
        color: ${props => props.theme.colors.third};
    }
    input {
        color: ${props => props.theme.colors.primary};
        //background-color: ${props => props.theme.colors.dark};
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
`

export const LabelInputStyled = styled.label`
    align-self: center;
    padding: .5rem .5rem .1rem;
    font-family: "Roboto", sans-serif;
    
`

export const InputStyled = styled.input`
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

export const TextFieldDateStyled = styled(TextField)`
    width: 100%;
    background-color: ${props => props.theme.colors.dark};
    margin-bottom: .6rem !important;
    
    label {
        padding: 0.5rem .7rem;
    }
    input {
        background-color: transparent;
        text-align: center;
        padding: .7rem;
    }
`

export const BlockButtons = styled.div`
    width: 70%;
    margin: 0 auto;
`

export const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
    label {
       padding: 0.5rem .7rem;
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
