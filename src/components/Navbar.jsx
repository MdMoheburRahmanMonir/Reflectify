'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { CustomTrigger } from '@/components/CustomTrigger';
import { ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Public Post', href: '/public-post' },
    { name: 'Dashboard', href: '/user/dashboard' },
    { name: 'Profile', href: '/profile' },
  ];

  const navLinksAdmin = [
    { name: 'Home', href: '/' },
    { name: 'Public Post', href: '/public-post' },
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Profile', href: '/profile' },
  ];

  async function handelSignOut() {
    await authClient.signOut();
    router.push('/login');
  }
  const links = [] 

  const filter = session?.user?.role === 'admin' ? links.push(navLinksAdmin) : session?.user?.role === 'user' ? links.push(navLinks) : links.push(navLinks);


  return (
    <nav className="w-11/12 px-0 backdrop-blur-[10px] mx-auto bg-transparent sticky top-0 z-50">
      <div className="w-11/12 max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 px-6 md:px-0 py-3 items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md bg-white">
              <img src="/ChatGPT Image Jun 18, 2026, 10_34_43 AM.png" alt="logo" className="w-8 h-8" />
            </div>

            <span className="font-bold text-2xl tracking-tight bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent ">REFLECTIFY</span>
          </Link>
        </div>

        <div className="hidden  lg:flex justify-center items-center gap-6">
          {links[0].map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`text-lg whitespace-nowrap font-medium transition ${isActive ? 'text-blue-600 border-b-[1px] border-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-200'}`}>
                {link.name}
              </Link>
            );
          })}

        </div>

        <div className="hidden justify-self-end md:flex lg:justify-end items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            {!session?.user ? (
              <Link
                href="/login"
                className="text-md flex font-medium text-center items-center px-4 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                Login
                <div className='text-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-center justify-center flex h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ) : session?.user?.role === 'admin' ? '' : session?.user?.plan === "free" ? (
              <Link
                href="/plans"
                className="text-md font-medium px-4 py-1 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
              >
                Upgrade to Premium ✦
              </Link>
            ) : (
              <span className="text-md font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                ✦ Premium
              </span>
            )}
          </div>


          {session?.user ? <CustomTrigger /> : ' '}
        </div>

        <div className="lg:hidden md:hidden block flex justify-end items-center">
          <button onClick={() => setMobileOpen(v => !v)} className="p-2 rounded-md bg-slate-100 dark:bg-slate-800">
            {/* simple hamburger */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div>

          {
            mobileOpen && (
              <div className="absolute right-4 top-16 w-48 rounded-lg bg-white p-3 shadow-lg dark:bg-slate-900">
                <div className="flex flex-col gap-2">
                  <ThemeToggle />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {session?.user?.plan === 'free' ? (
                        <>
                          <Link
                            href="/plans"
                            className="text-md font-medium px-4 py-2 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                          >
                            GoPremium ✦
                          </Link>
                        </>
                      ) : session?.user?.plan === 'user_pro' ? (
                        <span className="text-md font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          ✦ Premium
                        </span>
                      ) : ''}
                    </div>


                    {session?.user ? <CustomTrigger /> : (
                      <Link href="/login" className=" mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold">
                        Login
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                  {links[0].map(link => (
                    <Link key={link.href} href={link.href} className={`px-3 py-2 whitespace-nowrap rounded-md text-lg ${pathname === link.href ? 'text-blue-600  border-b-[1px] border-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-200'}`}>
                      {link.name}
                    </Link>
                  ))}

                  {session?.user ? (
                    <>
                      <button onClick={handelSignOut} className="px-3 py-2 text-md text-red-600 bg-black rounded-full flex text-center justify-center font-bold">Logout <ArrowRight className='text-sm' /></button>
                    </>
                  ) : (
                    <Link href="/login" className="px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200">Login</Link>
                  )}

                </div>
              </div>
            )
          }

        </div >
      </div >
    </nav >
  );
}
