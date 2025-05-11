import { describe, it, expect } from 'vitest';
import { addExample } from './example.js';

describe('addition example', () => {
  it('adds two numbers', () => {
    expect(addExample(1, 2)).toBe(3);
  });
});
