import {getConnection} from "../../getConnection";

export function deleteById(id) {
    const table = "destinations"
    const db = getConnection()

    return db.transaction(
        tx => {
            tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        });
}
