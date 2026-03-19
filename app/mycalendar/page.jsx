'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const localizer = momentLocalizer(moment);

console.log(localizer);

export default function Mycalendar(){
  const router = useRouter();
  const [events, setEvents] = useState([]);
  console.log(new Date())

  const fetchData = async() => {
    try {
      const response = await axios.get('api/mycalendar');
      const data = response.data
      
      const calendarEvents = data.filter(item => item.is_completed === 1).map(item =>
         ({id: item.id,
          title: '운동 완료',
          start: new Date(item.date),
          end: new Date(item.date),
          allDay: true
         }))

    setEvents(calendarEvents);

    }catch(error){
      console.error(error);
    }
  }

  const handleSelectEvent = (events) =>{
    router.push(`/edit?id=${events.id}`)
  }

  useEffect(()=> {
    fetchData()
  },[]);


  return (
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '150%' }}
          messages={{
            next: '다음',
            previous: '이전',
            today: '이번달',
            month: '월',
            week: '주',
            day: '일',
          }}
        />
      </div>
    );
  }