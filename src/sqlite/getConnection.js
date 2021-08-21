
import * as SQLite from 'expo-sqlite';

export function getConnection() {
    return SQLite.openDatabase('acorde_no_ponto', '1.0', "Acorde No Ponto")
}
