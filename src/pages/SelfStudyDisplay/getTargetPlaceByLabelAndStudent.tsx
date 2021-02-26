import css from "@emotion/css"
import React from "react"
import { toast } from "react-toastify"
import { DisplayPlace } from "."
import { getPrimaryPlaceList } from "../../api/place"
import { showModal } from "../../components"
import { LocalstorageKeys } from "../../constants/localstorageKeys"
import { Student, Gender } from "../../constants/types"
import { InputFormModal } from "../Main/InputFormModal"
import { OtherPlaceModal } from "../Main/OtherPlaceModal"

const primaryPlaces = getPrimaryPlaceList().then(e => e.find(place => place.label === '교실'))

export const getTargetPlaceByLabelAndStudent = (student: Student, { name: placeName }: DisplayPlace) => new Promise<{
    placeId: string;
    reason?: string;
}>((success, fail) => {
    if (placeName === '교실') primaryPlaces.then(e => e ? success({
        placeId: e._id
    }) : toast.error("교실 정보를 불러올 수 없어요"))
    if (placeName === '인강실')
        return success({
            placeId: ["601fe6b4a40ac010e7a64968", "601fe6b4a40ac010e7a64961"][student.grade - 1]
        })
    if (placeName === '세탁')
        return success({
            placeId: student.gender === Gender.F ? "601fe6b4a40ac010e7a64967" : "601fe6b4a40ac010e7a64966"
        })
    if (placeName === '안정실') return success({
        placeId: "601fe6b4a40ac010e7a64962"
    })
    if (placeName === '동아리실')
        showModal((close) => <OtherPlaceModal showOnly="CIRCLE" onSubmit={(name, placeId, reason) => {
            success({
                placeId,
                reason
            })
            close()
        }} />, {
            wrapperProps: {
                css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px;`
            }
        })
    if (placeName === '기타') return showModal((close) => <OtherPlaceModal onSubmit={(name, placeId, reason) => {
        success({
            placeId,
            reason
        })
        close()
    }} />, {
        wrapperProps: {
            css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px;`
        }
    })
    if (placeName === '결석') return showModal((close) => <InputFormModal
        form={
            [{
                label: "사유",
                placeholder: "사유를 입력해주세요",
                required: true
            }]}
        onSubmit={(values) => {
            success({
                placeId: '6033cc7dcc46510024fa8ff5',
                reason: values[0]
            })
            close()
        }} />, {
        wrapperProps: {
            css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px;`
        }
    })
    if (placeName === '이동반') {
        const rawStored = localStorage.getItem(LocalstorageKeys.MOVINGCLASS)
        if (!rawStored) {
            toast.info('이동반 정보를 찾을 수 없어요. 이동반 위치를 지정해주세요.')
            showModal((close) => <OtherPlaceModal presetReason="이동반" onSubmit={(name, placeId, reason) => {
                localStorage.setItem(LocalstorageKeys.MOVINGCLASS, placeId)
                success({
                    placeId,
                    reason
                })
                close()
            }} />, {
                wrapperProps: {
                    css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px;`
                }
            })
            return
        }
        return success({
            placeId: rawStored,
            reason: "이동반"
        })
    }
})