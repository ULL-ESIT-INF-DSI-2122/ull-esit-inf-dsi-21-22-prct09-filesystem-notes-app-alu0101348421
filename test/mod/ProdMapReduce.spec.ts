import 'mocha';
import {expect} from 'chai';
import {ProdMapReduce} from '../../src/mod/ProdMapReduce';

describe('ProdMapReduce', () => {
  let numbers: number[];
  let prodMapReduce: ProdMapReduce;

  beforeEach(() => {
    numbers = [1, 2, 3, 4, 5];
    prodMapReduce = new ProdMapReduce(numbers);
  });

  it('should be a MapReduce', () => {
    expect(prodMapReduce).to.be.an.instanceof(ProdMapReduce);
  });

  it('should have a run method', () => {
    expect(prodMapReduce.run).to.be.a('function');
    expect(prodMapReduce.run()).to.equal(120);
  });

  it('should have a fn method', () => {
    expect(prodMapReduce.fn).to.be.a('function');
    expect(prodMapReduce.fn(1)).to.equal(1);
    expect(prodMapReduce.fn(2)).to.equal(2);
  });

  it('should have a reduce method', () => {
    expect(prodMapReduce.testReduce).to.be.a('function');
    expect(prodMapReduce.testReduce()).to.equal(120);
  });

  it('should have a map method', () => {
    expect(prodMapReduce.testMap).to.be.a('function');
    expect(prodMapReduce.testMap()).to.deep.equal([1, 2, 3, 4, 5]);
  });
});