/* Testes da medição: envia só o nome do evento e não quebra sem o contador */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CODIGO_PORTFOLIO, deveMedir, loadMetrics, trackEvent } from '../utils/metrics';

afterEach(() => {
  delete window.goatcounter;
  document.head.innerHTML = '';
});

describe('metrics', () => {
  it('envia só o nome do evento', () => {
    const count = vi.fn();
    window.goatcounter = { count };
    trackEvent('evento');
    expect(count).toHaveBeenCalledWith({ path: 'evento', title: 'evento', event: true });
  });

  it('não quebra sem o contador ou com erro nele', () => {
    expect(() => trackEvent('evento')).not.toThrow();
    window.goatcounter = { count: () => { throw new Error('bloqueado'); } };
    expect(() => trackEvent('evento')).not.toThrow();
  });

  it('só carrega o script com um código válido', () => {
    loadMetrics('');
    loadMetrics('codigo"inválido');
    expect(document.querySelector('script')).toBeNull();
    loadMetrics('minha-conta');
    expect(document.querySelector('script')?.dataset.goatcounter).toBe('https://minha-conta.goatcounter.com/count');
  });

  it('usa o código do portfólio e só mede no site publicado', () => {
    expect(CODIGO_PORTFOLIO).toBe('douglasabnovato');
    const publicado = { producao: true, hostname: 'douglasabnovato.github.io', automatizado: false };
    expect(deveMedir(publicado)).toBe(true);
    expect(deveMedir({ ...publicado, producao: false })).toBe(false);
    expect(deveMedir({ ...publicado, automatizado: true })).toBe(false);
    expect(deveMedir({ ...publicado, hostname: 'localhost' })).toBe(false);
    expect(deveMedir()).toBe(false);
  });
});
