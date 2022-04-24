import 'mocha';
import {expect} from 'chai';
import {management} from '../src/management';
import {note} from '../src/note';

describe('Management', () => {
  let note1: note;
  let note2: note;
  let manager: management;

  beforeEach(() => {
    note1 = new note('user1', 'title1', 'body1', 'red');
    note2 = new note('user2', 'title2', 'body2', 'green');
    manager = new management();
  });

  it('should be a Management', () => {
    expect(manager).to.be.an.instanceof(management);
  });

  it('should have an addNote method', () => {
    expect(manager.addNote).to.be.a('function');
    expect(manager.addNote(note1, (err) => {
      expect(err).to.be.null;
    }));
    expect(manager.addNote(note2, (err) => {
      expect(err).to.be.null;
    }));
  });

  it('should have an exists method', () => {
    expect(manager.exists).to.be.a('function');
    expect(manager.exists(note1.title, note1.user)).to.be.true;
    expect(manager.exists(note2.title, note2.user)).to.be.true;
    expect(manager.exists('title3', 'user1')).to.be.false;
    expect(manager.exists('title1', 'user2')).to.be.false;
  });

  it('should have a getNotes method', () => {
    expect(manager.getNotes).to.be.a('function');
    expect(manager.getNotes(note1.user, (err, notes) => {
      expect(err).to.be.null;
      expect(notes).to.be.an('array');
      expect(notes.length).to.equal(1);
      expect(notes[0].user).to.equal(note1.user);
      expect(notes[0].title).to.equal(note1.title);
      expect(notes[0].body).to.equal(note1.body);
      expect(notes[0].color).to.equal(note1.color);
    }));
    expect(manager.getNotes(note2.user, (err, notes) => {
      expect(err).to.be.null;
      expect(notes).to.be.an('array');
      expect(notes.length).to.equal(1);
      expect(notes[0].user).to.equal(note2.user);
      expect(notes[0].title).to.equal(note2.title);
      expect(notes[0].body).to.equal(note2.body);
      expect(notes[0].color).to.equal(note2.color);
    }));
  });

  it('should have a getNote method', () => {
    expect(manager.getNote).to.be.a('function');
    expect(manager.getNote(note1.user, note1.title, (err, noteTmp) => {
      expect(err).to.be.null;
      const tmp = noteTmp as note;
      expect(tmp.user).to.equal(note1.user);
      expect(tmp.title).to.equal(note1.title);
      expect(tmp.body).to.equal(note1.body);
      expect(tmp.color).to.equal(note1.color);
    }));
    expect(manager.getNote(note2.user, note2.title, (err, noteTmp) => {
      expect(err).to.be.null;
      const tmp = noteTmp as note;
      expect(tmp.user).to.equal(note2.user);
      expect(tmp.title).to.equal(note2.title);
      expect(tmp.body).to.equal(note2.body);
      expect(tmp.color).to.equal(note2.color);
    }));
  });

  it('should have a removeNote method', () => {
    expect(manager.removeNote).to.be.a('function');
    expect(manager.removeNote(note1.user, note1.title, (err) => {
      expect(err).to.be.null;
    }));
    expect(manager.removeNote(note2.user, note2.title, (err) => {
      expect(err).to.be.null;
    }));
  });
});
