import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as OtherIcon } from "../../assets/icons/other.svg";
import { ReactComponent as InsangsilIcon } from "../../assets/icons/ingangsil.svg";
import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import { ReactComponent as AbsentIcon } from "../../assets/icons/close.svg";
import {
  Horizontal, noBreak, PageWrapper, ResponsiveWrapper, Divider, Card
} from "../../components";
import {
  AttendanceLogWithStudent, Permission, SelfStudyTime, Student
} from "../../constants/types";
import { getWholeClassAttendanceLog, registerOtherStudentMovingHistory } from "../../api";
import { useMyData } from "../../hooks/api/useMyData";
import Skeleton from "react-loading-skeleton";
import { getSelfStudyPeriod } from "../../utils";
import { isStudent } from "../../utils/isStudent";
import { getTargetPlaceByLabelAndStudent } from "./getTargetPlaceByLabelAndStudent";
import { LabelCard } from "./LabelCard";
import { TopBar } from "./TopBar";
import { StudentList } from "./StudentList";
import { CardHeader } from "../../components/basic/CardComponent";



const ROW_COLOR = {
  AVAILABLE: "var(--main-theme-accent)",
  NOTAVAILABLE: "#B8B8B8",
};

// const ButtonWithIcon: React.FC<Partial<ButtonProps> & {
//   icon: React.FunctionComponent;
//   label: string;
// }> = ({ icon: Icon, label, ...props }) => {
//   return (<ButtonWithIconWrapper {...props} >
//     <Icon css={[iconStyle, css`
//         fill: white;
//         margin-right: 6px;
//       `]} />
//     {label}
//   </ButtonWithIconWrapper>)
// }

export interface DisplayPlace {
  name: string;
  type: string;
  icon: JSX.Element;
  isAvailable: boolean;
  fallback?: boolean;
  initial?: boolean;
}

const iconStyle = css`
  width: 24px;
  fill: var(--row-color);
`

interface DisplayPlaceWithStudents extends DisplayPlace {
  students: AttendanceLogWithStudent[]
}

const groupedPlaces: DisplayPlace[] = [{
  icon: <DeskIcon css={iconStyle} />,
  type: "CLASSROOM",
  name: "교실",
  isAvailable: true,
  initial: true,
}, {
  icon: <InsangsilIcon css={iconStyle} />,
  type: "INGANG",
  name: "인강실",
  isAvailable: false,
}, {
  icon: <CircleIcon css={iconStyle} />,
  type: "CIRCLE",
  name: "동아리실",
  isAvailable: false,
}, {
  icon: <OtherIcon css={iconStyle} />,
  type: "ETC",
  name: "기타",
  isAvailable: false,
  fallback: true,
}, {
  icon: <AbsentIcon css={iconStyle} />,
  type: "ABSENT",
  name: "결석",
  isAvailable: false,
}]

const isRealData = (d: DisplayPlace): d is DisplayPlaceWithStudents => (d as any).students

const OTHER_INDEX = groupedPlaces.findIndex(p => p.fallback)
const INITIAL_INDEX = groupedPlaces.findIndex(p => p.initial)


const SelfStudyDisplay: React.FC = () => {
  const [selfStudyStatus, setSelfStudyStatus] = useState<{
    available: DisplayPlaceWithStudents[];
    notAvailable: DisplayPlaceWithStudents[]
  }>()

  const [studentQuantity, setStudentQuantity] = useState<{
    available: number,
    notAvailable: number
  }>()

  const [currentSelfStudyTime, setCurrentSelfStudyTime] = useState<SelfStudyTime | null>(getSelfStudyPeriod())
  const [classInfo, setClassInfo] = useState<number[] | null>()

  const myData = useMyData()

  useEffect(() => {
    if (!myData) return
    if (isStudent(myData))
      setClassInfo(() => [myData.class, myData.class])
    else setClassInfo(() => null)
  }, [myData])

  const updateSelfStudyTimeLabel = useCallback(() => {
    setCurrentSelfStudyTime(() => getSelfStudyPeriod())
  }, [setCurrentSelfStudyTime])

  const fetchData = useCallback(async () => {
    if (!myData || !classInfo) return
    const [available, notAvailable] = (await getWholeClassAttendanceLog(classInfo[0], classInfo[1]))
      .reduce((grouped, current) => {
        const placeGroupIndex = current.log?.place.type !== undefined ? grouped.findIndex(p => p.type === current.log?.place.type) : INITIAL_INDEX
        const matchedIndex = (placeGroupIndex !== -1) ? placeGroupIndex : OTHER_INDEX
        return [
          ...grouped.slice(0, matchedIndex), {
            ...grouped[matchedIndex],
            students: [...(grouped[matchedIndex].students || []), current]
          },
          ...grouped.slice(matchedIndex + 1)
        ]
      }, groupedPlaces.map(g => ({ ...g, students: [] })) as DisplayPlaceWithStudents[])
      .reduce((grouped, current) => {
        if (current.isAvailable) return [[...grouped[0], current], grouped[1]]
        return [grouped[0], [...grouped[1], current]]
      }, [[], []] as DisplayPlaceWithStudents[][])
    setSelfStudyStatus(() => ({ available, notAvailable }))
    setStudentQuantity(() => ({
      available: available.reduce((acc, current) => acc + current.students.length, 0),
      notAvailable: notAvailable.reduce((acc, current) => acc + current.students.length, 0)
    }))
  }, [setSelfStudyStatus, myData, classInfo])

  const moveStudentPlaceTo = useCallback(async (student: Student, place: DisplayPlace) => {
    if (!myData?.permissions.includes(Permission.attendance)) return

    const parsedPlace = await getTargetPlaceByLabelAndStudent(student, place)
    await registerOtherStudentMovingHistory(student._id, {
      place: parsedPlace.placeId,
      remark: parsedPlace.reason
    })
    await fetchData()
  }, [myData, fetchData])

  // const openMoveClassDisplay = useCallback(() => {
  //   showModal(() => <NamedSection css={css`
  //     padding: 20px;
  //   `} sections={[{
  //       name: "방과후 1실",
  //       component: <MoveClass />
  //     }, {
  //       name: "방과후 2실",
  //       component: <MoveClass />
  //     }]} />, {
  //     wrapperProps: {
  //       css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px; width: 100%;`
  //     }
  //   })
  // }, [])

  useEffect(() => {
    fetchData()
    const timer = setInterval(() => fetchData(), 5000)
    const timeNameTimer = setInterval(() => updateSelfStudyTimeLabel(), 1000 * 60 * 5)
    return () => {
      clearInterval(timer)
      clearInterval(timeNameTimer)
    }
  }, [fetchData, updateSelfStudyTimeLabel])

  return (
    <DndProvider backend={HTML5Backend}>
      <PageWrapper
        css={css`
          padding-top: 40px;
        `}
      >
        <TopBar
          hasClassInfo={classInfo === undefined ? undefined : !!classInfo}
          clasName={classInfo ? `${classInfo[0]}학년 ${classInfo[1]}반` : undefined}
          selfStudyName={
            currentSelfStudyTime ? ({
              [SelfStudyTime.NSS1]: "야간자율학습 1타임",
              [SelfStudyTime.NSS2]: "야간자율학습 2타임",
              [SelfStudyTime.AFSC1]: "방과후자율학습 1타임",
              [SelfStudyTime.AFSC2]: "방과후자율학습 2타임"
            })[currentSelfStudyTime] : "자율학습시간이 아닙니다"
          } />
        <TableWrapper>
          <div>
            {classInfo ? [{
              color: selfStudyStatus ? ROW_COLOR.AVAILABLE : ROW_COLOR.NOTAVAILABLE,
              label: "현원",
              places: selfStudyStatus?.available
            }, {
              color: ROW_COLOR.NOTAVAILABLE,
              label: "결원",
              places: selfStudyStatus?.notAvailable
            }].map((type, typeIndex) =>
              <ResponsiveWrapper
                key={type.label}
                threshold={800}
                css={css`
                  align-items: stretch;
                  --row-color: ${type.color};
                  margin-top: 20px;
                `}
              >
                <RowLable css={noBreak}> {type.label} </RowLable>
                <Divider data-divider smaller />
                <ResponsiveWrapper
                  threshold={800}
                  css={css`
                    flex-direction: column;
                    flex: 1;
                  `}
                >
                  {
                    (type.places || groupedPlaces).map((place, placeIndex) => {
                      const hasLabel = typeIndex === 0 && placeIndex === 0

                      return (
                        <React.Fragment key={place.name}>
                          {placeIndex !== 0 && <Divider data-divider horizontal smaller />}
                          <ResponsiveWrapper
                            threshold={800}
                            key={place.name}
                          >
                            <ResponsiveWrapper threshold={0}>
                              <LabelCard title="위치" hasLabel={hasLabel} css={[noBreak, responsiveLabelCardWidth(160)]} contentCss={locationLabelStyle}>
                                {place.icon}
                                <LocationLabelText>
                                  {isRealData(place) ? place.name : <Skeleton width={50} />}
                                </LocationLabelText>
                              </LabelCard>
                              <Divider data-divider smaller />
                              <LabelCard title="인원" hasLabel={hasLabel} css={responsiveLabelCardWidth(75)}>
                                {isRealData(place) ? place.students.length : <Skeleton width={50} />}
                              </LabelCard>
                            </ResponsiveWrapper>
                            <Divider data-divider smaller />
                            <StudentList
                              hasLabel={hasLabel}
                              rowType={place.type}
                              log={isRealData(place) ? place.students : undefined}
                              moveStudent={place && (student => moveStudentPlaceTo(student, place))}
                              isDraggable={myData?.permissions.includes(Permission.attendance)}
                            />
                          </ResponsiveWrapper>
                        </React.Fragment>
                      )
                    })
                  }
                </ResponsiveWrapper>
              </ResponsiveWrapper>) : <ClassSelectGrid>
                {[...Array(3)].map((_, gradeIndex) => <>
                  <GridRow>
                    {[...Array(6)].map((__, classIndex) => <>
                      <ClassCard disableSpace>
                        <CardHeader>{gradeIndex + 1}학년 {classIndex + 1}반</CardHeader>
                      </ClassCard>
                    </>)}
                  </GridRow>
                </>)}
              </ClassSelectGrid>}
          </div>
        </TableWrapper>
        <ResponsiveWrapper css={css`
          flex-direction: column;
        `}>
          <Divider data-divider smaller horizontal />
          <ResponsiveWrapper css={css`
          align-items: flex-start;
        `}>{classInfo &&
              <Horizontal
                css={css`
              align-items: stretch;
              --row-color: ${ROW_COLOR.AVAILABLE};
              flex: 1;
              &>*+*{
                margin-left: 10px;
              }
              &>div {
                margin-top: 0px;
              }
            `}
              >
                <LabelCard title="총원" hasLabel width={70}>
                  {studentQuantity ? (studentQuantity.available + studentQuantity.notAvailable) : <Skeleton width={30} />}
                </LabelCard>
                <LabelCard title="현원" hasLabel width={70}>
                  {studentQuantity ? studentQuantity.available : <Skeleton width={30} />}
                </LabelCard>
                <LabelCard title="결원" hasLabel width={70} css={css`--row-color: ${ROW_COLOR.NOTAVAILABLE};`}>
                  {studentQuantity ? studentQuantity.notAvailable : <Skeleton width={30} />}
                </LabelCard>
              </Horizontal>}
            {/* <ResponsiveWrapper css={css`
              flex-direction: column;
                &>*+* {
                  margin-left: 12px;
                }
            `}> */}
            {/* <ButtonWithIcon icon={DeskIcon} label="이동반" onClick={openMoveClassDisplay} /> */}
            {/* <ButtonWithIcon icon={HistoryIcon} label="히스토리" onClick={openTimeline} /> */}
            {/* </ResponsiveWrapper> */}
          </ResponsiveWrapper>

        </ResponsiveWrapper>
      </PageWrapper>
    </DndProvider>
  );
};

const TableWrapper = styled.div`
  margin-top: 45px;
`;

const RowLable = styled.div`
  padding: 10px;
  background-color: var(--row-color);
  color: white;
  font-weight: 700;
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const locationLabelStyle = css`
  flex-direction: row;
`

const responsiveLabelCardWidth = (width: number) => css`
  /* width: calc(var(--responsive-horizontal) * ${width}); */
  width: ${width}px;
  @media screen and (max-width: 800px) {
    width: unset;
    flex: 1;
  }
`

const LocationLabelText = styled.p`
  flex: 1;
  text-align: right; 
  @media screen and (max-width: 800px) {
    flex: unset;
    margin-left: 6px;
  }
`

// const ButtonWithIconWrapper = styled(Button)`
//   align-items: center;
//   display: flex;
// `

const ClassSelectGrid = styled.div`
margin: -20px -8px;
`

const GridRow = styled.div`
  display: flex;
`

const ClassCard = styled(Card)`
  margin: 20px 8px;
`

export default SelfStudyDisplay;
