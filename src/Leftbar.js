import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import TagIcon from '@mui/icons-material/Tag';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { Button } from '@mui/material';
export const Leftbar = (props) => {
  const [user,setUser]=useState([])
  const qr = query(collection(db, props.roomid));
  useEffect(
    () => {
        onSnapshot(qr, (snapshot) => setUser(snapshot.docs.map((doc) => doc.data().name)))
    }
    , []);
    //#F2F3F5
  return (
    <div style={{ backgroundColor: '#F2F3F5', width: '272px', borderRight: '2px solid rgb(234, 234, 234)' }}>
      <div className="roomdetails" style={{ height: '48.75px', borderBottom: '2px solid rgb(234, 234, 234)', display: 'flex', alignItems: 'center', position: 'relative', backgroundColor: 'rgb(237 236 236)' }}>
        <ChatIcon color="action" style={{ marginLeft: '27px', width: '22px' }}></ChatIcon>
        <h4 style={{ marginLeft: '5px', fontSize: '14.85px', marginTop: '-4px', color: 'rgb(44, 44, 44)' }}>Chatzoid</h4>
      </div>
      <div className="roomidandstuff" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 29px', marginTop: '29px' }}>
        <h5 style={{ color: '#747F8D',fontSize:'14px' }}>Room id</h5>
      </div>
      <div className="rommspecificidandp" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '22px' }}>
        <TagIcon style={{ marginLeft: '27px', width: '19px' }} color="action"></TagIcon>
        <p style={{ color: 'rgb(44, 44, 44)', fontSize: '14.5px', fontWeight: '600', marginLeft: '4px', marginRight: '26px' }}>{props.roomid}</p>

      </div>
      
      <div className="sepater" style={{ marginTop: '29px',overflowY:'scroll',height:'399px'}}>
        {
         Array.from(new Set(user)).map((item) => {
            return (
              <div className="people" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '9px', marginBottom: '18px' }}>
                <img style={{ width: '40px', borderRadius: '100%', marginLeft: '22px' }} src={`https://avatars.dicebear.com/api/male/${item}.svg?&skin=light&mouth=smile`} alt="" />
                <p style={{ color: 'rgb(44, 44, 44)', fontSize: '14.5px', fontWeight: '600', marginLeft: '12px' }}>{item.split(' ')[0]+" "+item.split(' ')[1]}</p>
              </div>)
          })
        }
      </div>
      <div className="switchroom" style={{width:'245px',position:'absolute',bottom:'55px',display:'flex',justifyContent:'center'}}>
      <Button onClick={()=>{props.switchroom()}} size="small" sx={{fontWeight:'500'}}>
          switch room
        </Button>
      </div>
      <div className="userdetails" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: '0px', height: '52px', backgroundColor: 'rgb(237 236 236)', borderTop: '2px solid rgb(234, 234, 234)', width: '100%' }}>
        <img src={props.photo} style={{ width: '35px', borderRadius: '100%', marginLeft: '24px' }} alt="" />
        <h5 style={{ marginLeft: '12px', color: 'rgb(44, 44, 44)' }}>{props.name.split(' ')[0]}</h5>
        <button onClick={()=>{props.logout();}} style={{cursor:'pointer',width:'fit-content', marginLeft: '59px',outline:'none',border:'none',backgroundColor:'transparent',position:'absolute',left:'139px' }}><LogoutIcon color="action" style={{ width: '20px'}}></LogoutIcon></button>
      </div>
    </div>
  )
}
