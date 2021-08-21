import {getConnection} from "../../getConnection";

export function findAll() {
    const table = "destinations"
    const db = getConnection()

    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
            resolve(rows)
        }), (sqlError) => {
            console.log(sqlError);
        }}, (txError) => {
        console.log(txError);
    }))
}
