import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  modal_background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  completed_modal_view: {
    backgroundColor: Colors.white,
    minWidth: '100%',
    padding: '10%',
    paddingTop: '0%', 
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: Colors.green,
    borderWidth: 3,
  },
  rejected_modal_view: {
    backgroundColor: Colors.white,
    minWidth: '100%',
    padding: '10%',
    paddingTop: '5%',
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: Colors.light_grey_font,
    borderWidth: 3,
  },
  accepted_modal_view: {
    backgroundColor: Colors.white,
    minWidth: '100%',
    padding: '10%',
    paddingTop: '5%',
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: Colors.blue,
    borderWidth: 3,
  },
  pending_modal_view: {
    backgroundColor: Colors.white,
    minWidth: '100%',
    padding: '10%',
    paddingTop: '0%', 
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: Colors.red,
    borderWidth: 3,
  },
  active_modal_view: {
    backgroundColor: Colors.white,
    minWidth: '100%',
    padding: '10%',
    paddingTop: '0%', 
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: Colors.orange,
    borderWidth: 3,
  },
  done_req_modal_view: {
    backgroundColor: Colors.white,
    minWidth: '100%',
    padding: '10%',
    paddingTop: '5%', 
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: Colors.green,
    borderWidth: 3,
  },
  header_container: {
    minWidth: '100%',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderBottomColor: Colors.grey,
    textAlign: 'left',
  }, 
  info_container: {
    minWidth: '100%',
    textAlign: 'left',
  }, 
  complete_date_container: {
    minWidth: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderTopColor: Colors.grey,
    margin: '5%',
  },
  confirm_modal_view: {
    margin: '7%',
    paddingTop: '0%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderColor: Colors.blue, 
    borderWidth: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    top: "20%",
  },
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
  },
  resource_list: {
    margin: '5%', 
    maxHeight: '10%',
    position: 'absolute',
  },
  resource_badge: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    margin: '1%',
    justifyContent: "center",
    alignItems: "center",
  },
  list_style: {
    minWidth: '9%',
    maxHeight: '12%',
    maxWidth: '100%',
    marginBottom: '2%', 
  }, 
  input: {
    borderBottomColor: Colors.grey,
    borderWidth: 1, 
    borderColor: Colors.white,
    minWidth: '100%',
  },
});

const buttons = StyleSheet.create({
  accept: {
    width: '105%',
    height: '10%',
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  reject: {
    marginTop: '3%',
    width: '105%',
    height: '10%',
    borderColor: Colors.red,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10, 
  },
  back: {
    width: '105%',
    height: '40%',
    backgroundColor: Colors.white,
    borderWidth: 2, 
    borderColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  confirm: {
    minWidth: '105%', 
    height: '50%',
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    //top: '0%',
    left: '50%',
    bottom: '-50%',
  }
});

const texts = StyleSheet.create({
  individual_req_header: {
    fontFamily: 'Montserrat-bold',
    color: Colors.gray1,
    fontSize: 24, 
    marginBottom: '2%',
  },
  info_header: {
    fontFamily: 'Inter-bold',
    color: Colors.black,
    fontSize: 16, 
    marginTop: '3%'
  },
  details_header: {
    fontFamily: 'Inter',
    color: Colors.grey_font,
    fontSize: 16, 
    fontWeight: 'bold'
  },
  request_details: {
    fontFamily: 'Inter',
    color: Colors.light_grey_font,
    fontSize: 16, 
  },
  completion_date: {
    fontFamily: 'Inter',
    color: Colors.light_grey_font,
    textAlign: 'center',
    fontSize: 14, 
  },
  button_label_red: {
    fontSize: 15,
    color: "red",
  },
  button_label_white: {
    fontSize: 15,
    color: Colors.white,
  },
  button_label_blue: {
    fontSize: 15,
    color: Colors.blue,
  },
  confirm_text: {
    fontSize: 15, 
    color: Colors.grey_font,
  },
  resource_text: { // Fix font 
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.white,
    paddingBottom: '2%',
    margin: '2%', 
    fontSize: 13, 
  },
});

export { styles, buttons, texts };
