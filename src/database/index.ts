import {
  Pool
} from 'pg'
 
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_Ns7gyGaCEjd6@ep-damp-dew-aph5tdsa-pooler.c-7.us-east-1.aws.neon.tech/db_store?sslmode=verify-full&channel_binding=require',
  ssl: {
    rejectUnauthorized: false,
  },
});


//Example

// async function getData() {
//   const client = await pool.connect();
//   try {
//     const { rows } = await client.query('SELECT * FROM posts');
//     return rows;
//   } finally {
//     client.release();
//   }
// }
 
// const query = async <T extends QueryResultRow> (text : string, params? : unknown[]): Promise<QueryResult<T>> => {
//   return pool.query<T>(text, params)
// }

export default pool;