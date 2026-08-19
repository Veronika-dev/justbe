import { useTranslations } from 'next-intl'
import { Cloud, MoonStar, Sunrise, ThermometerSun, Settings } from 'lucide-react';
import LinkStated from "@/components/main/link-stated";
import Image from 'next/image'

const menuItems = {
  'checkin': '/',
  'exercises': '/exercises',
  // 'tests': '/tests',
  // 'diary': '/diary',
  // 'settings': '/settings'
}

export default function Sidebar() {
  const t = useTranslations('App')
  return (
    <div className="fixed top-0 left-0 bottom-0 p-8">
      <nav className="flex flex-col items-stretch justify-start
        border border-primary-200 bg-primary-100/50
        gap-2 px-3 h-full rounded-3xl w-60"
      >
        <div className="text-center pt-4">
          <Image src="/logo-sidebar.svg" width={226} height={196} alt="Logo" className="w-3/5 mx-auto" />
          <div className="text-2xl mt-3 mb-1">{ t('title') }</div>
          <div className="text-gray-400/80 text-sm">{ t('motto') }</div>
        </div>
        <div className="mt-16 flex flex-col gap-2">
          {
            Object.entries(menuItems).map(([key, value]) => (
              <MenuItem key={key} name={key} href={value} />
            ))
          }
        </div>
        <div className="flex items-center pb-6 gap-4 mt-auto">
          <Image src="/avatar.svg" alt="Avatar" width={50} height={50} className="rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">{ t('capy') }</span>
            {/*<span className="text-xs text-gray-400/80">Настроение: спокойно</span>*/}
          </div>
        </div>
      </nav>
    </div>
  )
}

function MenuItem({ name, href }: { name: string, href: string }) {
  const t = useTranslations('Menu');
  return (
    <LinkStated href={href}
                exact={true}
                activeClassName="bg-primary/15 text-primary"
                className="flex items-center justify-start text-left
                gap-3 py-4 px-4 text-gray-400/80
                hover:bg-primary/10 rounded-lg
                transition-colors transition-duration-300">
      { MenuIcon(name) }
      <span className="text-sm">{ t(name) }</span>
    </LinkStated>
  )
}

function MenuIcon(name: string) {
  switch (name) {
    case 'checkin':
      return <Cloud size={22} />
    case 'exercises':
      return <Sunrise size={22} />
    case 'tests':
      return <ThermometerSun size={22} />
    case 'diary':
      return <MoonStar size={22} />
    case 'settings':
      return <Settings size={22} />
    default:
      return null
  }
}
