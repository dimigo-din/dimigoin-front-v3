import { toast } from "react-toastify"

export type INoticeItem = Partial<{
  postedDate: Date;
  viewers: number;
  author: string;
}> & {
  content: string;
  title: string;
  _id: string;
}

export const getNotice = async (id: string): Promise<INoticeItem> => {
  // 백엔드 모델이 주어지면 목업서버로 대체하세요
  if (id === '1') return {
    content: `1일 시장조사업체 옴디아에 따르면 올 4분기 전 세계 스마트폰용 OLED 시장에서 BOE는 점유율(매출 기준) 6.9%를 기록할 것으로 예상된다. BOE는 지난 2분기와 3분기 각각 17.1%, 13.7%의 높은 점유율을 보였는데, 4분기엔 절반 수준으로 추락하는 셈이다.



    이는 미국의 화웨이 제재 영향 탓이라는 분석이다. 
    
    
    
    화웨이 제재로 삼성·LGD 점유율 상승
    
    
    
    업계에서는 이번 미국의 화웨이 제재 최대 피해자는 BOE라는 말이 나온다.
    
    
    
    삼성디스플레이와 LG디스플레이는 즉각적인 반사이익이 기대된다. 
    
    ...LG디스플레이도 4분기 점유율이 증가할 전망이다. 이 시장에서 지난해 4.8% 점유율로 BOE에 뒤진 3위를 기록한 LG디스플레이는 올 들어 점유율이 꾸준히 올랐다. 특히 애플 아이폰12에 2000만대 분량을 공급하면서 이 매출 효과가 3분기부터 반영돼 본격적인 상승 흐름을 탈 것으로 전망된다.
    
    
    
    위기의 BOE, 삼성·애플 등 대형 고객사 공급망 뚫기 사활
    
    ...
    
    BOE는 고객 다변화에 사활을 걸고 있지만 상황은 녹록지 않다. 삼성전자가 내년에 출시할 갤럭시S21 납품을 시도했으나 삼성디스플레이에 밀렸다. 애플의 문도 계속 두드리고 있지만 아직 거래가 성사되지 못했다.
    
    ...
    
    업계 관계자는 "올해 4분기 BOE와 한국 업체들의 희비는 결국 애플 물량을 수주하느냐 못하느냐에 따라 갈렸다"며 "BOE로선 오포나 비보 같은 중국 업체들의 물량을 늘리며 장기적으로는 대형 공급사인 애플과 거래를 성사하는 데 사활을 걸 것으로 보인다"고 말했다. `,
    title: '화웨이 제재에 LGD 스마트폰 OLED BOE 넘는다',
    _id: '1',
    postedDate: new Date(),
    viewers: 273,
    author: 'IT특성화부 하미영'
  }
  else {
    toast('리소스를 찾을 수 없습니다', {
      type: 'error'
    })
    throw new Error("리소스를 찾을 수 없습니다")
  }
}

export const getNoticesList = async (): Promise<INoticeItem[]> => {
  return [{
    content: '1일 시장조사업체 옴디아에 따르면 올 4분기 전 세계 스마트폰용 OLED 시장에서 BOE는 점유율(매출 기준) 6.9%를 기록할 것으로 예상된다. BOE는 지난 2분기와 3분기 각각 17.1%, 13.7%의 높은 점유율을 보였는데, 4분기엔 절반 수준으로 추락하는 셈이다.',
    title: '화웨이 제재에 LGD 스마트폰 OLED BOE 넘는다',
    _id: '1'
  }, {
    title: '도시바, 시스템LSI 사업 철수',
    content: `30일 외신과 업계에 따르면 도시바는 사업 구조 개편의 일환으로 시스템LSI 사업을 중단한다고 밝혔다. 시스템LSI(Large Scale Integration)는 전자기기에서 연산을 처리하는 고밀도 반도체를 뜻한다. 도시바는 이미지 센서, 비디오 프로세서 등 주로 차량용 시스템LSI 사업을 추진했는데, 판매 부진 및 수익성 악화로 철수를 결정했다.`,
    _id: '2'
  }]
}
