import Layout from '../Components/Layout';
import { Provider } from '../Components/Context';
import '../scss/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
