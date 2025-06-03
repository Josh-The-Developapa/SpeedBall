import postgres from "postgres";

const connectionString = import.meta.env.VITE_SUPABASE_URL;
const sql = postgres(connectionString);

export default sql;
