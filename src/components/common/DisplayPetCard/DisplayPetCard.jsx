import React from "react";
import styles from "./DisplayPetCard.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from "../../../store/slices/AddPetSlice";
import { petInDetail } from "../../../store/slices/PetInDetailSlice";
import {useNavigate} from 'react-router-dom'
import { Card } from "react-bootstrap";


// import {loggedInUser} from "../../../store/slices/LoggedInUserDataSlice"

function DisplayPetCard({userId, _id,about,petname,petimages=[{image:''}],requests=[],selectedPet,adoptionFee,gender}) {
  console.log(requests);
  const state = useSelector(state=>state.loggedInUserDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePetClick = async () => {
    window.alert("PetClicked "+_id);
    dispatch(petInDetail(_id))
    .then(data =>navigate("/petindetail"))
  }

  const handleSendRequest = async () => {
    window.alert("PetClicked "+_id);
    dispatch(sendRequest({_id,userId}))
    .then(data => {
      console.log(data)
      navigate("/petindetail")
      })
    .catch(err => console.log(err));
  }

  function userExists(uid) {
    return requests.some(function(el) {
      return el.userId === uid;
    }); 
  }

  const RequestButton = () => {
    if(userId===state[0]._id){
      return <span onClick={handlePetClick} >{requests.length} Request{requests.length>1 ? "s" : null}</span>
    }
    else if(userExists(userId)){
      return <span>Request Sent</span>
    }
    else{
      return <span onClick={handleSendRequest}>Send Request</span>      
    }
  }

  const aboutTrim = about.slice(0,70)+"..."
  return (
    <Card key={_id} className={styles.wrapper}>
      <div className={styles.card_wrapper}>
        <div style={{ display: "flex" }}>
          <div onClick={handlePetClick} className={styles.card_image}>
            <img
              className={styles.card_image}
              src={"/images/"+petimages[0].image}
              alt="pet"
            />
          </div>
          <div className={styles.card_details}>
            <div className={styles.card_title}>
              <span className={styles.card_title_name}>{petname}</span>
              <span className={styles.card_title_breed}>{selectedPet}</span>
              <span className={styles.card_title_gender}>{gender}</span>
            </div>
            <div className={styles.card_paragraph}>
              <p>
                {aboutTrim}
              </p>
            </div>
            <div className={styles.card_footer}>
              <span className={styles.card_footer_amount}>{adoptionFee}</span>
              <span className={styles.card_footer_send_request}>
                <RequestButton />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DisplayPetCard;
