import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';

import { fetchEvents } from '../actions';

class CalendarScreen extends Component {
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
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
           // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
      </View>
    );
  }

    loadEvents = (month) =>  {

    }

    renderEvent = (event) => {
      return (
        <View style={[styles.event, {height: event.height}]}>
          <Text style={styles.eventText}>
            {event.name}
          </Text>
          <Text style={styles.eventText}>
            {event.time}
          </Text>
        </View>
      );
    }

    renderEmptyDate = () => {
      return (
        <View style={styles.emptyDate}></View>
      );
    }

    rowHasChanged = (r1, r2) => {
      return r1.name !== r2.name;
    }

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
    }
  });

  const mapStateToProps = (state) => {
    return (
        { events: state.events }
    );
  };

export default connect(mapStateToProps, { fetchEvents })(CalendarScreen);
