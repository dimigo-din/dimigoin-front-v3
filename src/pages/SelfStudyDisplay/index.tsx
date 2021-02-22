import React, { RefObject, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import css, { SerializedStyles } from "@emotion/css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as OtherIcon } from "../../assets/icons/other.svg";
import { ReactComponent as InsangsilIcon } from "../../assets/icons/ingangsil.svg";
import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import { ReactComponent as AbsentIcon } from "../../assets/icons/close.svg";
import { ReactComponent as IconLogo } from "../../assets/brand.svg";
import {
  Horizontal, noBreak, PageWrapper, showModal,
  ResponsiveWrapper, Divider, UnstyledLink
} from "../../components";
import { Timeline } from "./Timeline";
import {
  AttendanceLogWithStudent, Gender, Permission, SelfStudyTime, Student
} from "../../constants/types";
import { getWholeClassAttendanceLog, registerOtherStudentMovingHistory } from "../../api";
import { useMyData } from "../../hooks/api/useMyData";
import Skeleton from "react-loading-skeleton";
import { getSelfStudyPeriod } from "../../utils";
import { OtherPlaceModal } from "../Main/OtherPlaceModal";
import { getPrimaryPlaceList } from "../../api/place";
import { toast } from "react-toastify";
import { InputFormModal } from "../Main/InputFormModal";

interface TopBarProps {
  clasName?: string;
  selfStudyName: string;
}

interface LabelCardProps {
  title: string | boolean;
  contentCss?: SerializedStyles;
  width?: number;
  hasLabel?: boolean;
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
}

const ROW_COLOR = {
  AVAILABLE: "var(--main-theme-accent)",
  NOTAVAILABLE: "#B8B8B8",
};

const TopBar: React.FC<TopBarProps> = ({ clasName, selfStudyName }) => (
  <Horizontal
    css={css`
      align-items: center;
    `}
  >
    <UnstyledLink to="/">
      <IconLogo height={48} width={32} />
    </UnstyledLink>
    <ClassName>{clasName || <Skeleton width={300} />}</ClassName>
    <SelfStudyName>{selfStudyName}</SelfStudyName>
  </Horizontal>
);

const LabelCard: React.FC<LabelCardProps> = React.forwardRef(({
  children,
  title,
  contentCss,
  width,
  hasLabel,
  ...props
}, ref) => {
  return (
    <LabelWrapper {...props} width={width} ref={ref}>
      {title && <LabelTitle visible={!!hasLabel}>{title}</LabelTitle>}
      <ContentWrapper hasLabel={!!(title && hasLabel)} css={contentCss}>{children}</ContentWrapper>
    </LabelWrapper>
  )
});

const openTimelineByStudent = (student: Student) => {
  showModal(close => <Timeline student={student} close={close} />, {
    wrapperProps: {
      css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px; width: 100%;`
    }
  })
}

const DraggableStudent: React.FC<{
  student: Student;
  additionalInfo: string;
  freeWidth: boolean;
  isDraggable?: boolean;
}> = ({ student, additionalInfo, children, freeWidth, isDraggable }) => {
  const [, draggable] = useDrag({
    item: {
      type: "STUDENT",
      student
    },
    collect: state => ({
      isDragging: state.isDragging()
    })
  })
  return (
    <StudentWrapper
      freeWidth={freeWidth}
      onClick={isDraggable ? () => openTimelineByStudent(student) : undefined}
    >
      <p ref={isDraggable ? draggable : undefined}>
        {children}
      </p>
      <Chip>{additionalInfo}</Chip>
    </StudentWrapper>
  )
};

const StudentList: React.FC<{
  log?: AttendanceLogWithStudent[];
  hasLabel: boolean;
  moveStudent(student: Student): void;
  rowType: string;
  isDraggable?: boolean;
}> = ({
  log,
  hasLabel,
  moveStudent,
  rowType,
  isDraggable
}) => {
    const [, droppable] = useDrop<{ type: 'STUDENT', student: Student }, unknown, unknown>({
      accept: 'STUDENT',
      drop: isDraggable ? ({ student }) => moveStudent(student) : undefined
    })
    return (
      <LabelCard
        title="이름"
        hasLabel={hasLabel}
        css={css`
          flex: 1;
        `}
        contentCss={css`
        align-items: flex-start;
      `}
        ref={droppable}
      >
        <Horizontal
          css={css`
          margin: -10px;
          flex-wrap: wrap;
        `}
        >
          {log ? log.map((student) => (
            <DraggableStudent
              isDraggable={isDraggable}
              freeWidth={['ABSENT', 'ETC'].includes(rowType)}
              key={student.student._id}
              student={student.student}
              additionalInfo={`${student.log?.place.name || "장소를 등록하지 않았습니다"}${student.log?.remark ? `(${student.log?.remark})` : ''}`}
            >
              {student.student.number} {student.student.name} {rowType === 'ETC' ? <EtcInfo>
                {student.log?.place.name}, {student.log?.remark}
              </EtcInfo> : <EtcInfo>
                  {student.log?.remark}
                </EtcInfo>}
            </DraggableStudent>
          )) : [...Array(Math.floor(Math.random() * 10) + 3)].map((_, index) => <StudentWrapper key={`index${index}`}>
            <Skeleton width={80} />
          </StudentWrapper>)}
        </Horizontal>
      </LabelCard>
    )
  }

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

interface DisplayPlace {
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

const primaryPlaces = getPrimaryPlaceList().then(e => e.find(place => place.label === '교실'))

const OTHER_INDEX = groupedPlaces.findIndex(p => p.fallback)
const INITIAL_INDEX = groupedPlaces.findIndex(p => p.initial)

const getTargetPlaceByLabelAndStudent = (student: Student, { name: placeName }: DisplayPlace) => new Promise<{
  placeId: string;
  reason?: string;
}>((success) => {
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
    form={[{
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
  toast.error("장소 불러오기를 실패했어요")
})

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

  const myData = useMyData()

  const updateSelfStudyTimeLabel = useCallback(() => {
    setCurrentSelfStudyTime(() => getSelfStudyPeriod())
  }, [setCurrentSelfStudyTime])

  const fetchData = useCallback(async () => {
    if (!myData) return
    const [available, notAvailable] = (await getWholeClassAttendanceLog(myData.grade, myData.class))
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
  }, [setSelfStudyStatus, myData])

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
          clasName={myData && `${myData.grade}학년 ${myData.class}반`}
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
            {[{
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
              </ResponsiveWrapper>)}
          </div>
        </TableWrapper>
        <ResponsiveWrapper css={css`
          flex-direction: column;
        `}>
          <Divider data-divider smaller horizontal />
          <ResponsiveWrapper css={css`
          align-items: flex-start;
        `}>
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
            </Horizontal>
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

const LabelWrapper = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  /* margin-top: 15px; */
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

const LabelTitle = styled.h3<{ visible: boolean }>`
  color: white;
  background-color: var(--row-color);
  padding: 8px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  
  ${({ visible }) => !visible && css`
    @media screen and (min-width: 800px) {
      display: none;
    }
  `}
`;

const ContentWrapper = styled.div<{ hasLabel: boolean; }>`
  border: 1px solid var(--row-color);
  padding: 14px;
  color: var(--row-color);
  font-size: 23px;
  font-weight: 700;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: white;

  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  ${({ hasLabel }) => !hasLabel && css`border-radius: 5px;`}
`;

const ClassName = styled.h1`
  font-size: 34px;
  font-family: "NanumSquare";
  font-weight: 900;
  margin-left: 20px;
`;

const SelfStudyName = styled.h2`
  font-size: 26px;
  margin-left: 20px;
`;

const EtcInfo = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const StudentWrapper = styled.h3<{ freeWidth?: boolean }>`
  padding: 15px;
  color: var(--row-color);
  font-size: 23px;
  font-weight: 700;
  ${({ freeWidth }) => !freeWidth && css`width: 100px;`}
  &:hover {
    &>div {
      opacity: 1;
      margin-top: 0px;
      visibility: visible;
    }
  }
`;

const Chip = styled.div`
  display: block;
  visibility: hidden;
  content: attr("data-additional-info");
  padding: 12px;
  opacity: 0;
  position: absolute;
  background-color: white;
  color: black;
  box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  max-width: 120px;
  line-height: 24px;
  border-radius: 8px;
  margin-top: -12px;
  transition: 300ms cubic-bezier(0, 0.46, 0.12, 0.98);
`

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

export default SelfStudyDisplay;
