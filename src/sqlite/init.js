import {getConnection} from "./getConnection";

export function init() {
    const db = getConnection()
    db.exec([
        { sql: 'PRAGMA foreign_keys = ON;', args: [] }
    ], false, () => console.log('Foreign keys turned on'))

    const sql = [
        `create table if not exists destinations (
            id integer primary key autoincrement,
            title text,
            latitude real,
            longitude real
           );`
    ]

    db.transaction(
        tx => {
            for (let i = 0; i < sql.length; i++) {
                console.log("execute sql : " + sql[i])
                tx.executeSql(sql[i]);
            }
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error))
            console.log(error);
        }, () => {
            console.log("transaction complete call back ")
        }
    )
}
