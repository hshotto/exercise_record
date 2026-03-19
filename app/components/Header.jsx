import Link from 'next/link';

export default function Header() {
    return (
      <header style={{ padding: '20px', borderBottom: '1px solid #333', textAlign: 'center' }}>
        <h1>💪 운동 기록 💪</h1>
        <Link style={{width: '10px', gap: '10px', padding: '10px 10px'}} href={'/'}>홈</Link>
        <Link style={{width: '10px', gap: '10px', padding: '10px 10px'}} href={'/main'}>기록</Link>
        <Link style={{width: '10px', gap: '10px', padding: '10px 10px'}} href={'/mycalendar'}>달력</Link>
        <Link style={{width: '10px', gap: '10px', padding: '10px 10px'}} href={'/list'}>날짜별 리스트</Link>
      </header>
    );
  }