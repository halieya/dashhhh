import React, { useRef } from 'react';

import { fetchProfile } from '../pages/api/profile';
import { useRouter } from 'next/router';
import { Toast } from 'primereact/toast';
import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";


export default function Notif() {
  const [rapports, setRapports] = useState([]);
  const toastBR  = useRef(null);

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

  useEffect(() => {
    if (profile) {

      const socket = new WebSocket("ws://localhost:1024/ws");
      const client = Stomp.over(socket);

      client.connect({}, function () {
        client.subscribe(
          "/topic/notif/" + profile.filter,
          function (message) {
            const rapport = JSON.parse(message.body);
            console.log(rapport);
            // if (notif.code === "eya123") { // Add this conditional statement
            //   setNotifs((prevNotifs) => [notif, ...prevNotifs]);
            // }
            setRapports((prevNotifs) => [rapport, ...prevNotifs]);
            toastBR.current.show({ 
              severity: 'warn', 
              summary: rapport.title , 
              detail: rapport.desc + ' - ' + new Date(rapport.timestamp).toLocaleString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
              }), 
              life: 5000 
            });
            
          }
        );
      });

      return () => {
        client.disconnect();
      };
      
    }
    
  }, [profile]);

  // useEffect(() => {
  //   if (rapports.length > 0) {
  //     const timeoutId = setTimeout(() => {
  //       setRapports([]);
  //     }, 10000);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [rapports]);

  return (
    
    <div>
      <div className="card flex justify-content-center">
        <Toast ref={toastBR} position="bottom-right" />
      </div>
    </div>
     
  );
}
