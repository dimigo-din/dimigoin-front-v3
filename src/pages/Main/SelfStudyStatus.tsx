import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { toast } from 'react-toastify';
import { getAdverbalSuffix1 } from 'josa-complete';
import Card from '../../components/basic/Card';
import {
  getMyAttendanceLog,
  registerMovingHistory,
} from '../../api/attendance';
import { getPrimaryPlaceList } from '../../api/place';
import { AttendanceLog, Doc, Place } from '../../constants/types';
import { ReactComponent as IngangsilSvg } from '../../assets/icons/ingangsil.svg';
import { ReactComponent as HealingsilSvg } from '../../assets/icons/healingsil.svg';
import { ReactComponent as OtherSvg } from '../../assets/icons/other.svg';
import { ReactComponent as LaundrySvg } from '../../assets/icons/laundry.svg';
import { ReactComponent as DeskSvg } from '../../assets/icons/desk.svg';
import { showModal } from '../../components/complex/modal';
import { OtherPlaceModal } from './OtherPlaceModal';
import { SMALL_SCREEN_THRESHOLD } from '../../constants';
import Skeleton from 'react-loading-skeleton';

const IconPlaceMap = [
  {
    label: '교실',
    icon: DeskSvg,
  },
  {
    label: '안정실',
    icon: HealingsilSvg,
  },
  {
    label: '세탁',
    icon: LaundrySvg,
  },
  {
    label: '인강실',
    icon: IngangsilSvg,
  },
];

const PlaceIcon: React.FC<{ placeLabel: string }> = ({ placeLabel }) => {
  const mapped = IconPlaceMap.find((icons) => icons.label === placeLabel);
  if (mapped) return <mapped.icon css={iconStyle} />;
  return <></>;
};

export const SelfStudyStatus: React.FC = () => {
  const [currentPlaceLog, setCurrentPlaceLog] = useState<Doc<AttendanceLog>>();
  const [placeName, setPlaceName] = useState<string | null>();
  const [places, setPlaces] = useState<Doc<Place>[]>();

  const isOther =
    places &&
    currentPlaceLog &&
    !places.some((e) => e._id === currentPlaceLog.place?._id);

  const refetchCurrentPlaceId = useCallback(async () => {
    const [log] = await getMyAttendanceLog();
    if (!log?.place) {
      setPlaceName(() => null);
      return;
    }
    setCurrentPlaceLog(() => log);
    setPlaceName(() => log.place?.name);
  }, [setCurrentPlaceLog]);

  useEffect(() => {
    refetchCurrentPlaceId();
    getPrimaryPlaceList().then(setPlaces);
  }, [refetchCurrentPlaceId]);

  const submitNewLocation = useCallback(
    async (requestedPlaceName: string, placeId: string, reason?: string) => {
      return registerMovingHistory(placeId, reason).then((successRes) => {
        refetchCurrentPlaceId();
        toast.success(
          `장소를 ${requestedPlaceName}${
            (successRes.place.name &&
              successRes.place.name !== requestedPlaceName &&
              `(${successRes.place.name})`) ||
            ''
          }${getAdverbalSuffix1(requestedPlaceName)} 이동했어요`,
        );
      });
    },
    [refetchCurrentPlaceId],
  );

  const submitOtherPlace = useCallback(() => {
    showModal(
      (close) => (
        <OtherPlaceModal
          onSubmit={async (name, id, reason) => {
            await submitNewLocation(name, id, reason);
            close();
          }}
        />
      ),
      {
        wrapperProps: {
          css: css`
            max-width: min(1080px, 100vw);
            padding: 60px 20px 20px;
          `,
        },
      },
    );
  }, [submitNewLocation]);

  return (
    <Wrapper>
      <ButtonsWrapper>
        {places && (
          <>
            {places.map((place) => (
              <Button
                selected={!isOther && place._id === currentPlaceLog?.place?._id}
                onClick={() => submitNewLocation(place.name, place._id)}
                key={place._id}
              >
                <PlaceIcon placeLabel={place.label} />
                <ButtonText>{place.label}</ButtonText>
              </Button>
            ))}
            <Button selected={isOther} onClick={submitOtherPlace}>
              <OtherSvg css={iconStyle} />
              <ButtonText>기타</ButtonText>
            </Button>
          </>
        )}
      </ButtonsWrapper>
      <CurrentPlace>
        {placeName !== undefined ? (
          <>
            {placeName ? (
              <>
                나의 현재 위치는{' '}
                <CurrentPlaceName>{placeName}</CurrentPlaceName> 입니다
              </>
            ) : (
              <>아직 현재 위치를 등록하지 않았습니다</>
            )}
          </>
        ) : (
          <Skeleton width={300} />
        )}
      </CurrentPlace>
    </Wrapper>
  );
};

const CurrentPlaceName = styled.span`
  color: var(--main-theme-accent);
`;

const CurrentPlace = styled.p`
  color: #d1d1d1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  border-top: 1px solid #d1d1d1;
  padding: 20px 0px;
  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 16px;
  }
`;

const Wrapper = styled(Card)`
  padding: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 720px;
  margin: 0px auto;
  flex-wrap: wrap;
  padding: 12px;
  align-items: center;
  flex: 1;
`;

const iconStyle = css`
  height: 36px;
  width: 36px;

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    width: 24px;
    height: 24px;
  }
`;

const Button = styled.div<{ selected?: boolean }>`
  color: #d1d1d1;
  text-align: center;
  min-width: 100px;
  margin: 12px;
  user-select: none;
  transition: 1s cubic-bezier(0, 0.46, 0.12, 0.98);
  cursor: pointer;

  & svg path {
    transition: 1s cubic-bezier(0, 0.46, 0.12, 0.98);
    fill: #d1d1d1;
  }

  &:active {
    opacity: 0.7;
    transform: scale(0.98);
  }

  &:hover {
    color: var(--main-theme-accent);
    & svg path {
      fill: var(--main-theme-accent);
    }
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

  @media screen and (max-width: ${SMALL_SCREEN_THRESHOLD}px) {
    font-size: 15px;
    margin-top: 6px;
  }
`;

export default SelfStudyStatus;
