/**
 * Clase abstracta que representa un algoritmo que ejecutará un map y un reduce.
 * @abstract
 * @class MapReduce
 */
export abstract class MapReduce {
  /**
   * Constructor del algoritmo
   * @param numbers Lista de números
   */
  constructor(protected numbers: number[]) {}

  /**
   * Ejecuta el algoritmo
   * @returns {number}
   */
  public run(): number {
    this.numbers = this.map();
    this.afterMap();
    const result = this.reduce();
    this.afterReduce();
    return result;
  }

  /**
   * Función que se ejecuta en cada iteración del map
   * @param x numero a procesar
   * @returns {number}
   */
  public fn(x: number): number {
    return x;
  }
  
  /**
   * Función map
   * @param fn Función que se ejecuta en cada iteración del map
   * @returns {number[]}
   */
  protected map(fn: (x: number) => number = this.fn): number[] {
    let list: number[] = [];
    for (let i = 0; i < this.numbers.length; i++) {
      list.push(fn(this.numbers[i]));
    }
    return list;
  }

  /**
   * Función pública para realizar los test
   * @returns {number[]}
   */
  public testMap(): number[] {
    return this.map();
  }

  /**
   * Hook que se ejecuta después de ejecutar el map
   * @returns {void}
   */
  protected afterMap(): void {}

  /**
   * Función reduce
   * @returns {number}
   */
  protected abstract reduce(): number;

  /**
   * Función pública para realizar los test
   * @returns {number}
   */
  public testReduce(): number {
    return this.reduce();
  }

  /**
   * Hook que se ejecuta después de ejecutar el reduce
   * @returns {void}
   */
  protected afterReduce(): void {}
  
}