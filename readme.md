# Práctica 9 - Aplicación de procesamiento de notas de texto

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101348421/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101348421?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101348421&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101348421)

# Introducción
Esta práctica está enfocada al tratamiento y procesamiento de ficheros. Para ello, nos hemos servido de 'fs' y ficheros JSON que nos servirán para almacenar una serie de notas que podremos añadir, borrar, listar etc. Estas notas conllevarán un título, un cuerpo, un color y un usuario.

Otro punto interesante que vamos a tratar es el uso de argumentos en la línea de comandos. En este caso, vamos a usar 'yargs' para hacer uso de los argumentos que nos pasan por la línea de comandos.

Como las notas llevan un color asignado, usaremos el módulo 'chalk' para poder pintar el color de las notas.
## Note
La clase 'Note' nos servirá para almacenar las notas. Posee un constructor que recibe un título, un cuerpo, un color y un usuario.

```typeScript
export class note {
  public user: string;
  public title: string;
  public body: string;
  public color: 'red' | 'green' | 'blue' | 'yellow';

  constructor(user: string, title: string, body: string, color: 'red' | 'green' | 'blue' | 'yellow') {
    this.user = user;
    this.title = title;
    this.body = body;
    this.color = color;
  }
}
```
## Management
Esta clase será la encargada de gestionar las notas.

Tiene predefinido una dirección de almacenamiento que puede ser modificada en el constructor.

```typeScript
const DIR = './src/db';

export class management {
  private dir: string;

  constructor(dir: string = DIR) {
    this.dir = dir;
  }
```

Además, tendrá los siguientes métodos:
- `exists`: Comprueba si existe un fichero con el nombre que le pasamos por parámetro.
```typeScript
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
```
- `addNote`: Añade una nota al directorio del usuario.
```typeScript
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
```
- `getNotes`: Devuelve todas las notas del usuario.
```typeScript
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
```
- `getNote`: Devuelve una nota del usuario.
```typeScript
  public getNote(user: string, title: string, callback: (err: Error | null, note: note | null) => void): void {
    if (!this.exists(title, user)) {
      callback(new Error('Note not found'), null);
      return
    }
    const dir = this.dir + '/' + user;
    const note = JSON.parse(fs.readFileSync(dir + '/' + title + '.json', 'utf8'));
    callback(null, note);
  }
```
- `removeNote`: Elimina una nota del usuario.
```typeScript
  public removeNote(user: string, title: string, callback: (err: Error | null) => void): void {
    if (!this.exists(title, user)) {
      callback(new Error('Note not found'));
    } else {
      const dir = this.dir + '/' + user;
      fs.unlinkSync(dir + '/' + title + '.json');
      callback(null);
    }
  }
```

Con estas funciones nos bastará para gestionar las notas desde `app-notes.ts`.

Como se puede ver, la clase 'management' es hace uso de funciones de callback para poder gestionar los errores que puedan surgir y devolver los resultados, además de la versión síncrona de las funciones de 'fs' para evitar problemas de a la hora de ejecutar las operaciones de escritura y lectura.

## Note App
La clase 'NoteApp' es la encargada de gestionar la línea de comandos y la interacción con el usuario.

Para ello nos hemos servido de 'yargs' que nos permitirá gestionar los argumentos que nos pasan por la línea de comandos mediante `yargs.command` y `yargs.argv`.

- add: Añade una nota.
En el siguiente snippet de código se puede ver el funcionamiento de `yargs`. Primero establecemos el comando, la definición del mismo, y que parámetros va a tomar, además de si estos parámetros son obligatorios o no. Después, usaremos el `handler` para ejecutar código según esos parámetros.
```typeScript
yargs
.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
      choices: ['red', 'green', 'blue', 'yellow']
    },
  },
  handler: (argv) => {
    const tmp = new note(argv.user as string, argv.title as string, argv.body as string, argv.color as 'red' | 'green' | 'blue' | 'yellow');
    gestor.addNote(tmp, (err) => {
      if (err == null) {
        console.log(chalk.green('Note added'));
      } else if (err.message === 'Note already exists') {
        console.log(chalk.red('Note title taken'));
      } else {
        console.log(chalk.red('Error: ' + err.message));
      }
    });
  },
})
```
- list: Lista todas las notas.
```typeScript
.command({
  command: 'list',
  describe: 'List all notes',
  builder: {
    user: {
      describe: 'User of the notes',
      demandOption: true,
      type: 'string'
    },
  },
  handler: (argv) => {
    console.log(chalk.gray('Your notes:'));
    gestor.getNotes(argv.user as string, (err, notes) => {
      if (err) {
        console.log(chalk.red('Error: ' + err.message));
      } else {
        notes.forEach(note => {
          const color = note.color === 'red' ? chalk.red : note.color === 'green' ? chalk.green : note.color === 'blue' ? chalk.blue : chalk.yellow;
          console.log(color.inverse(note.title));
        });
      }
    });
  },
})
```
- read: Lee una nota.
```typeScript
.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler: (argv) => {
    gestor.getNote(argv.user as string, argv.title as string, (err, note) => {
      if (err) {
        console.log(chalk.red('Error: ' + err.message));
      } else {
        const tmp = note as note;
        const color = tmp.color === 'red' ? chalk.red : tmp.color === 'green' ? chalk.green : tmp.color === 'blue' ? chalk.blue : chalk.yellow;
        console.log(color.inverse(tmp.title));
        console.log(tmp.body);
      }
    });
  },
})
```
- remove: Elimina una nota.
```typeScript
.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler: (argv) => {
    gestor.removeNote(argv.user as string, argv.title as string, (err) => {
      if (err == null) {
        console.log(chalk.green('Note removed'));
      } else if (err.message === 'Note not found' || err.message === 'You are not the owner of this note') {
        console.log(chalk.red(err.message));
      } else {
        console.log(chalk.red('Error: ' + err.message));
      }
    });
  },
})
```

Por último, añadiremos `.help()` para que muestre la ayuda al usuario y ofrecerle una lista de comandos.

```typeScript
.help();

yargs.parse();
```

A lo largo de la ejecución de esta clase, se puede ver que hemos usado chalk para colorear los mensajes de error, éxito y las propias notas.

# Conclusión
Esta práctica es un buen punto de partida para aprender a familiarizarnos con la gestión de ficheros y los archivos JSON, que son muy útiles para la gestión de datos.

A su vez, nos ha servido de apoyo para introducirnos en los módulos `yargs` y `chalk` para la gestión de la línea de comandos y la interacción con el usuario.