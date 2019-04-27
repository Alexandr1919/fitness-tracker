import { CompletedPipe } from './completed.pipe';

describe('CompletedPipe', () => {
  beforeEach(() => {})
  it('create an instance', () => {
    const pipe = new CompletedPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return undefined if there is no inputs', () => {
    const pipe = new CompletedPipe();
    expect(pipe.transform()).toBeUndefined();
  });

  it('should return input if input doesn\'t match \'completed\'', () => {
    const pipe = new CompletedPipe();
    expect(pipe.transform('some')).toEqual('some');
  });

  it('should return \'Completed\' input equals \'completed\'', () => {
    const pipe = new CompletedPipe();
    expect(pipe.transform('completed')).toEqual('Completed');
  });
});
