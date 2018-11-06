import { Colors } from "react-native-paper";
import { StyleSheet } from 'react-native';

export const styles = {
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  slideContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  } as any,
  slide: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
  } as any,
  slide1: {
    backgroundColor: Colors.yellow700,
  },
  slide2: {
    backgroundColor: Colors.green700,
  },
  slide3: {
    backgroundColor: Colors.blue700,
  },
  text: {
    color: Colors.white,
    textAlign: "center",
  } as any,
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  } as any,
  nav: {
    justifyContent: "space-between"
  } as any,
};

export default StyleSheet.create(styles);