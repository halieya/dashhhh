import React, { useEffect, useState } from "react";

import { useRouter } from 'next/router';
import { fetchProfile } from './api/profile.js';

import Notif from "../components/Notif";

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const Notifs = () => {

    const router = useRouter();

    const [notifsList, setNotifsList] = useState([]);
    const [profile, setProfile] = useState(null);
    
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
          fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cubeit/api/notifs/get-all/by-filter/${profile.filter}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => setNotifsList(data), setLoading(false))
            .catch((err) => console.log(err));
        }
          
        
          return () => {
            setNotifsList([]);
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

      function renderNotificationCell(rowData) {
        return (
          <div className="card">
            <Card title={rowData.title}   subTitle={new Date(rowData.timestamp).toLocaleString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
                })}
            >

              <p className="font-bold m-0 ">{rowData.desc}</p>
            </Card>
          </div>
        );
      }

    return (

        <div className='bg-gray-100 min-h-screen' >
            <div className='flex justify-between px-4 pt-4'>
                <h1 className="font-bold text-3xl">Notifications</h1>
            </div>
            <br></br>
            <Notif />

            <DataTable value={notifsList} paginator  rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
             dataKey="id" filters={filters}  loading={loading}
             globalFilterFields={['title', 'desc','timestamp']} header={header} emptyMessage="ELEMENT NOT FOUND.">
            
            
            <Column field="body" header="INFO" body={renderNotificationCell} />

            </DataTable>
            <br></br>    
        </div>
    )
}
export default Notifs;