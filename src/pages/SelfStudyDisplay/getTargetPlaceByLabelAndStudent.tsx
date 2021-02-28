import css from "@emotion/css"
import React from "react"
import { toast } from "react-toastify"
import { DisplayPlace } from "."
import { getPlaceList, getPrimaryPlaceList } from "../../api/place"
import { showModal } from "../../components"
import { LocalstorageKeys } from "../../constants/localstorageKeys"
import { Student, Gender } from "../../constants/types"
import { InputFormModal } from "../Main/InputFormModal"
import { OtherPlaceModal } from "../Main/OtherPlaceModal"

const getHomeroom = async (grade?: number, clas?: number) => {
    try {
        if(grade) throw new Error("No Grade provided");
        const primaryPlaces = await getPrimaryPlaceList()
        const homeroom = primaryPlaces.find(place => place.label === '교실')
        if (homeroom) return homeroom;
    } catch (e) {
        if (!(grade && clas)) throw new Error("학급 정보를 찾을 수 없습니다")
        const queriedHomeroom = (await getPlaceList()).find(place => place.name === `${grade}학년 ${clas}반`)
        if (queriedHomeroom) return queriedHomeroom
        throw new Error("Cannot find homeroom")
    }
}

export const getTargetPlaceByLabelAndStudent = (student: Student, { name: placeName }: DisplayPlace, isTeacher?: boolean) =>
    new Promise<{
        placeId: string;
        reason?: string;
    }>((success, fail) => {
        if (placeName === '교실') getHomeroom(...(isTeacher ? [student.grade, student.class] : [])).then(e => {
            console.log(e)
            if (e)
                success({
                    placeId: e._id
                })
        })
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
            const rawStored = getStoredMovingClass()
            if (!rawStored) {
                toast.info('이동반 정보를 찾을 수 없어요. 이동반 위치를 지정해주세요.')
                showModal((close) => <OtherPlaceModal presetReason="이동반" onSubmit={(name, placeId, reason) => {
                    localStorage.setItem(LocalstorageKeys.MOVINGCLASS, JSON.stringify({
                        id: placeId,
                        name
                    }))
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
                placeId: rawStored.id,
                reason: "이동반"
            })
        }
    })

export const getStoredMovingClass = (): { name: string; id: string } | null => {
    const stored = localStorage.getItem(LocalstorageKeys.MOVINGCLASS)
    if(stored) return JSON.parse(stored)
    else return null
}
