'use server'

import { neon } from '@neondatabase/serverless'

export async function getDbConnection() {
    if(!process.env.DATABASE_URL){
        throw new Error('neon DB URL not defined')
    }
    const sql= neon(process.env.DATABASE_URL);
    return sql;
}