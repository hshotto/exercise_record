'use client';

import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Edit(){
    const [ thisDate, setThisDate ] = useState('');

    const date = new Date()
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log(id)

    const fetchData = async() => {
        try{
            const response = await axios.get('api/edit');
            const data = response.data
            const now = data[id-1]
            console.log(data);
            console.log(now)
        }catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
            <h1>수정 페이지입니다</h1>
            {/* <div style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: '100px'}}>
                <h1 style={{fontSize: "30px"}}>{date}</h1>
                <h1 style = {{fontSize: "20px"}}>오늘의 운동 기록</h1>
                <p>오늘의 운동</p>
                <div style ={{display: 'flex', justifyContent: 'center', gap: '30px', width: '100%'}}>
                    {part.length > 0 &&(
                        part.map((data, index)=> (
                            <label key={index}>
                                <input 
                                type = "checkbox"
                                value = {data}
                                name = "exercisePart"
                                checked = {selectedpart.includes(data)}
                                onChange={(e)=>handleCheckbox(e.target.value)}
                                />
                                {data}
                            </label>
                        ))
                    )}
                </div>
            </div> */}
        </>
    )
}