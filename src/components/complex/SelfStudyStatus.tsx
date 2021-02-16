import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Card from "../basic/Card";
import css from "@emotion/css";
import { getMyAttendanceLog, registerMovingHistory } from "../../api/attendance";
import { getPrimaryPlaceList } from "../../api/place";
import { Doc, Place } from "../../constants/types";

import { ReactComponent as IngangsilSvg } from "../../assets/icons/ingangsil.svg";
import { ReactComponent as HealingsilSvg } from "../../assets/icons/healingsil.svg";
import { ReactComponent as OtherSvg } from "../../assets/icons/other.svg";
import { ReactComponent as LaundrySvg } from "../../assets/icons/laundry.svg";
import { ReactComponent as DeskSvg } from "../../assets/icons/desk.svg";
import { toast } from "react-toastify";
import { getAdverbalSuffix1 } from "josa-complete";

type IconAvailablePlaceId = ["601fe6b4a40ac010e7a6496c", "601fe6b4a40ac010e7a64962", "601fe6b4a40ac010e7a64966", "601fe6b4a40ac010e7a64968"]

const IconPlaceMap = [{
  id: "601fe6b4a40ac010e7a6496c",
  icon: DeskSvg,
}, {
  id: "601fe6b4a40ac010e7a64962",
  icon: HealingsilSvg
}, {
  id: "601fe6b4a40ac010e7a64966",
  icon: LaundrySvg,
}, {
  id: "601fe6b4a40ac010e7a64968",
  icon: IngangsilSvg,
}]

const PlaceIcon: React.FC<{ placeId: string }> = ({ placeId }) => {
  const mapped = IconPlaceMap.find(icons => icons.id === placeId)
  if(mapped) return <mapped.icon css={iconStyle} />
  return <></>
}

export const SelfStudyStatus: React.FC = () => {
  const [ currentPlaceId, setCurrentPlaceId ] = useState<string>();
  const [ places, setPlaces ] = useState<Doc<Place>[]>();

  const refetchCurrentPlaceId = useCallback(() => {
    getMyAttendanceLog().then(log => setCurrentPlaceId(() => log[0].place._id))
  }, [ setCurrentPlaceId ])

  useEffect(() => {
    refetchCurrentPlaceId()
    getPrimaryPlaceList().then(setPlaces)
  }, [ refetchCurrentPlaceId ])

  const submitNewLocation = useCallback((placeName: string, placeId: string, reason: string) => {
    registerMovingHistory(placeId, reason).then(successRes => {
      setCurrentPlaceId(() => successRes.place._id)
      toast.success(`장소를 ${placeName}${
        (successRes.place.name && (successRes.place.name !== placeName) && `(${successRes.place.name})`) || ""
      }${getAdverbalSuffix1(placeName)} 이동했어요`)
    })
  }, [ ])

  return (
    <Card
      css={css`
        padding: 0px;
      `}
    >
      <Header>
        <Time current>1타임</Time> <Time>2타임</Time>
      </Header>
      <ButtonsWrapper>
        {places && places.map(place => (
          <Button
            selected={place._id === currentPlaceId}
            onMouseDown={() => submitNewLocation(place.label, place._id, '(없음)')}
            key={place._id}
          >
            <PlaceIcon placeId={place._id} />
            <ButtonText>{place.label}</ButtonText>
          </Button>
        ))}
      </ButtonsWrapper>
    </Card>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #e1e1e1;
`;

const Time = styled.h2<{ current?: boolean }>`
  font-size: 22px;
  font-weight: 900;
  color: #8a8a8a;
  padding: 16px 0px;
  ${({ current }) =>
    current &&
    css`
      color: var(--main-theme-accent);
      border-bottom: 3px solid var(--main-theme-accent);
    `}
`;

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

  & svg path {
    fill: #D1D1D1;
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
