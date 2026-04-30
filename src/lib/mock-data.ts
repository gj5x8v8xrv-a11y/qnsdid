import type { Inquiry, ProjectWithImages } from "@/lib/types";

export const mockProjects: ProjectWithImages[] = [
  {
    id: "mock-haneul",
    name: "하늘채 시그니처",
    slug: "haneulchae-signature",
    status: "active",
    region: "광명",
    province: "경기도",
    city: "광명시",
    address: "철산동",
    location: "경기도 광명시 철산동",
    householdCount: "총 582세대",
    unitPlan: "59㎡ / 84㎡",
    expectedMoveIn: "2028년 06월 예정",
    salesConditions: "계약금 5%, 중도금 무이자 예정",
    premiumSummary: "역세권과 대형 상권을 동시에 누리는 도심형 프리미엄 단지",
    locationDescription:
      "도보권 지하철, 초중고 교육 인프라, 대형마트와 공원이 모두 가까운 입지입니다.",
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
    region: "송도",
    province: "인천광역시",
    city: "연수구",
    address: "송도동",
    location: "인천광역시 연수구 송도동",
    householdCount: "총 412세대",
    unitPlan: "84㎡ / 101㎡",
    expectedMoveIn: "2027년 11월 예정",
    salesConditions: "중도금 전액 무이자, 발코니 확장 무상",
    premiumSummary: "바다 조망과 비즈니스 인프라를 함께 누리는 프리미엄 랜드마크",
    locationDescription:
      "송도 핵심 업무지구와 국제학교 생활권이 가까워 실거주와 투자 수요를 함께 만족시킵니다.",
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
    region: "대전",
    province: "대전광역시",
    city: "유성구",
    address: "봉명동",
    location: "대전광역시 유성구 봉명동",
    householdCount: "총 366세대",
    unitPlan: "74㎡ / 84㎡",
    expectedMoveIn: "2025년 09월 입주",
    salesConditions: "분양완료",
    premiumSummary: "조기 완판으로 검증된 중심 생활권 프리미엄",
    locationDescription:
      "학군, 교통, 상업시설이 균형 있게 형성된 주거 중심지에 위치한 현장입니다.",
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
