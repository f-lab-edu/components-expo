import Root from '@/Root.tsx';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // 아래의 두 옵션 일반 사용 프로덕트에서는 켜둘 옵션이지만, 지금 진행하는 프로젝트에서는 sentry 무료 제공량을 아끼기 위해 비활성화

  // integrations: [new BrowserTracing()], // Sentry가 라우팅, 페이지 로딩, API 요청 등의 성능 정보를 자동 수집 & 페이지 전환 시간, 리소스 로딩 시간, React 렌더링 시간(fetch() 같은 네트워크 요청 시간) 등
  // tracesSampleRate: 1.0, // 퍼포먼스 측정 0~1 (1.0은 100%), 퍼포먼스 데이터를 몇 퍼센트나 수집할지 설정하는 값

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<Root />);
});
