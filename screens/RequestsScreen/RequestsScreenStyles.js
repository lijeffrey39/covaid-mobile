import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    backgroundColor: Colors.white,
  },
  req_container: {
    padding: 0,
    height: "100%",
    backgroundColor: Colors.white,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  no_request: {
    margin: 5,
    padding: 5,
    minWidth: '100%',
    minHeight: '20%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  request_pending: {
    margin: 5,
    padding: 5,
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderTopColor: Colors.red_orange,
  },
  request_active: {
    margin: 5,
    padding: 5,
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderTopColor: Colors.orange2,
  },
  request_completed: {
    margin: 5,
    padding: 5,
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderTopColor: Colors.green,
  },
  dropdown_style: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white, 
    marginLeft: "35%", 
    marginRight: "-450%",
  }
});

const texts = StyleSheet.create({
  request_resource_text: {
    fontSize: 15,
    color: Colors.light_grey_font,
    textAlign: "left",
    padding: '2%',
    paddingBottom: '5%',
  },
  request_name_text: {
    fontSize: 20,
    color: Colors.grey_font,
    textAlign: "left",
    fontWeight: "bold",
    padding: '2%',
    fontFamily: "Montserrat-bold",
  },  
  request_date_text: {
    position: 'absolute', 
    right: '0%',
    top: '10%',
    fontSize: 15,
    color: Colors.light_grey_font,
    textAlign: "right",
    padding: '2%',
    fontWeight: 'normal'
  },
  no_request_text: {
    fontSize: 20,
    color: Colors.grey,
    fontWeight: "bold",
    textAlign: "center",
    padding: '2%',
    paddingBottom: '5%',
  },
});

export { styles, texts };
