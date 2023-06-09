import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Notif from "../../components/Notif";
import { fetchProfile } from '../api/profile.js';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Rating } from "primereact/rating";

const InfoMission = () => {

  const router = useRouter();
  const { info } = router.query;
  console.log("info = " + info);

  const [profile, setProfile] = useState(null);
  const [infoData, setInfo] = useState([]);
  const [value, setValue] = useState(null);
  const [val,setVal] = useState();


  const _imprim = ()=> {
    window.print();
    setVal("imprime");
  }
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
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/missions/get-one/by-id/by-filter/${info}/${profile.filter}`, {
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
            <span className="font-bold text-lg">Mission Details</span>
        </div>
    );

   
    return (
   
            
        <div className='bg-gray-100 min-h-screen'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
         
          <br></br>
          <Notif />    
                
                <div className="card  text-center " style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                    <Fieldset legend={legendTemplate} >
                        <p className="m-0 font-bold">
                        Date de Depart : {new Date(infoData[0]?.dateDep).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        })} &nbsp;&nbsp;||&nbsp;&nbsp;
                        Date d'Arrivé :  {new Date(infoData[0]?.dateAr).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        })} 
                          
                        </p>
                        <Divider />
                        <p className="m-0 font-bold">
                            Cargo : &nbsp; {infoData[0]?.cargo}   &nbsp;||&nbsp; Weight : &nbsp; {infoData[0]?.weight} .KG
                        </p>
                        <Divider /> 
                        
                        <p className="m-0 font-bold">
                             { infoData[0]?.convoyeur  !=null   ||  infoData[0]?.convoyeur!==  "undefined"}
                            Convoyeur : &nbsp; {infoData[0]?.convoyeur =="undefined" ?  <></> : 
                            <div className="badge badge-info">
                              {infoData[0]?.convoyeur?.fullname} 
                            </div>
                            }
                        </p>
                        <Divider /> 
                        <Splitter style={{ height: '400px'  , display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                            <SplitterPanel size={1} className="flex align-items-center justify-content-center">
                            
                                <Card style={{ width: '350px', minHeight:'350px' }} title={infoData[0]?.chauffeur.fullname} header={'Chauffeur'} className="md:w-25rem">
                                    <Divider type="solid" />
                                        <p className="font-bold m-0">
                                            CIN : &nbsp; {infoData[0]?.chauffeur.cin}
                                        </p>
                                    <Divider type="solid" />
                                        <p className="font-bold m-0">  
                                            N° Tele : &nbsp; {infoData[0]?.chauffeur.tele}
                                        </p>
                                    <Divider type="solid" />
                                        <p className="font-bold m-0">  
                                            Email : &nbsp; {infoData[0]?.chauffeur.email}
                                        </p>
                                </Card>
                           
                            </SplitterPanel>
                            <SplitterPanel size={1} className="flex align-items-center justify-content-center  ">

                              {infoData[0]?.vehicle?.matricule !=null ?  (
                                              <Card  style={{ width: '350px' , minHeight:'350px' }} title={infoData[0]?.vehicle.matricule} header={'Vehicle'} className="md:w-25rem">
                                              <Divider type="solid" />
                                                  <p className="font-bold m-0">
                                                    Type : &nbsp; {infoData[0]?.vehicle.type}
                                                  </p>
                                              <Divider type="solid" />
                                                  <p className="font-bold m-0">
                                                    Marque : &nbsp; {infoData[0]?.vehicle.marque}
                                                  </p>
                                              <Divider type="solid" />
                                      </Card>
                              ):<></>}
                                
                            </SplitterPanel>
                        </Splitter>
                        <Divider />
                            
                            <div className="card flex justify-content-center text-center">
                                <span className="font-bold m-0">SCORE ECO-DRIVING ({infoData[0]?.score_chauffeur}): </span>&nbsp;&nbsp; <Rating value={infoData[0]?.score_chauffeur} readOnly cancel={false} stars={20} />
                            </div>
                            
                        <Divider type="solid" />

                        <div className="jumbotron">
                      
                        

                        <button type="button"
                    class="btn btn-outline-primary"onClick={()=> _imprim()} >
                          imprimer
                          <i class="fa fa-check-square-o" style={{"font-size":"24px"}}></i>
                      </button>
                    </div>
                    </Fieldset>

                  
                </div>
                


        
         
         
        </div>
      );
  
};

export default InfoMission;
