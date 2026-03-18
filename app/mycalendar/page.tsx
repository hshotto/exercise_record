'use client';

import React from 'react';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Mycalendar(){
    const [events, setEvents] = useState([
        {
            title: '운동 완료', 
            start: new Date(), 
            end: new Date(moment().add(1, 'hours').toDate()),
        },
    ]);
    

    return (
        <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={events}
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