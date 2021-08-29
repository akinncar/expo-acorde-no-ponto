import {getConnection} from "./getConnection";

export function init() {
    const db = getConnection()
    db.exec([
        { sql: 'PRAGMA foreign_keys = ON;', args: [] }
    ], false, () => console.log('Foreign keys turned on'))

    const sqlCreation = `create table if not exists destinations (
        id integer primary key autoincrement,
        title text,
        latitude real,
        longitude real
    );`

    db.transaction(
        tx => {
            tx.executeSql(sqlCreation)
        }, (error) => {
            console.log("error call back : " + JSON.stringify(error))
            console.log(error);
        }, () => {
            console.log("transaction complete call back ")
        }
    )
}
