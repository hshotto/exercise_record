'use client';

import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Main() {
    // const router = useRouter();
    // const [latpulldownTimes, setLatpulldownTimes] = useState('');
    // const [latpulldownSet, setLatpulldownSet] = useState('');
    // const [sitlowTimes, setSitlowTimes] = useState('');
    // const [sitlowSet, setSitlowSet] = useState('');
    // const [shoulderpressTimes, setShoulderpressTimes] = useState('');
    // const [shoulderpressSet, setShoulderpressSet] = useState('');
    // const [legpressTimes, setLegpressTimes] = useState('');
    // const [legpressSet, setLegpressSet] = useState('');
    // const [hipabductionTimes, setHipabductionTimes] = useState('');
    // const [hipabductionSet, setHipabductionSet] = useState('');
    // const [abductionTimes, setAbductionTimes] = useState('');
    // const [abductionSet, setAbductionSet] = useState('');
    // const [runTimes, setRunTimes] = useState('');
    // const [runCalories, setRunCalories] = useState('');
    const [iscompleted, setIscompleted] = useState(false);
    const [selectedpart, setSelectedpart] = useState([]);
    const [exercises, setExercises] = useState([
        { name: '랫풀다운', part: '상체', times: '', sets: '', img: '/img/latpulldown.webp'},
        { name: '시트로우', part: '상체', times: '', sets: '', img: '/img/sittedlow.png' },
        { name: '숄더프레스', part: '상체', times: '', sets: '', img: '/img/shoulderpress.png' },
        { name: '레그프레스', part: '하체', times: '', sets: '', img: '/img/legpress.png' },
        { name: '힙어브덕션', part: '하체', times: '', sets: '', img: '/img/hipabduction.png' },
        { name: '어브덕션', part: '하체', times: '', sets: '', img: '/img/abduction.png' },
        { name: '마이마운틴', part: '유산소', times: '', sets: '', img: '/img/run.jpg' }
    ])

    // const workoutImg =[
    //     {name: '랫풀다운', img: '/img/latpulldown.webp'},
    //     {name: '시트로우', img: '/img/sittedlow.png'},
    //     {name: '숄더프레스', img: '/img/shoulderpress.png'},
    //     {name: '레그프레스', img: '/img/legpress.png'},
    //     {name: '힙어브덕션', img: '/img/hipabduction.png'},
    //     {name: '어브덕션', img: '/img/abduction.png'},
    //     {name: '마이마운틴', img: '/img/run.jpg'}
    // ]

    const part=['상체', '하체', '유산소']

    const today = new Date().toISOString().split('T')[0];

    const fetchTestdata = async()=> {
        const response = await axios.get('/api/main');
        const data = response.data.message;
        console.log(data)
    } 

    const handleInputChange = (name, field, value) => {
        setExercises(prev => prev.map(ex =>
            ex.name === name ? { ...ex, [field]: value } : ex
        ))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (exercises.length < 0) {
            alert('내용을 입력해주세요');
        }
        const filteredExercise = exercises.filter(ex => ex.times !=='' && ex.sets !=='')
        
        const postData = {
            date: today,
            is_completed: iscompleted ? 1: 0,
            top: selectedpart.includes('상체') ? 1: 0,
            bottom: selectedpart.includes('하체') ? 1: 0,
            run: selectedpart.includes('유산소') ? 1: 0,
            exercises: filteredExercise
        }
        try{
            const response = await axios.post('/api/main', postData);
            console.log('저장 성공', postData),
            alert('운동 기록이 저장되었습니다.')
        }catch(error) {
            console.error('저장 실패', error);
        }
    }
    useEffect(()=>{
        console.log(selectedpart);
        fetchTestdata()
    },[selectedpart])

    const handleCheckbox =(value) =>{
        if (selectedpart.includes(value)){
            setSelectedpart(selectedpart.filter((item)=> item !== value));
            if (selectedpart.length == 0){
                setIscompleted(false);
            }
        }else{
            setSelectedpart([...selectedpart, value]);
            setIscompleted(true);
        }
    }

    return(
        <>
        <div style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: '100px'}}>
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
                            checked = {selectedpart.includes(data)}
                            onChange={(e)=>handleCheckbox(e.target.value)}
                            />
                            {data}
                        </label>
                    ))
                )}
            </div>
        </div>

        <form onSubmit={(e)=>handleSubmit(e)}>
            {selectedpart.includes('상체') && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%', padding: '20px 0', margin: '0 auto', flexWrap: 'wrap'}}>
                    {exercises.filter(ex=> ex.part === '상체').map((ex) => (
                        <div key ={ex.name} style = {{display: 'flex', flexDirection:'column', alignItems: 'center', width: '200px', marginBottom:'10px'}}>
                            <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '10px' }}>
                                <Image src = {ex.img} alt ={ex.name} width={100} height={100} objectFit="contain"/>
                            </div>
                            <p style={{margin: '10px 0px', fontWeight: 'bold'}}>{ex.name}</p>
                            <div style={{display: 'flex', gap:'5px', alignItems: 'center'}}>
                                <input
                                type = 'text'
                                value = {ex.times}
                                onChange={(e)=> handleInputChange(ex.name, 'times', e.target.value)}
                                style={{ color: 'red', width: '40px', height: '30px', border:'1px solid white', borderRadius:'10px' }}/>회
                                <input
                                type = 'text'
                                value = {ex.sets}
                                onChange={(e)=> handleInputChange(ex.name, 'sets', e.target.value)}
                                style={{ color: 'red', width: '40px', height: '30px', border:'1px solid white', borderRadius:'10px' }}/>세트
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedpart.includes('하체') && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%', padding: '20px 0', margin: '0 auto', flexWrap: 'wrap'}}>
                    {exercises.filter(ex=> ex.part === '하체').map((ex) => (
                        <div key ={ex.name} style = {{display: 'flex', flexDirection:'column', alignItems: 'center', width: '200px', marginBottom:'10px'}}>
                           <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '10px' }}>
                                <Image src = {ex.img} alt ={ex.name} width={100} height={100} objectFit="contain"/>
                            </div>
                            <p style={{margin: '10px 0px', fontWeight: 'bold'}}>{ex.name}</p>
                            <div style={{display: 'flex', gap:'5px', alignItems: 'center'}}>
                                <input
                                type = 'text'
                                value = {ex.times}
                                onChange={(e)=> handleInputChange(ex.name, 'times', e.target.value)}
                                style={{ color: 'red', width: '40px', height: '30px', border:'1px solid white', borderRadius:'10px' }}/>회
                                <input
                                type = 'text'
                                value = {ex.sets}
                                onChange={(e)=> handleInputChange(ex.name, 'sets', e.target.value)}
                                style={{ color: 'red', width: '40px', height: '30px', border:'1px solid white', borderRadius:'10px' }}/>세트
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedpart.includes('유산소') && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%', padding: '20px 0', margin: '0 auto', flexWrap: 'wrap'}}>
                    {exercises.filter(ex=> ex.part === '유산소').map((ex) => (
                        <div key ={ex.name} style = {{display: 'flex', flexDirection:'column', alignItems: 'center', width: '200px', marginBottom:'10px'}}>
                            <div style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '10px' }}>
                                <Image src = {ex.img} alt ={ex.name} width={100} height={100} objectFit="contain"/>
                            </div>
                            <p style={{margin: '10px 0px', fontWeight: 'bold'}}>{ex.name}</p>
                            <div style={{display: 'flex', gap:'5px', alignItems: 'center'}}>
                                <input
                                type = 'text'
                                value = {ex.times}
                                onChange={(e)=> handleInputChange(ex.name, 'times', e.target.value)}
                                style={{ color: 'red', width: '40px', height: '30px', border:'1px solid white', borderRadius:'10px' }}/>분
                                <input
                                type = 'text'
                                value = {ex.sets}
                                onChange={(e)=> handleInputChange(ex.name, 'sets', e.target.value)}
                                style={{ color: 'red', width: '40px', height: '30px', border:'1px solid white', borderRadius:'10px' }}/>칼로리
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedpart.length > 0 && (
            <div style={{textAlign:'center', padding:'40px'}}>
                <button 
                    type= 'submit'
                    style= {{
                        padding:'5px',
                        justifyContent:'center', 
                        alignItems: 'center', 
                        width: "80px", 
                        fontSize: "16px", 
                        border: "2px solid white", 
                        borderRadius: "50px", 
                        cursor: 'pointer'
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