import React, { RefObject, useCallback, useEffect, useState } from "react";
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
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { ReactComponent as IconLogo } from "../../assets/brand.svg";
import {
  Button, ButtonProps, Horizontal, noBreak,
  PageWrapper, showModal, NamedSection
} from "../../components";
import { Timeline } from "./Timeline";
import MoveClass from "./MoveClass";
import { AttendanceLog, AttendanceLogWithStudent, Doc, Place, Student } from "../../constants/types";
import { getMyClassAttendanceLog } from "../../api";
import { getPlaceList } from "../../api/place";

interface TopBarProps {
  klassName: string;
  jaseupName: string;
}

interface LabelCardProps {
  title: string | boolean;
  contentCss?: SerializedStyles;
  width?: number;
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
}

enum SelfStudyPlaceState {
  AVAILABLE = "AVAILABLE",
  NOTAVAILABLE = "NOTAVAILABLE"
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
    <ClassName>{klassName}</ClassName>
    <JaseupName>{jaseupName}</JaseupName>
  </Horizontal>
);

const LabelCard: React.FC<LabelCardProps> = React.forwardRef(({
  children,
  title,
  contentCss,
  width,
  ...props
}, ref) => {
  return (
    <LabelWrapper {...props} width={width} ref={ref}>
      {title && <LabelTitle>{title}</LabelTitle>}
      <ContentWrapper hasLabel={!!title} css={contentCss}>{children}</ContentWrapper>
    </LabelWrapper>
  )
});

const StudentName: React.FC = ({ children }) => {
  const [, draggable] = useDrag({
    item: {
      type: "STUDENT"
    },
    collect: state => ({
      isDragging: state.isDragging()
    })
  })
  return (
    <StudentWrapper>
      <p ref={draggable}>{children}</p>
    </StudentWrapper>
  )
};

const StudentList: React.FC<{
  log: AttendanceLogWithStudent[];
  hasLabel: boolean;
}> = ({
  log,
  hasLabel
}) => {
    const [, droppable] = useDrop({
      accept: 'STUDENT'
    })
    return (
      <LabelCard
        title={hasLabel && "이름"}
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
          margin: -20px;
          flex-wrap: wrap;
        `}
        >
          {log.map((student) => (
            <StudentName key={student.student.number}>
              {student.student.number} {student.student.name}
            </StudentName>
          ))}
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
}, {
  icon: <InsangsilIcon css={iconStyle} />,
  ids: ["601fe6b4a40ac010e7a64961", "601fe6b4a40ac010e7a64968"],
  name: "인강실",
  isAvailable: false,
}, {
  icon: <CircleIcon css={iconStyle} />,
  ids: [],
  name: "동아리",
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
}]

const OTHER_INDEX = groupedPlaces.findIndex(p => p.fallback)
const keywordQuery = groupedPlaces.map(p => p.keyword)

// const categorizedPlacesId = groupedPlaces.map(e => e.ids).flat()
// let cachedPlacesData: Doc<Place>[]

const SelfStudyDisplay: React.FC = () => {
  const [selfStudyStatus, setSelfStudyStatus] = useState<{
    available: DisplayPlaceWithStudents[];
    notAvailable: DisplayPlaceWithStudents[]
  }>()
  const fetchData = useCallback(async () => {
    const [available, notAvailable] = (await getMyClassAttendanceLog()).reduce((grouped, current) => {
      const placeGroupIndex = !!current.log?.place._id && grouped.findIndex(p => p.ids.includes(current.log!.place._id))
      const remarkQueriedIndex = !!current.log?.remark && keywordQuery.findIndex(keywords => keywords?.some(keyword => current.log!.remark.includes(keyword)))
      const matchedIndex = +(remarkQueriedIndex !== -1 ? remarkQueriedIndex : placeGroupIndex !== -1 ? placeGroupIndex : OTHER_INDEX)
      console.log(remarkQueriedIndex)
      return [
        ...grouped.slice(0, matchedIndex), {
          ...grouped[matchedIndex],
          students: [...(grouped[matchedIndex].students || []), current]
        },
        ...grouped.slice(matchedIndex + 1)
      ]
    }, groupedPlaces.map(g => ({ ...g, students: [] })) as DisplayPlaceWithStudents[]).reduce((grouped, current) => {
      if (current.isAvailable) return [[...grouped[0], current], grouped[1]]
      return [grouped[0], [...grouped[1], current]]
    }, [[], []] as DisplayPlaceWithStudents[][])

    console.log('?', available, notAvailable)
    // const [available, notAvailable] = Object.keys(groupedByPlaceKey)
    //   .reduce((matched, current) => {
    //     const placeGroupIndex = matched.findIndex(p => p.ids.includes(current))
    //     const keywordQueryIndex = keywordQuery.findIndex(k => k?.includes())
    //     const matchedIndex = placeGroupIndex === -1 ? OTHER_INDEX : placeGroupIndex
    //     return [
    //       ...matched.slice(0, matchedIndex), {
    //         ...matched[matchedIndex],
    //         students: [...(matched[matchedIndex].students || []), ...(groupedByPlaceKey[current] || [])]
    //       },
    //       ...matched.slice(matchedIndex + 1)
    //     ]
    //   }, groupedPlaces.map(g => ({...g, students: []})) as DisplayPlaceWithStudents[])


    setSelfStudyStatus(() => ({ available, notAvailable }))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openMoveClassDisplay = useCallback(() => {
    showModal(() => <NamedSection css={css`
      padding: 20px;
    `} sections={[{
        name: "방과후 1실",
        component: <MoveClass />
      }, {
        name: "방과후 2실",
        component: <div>
          대충2번정보
      </div>
      }]} />, {
      wrapperProps: {
        css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px; width: 100%;`
      }
    })
  }, [])

  const openTimeline = useCallback(() => {
    showModal(() => <NamedSection sections={[{
      name: "1타임",
      component: <Timeline />
    }, {
      name: "2타임",
      component: <div>
        대충2번정보
    </div>
    }]} />, {
      wrapperProps: {
        css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px; width: 100%;`
      }
    })
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <PageWrapper
        css={css`
          padding-top: 40px;
        `}
      >
        <TopBar klassName="1학년 3반" jaseupName="방과후 자율학습 1타임" />
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
            }].map(type =>
              <Horizontal
                css={css`
                  align-items: stretch;
                  --row-color: ${type.color};
                  margin-top: 20px;
                `}
              >
                <RowLable css={noBreak}> {type.label} </RowLable>

                <div
                  css={css`
                    margin-top: -15px;
                    flex: 1;
                  `}
                >
                  {
                    type.places?.map(place => <Horizontal css={css`
                    &>*{margin-left: 15px;}
                  `}>
                      <LabelCard title="위치" width={125} css={noBreak} contentCss={locationLabelStyle}>
                        {place.icon}
                        <LocationLabelText>
                          {place.name}
                        </LocationLabelText>
                      </LabelCard>
                      <LabelCard title={"인원"} width={70}>
                        {place.students?.length}
                      </LabelCard>
                      <StudentList hasLabel log={place.students} />
                    </Horizontal>)
                  }
                </div>
              </Horizontal>)}
          </div>
        </TableWrapper>

        <Horizontal css={css`
          margin-top: 20px;
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
            <LabelCard title="총원" width={70}>
              10
            </LabelCard>
            <LabelCard title="현원" width={70}>
              20
            </LabelCard>
            <LabelCard title="결원" width={70} css={css`--row-color: ${ROW_COLOR.NOTAVAILABLE};`}>
              30
            </LabelCard>
          </Horizontal>}
          <Horizontal css={css`
            &>*+* {
              margin-left: 12px;
            }
          `}>
            <ButtonWithIcon icon={RefreshIcon} label="새로고침" disabled />
            <ButtonWithIcon icon={DeskIcon} label="이동반" onClick={openMoveClassDisplay} />
            <ButtonWithIcon icon={HistoryIcon} label="히스토리" onClick={openTimeline} />
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
  margin-top: 15px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

const LabelTitle = styled.h3`
  color: white;
  background-color: var(--row-color);
  padding: 8px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
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
  padding: 20px;
  color: var(--row-color);
  font-size: 23px;
  font-weight: 700;
  width: 100px;
`;

const locationLabelStyle = css`
  flex-direction: row;
`

const LocationLabelText = styled.p`
  flex: 1;
  text-align: right; 
`

const ButtonWithIconWrapper = styled(Button)`
  align-items: center;
  display: flex;
`

export default SelfStudyDisplay;
