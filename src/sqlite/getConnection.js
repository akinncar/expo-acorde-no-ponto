
import * as SQLite from 'expo-sqlite';

export function getConnection() {
    return SQLite.openDatabase('anp.db')
}
