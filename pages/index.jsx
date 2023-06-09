
import { useRouter } from "next/router";
import { fetchProfile } from './api/profile.js';
import { useState, useEffect } from 'react';

export default function Root() {

 const [profile, setProfile] = useState(null);
  const router = useRouter();


  useEffect(() => {
    router.push("/dashboard");
  }, []);

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

  return null;
}
