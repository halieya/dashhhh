import React, { useEffect, useState, useRef } from "react";

import { useRouter } from 'next/router';
import { fetchProfile } from './api/profile.js';

import Notif from "../components/Notif";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import { Button } from 'primereact/button';

import VehicleForm from './vehicleForm.jsx';




const Vehicles = () => {

  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);



   //initialisation  field  data  input;
  // const [code , setCode] = useState("");

  // const [matricule, setMatricule] = useState("");


  // const [type, setType] = useState("");
  // const [mark, setMark] = useState("");


  // const [filter, setFilter] = useState("");


  const [vehicule, setVehicule] = useState({
    code: "",
    type: "",
    matricule: "",
    marque:"",
    filter:"",
    id:""

  });


 


  const [updated, setUpdated] = useState(false);



  const togleUpdate =(id)=> {
    setUpdated(!updated);
    localStorage.setItem("vecId",id);
    setVehiId(id);
    getVehiById(id);
  }





const handleChange =(e)=> {
  //  securite xss  js 
  e.preventDefault();
  
  setVehicule({ ...vehicule, [e.target.name]: e.target.value });

  

}



   

   const ajoute= (e) => {

   e.preventDefault();






    




    const token = localStorage.getItem("token");

    console.log(token);

   console.table(vehicule);

      const data = {   

        code: vehicule.code,
        type: vehicule.type    ,
        matricule: vehicule.matricule,
        marque: vehicule.marque,
        filter:"BE987654TN123"
     };


    

     


     

      fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/navit/main/create-vehicle`,{
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

     window.location.reload();


  

 




  //window.location.reload();




   


   } 




   
   const update= (e) => {

    e.preventDefault();
 
 
 
 
 
 
     
 
 
 
 
     const token = localStorage.getItem("token");
 
     console.log(token);
 
    console.table(vehicule);



    console.log(localStorage.getItem("vecId"));
 
       const data = { 
        id : localStorage.getItem("vecId"),  
 
         code: vehicule.code,
         type: vehicule.type    ,
         matricule: vehicule.matricule,
         marque: vehicule.marque,
         filter:"BE987654TN123"
      };
 
 
     
 
      
 
 
      
 
       fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/update-one`,{
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
 
 
 
 
   
 
    
 
 
 
 
   //window.location.reload();
 
 
 
 
    
 
 
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





   const     deleteById=async (id)  =>{
    const token = localStorage.getItem("token");

     if(token) {

      const  yesorno = window.confirm("want to delete");

      if(yesorno =='YES'){
        console.log(yesorno);
      }

      const res_ =await  fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/delete-one/${id}`,{
        method:'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

    const  _ui  = res_.json();



    console.log(_ui);

    console.log("delete");
    

     }

   }

   const [vehiId, setVehiId] = useState("");


  console.log(updated);


 const  getVehiById=(id)=>{


    

    const token = localStorage.getItem("token");
         fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/vehicle/get-one/by-id/by-filter/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(res=>res.json())
        .then(res=>{
          console.table(res);
          setVehicule(res);
        })
       
        
      }
//INITIALISATION DE donne 
  useEffect(() => {
    const fetchVehicles = async () => {
      if (profile) {
        
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/vehicles/get-all/by-filter/${profile.filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setVehiclesList(data);
        setLoading(false);
        
      }
    };
    fetchVehicles().catch((err) => console.log(err));

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedVehicle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [profile]);



  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };


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

 
  
  if (!profile) {
    return <div>Loading...</div>;
  }



  return (
   
    <> 
      <div className='bg-gray-100 min-h-screen'>
          <div className='flex justify-between px-4 pt-4'>
              <h1 className="font-bold text-3xl">List of Vehicles</h1>



              <div className="card flex justify-content-center">


<VehicleForm  handleChange={handleChange} vehicule={vehicule} handleupdate={update} handleSubmit  ={ajoute} updated={updated} id={localStorage.getItem("vecId")} />

</div>




          </div>
          <br></br>
          <Notif />
    
 
          
          <div className="card">
            <DataTable value={vehiclesList} paginator sortField="code" sortOrder={-1}  rows={15} rowsPerPageOptions={[5, 10, 25, 50,100]} tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters}  loading={loading}
            globalFilterFields={['code', 'matricule','marque','type']} header={header} emptyMessage="ELEMENT NOT FOUND.">
                <Column field="code" header="Code" sortable  style={{ width: '25%' }}></Column>
                <Column field="matricule" header="Matricule" sortable  style={{ width: '25%' }}></Column>
                <Column field="marque" header="Marque" sortable  style={{ width: '25%' }}></Column>
                <Column field="type" header="Type" sortable  style={{ width: '25%' }}></Column>

                <Column
                  field="action"
                  header="action"
                  sortable
                  style={{ width: '30%' , textAlign:'justify' }}
                  body={(rowData) => (
                    <>
                    <span>
                    <Button
                      severity="del"
                      label="del"
                      onClick={() => deleteById(rowData.id)}
                      color="red"
                    />
                     <Button
                      severity="edit"
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
    </>
  
  );
};

export default Vehicles;
