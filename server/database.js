const { Pool } = require('pg');

const pool = new Pool();

async function query(query) {
    const { rows, rowCount } = await pool.query(query);
    return { rows, rowCount };
}

module.exports = { query };