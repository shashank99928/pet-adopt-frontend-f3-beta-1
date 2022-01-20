import React,{ useEffect, useState } from "react";
import { fetchPetDetails } from "../../store/slices/MyPetsSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import DisplayPetCard from "../../components/common/DisplayPetCard/DisplayPetCard"
import { useSelector } from 'react-redux';

function DisplayPetDetails() {
  const navigate = useNavigate();
  const [pets,setPets] = useState([])
  const dispatch = useDispatch();
  const state = useSelector(state=>state.loggedInUserDetails);

  const callPetDetailPage = async () => {   
    await dispatch(fetchPetDetails(state[0]._id))
    .then(data=>{
      console.log(data.payload)
      setPets(data.payload);
    })
    .catch(err=>{console.log(err);
      navigate('/login')})   
  }

  useEffect(() =>{
    callPetDetailPage();
    // eslint-disable-next-line
  },[]);

  return (
    <div>
      {pets.map(pet =>{ return <DisplayPetCard
      {...pet}
      />})}  
    </div>
  );
}

export default DisplayPetDetails;
