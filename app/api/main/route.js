import pool from '@/lib/db';
import { NextResponse } from 'next/server';
// import { resumeToPipeableStream } from 'react-dom/server';

// export async function POST(request) {
//     try{
//         const { parts, date } = await request.json();
        
//         const [ result ] = await pool.query(
//             'INSERT INTO exercise (part, created_at) VALUES (?, ?)',
//             [parts.join(','), data]
//         );
        
//         return NextResponse.json({ message: '저장 성공', id: result.insertId });
//     } catch(error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// export async function GET() {
//     try{
//         const [ rows ] = await pool.query(
//             'SELECT * FROM workout');

//         return NextResponse.json(rows);
//     } catch(error) {
//         return NextResponse.json({ error: error.message }, { status: 500});
//     }
// }

// export async function GET(request, { params }) {
//     const { id } = params; 

//     try {
//         const [workout] = await pool.query('SELECT * FROM workout WHERE id = ?', [id]);
        
//         const [details] = await pool.query('SELECT * FROM workout_detail WHERE workout_id = ?', [id]);

//         return NextResponse.json({
//             ...workout[0],
//             exercises: details
//         });
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT 
                w.id, w.date, w.is_completed, w.top, w.bottom, w.run,
                wd.exercise_name, wd.times, wd.sets
            FROM workout w
            LEFT JOIN workout_detail wd ON w.id = wd.workout_id
            ORDER BY w.date DESC
        `);

        const formattedData = rows.reduce((acc, row) => {
            const { id, date, is_completed, top, bottom, run, ...detail } = row;
            if (!acc[id]) {
                acc[id] = { id, date, is_completed, top, bottom, run, exercises: [] };
            }
            if (detail.exercise_name) {
                acc[id].exercises.push(detail);
            }
            return acc;
        }, {});

        return NextResponse.json(Object.values(formattedData));
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try{
        const { date, is_completed, top, bottom, run, exercises } = await request.json();
        const [ result ] = await pool.query(
            'INSERT INTO workout ( date, is_completed, top, bottom, run ) VALUES (?, ?, ?, ?, ?)',
            [date, is_completed, top, bottom, run]
        );
        const newWorkoutId = result.insertId;
        console.log('생성된 ID', newWorkoutId)

        if (exercises && exercises.length > 0 ) {
            for (const ex of exercises) {
                await pool.query(
                    'INSERT INTO workout_detail (workout_id, exercise_name, times, sets) VALUES (?, ?, ?, ?)',
                    [newWorkoutId, ex.name, ex.times, ex.sets]
                );
            }
        }

        return NextResponse.json({ message: '수정 성공' , id: newWorkoutId });

    } catch(error) {
        console.error('DB 저장 에러: ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}