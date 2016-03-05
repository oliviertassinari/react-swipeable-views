import React, {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

const margin = 35;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#155799',
    paddingTop: margin + (Platform.OS === 'ios' ? 10 : 0),
    paddingBottom: margin,
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
  children: React.PropTypes.node,
  description: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default Head;
