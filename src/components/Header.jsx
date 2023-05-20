import React from 'react';
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const Header = () => {
  const session = useSession();
  const supbase = useSupabaseClient();

  const handleLogout = () => {
    supbase.auth.signOut();
  }

  const handleLogin = () => {
    window.open('http://localhost:3000/courses', '_self')
  }

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <p className="font-bold text-xl">Course Website</p>
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/courses">
              <p className="hover:text-gray-300">Courses</p>
            </Link>
          </li>
          <li>
            <Link href="/categories">
              <p className="hover:text-gray-300">Categories</p>
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/account">
                  <p className="hover:text-gray-300">Account</p>
                </Link>
              </li>
              <li>
                <button
                  className="hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                  className="hover:text-gray-300"
                  onClick={handleLogin}
              >
                <p className="hover:text-gray-300">Sign In</p>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
