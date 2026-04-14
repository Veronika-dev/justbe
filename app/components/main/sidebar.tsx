import { useTranslations } from 'next-intl'
import { CloudFog, MoonStar, Sunrise, ThermometerSun, Bolt } from 'lucide-react';
import LinkStated from "@/components/main/link-stated";

const menuItems = {
  'checkin': '/',
  'exercises': '/exercises',
  // 'tests': '/tests',
  // 'diary': '/diary',
  // 'settings': '/settings'
}

export default function Sidebar() {
  return (
    <nav className="flex flex-row md:flex-col align-items-center justify-center gap-8 px-4 fixed top-0 left-0 bottom-0">
      {
        Object.entries(menuItems).map(([key, value]) => (
          <MenuItem key={key} name={key} href={value} />
        ))
      }
    </nav>
  )
}

function MenuItem({ name, href }: { name: string, href: string }) {
  const t = useTranslations('Menu');
  return (
    <LinkStated href={href}
                exact={true}
                activeClassName="opacity-100 bg-primary/10"
                className="flex flex-col align-items-center justify-center text-center gap-2 p-2 text-primary opacity-80 hover:opacity-100 hover:bg-primary/10 rounded-lg transition-colors transition-duration-300">
      { MenuIcon(name) }
      <span className="text-xs uppercase tracking-widest">{ t(name) }</span>
    </LinkStated>
  )
}

function MenuIcon(name: string) {
  switch (name) {
    case 'checkin':
      return <CloudFog size={20} className="mx-auto" />
    case 'exercises':
      return <Sunrise size={20} className="mx-auto" />
    case 'tests':
      return <ThermometerSun size={20} className="mx-auto" />
    case 'diary':
      return <MoonStar size={20} className="mx-auto" />
    case 'settings':
      return <Bolt size={20} className="mx-auto" />
    default:
      return null
  }
}
