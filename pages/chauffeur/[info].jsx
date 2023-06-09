import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Notif from "../../components/Notif";
import { fetchProfile } from '../api/profile.js';

import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';

import { Rating } from "primereact/rating";

const InfoChauffeur = () => {

  const router = useRouter();
  const { info } = router.query;
  console.log("info = " + info);

  const [profile, setProfile] = useState(null);
  const [infoData, setInfo] = useState([]);
  const [value, setValue] = useState(null);

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
    const token = localStorage.getItem("token");
    if (profile && info) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/chauffeurs/get-one/by-id/by-filter/${info}/${profile.filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) {
            data = [data]; // Wrap non-array data in an array
          }
          setInfo(data);
        })
        .catch((err) => console.log(err));
    }
    
    return () => {
      setInfo([]);
    };
  }, [profile,info]);
  
  


 

    const legendTemplate = (
        <div className="flex align-items-center text-dark ">
            <span className="pi pi-user mr-2"></span>
            <span className="font-bold text-lg"> {infoData[0]?.fonction} Details</span>
        </div>
    );

   
    return (
   
            
        <div className='bg-gray-100 min-h-screen'>
         
          <br></br>
          <Notif />    
                
                <div className="card  text-center " style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                    <Fieldset legend={legendTemplate} >
                        
                       
                        <p className="m-0 font-bold">
                          Fullname : &nbsp; {infoData[0]?.fullname}  
                        </p>

                        <Divider type="solid" />

                        <p className="m-0 font-bold">
                          @Email : &nbsp; {infoData[0]?.email}
                        </p>

                        <Divider type="solid" />

                        <p className="m-0 font-bold">
                          N° Télé : &nbsp; {infoData[0]?.tele}
                        </p>

                        <Divider type="solid" />

                        <p className="m-0 font-bold">
                          Cin : &nbsp; {infoData[0]?.cin}
                        </p>

                        <Divider type="solid" />

                        <p className="m-0 font-bold">
                          N° Permis : &nbsp; {infoData[0]?.permis}
                        </p>

                        <Divider type="solid" />
                            
                        {infoData[0]?.fonction === 'CHAUFFEUR' ? (
                            <div className="card flex justify-content-center text-center">
                              <span className="font-bold m-0">
                                SCORE ECO-DRIVING (AVG= {infoData[0]?.score_avg}) :{' '}
                              </span>
                              &nbsp;&nbsp; <Rating value={infoData[0]?.score_avg} readOnly cancel={false} stars={20} />
                            </div>
                          ) : (
                            <div className="card flex justify-content-center text-center">
                              <span className="font-bold m-0">
                                SCORE ECO-DRIVING :{' '}
                              </span>
                              &nbsp;&nbsp;<span style={{ color: 'red', fontWeight: 'bold' }}> Not available </span>
                            </div>
                        )}

                        
                       
                    </Fieldset>
                </div>
                


        
         
         
        </div>
      );
  
};

export default InfoChauffeur;
