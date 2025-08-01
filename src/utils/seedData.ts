import { Memo } from '@/types/memo'
import { supabaseUtils } from './supabaseUtils'

export const sampleMemos: Memo[] = [
  {
    id: '1',
    title: '프로젝트 회의 준비',
    content:
      '다음 주 월요일 오전 10시 프로젝트 킥오프 미팅을 위한 준비사항:\n\n- 프로젝트 범위 정의서 작성\n- 팀원별 역할 분담\n- 일정 계획 수립\n- 필요한 리소스 정리',
    category: 'work',
    tags: ['회의', '프로젝트', '준비'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'React 18 새로운 기능 학습',
    content:
      'React 18에서 새로 추가된 기능들을 학습해야 함:\n\n1. Concurrent Features\n2. Automatic Batching\n3. Suspense 개선사항\n4. useId Hook\n5. useDeferredValue Hook\n\n이번 주말에 공식 문서를 읽고 간단한 예제를 만들어보자.',
    category: 'study',
    tags: ['React', '학습', '개발'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5일 전
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
  },
  {
    id: '3',
    title: '새로운 앱 아이디어: 습관 트래커',
    content:
      '매일 실천하고 싶은 습관들을 관리할 수 있는 앱:\n\n핵심 기능:\n- 습관 등록 및 관리\n- 일일 체크인\n- 진행 상황 시각화\n- 목표 달성 알림\n- 통계 분석\n\n기술 스택: React Native + Supabase\n출시 목표: 3개월 후',
    category: 'idea',
    tags: ['앱개발', '습관', 'React Native'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 전
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
  },
  {
    id: '4',
    title: '주말 여행 계획',
    content:
      '이번 주말 제주도 여행 계획:\n\n토요일:\n- 오전: 한라산 등반\n- 오후: 성산일출봉 관광\n- 저녁: 흑돼지 맛집 방문\n\n일요일:\n- 오전: 우도 관광\n- 오후: 쇼핑 및 기념품 구매\n- 저녁: 공항 이동\n\n준비물: 등산화, 카메라, 선크림',
    category: 'personal',
    tags: ['여행', '제주도', '주말'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10일 전
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8일 전
  },
  {
    id: '5',
    title: '독서 목록',
    content:
      '올해 읽고 싶은 책들:\n\n개발 관련:\n- 클린 코드 (로버트 C. 마틴)\n- 리팩토링 2판 (마틴 파울러)\n- 시스템 디자인 인터뷰 (알렉스 쉬)\n\n자기계발:\n- 아토믹 해빗 (제임스 클리어)\n- 데일 카네기 인간관계론\n\n소설:\n- 82년생 김지영 (조남주)\n- 미드나잇 라이브러리 (매트 헤이그)',
    category: 'personal',
    tags: ['독서', '책', '자기계발'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15일 전
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: '성능 최적화 아이디어',
    content:
      '웹 애플리케이션 성능 최적화 방법들:\n\n프론트엔드:\n- 이미지 최적화 (WebP, lazy loading)\n- 코드 스플리팅\n- 번들 크기 최적화\n- 캐싱 전략\n\n백엔드:\n- 데이터베이스 쿼리 최적화\n- CDN 활용\n- 서버 사이드 렌더링\n- API 응답 캐싱\n\n모니터링:\n- Core Web Vitals 측정\n- 성능 예산 설정',
    category: 'idea',
    tags: ['성능', '최적화', '웹개발'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20일 전
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12일 전
  },
  {
    id: '7',
    title: '마크다운 편집기 사용법',
    content: `# 마크다운 사용법 가이드

이제 **마크다운**을 사용해서 메모를 작성할 수 있습니다! 🎉

## 기본 문법

### 텍스트 스타일링
- **굵은 글씨**: \`**텍스트**\` 또는 \`__텍스트__\`
- *기울임*: \`*텍스트*\` 또는 \`_텍스트_\`
- \`인라인 코드\`: \`\\\`코드\\\`\`

### 제목
\`\`\`
# 큰 제목 (H1)
## 중간 제목 (H2)  
### 작은 제목 (H3)
\`\`\`

### 목록
**순서 없는 목록:**
- 항목 1
- 항목 2
  - 하위 항목

**순서 있는 목록:**
1. 첫 번째
2. 두 번째
3. 세 번째

### 코드 블록
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### 링크와 이미지
- [링크 텍스트](https://example.com)
- ![이미지 alt](이미지URL)

### 인용구
> 이것은 인용구입니다.
> 여러 줄로 작성할 수 있습니다.

### 표
| 항목 | 설명 | 상태 |
|------|------|------|
| 기능 A | 완료된 기능 | ✅ |
| 기능 B | 진행 중 | 🔄 |
| 기능 C | 예정 | 📋 |

### 체크리스트
- [x] 완료된 작업
- [ ] 미완료 작업
- [ ] 향후 계획

---

이제 마크다운으로 더 풍부하고 구조화된 메모를 작성해보세요!`,
    category: 'study',
    tags: ['마크다운', '사용법', '가이드'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const seedSampleData = async () => {
  // 기존 데이터가 없을 때만 샘플 데이터 추가
  const existingMemos = await supabaseUtils.getMemos()
  if (existingMemos.length === 0) {
    // 각 샘플 메모를 개별적으로 추가
    for (const memo of sampleMemos) {
      await supabaseUtils.addMemo(memo)
    }
    console.log('Sample data seeded successfully!')
    return true
  }
  return false
}

export const clearAllData = async () => {
  await supabaseUtils.clearMemos()
  console.log('All data cleared!')
}

export const resetToSampleData = async () => {
  // 모든 기존 데이터 삭제 후 샘플 데이터 추가
  await supabaseUtils.clearMemos()
  for (const memo of sampleMemos) {
    await supabaseUtils.addMemo(memo)
  }
  console.log('Data reset to sample data!')
}
