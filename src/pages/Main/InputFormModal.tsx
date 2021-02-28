import styled from "@emotion/styled";
import React, { useState, useCallback } from "react";
import { Button, Card, CardGroupHeader, cardModalTopBorder, Input } from "../../components";

export const InputFormModal: React.FC<{
    onSubmit(values: (string | undefined)[]): void;
    form: {
        label: string;
        placeholder?: string;
        required?: boolean;
    }[];
    bottomText?: string;
}> = ({ onSubmit, form, bottomText }) => {
    const [values, setValues] = useState<(string | undefined)[]>([...Array(form.length)]);

    const submit = useCallback(() => {
        onSubmit(values)
    }, [values, onSubmit])

    const updateField = useCallback((index, e) => {
        const updatedValues = [
            ...values.slice(0, index),
            e.target.value,
            ...values.slice(index + 1)
        ]
        setValues(() => updatedValues)
    }, [ values, setValues ])

    return <CardWrapper>
        <MarginWrapper>
            <CardGroupHeader>정보 입력</CardGroupHeader>
            {
                form.map((label, index) =>
                    <FormRow key={label.label}>
                        <Label>{label.label}</Label>
                        <Input
                            onChange={(event) => updateField(index, event)}
                            placeholder={label.placeholder}
                        />
                    </FormRow>)
            }
            {
                bottomText && <Caution>
                    {bottomText}
                </Caution>
            }
        </MarginWrapper>
        <SubmitButton
            onClick={submit}
            active={!values.some((value, index) => form[index].required && (value === undefined))}
        >
            등록
        </SubmitButton>
    </CardWrapper>
}

const MarginWrapper = styled.div`
    padding: 25px;
`

const Caution = styled.p`
    font-size: 16px;
    color: #9A9A9A;
    font-weight: 700;
    margin-top: 20px;
`

const SubmitButton = styled(Button)`
    width: 100%;
    box-sizing: border-box;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`

const CardWrapper = styled(Card)`
    ${cardModalTopBorder}
    max-width: calc(100vw - 40px);
    padding: 0px;
`

const Label = styled.label`
    font-size: 22px;
    font-weight: 700;
    margin-right: 32px;
    flex-shrink: 0;
    &+* {
        flex: 1;
    }
`

const FormRow = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`
