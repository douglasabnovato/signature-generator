/* Testes da medição: envia só o nome do evento e não quebra sem o contador */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadMetrics, trackEvent } from '../utils/metrics';

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
});
