
import * as SQLite from 'expo-sqlite';

export function getConnection() {
    return SQLite.openDatabase('acorde_no_ponto.db')
}
