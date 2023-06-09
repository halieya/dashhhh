import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Notif from "../../components/Notif";
import { Stomp } from "@stomp/stompjs";

import { Knob } from 'primereact/knob';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
import { ProgressBar } from 'primereact/progressbar';
import { Fieldset } from 'primereact/fieldset';

const Tracking = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { code } = router.query;
  console.log("code = " + code);
  const [device, setDevice] = useState([]);
  const [devices, setDevices] = useState([]);
  useEffect(()=>{

       
    const eventSource = new EventSource('http://35.180.211.234:1111/api/cubeIT/NaviTrack/rest/device/stream/tracking');

    eventSource.onmessage = function(event) {

       
      const data = JSON.parse(event.data);
      console.table(data);
      const latitude = data.latitude;
      const longitude = data.longitude;
      setDevice((prevDevice) => [data, ...prevDevice]);

      console.log(device)
    }
      },[device])

  useEffect(() => {
    if (code) {
      const token = localStorage.getItem("token");
  
      if (!token) {
        return;
      }


  

  
      const socket = new WebSocket("ws://localhost:1024/ws");
      const client = Stomp.over(socket);
  
      client.connect({}, function () {
        client.subscribe( "/topic/device/tracking/" + code, function (message) {
          const devices = JSON.parse(message.body);
          // if (notif.code === "eya123") { // Add this conditional statement
          //   setNotifs((prevNotifs) => [notif, ...prevNotifs]);
          // }
          setDevices((prevDevice) => [devices, ...prevDevice]);
        });
      });
  
      return () => {
        client.disconnect();
      };
    }
  }, [code]);
  


 

  useEffect(() => {
    setCurrentIndex(0);
  }, [device]);
  
  const renderDevice = () => {
    if (device.length === 0) {
      return null;
    }

  
    const currentDevice = device[currentIndex];

    const legendTemplate = (
      <div className="flex align-items-center text-dark ">
          <span className="pi pi-spin pi-spinner mr-2 text-red" style={{ fontSize: '1.5rem' }}></span>
          <span className="font-bold text-lg">Connected...</span>
      </div>
  );
    
    return (
      <div>
          <div className="card  text-center " style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                    <Fieldset style={{ minWidth: '800px' , minHeight:'350px' }} legend={legendTemplate} >

                        <Splitter>
                          <SplitterPanel title={'d'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }} size={50} className="flex align-items-center justify-content-center">
                            <Knob max="210" value={currentDevice.effective_speed} valueColor="red" rangeColor="#708090" valueTemplate={'{value}'} />
                            <p className="m-0 font-bold">
                            &nbsp;&nbsp; Km/H
                            </p>
                          </SplitterPanel>
                          <SplitterPanel style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }} size={50} className="flex align-items-center justify-content-center">
                            <Knob max="9000" value={currentDevice.engine_rpm}  valueColor="red" rangeColor="#708090" valueTemplate={'{value}'} />
                            <p className="m-0 font-bold">
                            &nbsp;&nbsp; RPM
                            </p>
                          </SplitterPanel>
                        </Splitter>
                        
                        <Divider type="solid" />

                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                            <ProgressBar style={{width:'150px'}} color={'red'} value={currentDevice.fuel_level}></ProgressBar>
                            <p className="m-0 font-bold">
                            &nbsp;&nbsp; Fuel Level (%)
                            </p>
                          </div>
                          
                        <Divider type="solid" /> 
                        
                        <Splitter>
                          <SplitterPanel title={'d'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }} size={50} className="flex align-items-center justify-content-center">
                            <Knob max="180" value={currentDevice.engine_temperature} valueColor="gold" rangeColor="#708090" valueTemplate={'{value}'} />
                            <p className="m-0 font-bold">
                            &nbsp;&nbsp; °C
                            </p>
                          </SplitterPanel>
                          <SplitterPanel style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }} size={50} className="flex align-items-center justify-content-center">
                            <Knob max="999999" value={currentDevice.kilometrage}  valueColor="gold" rangeColor="#708090" valueTemplate={'{value}'} />
                            <p className="m-0 font-bold">
                            &nbsp;&nbsp; Kilometres
                            </p>
                          </SplitterPanel>
                        </Splitter>

                    
                      
                        <Divider type="solid" />
                            
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }} className="card flex justify-content-center text-center">
                              <p className="m-0 font-bold" style={{color: 'green'}}>
                                Engine On Time : &nbsp;&nbsp; {currentDevice.engine_on_time}  
                              </p>
                            </div>
                            
                        <Divider type="solid" />
                    </Fieldset>
          </div>
       
       
      </div>
    );
  };
  
  const handleNextDevice = () => {
    if (currentIndex < device.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrevDevice = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h1 className="font-bold text-3xl">
        <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> &nbsp;&nbsp;
          Reeltime Tracking</h1>
        <br></br>
        
      </div>
      <br></br>
     
        
      <Notif />
  
      <div>
        {renderDevice()}
      </div>
  
      <div>
        {/* <button onClick={handlePrevDevice}>Previous</button>
        <button onClick={handleNextDevice}>Next</button> */}
      </div>
    </div>
  );
  
};

export default Tracking;
