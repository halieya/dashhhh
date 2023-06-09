import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { fetchProfile } from './api/profile.js';

import Notif from "../components/Notif";

import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token)
        .then(data => setProfile(data))
        .catch(err => {
          console.error(err);
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!profile) {
    return <div>Loading...</div>;
  }

      const header = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img alt="Card" src="/avatar-08.png" style={{ width: '25%' }}/>
        </div>
      );
    

  return (
    <div className='bg-gray-100 min-h-screen' >
      <div className='flex justify-between px-4 pt-4'>
          <h1 className="font-bold text-3xl">Home Panel</h1>
      </div>
      <br></br>
      <Notif />
        <div className="card flex justify-content-center text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card  title={profile.fullname} /*subTitle={profile.filter}*/ header={header} className="md:w-25rem">

              <Divider type="solid" />
                <p className="font-bold m-0">
                Welcome Back to your Admin Panel !
                </p>
              <Divider type="solid" />

              <p className="m-0">
               LoggedIn Profile :
                </p>
                
                <h3 className="font-bold text-2xl">  {profile.email}</h3>
              
              <Divider type="solid" />

              
               

            </Card>
        </div>
    </div>
  )
}


