import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import css from "@emotion/css";
import { toast } from "react-toastify";
import { getAdverbalSuffix1 } from "josa-complete";
import Card from "../../components/basic/Card";
import { getMyAttendanceLog, registerMovingHistory } from "../../api/attendance";
import { getPrimaryPlaceList } from "../../api/place";
import { AttendanceLog, Doc, Place } from "../../constants/types";
import { ReactComponent as IngangsilSvg } from "../../assets/icons/ingangsil.svg";
import { ReactComponent as HealingsilSvg } from "../../assets/icons/healingsil.svg";
import { ReactComponent as OtherSvg } from "../../assets/icons/other.svg";
import { ReactComponent as LaundrySvg } from "../../assets/icons/laundry.svg";
import { ReactComponent as DeskSvg } from "../../assets/icons/desk.svg";
import { showModal } from "../../components/complex/modal";
import { OtherPlaceModal } from "./OtherPlaceModal";

type IconAvailablePlaceId = ["601fe6b4a40ac010e7a6496c", "601fe6b4a40ac010e7a64962", "601fe6b4a40ac010e7a64966", "601fe6b4a40ac010e7a64968"]

const IconPlaceMap = [{
  label: "교실",
  icon: DeskSvg,
}, {
  label: "안정실",
  icon: HealingsilSvg
}, {
  label: "세탁",
  icon: LaundrySvg,
}, {
  label: "인강실",
  icon: IngangsilSvg,
}]

const PlaceIcon: React.FC<{ placeLabel: string }> = ({ placeLabel }) => {
  const mapped = IconPlaceMap.find(icons => icons.label === placeLabel)
  if (mapped) return <mapped.icon css={iconStyle} />
  return <></>
}

export const SelfStudyStatus: React.FC = () => {
  const [currentPlaceLog, setCurrentPlaceLog] = useState<Doc<AttendanceLog>>();
  const [places, setPlaces] = useState<Doc<Place>[]>();

  const isOther = places && currentPlaceLog && (!places.some(e => e._id === currentPlaceLog.place._id) || !!currentPlaceLog.remark)

  const refetchCurrentPlaceId = useCallback(() => {
    getMyAttendanceLog().then(log => setCurrentPlaceLog(() => log[0]))
  }, [setCurrentPlaceLog])

  useEffect(() => {
    refetchCurrentPlaceId()
    getPrimaryPlaceList().then(setPlaces)
  }, [refetchCurrentPlaceId])

  const submitNewLocation = useCallback(async (placeName: string, placeId: string, reason?: string) => {
    return registerMovingHistory(placeId, reason).then(successRes => {
      setCurrentPlaceLog(() => successRes)
      toast.success(`장소를 ${placeName}${(successRes.place.name && (successRes.place.name !== placeName) && `(${successRes.place.name})`) || ""
        }${getAdverbalSuffix1(placeName)} 이동했어요`)
    })
  }, [])

  const submitOtherPlace = useCallback(() => {
    showModal((close) => <OtherPlaceModal onSubmit={async (name, id, reason) => {
      await submitNewLocation(name, id, reason)
      close()
    }} />, {
      wrapperProps: {
        css: css`max-width: min(1080px, 100vw); padding: 60px 20px 20px;`
      }
    })
  }, [ submitNewLocation ])

  return (
    <Card
      css={css`
        padding: 0px;
      `}
    >
      <ButtonsWrapper>
        {places && <>
          {places.map(place => (
            <Button
              selected={!isOther && place._id === currentPlaceLog?.place._id}
              onClick={() => submitNewLocation(place.label, place._id)}
              key={place._id}
            >
              <PlaceIcon placeLabel={place.label} />
              <ButtonText>{place.label}</ButtonText>
            </Button>
          ))}
        <Button
          selected={isOther}
          onClick={submitOtherPlace}
        >
          <OtherSvg />
          <ButtonText>기타 {isOther && `(${currentPlaceLog?.place.name})`}</ButtonText>
        </Button>
        </>}
      </ButtonsWrapper>
    </Card>
  );
};

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 720px;
  margin: 0px auto;
  flex-wrap: wrap;
  padding: 12px;
`;

const iconStyle = css`
  height: 36px;
  width: 36px;
`;

const Button = styled.div<{ selected?: boolean }>`
  color: #D1D1D1;
  text-align: center;
  min-width: 100px;
  margin: 12px;
  user-select: none;
  transition: 1s cubic-bezier(0, 0.46, 0.12, 0.98);

  & svg path {
    fill: #D1D1D1;
  }

  &:active {
    opacity: 0.7;
    transform: scale(0.98);
  }

  ${({ selected }) =>
    selected &&
    css`
      color: var(--main-theme-accent);
      & svg path {
        fill: var(--main-theme-accent);
      }
    `}
`;

const ButtonText = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-top: 18px;
`;

export default SelfStudyStatus;