import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { fetchProfile } from './api/profile.js';

import Notif from "../components/Notif";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import MissionForm  from "./MissionForms.jsx";
import Modal from "./modal.jsx";
const Missions = () => {
 
  const router = useRouter();













  
  const     deleteById=async (id)  =>{
    const token = localStorage.getItem("token");

    console.log(id);

      const  yesorno = window.confirm("want to delete");

      if(yesorno =='YES'){
        console.log(yesorno);
      }

      const res_ =await  fetch( `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/miss/delete-one/${id}`,{
        method:'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

    const  _ui  = res_.json();



    console.log(_ui);

    console.log("delete");
    

     }

   

  const [missionsList, setMissionsList] = useState([]);
  const [profile, setProfile] = useState(null);


  const [vehicules, setVehicules] = useState([]);

  const [chauffids  , setChauffeursId] = useState([]);


  const [convs, setConvoyeurs] = useState([]);



  const [missId, setMissionId] =useState("");



  const [selectedId, setSelectedId] = useState('');
  const [selectedId2, setSelectedId1] = useState('');
  const [selectedId3, setSelectedId2] = useState('');

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };


  const handleSelectChange1 = (event) => {
    setSelectedId1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setSelectedId2(event.target.value);
  };








  const handleChange =(e)=> {
    //  securite xss  js 
    e.preventDefault();
    
    setMssion({ ...mission, [e.target.name]: e.target.value });
  
    
  
  }


   



  const handleupdate= (e) => {

    e.preventDefault();
 
 
 
 
 
 
     
 
 
 
 
     const token = localStorage.getItem("token");
 
     console.log(token);
 
    console.table(mission);
 
       const data = {   
 
         code: mission.code,
     cargo: mission.cargo,
     weight:mission.weight,
     filter: "BE987654TN123",
     id:mission.id,
     status:mission.status
    
    
   
      };
 
 
     
 
      
 
 
      
 
       fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/miss/update-mission-with-DBREF?id_vehicle=${mission.veh_id}&id_ch=${mission.chauf_id}&id_conv=${mission.conv_id}`,{
       method:"PUT",
        body: JSON.stringify(data),
        
       
        headers: {
          Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
           
          
        },
 
      })
      
      .then(res=>res.json())
      .then(res=>{
       console.log(res);
 
 
      
      })
 
    //  window.location.reload();
 
 
   
 
  
 
 
 
 
   //window.location.reload();
 
 
 
 
    
 
 
    } 







  const ajoute= (e) => {

    e.preventDefault();
 
 
 
 
 
 
     
 
 
 
 
     const token = localStorage.getItem("token");
 
     console.log(token);
 
    console.table(mission);
 
       const data = {   
 
         code: mission.code,
     cargo: mission.cargo,
     weight:mission.weight,
     filter: "BE987654TN123",
     status:mission.status
    
    
   
      };
 
 
     
 
      
 
 
      
 
       fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/miss/create-mission-with-DBREF?id_vehicle=${mission.veh_id}&id_ch=${mission.chauf_id}&id_conv=${mission.conv_id}`,{
       method:"POST",
        body: JSON.stringify(data),
        
       
        headers: {
          Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
           
          
        },
 
      })
      
      .then(res=>res.json())
      .then(res=>{
       console.log(res);
 
 
      
      })
 
    //  window.location.reload();
 
 
   
 
  
 
 
 
 
   //window.location.reload();
 
 
 
 
    
 
 
    } 


    
    const  getMission=(id)=>{


    

      const token = localStorage.getItem("token");
           fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/miss/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then(res=>res.json())
          .then(res=>{
            console.table(res);
            setMssion(res);
          })
         
          
        }



  useEffect(()=>{

    const token = localStorage.getItem("token");

    console.log(token);
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/conv/allId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setConvoyeurs(data))
      .catch((err) => console.log(err));



  },[])

  useEffect(()=>{
    const token = localStorage.getItem("token");

    console.log(token);

    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/chau/allId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {console.log(data); setChauffeursId(data)})
      .catch((err) => console.log(err));



  },[])

  useEffect(()=>{

    const token = localStorage.getItem("token");

    console.log(token);
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/vehi/allId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVehicules(data))
      .catch((err) => console.log(err));



  },[])




	




  const [mission, setMssion] = useState({
    cargo: "",
    status:"",
    code: "",
    weight: 0,
    filter:"",
    veh_id:"",
    chauf_id:"",
    conv_id:"",

   
    id:"",
  

  });


  const [updated, setUpdated] = useState(false);
  const [showmodal, showModal] =useState(false);

  const update= (e) => {

e.preventDefault();


  }
  const togleUpdate =(id)=> {
    setUpdated(!updated);
    console.log(id);
    localStorage.setItem("messId",id);
    setMissionId(id);
    console.log(missId);
    getMission(localStorage.getItem("messId"));
    showModal(!showmodal);

  }

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
 
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };



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
    if (profile) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/missions/get-all/by-filter/${profile.filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setMissionsList(data), setLoading(false))
        .catch((err) => console.log(err));
    }
      
    
      return () => {
        setMissionsList([]);
      };
   
  }, [profile]);
  
  const renderHeader = () => {
    return (
        <div className="flex justify-content-end" style={{display: 'flex', justifyContent: 'right', alignItems: 'right'  }}>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );
  };
  const header = renderHeader();

  
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between px-4 pt-4'>
          <h1 className="font-bold text-3xl">List of Missions</h1>
      </div>
      <br></br>
      <Notif />

      <div className="card flex justify-content-center">


<MissionForm togle={showModal}   selectedId={selectedId}  selectedId1={selectedId2} selectedId2={selectedId3} idschauff={chauffids} idconv={convs} vehic={vehicules}  handleChange={handleChange} mission={mission} handleupdate={handleupdate} handleSubmit  ={ajoute} updated={updated} id={missId} />

</div>
    
      <div className="card">
        <Notif />
        <DataTable value={missionsList} paginator sortField="dateDep" sortOrder={-1}  rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '20rem' }}
        dataKey="id" filters={filters}  loading={loading}
        globalFilterFields={['dateDep', 'dateAr','cargo','weight','status','vehicle.matricule','chauffeur.fullname','convoyeur.fullname']} header={header} emptyMessage="ELEMENT NOT FOUND.">
        
        {/* <Column field="filter" header="filter" sortable  style={{ width: '25%' }}></Column> */}
        <Column field="dateDep" header="Date Dep" sortable style={{ width: '10%' }} body={(rowData) => new Date(rowData.dateDep).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        })}> 
        </Column>
        <Column
          field="dateAr"
          header="Date Ar"
          sortable
          style={{ width: '10%' }}
          body={(rowData) =>
            rowData.dateAr ? (
              new Date(rowData.dateAr).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
                })
            ) : (
              <span style={{ color: 'red' }}>Not available</span>
            )
          }
        />
        <Column
          field="status"
          header="Status"
          sortable
          style={{ width: '10%' }}
          body={(rowData) =>
            rowData.status === "INPROGRESS" ? (
              <Button severity="info" raised
                label={rowData.status + ' (Tracking)'}
                onClick={() => router.push(`/tracking/${rowData.vehicle.code}`)}
              />
            ) : (
              <Button severity="secondary" disabled
                label={rowData.status}
                onClick={() => router.push(`/tracking/${rowData.vehicle.code}`)}
              />
            )
          }
        />



    
        <Column field="cargo" header="Cargo" sortable  style={{ width: '10%' }}></Column>  
        <Column field="weight" header="Weight" sortable  style={{ width: '10%' }}></Column>  
        <Column field="chauffeur.fullname" header="Chauffeur" sortable  style={{ width: '10%' }}></Column>  
        <Column field="convoyeur.fullname" header="Convoyeur" sortable  style={{ width: '10%' }}></Column>  
        <Column field="vehicle.matricule" header="Vehicle" sortable  style={{ width: '10%' }}></Column>
        
    







        <Column
          field="status"
          header="INFO"
          sortable
          style={{ width: '12%' }}
          body={(rowData) =>
            rowData.status === "FINISHED" ? (
              <Button severity="info" raised
                label={'Details'}
                onClick={() => router.push(`/mission/${rowData.id}`)}
              />
            ) : (
              <Button severity="secondary" disabled
                label={'NOT AVAILABLE'}
                onClick={() => router.push(`/mission/${rowData.id}`)}
              />


              
            )
          }
        />



<Column
                  field="action"
                  header="action"
                  sortable
                  style={{ width: '30%' , textAlign:'justify' }}
                  body={(rowData) => (
                    <>
                    <span>
                    <Button
                      severity="del "
                      label="del"
                      onClick={() => deleteById(rowData.id)}
                      color="red"
                    />
                     <Button
                      severity="edit "
                      label="edit"
                      onClick={() =>   togleUpdate(rowData.id)}
                      color="blue"
                    />
                    </span>
                    
                    </>

                  )}
                />

        </DataTable>
        <div className="card flex justify-content-center">
        
        </div>
      </div>

    </div>
  );
};

export default Missions;
