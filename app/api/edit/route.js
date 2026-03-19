import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT() {
    try{
        const [ rows ] = await pool.query(
            'UPDATE workout SET (is_completed, top, bottom, run) VALUES ( ?, ?, ?, ? )'
            [is_completed, top, bottom, run]);

            console.log(rows)
        return NextResponse.json(rows);

    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }
}

export async function GET() {
    try{
        const [ rows ] = await pool.query(
            'SELECT * FROM workout');

            console.log(rows)
        return NextResponse.json(rows);

    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }
}


// export async function POST(request) {
//     try{
//         const { date, is_completed, top, bottom, run, exercises } = await request.json();
//         const [ result ] = await pool.query(
//             'INSERT INTO workout ( date, is_completed, top, bottom, run ) VALUES (?, ?, ?, ?, ?)',
//             [date, is_completed, top, bottom, run]
//         );
//         const newWorkoutId = result.insertId;
//         console.log('생성된 ID', newWorkoutId)

//         if (exercises && exercises.length > 0 ) {
//             for (const ex of exercises) {
//                 await pool.query(
//                     'INSERT INTO workout_detail (workout_id, exercise_name, times, sets) VALUES (?, ?, ?, ?)',
//                     [newWorkoutId, ex.name, ex.times, ex.sets]
//                 );
//             }
//         }

//         return NextResponse.json({ message: '수정 성공' , id: newWorkoutId });

//     } catch(error) {
//         console.error('DB 저장 에러: ', error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }