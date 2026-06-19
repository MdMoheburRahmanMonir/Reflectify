'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

import {
  Dropdown,
  Avatar,
  Label,
} from '@heroui/react';
import { PiGearLight } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { FaRegArrowAltCircleRight, FaUserCog } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { LuLayoutDashboard } from 'react-icons/lu';
import Link from 'next/link';

export function CustomTrigger() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut();
    router.push('/login');
  }

  return (
    <Dropdown placement="bottom-end" offset={8}>
      {/* Trigger */}
      <Dropdown.Trigger className="rounded-full cursor-pointer">
        <Avatar>
          <Avatar.Image
            alt={session?.user?.name || 'User'}
            src={
              session?.user?.image ||
              'https://i.ibb.co.com/84BcLVnG/user-circles-set-78370-4704.avif'
            }
          />
          <Avatar.Fallback delayMs={600}>
            {session?.user?.name?.slice(0, 2)?.toUpperCase() || 'U'}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      {/* Popover */}
      <Dropdown.Popover>
        {/* Header */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={session?.user?.name}
                src={
                  session?.user?.image ||
                  'https://i.ibb.co.com/84BcLVnG/user-circles-set-78370-4704.avif'
                }
              />
              <Avatar.Fallback delayMs={600}>
                {session?.user?.name?.slice(0, 2)?.toUpperCase() || 'U'}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-sm font-medium leading-5">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs text-muted">
                {session?.user?.email || ''}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/dashboard"  >
                <Label>Dashboard</Label>
              </Link>

              <LuLayoutDashboard className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="profile">
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/profile/editprofile"  >
                <Label>profile</Label>
              </Link>
              <FaUserCog className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            onClick={signOut}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <FaRegArrowAltCircleRight className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}