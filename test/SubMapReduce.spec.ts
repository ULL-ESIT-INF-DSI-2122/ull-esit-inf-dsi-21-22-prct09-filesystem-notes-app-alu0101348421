import 'mocha';
import {expect} from 'chai';
import {SubMapReduce} from '../src/SubMapReduce';

describe('SubMapReduce', () => {
  let numbers: number[];
  let subMapReduce: SubMapReduce;

  beforeEach(() => {
    numbers = [1, 2, 3, 4, 5];
    subMapReduce = new SubMapReduce(numbers);
  });

  it('should be a MapReduce', () => {
    expect(subMapReduce).to.be.an.instanceof(SubMapReduce);
  });

  it('should have a run method', () => {
    expect(subMapReduce.run).to.be.a('function');
    expect(subMapReduce.run()).to.equal(-13);
  });

  it('should have a fn method', () => {
    expect(subMapReduce.fn).to.be.a('function');
    expect(subMapReduce.fn(1)).to.equal(1);
    expect(subMapReduce.fn(2)).to.equal(2);
  });

  it('should have a reduce method', () => {
    expect(subMapReduce.testReduce).to.be.a('function');
    expect(subMapReduce.testReduce()).to.equal(-13);
  });

  it('should have a map method', () => {
    expect(subMapReduce.testMap).to.be.a('function');
    expect(subMapReduce.testMap()).to.deep.equal([1, 2, 3, 4, 5]);
  });
});