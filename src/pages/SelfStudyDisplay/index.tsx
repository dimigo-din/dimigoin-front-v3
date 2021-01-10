import React, { RefObject, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import css, { SerializedStyles } from "@emotion/css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { ReactComponent as DeskIcon } from "../../assets/icons/desk.svg";
import { ReactComponent as LaundryIcon } from "../../assets/icons/laundry.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { ReactComponent as IconLogo } from "../../assets/brand.svg";
import PageWrapper from "../../components/grids/PageWrapper";
import { Horizontal, noBreak } from "../../components/Atomics";
import DimiButton, { IDimiButton } from "../../components/dimiru/DimiButton";
import { Timeline } from "./Timeline";
import NamedSection from "../../components/NamedSection";
import { show } from "../../components/Modal";
import MoveClass from "./MoveClass";

interface INavBarProps {
  className: string;
  jaseupName: string;
}

const NavBar: React.FC<INavBarProps> = ({ className, jaseupName }) => (
  <Horizontal
    css={css`
      align-items: center;
    `}
  >
    <IconLogo height={48} width={32} />
    <ClassName>{className}</ClassName>
    <JaseupName>{jaseupName}</JaseupName>
  </Horizontal>
);

interface ILabelCardProps {
  title: string;
  contentCss?: SerializedStyles;
  width?: number;
  ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null;
}

const LabelCard: React.FC<ILabelCardProps> = React.forwardRef(({
  children,
  title,
  contentCss,
  width,
  ...props
}, ref) => {
  return (
    <LabelWrapper {...props} width={width} ref={ref}>
      <LabelTitle>{title}</LabelTitle>
      <ContentWrapper css={contentCss}>{children}</ContentWrapper>
    </LabelWrapper>
  )
});

const Student: React.FC = ({ children }) => {
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

interface ISelfStudyStatus {
  label: string;
  icon: JSX.Element;
  students: {
    name: string;
    number: string;
  }[];
}


const StudentList: React.FC<{
  students: ISelfStudyStatus['students']
}> = ({
  students
}) => {
    const [, droppable] = useDrop({
      accept: 'STUDENT'
    })
    return (
      <LabelCard
        title="이름"
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
          {students.map((student) => (
            <Student key={student.number}>
              {student.number} {student.name}
            </Student>
          ))}
        </Horizontal>
      </LabelCard>
    )
  }

enum SelfStudyPlaceState {
  AVAILABLE = "AVAILABLE",
  NOTAVAILABLE = "NOTAVAILABLE"
}

const ROW_COLOR = {
  [SelfStudyPlaceState.AVAILABLE]: "var(--main-theme-accent)",
  [SelfStudyPlaceState.NOTAVAILABLE]: "#B8B8B8",
};

interface SelfStudy {
  type: SelfStudyPlaceState;
  name: string;
  labels: ISelfStudyStatus[];
}

const ButtonWithIcon: React.FC<Partial<IDimiButton> & {
  icon: React.FunctionComponent;
  label: string;
}> = ({ icon: Icon, label, ...props }) => {
  return (<DimiButton {...props}>
      <Icon css={[iconStyle, css`
        fill: white;
        margin-right: 6px;
      `]} />
      {label}
    </DimiButton>)
}

const SelfStudyDisplay: React.FC = () => {
  const [selfStudyData, setSelfStudyData] = useState<SelfStudy[]>();
  const [currentStudentQuentity, setCurrentStudentQuentity] = useState<{
    [key in keyof typeof SelfStudyPlaceState]: number
  }>()
  useEffect(() => {
    setSelfStudyData(() => [
      {
        name: "현원",
        type: SelfStudyPlaceState.AVAILABLE,
        labels: [
          {
            icon: <DeskIcon css={iconStyle} />,
            label: "교실",
            students: [
              {
                name: "강예원",
                number: "01",
              },
            ],
          },
          {
            icon: <DeskIcon css={iconStyle} />,
            label: "이동반",
            students: [
              {
                name: "강예투",
                number: "02",
              },
            ],
          },
        ],
      },
      {
        name: "결원",
        type: SelfStudyPlaceState.NOTAVAILABLE,
        labels: [
          {
            icon: <LaundryIcon css={iconStyle} />,
            label: "세탁",
            students: [
              {
                name: "박정한",
                number: "10",
              },
            ],
          },
        ],
      },
    ]);
  }, []);
  useEffect(() => {
    if (!selfStudyData) return
    const [available, notAvailable] = (selfStudyData.map(status => status.labels.reduce((acc, place) => place.students.length + acc, 0)))
    setCurrentStudentQuentity(() => ({
      AVAILABLE: available,
      NOTAVAILABLE: notAvailable
    }))
  }, [selfStudyData])

  const openMoveClassDisplay = useCallback(() => {
    show(() => <NamedSection css={css`
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
        css: css`max-width: 1080px; padding: 60px 20px 20px; width: 100%;`
      }
    })
}, [])

const openTimeline = useCallback(() => {
  show(() => <NamedSection sections={[{
    name: "1타임",
    component: <Timeline />
  }, {
    name: "2타임",
    component: <div>
      대충2번정보
    </div>
  }]} />, {
    wrapperProps: {
      css: css`max-width: 1080px; padding: 60px 20px 20px; width: 100%;`
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
        <NavBar className="1학년 3반" jaseupName="방과후 자율학습 1타임" />
        <TableWrapper>
          <div>
            {selfStudyData?.map((row) => (
              <Horizontal
                css={css`
                  align-items: stretch;
                  --row-color: ${ROW_COLOR[row.type]};
                  margin-top: 20px;
                `}
                key={row.name}
              >
                <RowLable css={noBreak}>{row.name}</RowLable>

                <div
                  css={css`
                    margin-top: -15px;
                    flex: 1;
                  `}
                >
                  {row.labels.map((label) => (
                    <Horizontal key={label.label} css={css`
                      &>*{margin-left: 15px;}`
                    }>
                      <LabelCard title="위치" width={125} css={noBreak} contentCss={locationLabelStyle}>
                        {label.icon}
                        <LocationLabelText>
                          {label.label}
                        </LocationLabelText>
                      </LabelCard>
                      <LabelCard title="인원" width={70}>
                        {label.students.length}
                      </LabelCard>
                      <StudentList students={label.students} />
                    </Horizontal>
                  ))}
                </div>
              </Horizontal>
            ))}
          </div>
        </TableWrapper>

        <Horizontal css={css`
          margin-top: 20px;
          align-items: flex-start;
        `}>
          {currentStudentQuentity && <Horizontal
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
              {currentStudentQuentity.AVAILABLE + currentStudentQuentity.NOTAVAILABLE}
            </LabelCard>
            <LabelCard title="현원" width={70}>
              {currentStudentQuentity?.AVAILABLE}
            </LabelCard>
            <LabelCard title="결원" width={70} css={css`--row-color: ${ROW_COLOR.NOTAVAILABLE};`}>
              {currentStudentQuentity?.NOTAVAILABLE}
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
  /* margin-left: 15px; */
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

const ContentWrapper = styled.div`
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
`;

const iconStyle = css`
  width: 24px;
  fill: var(--row-color);
`

const locationLabelStyle = css`
  flex-direction: row;
`

const LocationLabelText = styled.p`
  flex: 1;
  text-align: center; 
`

export default SelfStudyDisplay;
