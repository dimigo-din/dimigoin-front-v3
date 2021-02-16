import css from "@emotion/css"
import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getPlaceList } from "../../api/place"
import { Button, Card, CardGroupHeader, cardModalTopBorder, Dropdown, DropdownItem, Input } from "../../components"
import { Doc, Place } from "../../constants/types"
import useInput from "../../hooks/useInput"

export const OtherPlaceModal: React.FC<{
    onSubmit(placeId: string, placeName: string, reason: string): void
}> = ({ onSubmit }) => {
    const [ places, setPlaces ] = useState<Doc<Place>[]>()
    const placeDropdown = useInput<DropdownItem>();
    const reasonInput = useInput();

    useEffect(() => {
        getPlaceList().then(setPlaces)
    }, [])

    const submit = useCallback(() => {
        const errors = [
            !placeDropdown.value && "장소",
            !reasonInput.value && "사유"
        ].filter(Boolean)
        if(errors.length) {
            toast.warning(errors.join(', ').을를 + "다시 확인해주세요")
            return
        }

        // 버튼이 Active되는 조건 / 위쪽 에러단에서 이미 체크됨.. 혹시 모르니까
        if(placeDropdown.value?.name && placeDropdown.value.key && reasonInput.value)
            onSubmit(placeDropdown.value.name, placeDropdown.value.key, reasonInput.value)
    }, [ placeDropdown, reasonInput, onSubmit ])

    return <CardWrapper>
        <MarginWrapper>
        <CardGroupHeader>상세 정보 입력</CardGroupHeader>
        <FormRow css={css`margin-top: 30px;`}>
            <Label>장소</Label>
            <Dropdown
                {...placeDropdown}
                placeholder="장소를 입력해주세요"
                items={places?.map(e => ({
                    name: e.name,
                    key: e._id
                }))}
            />
        </FormRow>
        <FormRow>
            <Label>사유</Label>
            <Input
                {...reasonInput}
                placeholder="사유를 입력해주세요"
            />
        </FormRow>
        <Caution>
            ※ 사전 허가된 활동 또는 감독 교사 승인 외 임의로 등록할 경우 불이익을 받을 수 있습니다
        </Caution>
        </MarginWrapper>
        <SubmitButton
            active={!!(placeDropdown.value?.key && reasonInput.value && placeDropdown.value.key !== "SELECTONE")}
            onClick={submit}
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
