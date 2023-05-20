import React from 'react';
import {Auth} from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Header from './Header';

const Layout = ({ children }) => {
    const session = useSession();
    const supabase = useSupabaseClient()

    return(
        <div className='flex flex-col min-h-screen'>
            <Header />
            {
            !session ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md w-full sm:max-w-lg">
                        <Auth
                            supabaseClient={supabase}
                            appearance={{theme: ThemeSupa}}
                            theme='dark'
                        />
                    </div>
                </div>                
            ):(
                <main className='flex-grow'>{children}</main>
            )
            }
        </div>
    )
}
export default Layout;