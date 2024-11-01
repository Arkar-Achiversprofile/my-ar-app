// pages/index.js
import Head from 'next/head';
import ARScene from './components/ARScene';

export default function Home() {
  return (
    <div>
      <Head>
        <title>AR Tree App</title>
        <meta name="description" content="Augmented Reality Tree App" />
      </Head>
      <ARScene />
    </div>
  );
}