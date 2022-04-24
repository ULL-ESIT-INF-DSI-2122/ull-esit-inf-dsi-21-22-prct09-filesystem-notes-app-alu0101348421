import {MapReduce} from "./MapReduce";

/**
 * Clase que realiza la división de todos los elementos de una lista
 * @class DivMapReduce
 * @extends MapReduce
 */
export class DivMapReduce extends MapReduce {
  /**
   * Constructor de la clase
   * @param numbers Lista de números
   */
  constructor(numbers: number[]) {
    super(numbers);
  }

  /**
   * Función reduce que realiza la división de todos los elementos de una lista
   * @returns {number}
   * @override
   */
  protected reduce(): number {
    let sum = this.numbers[0];
    for (let i = 1; i < this.numbers.length; i++) {
      sum /= this.numbers[i];
    }
    return sum;
  }
}