import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { fetchProfile } from './api/profile.js';

import Notif from "../components/Notif";
import ChaffeurForm from './ChaffeurForm.jsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const Chauffeurs = () => {

  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [ChauffeursList, setChauffeursList] = useState([]);





  const [chauffeur, setChauffeur] = useState({
    fullname: "",
    cin: "",
    email: "",
    tele:"",
    permis:"",
    id:"",
    filter:"",

  });


 


  const [updated, setUpdated] = useState(false);

  const [chaufId, setChauffeurId] = useState("");

  const [selectedId, setSelectedId] = useState('');

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };



  console.log(updated);


 const  getChaufById=(id)=>{


    

    const token = localStorage.getItem("token");
         fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/choff/get-one/by-id/by-filter/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(res=>res.json())
        .then(res=>{
          setChauffeur(res);
        })
       
        
      }

  


  const togleUpdate =(id)=> {
    setUpdated(!updated);
    localStorage.setItem("chauId",id);

    setChauffeurId(id);
    getChaufById(id);


  }





const handleChange =(e)=> {
  //  securite xss  js 
  e.preventDefault();
  setChauffeur({ ...chauffeur, [e.target.name]: e.target.value });

  

}



   

   const ajoute= (e) => {

   e.preventDefault();






    




    const token = localStorage.getItem("token");

    console.log(token);

   console.table(chauffeur);

      const data = {   

        fullname: chauffeur.fullname,
    cin: chauffeur.cin,
    filter:"BE987654TN123",
    email: chauffeur.email,
    tele:chauffeur.tele,
    permis:chauffeur.permis,
    fonction:selectedId
   
  
     };


    

     


     

      fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/create-chauffeur`,{
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


   const     deleteById=async (id)  =>{
    const token = localStorage.getItem("token");

     if(token) {

      const  yesorno = window.confirm("want to delete");

      if(yesorno =='YES'){
        console.log(yesorno);
      }

      const res_ =await  fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/chauuff/delete-one/${id}`,{
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



   
   const update= (e) => {

    e.preventDefault();
 
 
 
 
 
 
     
 
 
 
 
     const token = localStorage.getItem("token");
 
     console.log(token);
 
    console.table(chauffeur);



    console.log(localStorage.getItem("chauId"));
 
       const data = { 
        id : localStorage.getItem("chauId"),  
 
        fullname: chauffeur.fullname,
    cin: chauffeur.cin,
    filter:"BE987654TN123",
    email: chauffeur.email,
    tele:chauffeur.tele,
    permis:chauffeur.permis,
    fonction:selectedId
      };
 
 
     
 
      
 
 
      
 
       fetch( ` ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/choff/update-one`,{
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
  
  useEffect(() => {
   
    const fetchChauffeurs = async () => {
      if (profile) {
        
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/chauffeurs/get-all/by-filter/${profile.filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setChauffeursList(data);
        setLoading(false);
        
      }
    };
    fetchChauffeurs().catch((err) => console.log(err));
  
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
              <h1 className="font-bold text-3xl">List of Drivers</h1>
          </div>
          <br></br>
          <Notif />

          <div className="card flex justify-content-center">

{/* {
   typeof window === "undefined" ? <ChaffeurForm  handleChange={handleChange} chauffeur={chauffeur} handleupdate={update} handleSubmit  ={ajoute} updated={updated} />

  :<ChaffeurForm  handleChange={handleChange} chauffeur={chauffeur} handleupdate={update} handleSubmit  ={ajoute} updated={updated} id={localStorage.getItem("chauId")} />
 
} */}


<ChaffeurForm handleSelectChange={handleSelectChange} selectedId={selectedId}  handleChange={handleChange} chauffeur={chauffeur} handleupdate={update} handleSubmit  ={ajoute} updated={updated} id={chaufId} />
 

</div>
        
          <div className="card">
            <DataTable value={ChauffeursList} paginator sortField="fonction" sortOrder={1}  rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters}  loading={loading}
            globalFilterFields={['fullname', 'email', 'cin', 'permis', 'tele','fonction']} header={header} emptyMessage="ELEMENT NOT FOUND.">
                <Column field="fullname" header="Fullname" sortable  style={{ width: '14%' }}></Column>
                <Column field="email" header="@Email" sortable  style={{ width: '14%' }}></Column>
                <Column field="cin" header="CIN" sortable  style={{ width: '14%' }}></Column>
                <Column field="permis" header="N° Permis" sortable  style={{ width: '14%' }}></Column>
                <Column field="tele" header="N° Télé" sortable  style={{ width: '14%' }}></Column>
                <Column field="fonction" header="Fontion" sortable  style={{ width: '14%' }}></Column>
                <Column
                  field="fullname"
                  header="INFO"
                  sortable
                  style={{ width: '15%' }}
                  body={(rowData) => (
                    <Button
                      severity="info"
                      label="Details"
                      onClick={() => router.push(`/chauffeur/${rowData.id}`)}
                    />
                  )}
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
  );
};

export default Chauffeurs;
