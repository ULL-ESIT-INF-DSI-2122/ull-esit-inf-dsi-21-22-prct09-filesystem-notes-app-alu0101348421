import 'mocha';
import {expect} from 'chai';
import {note} from '../src/note';
import exp from 'constants';

describe('Note', () => {
  let note1: note;
  let note2: note;

  beforeEach(() => {
    note1 = new note('user', 'title', 'body', 'red');
    note2 = new note('user', 'title', 'body', 'green');
  });

  it('should be a Note', () => {
    expect(note1).to.be.an.instanceof(note);
    expect(note2).to.be.an.instanceof(note);
  });

  it('should have a user', () => {
    expect(note1.user).to.equal('user');
    expect(note2.user).to.equal('user');
  });

  it('should have a title', () => {
    expect(note1.title).to.equal('title');
    expect(note2.title).to.equal('title');
  });

  it('should have a body', () => {
    expect(note1.body).to.equal('body');
    expect(note2.body).to.equal('body');
  });

  it('should have a color', () => {
    expect(note1.color).to.equal('red');
    expect(note2.color).to.equal('green');
  });
});