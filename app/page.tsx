import Link from "next/link";
import styles from "/styles/Home.module.scss";
import { HATUrlWithParsedQuery } from "hat-server";
import { RingImage } from "hat-ring-components";
export const revalidate = 0;
export default async function Page({
  params,
  searchParams,
}: {
  params: {
    path: Array<string>;
  };
  searchParams: HATUrlWithParsedQuery;
}) {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <RingImage className={styles.mainLogo} src={'https://ocdn.eu/customerpoc/hatstatic/_next/static/media/ring-logo.b80d5073.png'} alt="Ring Logo" width={800} height={289} />

          <h1 className={styles.title}>
            Welcome to{" "}
            <a href="https://stash.grupa.onet/projects/HAT/repos/hat-boilerplate/browse">
              Headless Application Template!
            </a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>app/page.tsx</code>
          </p>

          <div className={styles.grid}>
            <Link href="/_examples" className={styles.card} prefetch={false}>
              <h2>Examples &rarr;</h2>
              <p>
                Discover and see boilerplate example Head APP Template layouts.
                All examples and files from app directory can be removed while
                development of projects.
              </p>
            </Link>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Next JS docs &rarr;</h2>
              <p>
                Find in-depth information about Next.js standard features and
                API.
              </p>
            </a>

            <a
              href="https://developer.ringieraxelspringer.tech/HeadlessApplicationTemplate/index.html"
              className={`${styles.card} ${styles.wFull}`}
            >
              <h2>Ring Developer&apos;s docs &rarr;</h2>
              <p>Find in-depth information about Ring.</p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          Powered by{" "}
          <span className={styles.logo}>
            <RingImage src={'https://ocdn.eu/customerpoc/hatstatic/_next/static/media/nextjs-icon.9e93808d.svg'} alt="Next Logo" width={72} height={16} />
          </span>
        </footer>
      </div>
    </>
  );
}
