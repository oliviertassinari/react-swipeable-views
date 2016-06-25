import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#155799',
    paddingTop: 50,
    paddingBottom: 35,
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    fontSize: 28,
  },
  description: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    opacity: 0.7,
  },
});

const Head = (props) => {
  const {
    children,
    description,
    name,
  } = props;

  return (
    <View style={styles.root}>
      <Text style={styles.name}>
        {name}
      </Text>
      <Text style={styles.description}>
        {description}
      </Text>
      {children}
    </View>
  );
};

Head.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Head;
