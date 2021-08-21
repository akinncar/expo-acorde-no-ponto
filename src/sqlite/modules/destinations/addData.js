import {getConnection} from "../../getConnection";

export function addData(param) {
    const table = "destinations"
    const db = getConnection()

    return new Promise((resolve, reject) => db.transaction(
        tx => {
            tx.executeSql(`insert into ${table} (title, latitude, longitude) 
                values (?, ?, ?)`,
                [param.title, param.latitude, param.longitude],
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }));
}
