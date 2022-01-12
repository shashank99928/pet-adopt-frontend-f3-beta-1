import React,{ useEffect, useState } from "react";
import { fetchPetDetails } from "../../store/slices/AddPetSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import DisplayPetCard from "../../components/common/DisplayPetCard/DisplayPetCard"

function DisplayPetDetails() {
  const navigate = useNavigate();
  const [pet,setPet] = useState({
    petimages:[ 
      {image: '390ddcc22e4c2956e3bcb2003dac6dd2'
  }]})
  const dispatch = useDispatch();

  const callPetDetailPage = async () => {   
    await dispatch(fetchPetDetails())
    .then(data=>{
      console.log(data.payload)
      setPet(data.payload);
      // if(data.status!==200 || !data){
      //   const error = new Error(data.error);
      //   throw error;
      // }
    })
    .catch(err=>{console.log(err);
      navigate('/login')})   
  }

  useEffect(() =>{
    console.log("About page called");
    callPetDetailPage();    
  },[]);

  return (    
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
          {console.log(pet.petimages)}
            { pet && <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={"/images/"+(pet.petimages[0].image)}
              alt=""
            />}
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">{pet.petname}</h1>
            <p></p>
            <p>{pet.about}</p>
            <p>{pet.age}</p>
            <p>{pet.gender}</p>
            <p>{pet.size}</p>
            <p>{pet.seletedPet}</p>
            <p>{pet.adoptionFee}</p>
          </div>
        </div>
      </div>
            <DisplayPetCard
              pet={pet}            
             />
    </div>
  );
}

export default DisplayPetDetails;
