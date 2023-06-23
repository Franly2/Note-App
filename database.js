const mysql = require("mysql2");

const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "ganairsm",
    database: "notes",
  })
  .promise();

function ConnectionStatus() {
  connection.connect((error) => {
    if (error) {
      console.error("Koneksi ke database gagal: " + error.stack);
      return;
    }
    console.log(
      "Terhubung ke database dengan ID koneksi " + connection.threadId
    );
  });
}

async function getAllNotes() {
  let [result] = await connection.query(`SELECT * FROM note`);
  return result;
}

getAllNotes();

function getNote(id) {
  connection.query(
    `SELECT * FROM note
     WHERE id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
    }
  );
}
function createNote(input) {
  connection.query(`INSERT INTO note SET ?`, input),
    (error, results, fields) => {
      if (error) throw error;
      // console.log(results);
      // console.log(fields);
    };
}

async function updateNote(title, content, id) {
  await connection.query(
    `UPDATE note
     SET title = ?,
     content = ?
     WHERE id = ?`,
    [title, content, id],
    (error, results) => {
      if (error) throw error;
      // console.log(results);
    }
  );
}

function deleteNote(id) {
  connection.query(`DELETE FROM note
                    WHERE id = ${id}`),
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      console.log(fields);
    };
}

function CloseDatabaseConnection() {
  connection.end((error) => {
    if (error) {
      console.error("Gagal memutus koneksi dari database: " + error.stack);
      return;
    }

    console.log("Koneksi ke database ditutup");
  });
}

ConnectionStatus();
module.exports = {
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getAllNotes,
};
