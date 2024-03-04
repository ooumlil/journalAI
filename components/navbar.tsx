import Link from 'next/link';

const links = [
  { href: '/', name: 'Home' },
  { href: '/journal', name: 'Journal' },
  { href: '/history', name: 'History' },
];

export default function NavBar() {
  return (
    <nav className="w-1/3">
      <ul className="w-full h-full flex items-center justify-between">
        {links.map((link) => (
          <li className="p-4 text-xl" key={link.name}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
