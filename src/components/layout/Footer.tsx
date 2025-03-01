import Link from 'next/link'

const footerNavigation = {
  shop: [
    { name: 'K-12', href: '/k12' },
    { name: 'Higher Education', href: '/higher-education' },
    { name: 'College Students', href: '/college' },
    { name: 'Success Stories', href: '/success-stories' },
  ],
  account: [
    { name: 'Manage Your Account', href: '/account' },
    { name: 'Learning Dashboard', href: '/dashboard' },
    { name: 'Progress Tracking', href: '/progress' },
    { name: 'Library', href: '/library' },
  ],
  company: [
    { name: 'About Maarifa', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Ethics & Compliance', href: '/compliance' },
    { name: 'Events', href: '/events' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Community', href: '/community' },
    { name: 'Resources', href: '/resources' },
  ],
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold">Shop and Learn</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Account</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.account.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Maarifa AI</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Support</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8 dark:border-gray-800">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Maarifa AI. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Terms of Use
            </Link>
            <Link
              href="/sales"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Sales and Refunds
            </Link>
            <Link
              href="/legal"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Legal
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
