import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try{
        const [ rows ] = await pool.query(
            'SELECT id, is_completed, date FROM workout');

            console.log(rows)
        return NextResponse.json(rows);

    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }
}