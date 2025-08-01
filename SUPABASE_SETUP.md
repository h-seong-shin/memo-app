# 🚀 Supabase 설정 가이드

이 프로젝트는 Supabase 데이터베이스로 마이그레이션되었습니다. 앱을 실행하기 전에 다음 단계를 완료해주세요.

## 📋 사전 준비사항

- [Supabase](https://supabase.com) 계정 (무료)
- 인터넷 연결

## 🛠 단계별 설정

### 1단계: Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. **"New Project"** 클릭
3. Organization 선택 (개인 계정 사용 가능)
4. 프로젝트 정보 입력:
   - **Name**: `memo-app` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성
   - **Region**: 가장 가까운 지역 선택 (한국: Northeast Asia Seoul)
5. **"Create new project"** 클릭
6. 프로젝트 생성 완료까지 약 2-3분 대기

### 2단계: 데이터베이스 스키마 생성

1. Supabase Dashboard에서 생성한 프로젝트 선택
2. 왼쪽 사이드바에서 **"SQL Editor"** 클릭
3. **"New query"** 또는 **"+"** 버튼 클릭
4. 아래 SQL 코드를 복사하여 붙여넣기:

```sql
-- Create a table for memos based on the existing Memo interface
create table memos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text not null,
  tags jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create an index on created_at for efficient sorting
create index idx_memos_created_at on memos(created_at desc);

-- Create an index on category for efficient filtering
create index idx_memos_category on memos(category);

-- Create a GIN index on tags for efficient tag searching
create index idx_memos_tags on memos using gin(tags);

-- Enable Row Level Security (RLS) - uncomment if you want to add user-specific access later
-- alter table memos enable row level security;

-- Create a function to automatically update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update updated_at
create trigger update_memos_updated_at
  before update on memos
  for each row
  execute function update_updated_at_column();
```

5. **"Run"** 또는 **"F5"** 키를 눌러 SQL 실행
6. 성공 메시지 확인

### 3단계: API 키 확인

1. 왼쪽 사이드바에서 **"Settings"** (⚙️) 클릭
2. **"API"** 탭 선택
3. 다음 정보를 메모장에 복사:
   - **Project URL** (예: `https://abcdefghijklmnopqrstuvwxyz.supabase.co`)
   - **Project API keys** > **`anon` `public`** (예: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

⚠️ **주의**: `service_role` 키는 복사하지 마세요. 이는 서버 전용 키입니다.

### 4단계: 환경변수 설정

1. 프로젝트 루트에 `.env.local` 파일 생성
2. 다음 내용을 추가하고 3단계에서 복사한 값으로 대체:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_키_붙여넣기
```

**예시:**
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnopqrstuvwxyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwMDAwMDAsImV4cCI6MjAwNDU3NjAwMH0.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```

3. 파일 저장

### 5단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하여 앱이 정상적으로 로드되는지 확인하세요.

## ✅ 확인사항

### 성공적으로 설정된 경우:
- ✅ 앱이 정상적으로 로드됨
- ✅ "새 메모" 버튼 클릭 시 폼이 열림
- ✅ 메모 생성/수정/삭제가 정상 작동
- ✅ 브라우저 개발자 도구 콘솔에 Supabase 관련 오류 없음

### 문제 발생 시 체크포인트:
- ❌ **"환경변수 오류"**: `.env.local` 파일 확인
- ❌ **"네트워크 오류"**: Supabase 프로젝트 URL 확인
- ❌ **"인증 오류"**: anon 키 확인
- ❌ **"테이블 없음 오류"**: SQL 스키마 재실행

## 🎯 다음 단계

설정이 완료되면:
1. **"🔄 리셋"** 버튼을 클릭하여 샘플 데이터 생성
2. 메모 생성/편집/삭제 기능 테스트
3. 검색 및 필터링 기능 테스트

## 🔧 추가 설정 (선택사항)

### Row Level Security (RLS) 활성화
사용자별 데이터 분리가 필요한 경우:

```sql
-- RLS 활성화
alter table memos enable row level security;

-- 정책 생성 (예: 모든 사용자가 모든 메모에 접근 가능)
create policy "Enable read access for all users" on memos for select using (true);
create policy "Enable insert for all users" on memos for insert with check (true);
create policy "Enable update for all users" on memos for update using (true);
create policy "Enable delete for all users" on memos for delete using (true);
```

### Supabase CLI 설치 (고급)
로컬 개발 환경 구축:

```bash
npm install -g @supabase/cli
supabase login
supabase init
```

## 🆘 문제 해결

### 자주 발생하는 오류

1. **"Invalid API key"**
   - API 키가 올바른지 확인
   - `service_role` 키 대신 `anon` 키 사용했는지 확인

2. **"Project not found"**
   - Project URL이 올바른지 확인
   - 프로젝트가 활성화되어 있는지 확인

3. **"relation "memos" does not exist"**
   - SQL 스키마가 정상적으로 실행되었는지 확인
   - Supabase Table Editor에서 `memos` 테이블 존재 여부 확인

### 도움말 리소스
- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트 가이드](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js + Supabase 튜토리얼](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

---

설정 과정에서 문제가 발생하면 위의 체크포인트를 확인하거나 Supabase 공식 문서를 참조하세요.