/**
 * Clase que representa una nota
 * @class
 */
export class note {
  public user: string;
  public title: string;
  public body: string;
  public color: 'red' | 'green' | 'blue' | 'yellow';

  /**
   * Constructor de la clase
   * @param user Usuario de la nota
   * @param title Título de la nota
   * @param body Contenido de la nota
   * @param color Color de la nota
   */
  constructor(user: string, title: string, body: string, color: 'red' | 'green' | 'blue' | 'yellow') {
    this.user = user;
    this.title = title;
    this.body = body;
    this.color = color;
  }
}

