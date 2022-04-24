import 'mocha';
import {expect} from 'chai';
import {DivMapReduce} from '../../src/mod/DivMapReduce';

describe('DivMapReduce', () => {
  let numbers: number[];
  let divMapReduce: DivMapReduce;

  beforeEach(() => {
    numbers = [10, 2, 5];
    divMapReduce = new DivMapReduce(numbers);
  });

  it('should be a MapReduce', () => {
    expect(divMapReduce).to.be.an.instanceof(DivMapReduce);
  });

  it('should have a run method', () => {
    expect(divMapReduce.run).to.be.a('function');
    expect(divMapReduce.run()).to.equal(1);
  });

  it('should have a fn method', () => {
    expect(divMapReduce.fn).to.be.a('function');
    expect(divMapReduce.fn(1)).to.equal(1);
    expect(divMapReduce.fn(2)).to.equal(2);
  });

  it('should have a reduce method', () => {
    expect(divMapReduce.testReduce).to.be.a('function');
    expect(divMapReduce.testReduce()).to.equal(1);
  });

  it('should have a map method', () => {
    expect(divMapReduce.testMap).to.be.a('function');
    expect(divMapReduce.testMap()).to.deep.equal([10, 2, 5]);
  });
});