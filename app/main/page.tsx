'use client';

import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Main() {
    // const router = useRouter();
    const [latpulldownTimes, setLatpulldownTimes] = useState('');
    const [latpulldownSet, setLatpulldownSet] = useState('');
    const [sitlowTimes, setSitlowTimes] = useState('');
    const [sitlowSet, setSitlowSet] = useState('');
    const [shoulderpressTimes, setShoulderpressTimes] = useState('');
    const [shoulderpressSet, setShoulderpressSet] = useState('');
    const [legpressTimes, setLegpressTimes] = useState('');
    const [legpressSet, setLegpressSet] = useState('');
    const [hipabductionTimes, setHipabductionTimes] = useState('');
    const [hipabductionSet, setHipabductionSet] = useState('');
    const [abductionTimes, setAbductionTimes] = useState('');
    const [abductionSet, setAbductionSet] = useState('');
    const [runTimes, setRunTimes] = useState('');
    const [runCalories, setRunCalories] = useState('');
    const [selectedpart, setSelectedpart] = useState('');

    const workoutImg =[
        {name: '랫풀다운', img: '/img/latpulldown.webp'},
        {name: '시트로우', img: '/img/sittedlow.png'},
        {name: '숄더프레스', img: '/img/shoulderpress.png'},
        {name: '레그프레스', img: '/img/legpress.png'},
        {name: '힙어브덕션', img: '/img/hipabduction.png'},
        {name: '어브덕션', img: '/img/abduction.png'},
        {name: '마이마운틴', img: '/img/run.jpg'}
    ]

    const part=['상체', '하체', '유산소']

    const today = new Date().toISOString().split('T')[0];

    const fetchTestdata = async()=> {
        const response = await axios.get('/api/test');
        const data = response.data.message;
        console.log(data)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (latpulldownSet || latpulldownTimes) {
            alert('내용을 입력해주세요');
        } else{
            alert('저장되었습니다');
        }
    }
    useEffect(()=>{
        console.log(selectedpart);
        fetchTestdata()
    },[selectedpart])

    // const handleCheckbox =(value) =>{
    //     if (selectedpart === value){
    //         setSelectedpart('');
    //     }else{
    //         setSelectedpart(value);
    //     }
    // }

    return(
        <>
        <div style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: '200px'}}>
            <h1 style={{fontSize: "30px"}}>{today}</h1>
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
                            checked = {selectedpart === data}
                            onChange={(e)=>setSelectedpart(e.target.value)}
                            />
                            {data}
                        </label>
                    ))
                )}
            </div>
        </div>

        <form onClick={(e)=>handleSubmit(e)}>
            {selectedpart=='상체' && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', width: '100%', padding: '20px 0', margin: '0 auto', flexWrap: 'wrap'}}>
                    <div style= {{display: 'flex', alignItems: 'center', width: '350px'}}>
                        <Image src={workoutImg[0].img} alt ="랫풀다운" width={100} height={100}/>
                        <p style={{padding: "0px 10px"}}>랫풀다운</p>
                        <input type="text" value={latpulldownTimes} onChange={(e)=> setLatpulldownTimes(e.target.value)} style={{color:'red', padding: "10px 10px", width: '40px', height: '30px' }}/>회
                        <input type="text" value={latpulldownSet} onChange={(e)=> setLatpulldownSet(e.target.value)} style={{color:'red', padding: "10px 10px", width: '30px', height: '30px' }}/> X 세트
                    </div>
                    <div style= {{display: 'flex', alignItems: 'center', width: '350px'}}>
                        <Image src={workoutImg[1].img} alt ="시트로우" width={100} height={100}/>
                        <p style={{padding: "0px 10px"}}>시트로우</p>
                        <input type="text" value={sitlowTimes} onChange={(e)=> setSitlowTimes(e.target.value)} style={{color:'red',padding: "10px 10px", width: '40px', height: '30px' }}/>회
                        <input type="text" value={sitlowSet} onChange={(e)=> setSitlowSet(e.target.value)} style={{color:'red', padding: "10px 10px", width: '30px', height: '30px' }}/> X 세트
                    </div>
                    <div style= {{display: 'flex', alignItems: 'center', width: '350px'}}>
                        <Image src={workoutImg[2].img} alt='숄더프레스' width={100} height={100}/>
                        <p style={{padding: "0px 10px"}}>숄더프레스</p>
                        <input type="text" value={shoulderpressTimes} onChange={(e)=> setShoulderpressTimes(e.target.value)} style={{color:'red',padding: "10px 10px", width: '40px', height: '30px' }}/>회
                        <input type="text" value={shoulderpressSet} onChange={(e)=> setShoulderpressSet(e.target.value)} style={{color:'red', padding: "10px 10px", width: '30px', height: '30px' }}/> X 세트
                    </div>
                </div>
            )}

            {selectedpart=='하체' && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', width: '100%', padding: '20px 0', margin: '0 auto', flexWrap: 'wrap'}}>
                    <div style= {{display: 'flex', alignItems: 'center', width: '350px'}}>
                        <Image src={workoutImg[3].img} alt ="레그프레스" width={100} height={100}/>
                        <p style={{padding: "0px 10px"}}>레그프레스</p>
                        <input type="text" value={legpressTimes} onChange={(e)=> setLegpressTimes(e.target.value)} style={{color:'red',padding: "10px 10px", width: '40px', height: '30px' }}/>회
                        <input type="text" value={legpressSet} onChange={(e)=> setLegpressSet(e.target.value)} style={{color:'red', padding: "10px 10px", width: '30px', height: '30px' }}/> X 세트
                    </div>
                    <div style= {{display: 'flex', alignItems: 'center', width: '350px'}}>
                        <Image src={workoutImg[4].img} alt ="힙어브덕션" width={100} height={100}/>
                        <p style={{padding: "0px 10px"}}>힙어브덕션</p>
                        <input type="text" value={hipabductionTimes} onChange={(e)=> setHipabductionTimes(e.target.value)} style={{color:'red',padding: "10px 10px", width: '40px', height: '30px' }}/>회
                        <input type="text" value={hipabductionSet} onChange={(e)=> setHipabductionSet(e.target.value)} style={{color:'red', padding: "10px 10px", width: '30px', height: '30px' }}/> X 세트
                    </div>
                    <div style= {{display: 'flex', alignItems: 'center', width: '350px'}}>
                        <Image src={workoutImg[5].img} alt='어브덕션' width={100} height={100}/>
                        <p style={{padding: "0px 10px"}}>어브덕션</p>
                        <input type="text" value={abductionTimes} onChange={(e)=> setAbductionTimes(e.target.value)} style={{color:'red',padding: "10px 10px", width: '40px', height: '30px' }}/>회
                        <input type="text" value={abductionSet} onChange={(e)=> setAbductionSet(e.target.value)} style={{color:'red', padding: "10px 10px", width: '30px', height: '30px' }}/> X 세트
                    </div>
                </div>
            )}
            {selectedpart=='유산소' && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', padding: '20px 0', margin: '0 auto', flexWrap: 'wrap'}}>
                    <Image src={workoutImg[6].img} alt ="마이마운틴" width={200} height={100}/>
                    <p style={{padding: "0px 10px"}}>마이마운틴</p>
                    <input type="text" value={runTimes} onChange={(e)=> setRunTimes(e.target.value)} style={{color:'red',padding: "10px 10px", width: '40px', height: '30px' }}/>분
                    <input type="text" value={runCalories} onChange={(e)=> setRunCalories(e.target.value)} style={{color:'red', padding: "10px 10px", width: '50px', height: '30px' }}/>칼로리
                </div>
            )}
            {selectedpart.length > 0 && (
            <div style={{textAlign:'center', padding:'40px'}}>
                <button 
                    type= 'button'
                    style= {{
                        padding:'5px',
                        justifyContent:'center', 
                        alignItems: 'center', 
                        width: "80px", 
                        fontSize: "16px", 
                        border: "2px solid white", 
                        borderRadius: "50px", 
                        cursor: 'pointer',
                    }}
                    >
                    저장
                </button>
            </div>
            )}
        </form>
        
        </>
    );
}