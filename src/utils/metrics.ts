/* Medição de uso com o GoatCounter: sem cookies e só com o nome do evento; sem o código configurado, não faz nada */
declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string; title: string; event: boolean }) => void };
  }
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
