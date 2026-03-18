'use client';

import React from "react";
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh", gap: "20px"}}>
        <h1 style={{fontSize: '50px'}}>💪운동 기록💪</h1>

        <button style={{padding: "5px 20px", fontSize: "30px", border: "2px solid white", borderRadius: "50px", cursor: "pointer"}} 
        onClick={()=> router.push('/main')}>
          기록하기
          </button>
    </div>
  );
}
