/* Medição de uso com o GoatCounter: sem cookies e só com o nome do evento; sem o código configurado, não faz nada */
declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string; title: string; event: boolean }) => void };
  }
}

/* Conta única do portfólio (decisão D5 de 10/11/2026); VITE_GOATCOUNTER_CODE troca, se preciso */
export const CODIGO_PORTFOLIO = 'douglasabnovato';

interface Ambiente { producao: boolean; hostname: string; automatizado: boolean }

const ambienteAtual = (): Ambiente => ({
  producao: import.meta.env.PROD,
  hostname: location.hostname,
  automatizado: navigator.webdriver === true,
});

/* Mede só no build de produção, fora de localhost e fora de navegador automatizado (testes) */
export function deveMedir(amb: Ambiente = ambienteAtual()): boolean {
  if (!amb.producao || amb.automatizado) return false;
  return !['localhost', '127.0.0.1', '[::1]', ''].includes(amb.hostname);
}

/* Carrega o contador só se o código da conta estiver configurado */
export function loadMetrics(code: string | undefined = import.meta.env.VITE_GOATCOUNTER_CODE): void {
  if (!code || !/^[a-z0-9-]+$/.test(code)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  document.head.appendChild(script);
}

/* Registra um evento; falha ou bloqueio da medição nunca atrapalha o uso */
export function trackEvent(name: string): void {
  try {
    window.goatcounter?.count({ path: name, title: name, event: true });
  } catch {
    /* A medição é opcional */
  }
}
