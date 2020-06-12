import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList, StyleSheet, ListItem,
  Button, 
  AsyncStorage,
} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, validateEmail, formatDate } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
//import getDistance from '../../util/distance'
import PendingRequestScreen from "../IndividualRequestScreen/PendingRequestScreen";
import CompletedRequestScreen from "../IndividualRequestScreen/CompletedRequestScreen";
import ActiveRequestScreen from "../IndividualRequestScreen/ActiveRequestScreen";

export default function RequestsScreen({ route, navigation }) {
  const [user, setUser] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]); 
  const [activeRequests, setActiveRequests] = useState([]); 
  const [completedRequests, setCompletedRequests] = useState([]);
  const [currentRequestList, setCurrentRequestList] = useState();
  const [currentRequestType, setCurrentRequestType] = useState(); 
  const [currentItem, setCurrentItem] = useState();  
  const [buttonStyles, setButtonStyles] = useState([buttons.pressed_tab, buttons.tabs, buttons.tabs, texts.button_label, texts.button_label_blue, texts.button_label_blue]);
  const requestTypeList = [volunteer_status.PENDING, volunteer_status.IN_PROGRESS, volunteer_status.COMPLETE]
  let options = [{
    label: 'Requires Action',
    value: 'Requires Action',
  }, {
    value: 'In Progress',
  }, {
    value: 'Completed',
  }];

  
  const fetchUser = async (id) => { 
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
          });
        } else {
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  function generateRequestList(requestData, requestStateChanger, reqStatus) { 
    let tempList = []; 
    console.log(JSON.stringify(requestData))
    for (var i = 0; i < requestData.length; i++) { 
      var element = { 
        key: i, 
        requester_name: requestData[i].personal_info.requester_name, 
        resources: requestData[i].request_info, 
        needed_by: requestData[i].request_info.date + " " + requestData[i].request_info.time, 
        //distance: 0, //getDistance(0, 0, requestData[i].location_info.coordinates[0], requestData[i].location_info.coordinates[1]) + " m", //requestData[i].location_info.coordinates[0] + ", " + requestData[i].location_info.coordinates[1], 
        lat: parseFloat(requestData[i].location_info.coordinates[0]), 
        long: parseFloat(requestData[i].location_info.coordinates[1]), 
        requester_contact_email: requestData[i].personal_info.requester_email,
        requester_contact_phone: requestData[i].personal_info.requester_phone, 
        details: requestData[i].request_info.details, 
        completed_date: requestData[i].status.completed_date || "",
        request_id: requestData[i]._id,  
        languages: requestData[i].personal_info.languages, 
      } // add any relevant information 
      tempList.push(element); 
    }
    //initializes the current request list to "pending". Otherwise the list of requests dont pop up initially
    if (reqStatus == currentRequestType) {
      setCurrentRequestList(tempList)
    }
    requestStateChanger(tempList);  
    return tempList; 
  }

  function fetchRequests(reqStatus, requestStateChanger, token) {
    let params = {'status': reqStatus}; 
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);
    
		fetch_a(token, 'token', url, {
            method: 'get',
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                  setTimeout(function () {
                    generateRequestList(data, requestStateChanger, reqStatus); 
                  }, 750);
                  // generateRequestList(data, requestStateChanger, reqStatus); 
                });
            } else {
                console.log("Error")
            }
    }).catch((e) => {
      console.log(e)
    });     
  }

  function toggleButtonStyles(reqType){
    if (reqType === volunteer_status.PENDING) {
      setButtonStyles([buttons.pressed_tab, buttons.tabs, buttons.tabs, texts.button_label, texts.button_label_blue, texts.button_label_blue]); 
    } else if (reqType === volunteer_status.IN_PROGRESS) {
      setButtonStyles([buttons.tabs, buttons.pressed_tab, buttons.tabs, texts.button_label_blue, texts.button_label, texts.button_label_blue]); 
    } else {
      setButtonStyles([buttons.tabs, buttons.tabs, buttons.pressed_tab, texts.button_label_blue, texts.button_label_blue, texts.button_label]); 
    }
  }  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
        console.log("GETTING USER ID " + data)
        fetchUser(data); 
      });   

      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        console.log("GETTING TOKEN " + data)
        fetchRequests(volunteer_status.PENDING, setPendingRequests, data)
        fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
        fetchRequests(volunteer_status.COMPLETE, setCompletedRequests, data);
      });     
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  if (pendingRequests) {
    console.log(pendingRequests.key)
    return (
        <View style={styles.req_container}>
          <Dropdown
            label=''
            data={options} 
            style={styles.dropdown_style}
            onChangeText={(label, value) =>{
                var reqType = requestTypeList[value];
                if (reqType == volunteer_status.COMPLETE) {
                  setCurrentRequestList(completedRequests);
                } else if (reqType == volunteer_status.IN_PROGRESS) {
                  setCurrentRequestList(activeRequests); 
                } else {
                  setCurrentRequestList(pendingRequests); 
                }
                //setCurrentRequestList(completedRequests); 
                setCurrentRequestType(reqType);
                toggleButtonStyles(reqType); 
              }
            }
          />
        <View style = {styles.center}>
          <Text>Welcome back, {user.first_name}!</Text>   
          </View>
        
          {displayAllRequests(currentRequestList)}
      </View>  
    );
   } 
  else {
    return (
      <Text>Loading...</Text>
    )
  }
  function displayAllRequests(reqList) {
    if (reqList && reqList.length == 0) {
      return (
        <>
          <View style={styles.container}>
            <View style = {styles.center}>
              <View style={styles.no_request}>
                <Text style={texts.no_request_text}>{getEmptyMessage(currentRequestType)}</Text>
              </View>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <FlatList
            data={currentRequestList || pendingRequests}
            contentContainerStyle={styles.center}
            renderItem={({item}) => 
              <TouchableOpacity style={getContainerType(currentRequestType)} onPress={() => { 
                if (currentRequestType == volunteer_status.PENDING) {
                  navigation.navigate("Pending Request", {navigation: route.params, item: item, pendingList: pendingRequests, activeList: activeRequests, volunteer: user}); 
                } else if (currentRequestType == volunteer_status.IN_PROGRESS) {
                  navigation.navigate("Active Request", {navigation: route.params, item: item, activeList: activeRequests, completeList: completedRequests, volunteer: user});
                } else if (currentRequestType == volunteer_status.COMPLETE) {
                  navigation.navigate("Completed Request", {navigation: route.params, item: item});
                }
                setCurrentItem(item); 
              }}>
                {displayRequestInfo(currentRequestType, item)}
              </TouchableOpacity>
            }
            /> 
      );
    }
  }

  function getContainerType(reqType) { // get rid of reqType param
    if (reqType == volunteer_status.ACTIVE) {
      return styles.request_active
    } else if (reqType == volunteer_status.COMPLETE) {
      return styles.request_completed
    } else {
      return styles.request_pending
    }
  }

  function getEmptyMessage(reqType) {
    if (reqType == volunteer_status.IN_PROGRESS) {
      return "No tasks in-progress"; 
    } else if (reqType == volunteer_status.COMPLETE) {
      return "No completed tasks";
    } else {
      return "No tasks requiring action";
    } 
  }

  function displayRequestInfo(reqType, item) {
    return (
      <>
      <View style={{flexDirection:'col'}}>
        <Text style={texts.request_name_text}>{item.requester_name}</Text>
    <Text style={texts.request_date_text}>Due {formatDate(new Date(item.needed_by.split(" ")[0]), "MMM d", true)}</Text>
      </View>
      
      <Text style={texts.request_resource_text}>{item.resources.resource_request.join(", ")}</Text>
      </>
    );
  };
}
