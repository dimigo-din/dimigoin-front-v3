import React, { RefObject, useCallback, useDebugValue, useEffect, useState } from "react";
import styled from "@emotion/styled";
import css, { SerializedStyles } from "@emotion/css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as HealingsilIcon } from "../../assets/icons/healingsil.svg";
import { ReactComponent as OtherIcon } from "../../assets/icons/other.svg";
import { ReactComponent as InsangsilIcon } from "../../assets/icons/ingangsil.svg";
import { ReactComponent as CircleIcon } from "../../assets/icons/circle.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as LaundryIcon } from "../../assets/icons/laundry.svg";
import { ReactComponent as AbsentIcon } from "../../assets/icons/close.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { ReactComponent as IconLogo } from "../../assets/brand.svg";
import {
  Button, ButtonProps, Horizontal, noBreak,
  PageWrapper, showModal, NamedSection, ResponsiveWrapper, Divider
} from "../../components";
import { Timeline } from "./Timeline";
import MoveClass from "./MoveClass";
import { AttendanceLogWithStudent, Gender, Student } from "../../constants/types";
import { getWholeClassAttendanceLog } from "../../api";
import { OtherPlaceModal } from "../Main/OtherPlaceModal";
import { useMyData } from "../../hooks/api/useMyData";
import Skeleton from "react-loading-skeleton";

interface TopBarProps {
  klassName?: string;
  jaseupName: string;
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

const TopBar: React.FC<TopBarProps> = ({ klassName, jaseupName }) => (
  <Horizontal
    css={css`
      align-items: center;
    `}
  >
    <IconLogo height={48} width={32} />
    <ClassName>{klassName || <Skeleton width={300} />}</ClassName>
    <JaseupName>{jaseupName}</JaseupName>
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
  showModal(() => <Timeline student={student} />, {
    wrapperProps: {
      css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px; width: 100%;`
    }
  })
}

const DraggableStudent: React.FC<{ student: Student }> = ({ student }) => {
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
    <StudentWrapper onClick={() => openTimelineByStudent(student)}>
      <p ref={draggable}>
        {student.number} {student.name}
      </p>
    </StudentWrapper>
  )
};

const StudentList: React.FC<{
  log?: AttendanceLogWithStudent[];
  hasLabel: boolean;
  moveStudent(student: Student): void;
}> = ({
  log,
  hasLabel,
  moveStudent
}) => {
    const [, droppable] = useDrop<{ type: 'STUDENT', student: Student }, unknown, unknown>({
      accept: 'STUDENT',
      drop: ({ student }) => moveStudent(student)
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
            <DraggableStudent key={student.student._id} student={student.student} />
          )) : [...Array(Math.floor(Math.random() * 10) + 3)].map(() => <StudentWrapper>
            <Skeleton width={80} />
          </StudentWrapper>)}
        </Horizontal>
      </LabelCard>
    )
  }

const ButtonWithIcon: React.FC<Partial<ButtonProps> & {
  icon: React.FunctionComponent;
  label: string;
}> = ({ icon: Icon, label, ...props }) => {
  return (<ButtonWithIconWrapper {...props} >
    <Icon css={[iconStyle, css`
        fill: white;
        margin-right: 6px;
      `]} />
    {label}
  </ButtonWithIconWrapper>)
}

interface DisplayPlace {
  name: string;
  ids: string[];
  icon: JSX.Element;
  isAvailable: boolean;
  fallback?: boolean;
  keyword?: string[];
  initial?: boolean;
}

const iconStyle = css`
  width: 24px;
  fill: var(--row-color);
`

interface DisplayPlaceWithStudents extends DisplayPlace {
  students: AttendanceLogWithStudent[]
}

const INIT_PLACE_KEY = "HOMEROOM"

const groupedPlaces: DisplayPlace[] = [{
  icon: <DeskIcon css={iconStyle} />,
  ids: [INIT_PLACE_KEY],
  name: "교실",
  isAvailable: true,
  initial: true,
}, {
  icon: <InsangsilIcon css={iconStyle} />,
  ids: ["601fe6b4a40ac010e7a64961", "601fe6b4a40ac010e7a64968"],
  name: "인강실",
  keyword: ["인강실"],
  isAvailable: false,
}, {
  icon: <CircleIcon css={iconStyle} />,
  ids: [],
  name: "동아리",
  isAvailable: false,
  keyword: ["동아리"],
}, {
  icon: <LaundryIcon css={iconStyle} />,
  ids: [],
  name: "세탁",
  isAvailable: false,
  keyword: ["동아리"],
}, {
  icon: <HealingsilIcon css={iconStyle} />,
  ids: ["601fe6b4a40ac010e7a64962"],
  name: "안정실",
  isAvailable: false,
}, {
  icon: <OtherIcon css={iconStyle} />,
  ids: [],
  name: "기타",
  isAvailable: false,
  fallback: true,
}, {
  icon: <AbsentIcon css={iconStyle} />,
  ids: [],
  name: "결석",
  keyword: ["결석"],
  isAvailable: false,
}]

const isRealData = (d: DisplayPlace): d is DisplayPlaceWithStudents => (d as any).students

const OTHER_INDEX = groupedPlaces.findIndex(p => p.fallback)
const INITIAL_INDEX = groupedPlaces.findIndex(p => p.initial)
const keywordQuery = groupedPlaces.map(p => p.keyword)

const getTargetPlaceByLabelAndStudent = (student: Student, { name: placeName }: DisplayPlace) => new Promise<{
  placeId: string;
  reason?: string;
}>((success, error) => {
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
  if (placeName === '동아리')
    showModal((close) => <OtherPlaceModal priority="CIRCLE" onSubmit={(name, placeId, reason) => {
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
})

const SelfStudyDisplay: React.FC = () => {
  const [selfStudyStatus, setSelfStudyStatus] = useState<{
    available: DisplayPlaceWithStudents[];
    notAvailable: DisplayPlaceWithStudents[]
  }>()

  const myData = useMyData()

  const fetchData = useCallback(async () => {
    if (!myData) return
    const [available, notAvailable] = (await getWholeClassAttendanceLog(myData.grade, myData.class))
      .reduce((grouped, current) => {
        const placeGroupIndex = current.log?.place._id !== undefined ? grouped.findIndex(p => p.ids.includes(current.log!.place._id)) : INITIAL_INDEX
        const remarkQueriedIndex = !!current.log?.remark && keywordQuery.findIndex(keywords => keywords?.some(keyword => current.log!.remark.includes(keyword)))
        const matchedIndex = +((remarkQueriedIndex && remarkQueriedIndex !== -1) ? remarkQueriedIndex : ((placeGroupIndex !== -1) ? placeGroupIndex : OTHER_INDEX))
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
  }, [setSelfStudyStatus, myData])

  const moveStudentPlaceTo = useCallback(async (student: Student, place: DisplayPlace) => {
    const parsedPlace = await getTargetPlaceByLabelAndStudent(student, place)
  }, [])

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
    const timer = setInterval(() => fetchData(), 1000)
    return () => clearInterval(timer)
  }, [fetchData])

  return (
    <DndProvider backend={HTML5Backend}>
      <PageWrapper
        css={css`
          padding-top: 40px;
        `}
      >
        <TopBar klassName={myData && `${myData.grade}학년 ${myData.class}반`} jaseupName="방과후 자율학습 1타임" />
        <TableWrapper>
          <div>
            {[{
              color: ROW_COLOR.AVAILABLE,
              label: "현원",
              places: selfStudyStatus?.available
            }, {
              color: ROW_COLOR.NOTAVAILABLE,
              label: "결원",
              places: selfStudyStatus?.notAvailable
            }].map((type, typeIndex) =>
              <ResponsiveWrapper
                key={type.color}
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
                    /* margin-top: -15px; */
                    flex-direction: column;
                    flex: 1;
                  `}
                >
                  {
                    (type.places || groupedPlaces).map((place, placeIndex) => {
                      const hasLabel = typeIndex === 0 && placeIndex === 0

                      return (
                        <>
                        {placeIndex !== 0 && <Divider data-divider horizontal smaller />}
                          <ResponsiveWrapper
                            threshold={800}
                            key={place.name}
                          >
                            <ResponsiveWrapper threshold={0}>
                              <LabelCard title="위치" hasLabel={hasLabel} css={[noBreak, responsiveLabelCardWidth(125)]} contentCss={locationLabelStyle}>
                                {place.icon}
                                <LocationLabelText>
                                  {place.name}
                                </LocationLabelText>
                              </LabelCard>
                              <Divider data-divider smaller />
                              <LabelCard title="인원" hasLabel={hasLabel} css={responsiveLabelCardWidth(75)}>
                                {isRealData(place) ? place.students.length : <Skeleton width={50} />}
                              </LabelCard>
                            </ResponsiveWrapper>
                            <Divider data-divider smaller />
                            <StudentList hasLabel={hasLabel} log={isRealData(place) ? place.students : undefined} moveStudent={place && (student => moveStudentPlaceTo(student, place))} />
                          </ResponsiveWrapper>
                        </>
                      )
                    })
                  }
                </ResponsiveWrapper>
              </ResponsiveWrapper>)}
          </div>
        </TableWrapper>
        <Divider />
        <Horizontal css={css`
          align-items: flex-start;
        `}>
          {<Horizontal
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
              10
            </LabelCard>
            <LabelCard title="현원" hasLabel width={70}>
              20
            </LabelCard>
            <LabelCard title="결원" hasLabel width={70} css={css`--row-color: ${ROW_COLOR.NOTAVAILABLE};`}>
              30
            </LabelCard>
          </Horizontal>}
          <Horizontal css={css`
            &>*+* {
              margin-left: 12px;
            }
          `}>
            <ButtonWithIcon icon={RefreshIcon} label="새로고침" onClick={() => fetchData()} />
            {/* <ButtonWithIcon icon={DeskIcon} label="이동반" onClick={openMoveClassDisplay} /> */}
            {/* <ButtonWithIcon icon={HistoryIcon} label="히스토리" onClick={openTimeline} /> */}
          </Horizontal>
        </Horizontal>
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
  
  ${({visible}) => !visible && css`
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

const JaseupName = styled.h2`
  font-size: 26px;
  margin-left: 20px;
`;

const StudentWrapper = styled.h3`
  padding: 15px;
  color: var(--row-color);
  font-size: 23px;
  font-weight: 700;
  width: 100px;
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

const ButtonWithIconWrapper = styled(Button)`
  align-items: center;
  display: flex;
`

export default SelfStudyDisplay;
