import React from 'react';
import { useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';


const Account = () => {
  const session = useSession();
  const supabase = useSupabaseClient()

  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      router.push('/');
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/courses');
    return null;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 py-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Account</h2>
        <button
          className="text-blue-500 hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {profile ? (
        <div>
          <div className="flex items-center mb-4">
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">{profile.full_name}</h3>
              <p className="text-gray-600">{profile.username}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">Bio</h4>
            <p>{profile.bio}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold mb-2">Personal Information</h4>
            <p>
              <span className="font-bold">Gender:</span> {profile.gender}
            </p>
            <p>
              <span className="font-bold">Birthdate:</span> {profile.birthdate}
            </p>
          </div>
        </div>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );
};

export default Account;
