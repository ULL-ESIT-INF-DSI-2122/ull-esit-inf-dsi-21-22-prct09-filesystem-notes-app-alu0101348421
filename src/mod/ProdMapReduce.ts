import {MapReduce} from "./MapReduce";

/**
 * Clase que realiza la multiplicación de todos los elementos de una lista
 * @class ProdMapReduce
 * @extends MapReduce
 */
export class ProdMapReduce extends MapReduce {
  /**
   * Constructor de la clase
   * @param numbers Lista de números
   */
  constructor(numbers: number[]) {
    super(numbers);
  }

  /**
   * Función reduce que realiza la multiplicación de todos los elementos de una lista
   * @returns {number}
   * @override
   */
  protected reduce(): number {
    let sum = 1;
    for (let i = 0; i < this.numbers.length; i++) {
      sum *= this.numbers[i];
    }
    return sum;
  }
}