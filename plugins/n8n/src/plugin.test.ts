import { n8NPlugin } from './plugin';

describe('n8n', () => {
  it('should export plugin', () => {
    expect(n8NPlugin).toBeDefined();
  });
});
