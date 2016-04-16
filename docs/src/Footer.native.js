import React, {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  hr: {
    backgroundColor: '#e4e6e7',
    height: 1,
    marginBottom: 30,
    marginTop: 30,
  },
  text: {
    color: '#606c71',
    fontWeight: '700',
  },
});

const Footer = (props) => {
  const {
    maintainerName,
    // maintainerUrl,
    repositoryName,
    // repositoryUrl,
  } = props;

  return (
    <View style={styles.root}>
      <View style={styles.hr} />
      <Text style={styles.text}>
        {repositoryName}
        {' is maintained by '}
        {maintainerName}
      </Text>
    </View>
  );
};

Footer.propTypes = {
  maintainerName: React.PropTypes.string.isRequired,
  maintainerUrl: React.PropTypes.string.isRequired,
  repositoryName: React.PropTypes.string.isRequired,
  repositoryUrl: React.PropTypes.string.isRequired,
};

export default Footer;
