'use client';

import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function List(){
    const [data, setData] = useState([]);

    const fetchData = async() => {
        try{
            const response = await axios.get('/api/main');
            const data = response.data;
            setData(data)
            console.log(data);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=> {
        fetchData();
    }, [])

    return(
        <>
            <h1 style={{fontWeight: 'bold', fontSize: '30px', textAlign: "center", width: '100%', marginTop: '50px'}}>날짜별 운동 목록</h1>
            <table border={1} style={{ gap: '5px', justifyContent: 'center', width: '50%', border: '1px solid white', margin: '50px auto' }}>
                <thead>
                    <tr style={{textAlign: 'center', border: '1px solid white'}}>
                        <th style={{textAlign: 'center', border: '1px solid white'}}>번호</th>
                        <th style={{textAlign: 'center', border: '1px solid white'}}>날짜</th>
                        <td style={{textAlign: 'center', border: '1px solid white'}}>운동 부위</td>
                        <td style={{textAlign: 'center', border: '1px solid white'}}>유산소</td>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && (
                        data.map((item, index) => (
                            <tr key = {item.id}>
                                <td style={{textAlign: 'center', border: '1px solid white'}}>{index +1}</td>
                                <td style={{textAlign: 'center', border: '1px solid white'}}>{item.date.split('T')[0]}</td>
                                <td style={{textAlign: 'center', border: '1px solid white'}}>{[item.top ? '상체' : '', item.bottom ? '하체': '']}</td>
                                <td style={{textAlign: 'center', border: '1px solid white'}}>{item.run ? '완료' : '-' }</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}