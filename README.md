# 운동 기록 (Next.js + MySQL)

Next.js(App Router)로 만든 **운동 기록/조회** 프로젝트입니다.  
운동 부위(상체/하체/유산소)를 선택하고, 운동별 **횟수/세트(유산소는 분/칼로리)**를 입력해 저장합니다. 저장된 기록은 목록과 달력에서 확인할 수 있습니다.

## 주요 기능

- **운동 기록 저장**: `/main`에서 오늘 날짜 기준 운동을 입력하고 저장
- **날짜별 목록 조회**: `/list`에서 저장된 기록을 테이블로 확인
- **완료 달력 표시**: `/mycalendar`에서 `is_completed = 1`인 날짜를 “운동 완료” 이벤트로 표시
- **수정 페이지(진행 중)**: `/edit?id=...` (현재 UI/PUT 로직이 미완성)

## 기술 스택

- **Frontend/Framework**: Next.js 16 (App Router), React 19
- **HTTP**: `axios`
- **Calendar UI**: `react-big-calendar`, `moment`
- **DB**: MySQL, `mysql2/promise` (Pool)

## 라우트 구조 (app/)

- **페이지**
  - `/` : 홈 (버튼으로 `/main` 이동)
  - `/main` : 운동 기록 입력/저장
  - `/list` : 날짜별 운동 목록
  - `/mycalendar` : 운동 완료 달력
  - `/edit?id=...` : 기록 수정
- **API**
  - `GET /api/main` : 운동 + 상세 운동(workout_detail) 조인 결과를 날짜 내림차순으로 조회 (workout 단위로 그룹핑)
  - `POST /api/main` : workout 저장 후 workout_detail 여러 건 저장
  - `GET /api/mycalendar` : `id, is_completed, date` 조회(달력 이벤트 생성에 사용)
  - `GET /api/edit` : workout 전체 조회(임시)
  - `PUT /api/edit` : 현재 쿼리/파라미터가 미완성(수정 기능 작업 필요)

## DB 설정 (lib/)

`lib/db.js`에서 MySQL Pool을 생성합니다. 아래 환경변수가 필요합니다:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

프로젝트 루트에 `.env.local`을 만들고 예시처럼 설정하세요:

```bash
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=3306
```

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 후 사용합니다.

## 참고

- 이미지 에셋은 `public/img/`에 있습니다.
- 수정 기능은 `/edit` 페이지 + `PUT /api/edit`를 기준으로 확장하면 됩니다(현재는 scaffold 상태).
