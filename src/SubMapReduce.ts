import {MapReduce} from "./MapReduce";

/**
 * Clase que realiza la resta de todos los elementos de una lista
 * @class SubMapReduce
 * @extends MapReduce
 */
export class SubMapReduce extends MapReduce {
  /**
   * Constructor de la clase
   * @param numbers Lista de números
   */
  constructor(numbers: number[]) {
    super(numbers);
  }

  /**
   * Función reduce que realiza la resta de todos los elementos de una lista
   * @returns {number}
   * @override
   */
  protected reduce(): number {
    let sum = this.numbers[0];
    for (let i = 1; i < this.numbers.length; i++) {
      sum -= this.numbers[i];
    }
    return sum;
  }
}