import {writable, get} from 'svelte/store';
import {jwtDecode} from 'jwt-decode';
import {navigate} from 'svelte-routing';

export const page=writable(1);
export const limit=writable(6);
export const totalPages=writable(1);
export const displayedData=writable([]);
export const password=writable('');
export const page_num=writable('');

export const fetchData=async ()=>{
    try{
        const page_num=get(page);
        const limit_val=get(limit);
        const token=localStorage.getItem('jwtToken');
        
        if(!token){
            console.error("No token found, unauthorized accesss");
            return ;
        }
        const response=await fetch (`http://localhost:4000/movies?page=${page_num}&limit=${limit_val}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        
        if(response.ok){
            const data=await response.json();
            console.log('Fetched Data:', data);
            displayedData.set(data.movies);
            totalPages.set(data.totalPages);
        }
        else{
            console.error('Failed to fetch data:', response.status, response.status)
        }

    }
    catch (error){
     console.error('Fetch error:', error);
    }
};