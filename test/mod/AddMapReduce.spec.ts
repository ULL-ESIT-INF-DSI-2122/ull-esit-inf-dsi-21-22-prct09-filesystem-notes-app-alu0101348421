import 'mocha';
import {expect} from 'chai';
import {AddMapReduce} from '../../src/mod/AddMapReduce';

describe('AddMapReduce', () => {
  let numbers: number[];
  let addMapReduce: AddMapReduce;

  beforeEach(() => {
    numbers = [1, 2, 3, 4, 5];
    addMapReduce = new AddMapReduce(numbers);
  });

  it('should be a MapReduce', () => {
    expect(addMapReduce).to.be.an.instanceof(AddMapReduce);
  });

  it('should have a run method', () => {
    expect(addMapReduce.run).to.be.a('function');
    expect(addMapReduce.run()).to.equal(15);
  });

  it('should have a fn method', () => {
    expect(addMapReduce.fn).to.be.a('function');
    expect(addMapReduce.fn(1)).to.equal(1);
    expect(addMapReduce.fn(2)).to.equal(2);
  });

  it('should have a reduce method', () => {
    expect(addMapReduce.testReduce).to.be.a('function');
    expect(addMapReduce.testReduce()).to.equal(15);
  });

  it('should have a map method', () => {
    expect(addMapReduce.testMap).to.be.a('function');
    expect(addMapReduce.testMap()).to.deep.equal([1, 2, 3, 4, 5]);
  });
});