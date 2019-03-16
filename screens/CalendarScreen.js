import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Icon, Button } from 'react-native-elements';

import { fetchEvents } from '../actions';

class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          title="More Info"
          titleStyle={styles.topBarButtonTitle}
          onPress={() => navigation.navigate('MoreInfo')}
          type="clear"
        />
      )
    }
  }

  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    return (
      <View style={styles.container}>
        <Agenda
          items={this.props.events}
          // loadItemsForMonth={this.loadEvents}
          renderItem={this.renderEvent}
          renderEmptyData={this.renderEmptyData}
          rowHasChanged={this.rowHasChanged}
           // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
      </View>
    );
  }

    loadEvents = (day) =>  {

    }

    renderEvent = (event) => {
      return (
        <TouchableOpacity
          style={[styles.event, {height: event.height}]}
          onPress={() => event.link ? Linking.openURL(event.link) : null}
        >
          <Text style={styles.eventText}>
            {event.name}
          </Text>
          <Text style={styles.eventText}>
            {event.time}
          </Text>
        </TouchableOpacity>
      );
    }

    renderEmptyData = () => {
      return (
        <View style={styles.emptyDate}></View>
      );
    }

    rowHasChanged = (r1, r2) => {
      return r1.name !== r2.name;
    }

  //   timeToString = (time) => {
  //   const date = new Date(time);
  //   return date.toISOString().split('T')[0];
  // }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 35
    },
    event: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    eventText: {
      fontSize: 20
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
    topBarButtonTitle: {
      color: "#09337B",
      fontSize: 20,
      fontWeight: 'bold'
    }
  });

  const mapStateToProps = (state) => {
    return (
        { events: state.events }
    );
  };

export default connect(mapStateToProps, { fetchEvents })(CalendarScreen);
