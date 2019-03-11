import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking } from 'react-native';
import { Image, Card, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchPTA } from '../actions';

const LogoURL = "https://ballantynepta.weebly.com/uploads/8/8/2/6/88262164/dabears_6.png"

class PTAScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          title="Volunteer"
          onPress={() => navigation.navigate('Volunteer')}
          type="clear"
        />
      )
    }
  }

  componentDidMount() {
    this.props.fetchPTA();
  }

  renderCards = () => {
    if(this.props.pta) {
      return this.props.pta.map((member, i) => {
        return (
          <View key={i} style={styles.cardView}>
            <Card
              title={member.title}
            >
              <View style={styles.cardView}>
                <Image
                  source={{ uri: member.imageURL}}
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.cardView}>
                <Text style={styles.cardText}>{member.name}</Text>
              </View>
              <View style={styles.cardView}>
                {member.title === "President" ? null : this.renderCommittees(member)}
                <Button
                  title="Email"
                  onPress={() => this.emailMember(member.email)}
                  buttonStyle={styles.buttonStyle}
                />
              </View>
            </Card>
          </View>
        );
      });
    }
  }

  renderCommittees = (member) => {
    if (member.committees.first === "") {
      return null;
    }
    return (
      <View>
        <Divider style={styles.dividerStyle}/>
        <Text style={styles.cardText}>Committees: </Text>
        {member.committees.map((committee, i) => {
          return <Text key={i} style={styles.committeeText}>{committee}</Text>;
          })
        }
      </View>
    )
  }

  emailMember = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 15}}>
        {this.renderCards()}
      </ScrollView>
    );
  }
}

const styles = {
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  cardView: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center'
  },
  committeeText: {
    justifyContent: 'center',
    fontSize: 15,
    textAlign: 'center'
  },
  dividerStyle: {
    marginBottom: 5
  },
  buttonStyle: {
    marginTop: 5
  },
  imageStyle: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 5
  }
};

const mapStateToProps = (state) => {
  return { pta: state.pta }
}

export default connect(mapStateToProps, { fetchPTA })(PTAScreen);
