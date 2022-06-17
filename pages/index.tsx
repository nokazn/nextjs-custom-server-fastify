import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href='/b' as='/a'>
          <a>a (b が表示されるようになってます)</a>
        </Link>
      </li>
      <li>
        <Link href='/b'>
          <a>b</a>
        </Link>
      </li>
      <li>
        <Link href='/c'>
          <a>c</a>
        </Link>
      </li>
    </ul>
  );
}
