import type { Inquiry, ProjectWithImages } from "@/lib/types";

export const mockProjects: ProjectWithImages[] = [
  {
    id: "mock-haneul",
    name: "하늘채 시그니처",
    slug: "haneulchae-signature",
    status: "active",
    location: "경기도 광명시 철산동",
    householdCount: "총 582세대",
    unitPlan: "59㎡ / 84㎡",
    expectedMoveIn: "2028년 06월 예정",
    salesConditions: "계약금 5%, 중도금 무이자 예정",
    premiumSummary: "역세권과 대형 상권을 동시에 누리는 도심형 프리미엄 단지",
    locationDescription:
      "도보권 지하철, 초중고 교육 인프라, 대형마트와 공원이 모두 가까운 입지입니다.",
    businessOverview:
      "하늘채 시그니처는 경기도 광명시 철산동에 들어서는 총 582세대 규모의 분양 현장입니다. 59㎡와 84㎡ 타입 위주로 구성되어 실거주와 가족 단위 수요를 함께 살펴보실 수 있습니다.",
    transportInfo:
      "지하철과 주요 도로 접근이 편리한 위치로, 도심 이동과 생활권 이동을 함께 고려하시는 분들께 적합합니다.",
    livingInfraInfo:
      "대형마트, 공원, 생활편의시설이 가까워 일상 생활에 필요한 인프라를 두루 누리실 수 있습니다.",
    educationInfo:
      "초중고 교육 시설을 함께 살펴보실 수 있는 입지로, 자녀 교육 여건을 중요하게 보시는 분들께도 관심을 받고 있습니다.",
    premiumDetails:
      "역세권 입지와 생활 인프라, 도심 접근성을 함께 갖춘 현장으로 실거주 만족도를 기대해보실 수 있습니다.",
    sitePlanInfo:
      "상단 이미지에서 배치도와 참고 이미지를 함께 확인하실 수 있으며, 동 배치와 외부 공간 구성은 상담 시 자세히 안내해드립니다.",
    floorPlanInfo:
      "59㎡와 84㎡ 타입의 공간 구성과 수납, 채광 계획은 상담 과정에서 자세히 비교해보실 수 있습니다.",
    communityInfo:
      "입주민 편의를 위한 공용 공간과 휴게 시설 구성은 추후 공급 자료와 함께 안내해드립니다.",
    developmentInfo:
      "철산동 일대의 생활권 변화와 주변 개발 흐름도 함께 살펴보실 수 있도록 안내해드립니다.",
    consultationGuide:
      "희망 타입과 방문 가능 일정을 남겨주시면 확인 후 빠르게 상담 일정을 안내해드립니다.",
    coverImageUrl: null,
    coverImagePath: null,
    contactPhone: "1533-8170",
    reservationUrl: "https://booking.naver.com",
    createdAt: "2026-04-10T09:00:00.000Z",
    updatedAt: "2026-04-20T09:00:00.000Z",
    gallery: []
  },
  {
    id: "mock-ipark",
    name: "아이파크 센트럴뷰",
    slug: "ipark-centralview",
    status: "active",
    location: "인천광역시 연수구 송도동",
    householdCount: "총 412세대",
    unitPlan: "84㎡ / 101㎡",
    expectedMoveIn: "2027년 11월 예정",
    salesConditions: "중도금 전액 무이자, 발코니 확장 무상",
    premiumSummary: "바다 조망과 비즈니스 인프라를 함께 누리는 프리미엄 랜드마크",
    locationDescription:
      "송도 핵심 업무지구와 국제학교 생활권이 가까워 실거주와 투자 수요를 함께 만족시킵니다.",
    businessOverview:
      "아이파크 센트럴뷰는 송도동 중심 생활권에서 84㎡와 101㎡ 타입으로 구성된 총 412세대 규모의 현장입니다.",
    transportInfo:
      "주요 도로와 업무지구 접근이 편리해 출퇴근 동선과 광역 이동 여건을 함께 확인해보실 수 있습니다.",
    livingInfraInfo:
      "업무지구, 상업시설, 공원과 같은 생활 편의 요소를 가까이 누릴 수 있는 송도 생활권이 장점입니다.",
    educationInfo:
      "국제학교와 학원가 접근성을 함께 고려하시는 분들께 적합한 생활권입니다.",
    premiumDetails:
      "조망, 업무지구 접근성, 생활 인프라를 함께 갖춘 송도 대표 생활권 현장으로 소개드리고 있습니다.",
    sitePlanInfo:
      "상세 이미지와 함께 동 배치, 외부 공간 구성, 단지 흐름을 확인하실 수 있도록 안내해드립니다.",
    floorPlanInfo:
      "타입별 평면과 공간 활용도는 상담 과정에서 실제 관심 타입 기준으로 자세히 설명해드립니다.",
    communityInfo:
      "입주민 전용 커뮤니티와 생활 지원 시설은 공급 자료에 맞춰 자세히 안내해드립니다.",
    developmentInfo:
      "송도 일대의 업무·생활 인프라 확장 흐름과 함께 살펴보실 수 있는 현장입니다.",
    consultationGuide:
      "조망, 타입, 방문 희망일을 남겨주시면 확인 후 빠르게 연락드리겠습니다.",
    coverImageUrl: null,
    coverImagePath: null,
    contactPhone: "1533-8170",
    reservationUrl: "https://booking.naver.com",
    createdAt: "2026-03-22T09:00:00.000Z",
    updatedAt: "2026-04-18T09:00:00.000Z",
    gallery: []
  },
  {
    id: "mock-prugio",
    name: "푸르지오 갤러리힐",
    slug: "prugio-galleryhill",
    status: "completed",
    location: "대전광역시 유성구 봉명동",
    householdCount: "총 366세대",
    unitPlan: "74㎡ / 84㎡",
    expectedMoveIn: "2025년 09월 입주",
    salesConditions: "분양완료",
    premiumSummary: "조기 완판으로 검증된 중심 생활권 프리미엄",
    locationDescription:
      "학군, 교통, 상업시설이 균형 있게 형성된 주거 중심지에 위치한 현장입니다.",
    businessOverview:
      "푸르지오 갤러리힐은 대전 유성구 봉명동 중심 생활권에 위치한 총 366세대 규모의 현장으로, 현재는 소개가 완료된 상태입니다.",
    transportInfo:
      "주요 도로와 생활권 이동이 편리한 위치로, 중심 생활권 접근성이 장점으로 꼽혔던 현장입니다.",
    livingInfraInfo:
      "상업시설과 생활 편의시설이 가까워 일상 생활이 편리한 입지로 많은 관심을 받았습니다.",
    educationInfo:
      "학군과 생활권을 함께 고려하시는 수요층이 꾸준히 관심을 보였던 현장입니다.",
    premiumDetails:
      "조기 완판으로 마감된 현장으로, 중심 생활권과 균형 잡힌 입지 여건이 장점이었습니다.",
    sitePlanInfo:
      "배치와 외부 공간 구성은 공급 당시 자료를 기준으로 상담과 함께 안내되었습니다.",
    floorPlanInfo:
      "74㎡와 84㎡ 중심의 평면 구성이 실거주 수요에게 좋은 반응을 얻었습니다.",
    communityInfo:
      "생활 편의 중심의 커뮤니티 구성을 함께 살펴보실 수 있었던 현장입니다.",
    developmentInfo:
      "유성구 봉명동 일대 생활권 확장과 함께 관심을 받은 소개 완료 현장입니다.",
    consultationGuide:
      "현재는 소개가 완료된 현장이며, 비슷한 관심 현장은 상담을 통해 안내해드립니다.",
    coverImageUrl: null,
    coverImagePath: null,
    contactPhone: "1533-8170",
    reservationUrl: "https://booking.naver.com",
    createdAt: "2025-01-15T09:00:00.000Z",
    updatedAt: "2025-09-01T09:00:00.000Z",
    gallery: []
  }
];

export const mockInquiries: Inquiry[] = [
  {
    id: "inq-1",
    name: "김민수",
    phone: "010-1234-5678",
    message: "하늘채 시그니처 84타입 잔여세대가 있는지 궁금합니다.",
    projectId: "mock-haneul",
    projectName: "하늘채 시그니처",
    status: "new",
    createdAt: "2026-04-22T03:20:00.000Z"
  },
  {
    id: "inq-2",
    name: "박서연",
    phone: "010-2345-6789",
    message: "방문예약 가능한 날짜를 안내받고 싶습니다.",
    projectId: "mock-ipark",
    projectName: "아이파크 센트럴뷰",
    status: "processing",
    createdAt: "2026-04-23T04:00:00.000Z"
  }
];
