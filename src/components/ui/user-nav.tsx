import { Menu } from '@headlessui/react';
import { Button } from '@/components/ui/button';

export function UserNav() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Button} variant="ghost">User</Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-background shadow-lg">
        <Menu.Item>
          {({ active }) => (
            <a href="#" className={`block px-4 py-2 ${active ? 'bg-primary/5' : ''}`}>Profile</a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a href="#" className={`block px-4 py-2 ${active ? 'bg-primary/5' : ''}`}>Logout</a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
