import * as fs from 'fs';
import {note} from './note';

/**
 * Dirección por defecto de la base de datos
 * @type {string}
 * @constant
 */
const DIR = './db';

/**
 * Clase que gestiona las notas
 * @class
 */
export class Management {
  readonly dir: string;

  /**
   * Constructor de la clase
   * @param dir Dirección de la base de datos
   */
  constructor(dir: string = DIR) {
    this.dir = dir;
  }

  /**
   * Función que comprueba si una nota existe
   * @param title Título de la nota
   * @param user Usuario de la nota
   * @returns {boolean}
   */
  public exists(title: string, user: string): boolean {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
    const dir = this.dir + '/' + user;
    if (!fs.existsSync(dir)) {
      return false;
    }
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        if (file.name === title + '.json') {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Función que añade una nota
   * @param note Nota a añadir
   * @param callback Función de callback con error
   */
  public addNote(note: note, callback: (err: Error | null) => void): void {
    if (this.exists(note.title, note.user)) {
      callback(new Error('Note already exists'));
    } else {
      if (!fs.existsSync(this.dir + '/' + note.user)) {
        fs.mkdirSync(this.dir + '/' + note.user);
      }
      fs.writeFileSync(this.dir + '/' + note.user + '/' + note.title + '.json', JSON.stringify(note));
      callback(null);
    }
  }

  /**
   * Función que devuelve todas las notas de un usuario
   * @param user Usuario de las notas
   * @param callback Función de callback con error y notas
   */
  public getNotes(user: string | null, callback: (err: Error | null, notes: note[]) => void): void {
    const dir = this.dir + '/' + user;
    if (!fs.existsSync(dir)) {
      callback(new Error('User not found'), []);
    } else {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      const notes: note[] = [];
      for (const file of files) {
        if (file.isFile()) {
          const note = JSON.parse(fs.readFileSync(dir + '/' + file.name, 'utf8'));
          notes.push(note);
        }
      }
      callback(null, notes);
    }
  }

  /**
   * Función que devuelve una nota
   * @param user Usuario de la nota
   * @param title Título de la nota
   * @param callback Función de callback con error y nota
   */
  public getNote(user: string, title: string, callback: (err: Error | null, note: note | null) => void): void {
    if (!this.exists(title, user)) {
      callback(new Error('Note not found'), null);
      return
    }
    const dir = this.dir + '/' + user;
    const note = JSON.parse(fs.readFileSync(dir + '/' + title + '.json', 'utf8'));
    callback(null, note);
  }

  /**
   * Función que elimina una nota
   * @param user Usuario de la nota
   * @param title Título de la nota
   * @param callback Función de callback con error
   */
  public removeNote(user: string, title: string, callback: (err: Error | null) => void): void {
    if (!this.exists(title, user)) {
      callback(new Error('Note not found'));
    } else {
      const dir = this.dir + '/' + user;
      fs.unlinkSync(dir + '/' + title + '.json');
      callback(null);
    }
  }
}
