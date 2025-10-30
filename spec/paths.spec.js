import { resolveImageSrc } from '../src/utils/paths.js';

describe('resolveImageSrc', () => {
  it('devuelve vacío si no hay path', () => {
    expect(resolveImageSrc()).toBe('');
  });

  it('mantiene data URL', () => {
    const d = 'data:image/png;base64,xxx';
    expect(resolveImageSrc(d)).toBe(d);
  });

  it('mantiene URL http/https', () => {
    const u = 'https://cdnx.jumpseller.com/imagen.jpg';
    expect(resolveImageSrc(u)).toBe(u);
  });

  it('preprende / si es relativo', () => {
    expect(resolveImageSrc('assets/p1.jpg')).toBe('/assets/p1.jpg');
  });

  it('deja igual si ya empieza con /', () => {
    expect(resolveImageSrc('/assets/p1.jpg')).toBe('/assets/p1.jpg');
  });
});
