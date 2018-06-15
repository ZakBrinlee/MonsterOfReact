import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

/*
Tutorial: https://reactnativecode.com/flatlist-using-json-parsing-data/
*/

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Monster of React!',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Click to see Seattle Traffic Cameras
        </Text>
        <Button
          onPress= { () => navigate("Cameras") }
          title="Traffic Cameras"
          />
      </View>
    );
  }
}


class CameraScreen extends Component {

  static navigationOptions = {
    title: 'Cameras',
  };

  constructor(props)
  {
 
    super(props);
    this.state = { 
    isLoading: true
    }
  }

ccomponentDidMount() {
    
  return fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.Features
      })
    })
    .catch((error) => {
      console.error(error);
    });
}
  //This will read the camera type and attach the correct start of the url
  cameraType(camera) 
  {
      if(camera.Type == 'sdot'){
            return  "http://www.seattle.gov/trafficcams/images/" + camera.ImageUrl;
      }else{
            return "http://images.wsdot.wa.gov/nw/" + camera.ImageUrl;
      }
  }

  render() 
  {
    const { navigate } = this.props.navigation;
   
    return (
      <View style={styles.container}>
          <FlatList
          data = { this.state.dataSource }
          keyExtractor={(item, index) => index}
          renderItem={({item}) => 
          <View style={styles.repeaterBox}>
            <Text style={styles.title}>
                {`${item.Cameras[0].Description}`}
              </Text>
             <Image
                //use cameraType to get full correct url
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                />
            </View>
          }
          
          />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  repeaterBox: {
    marginTop: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 5,
  },
});

export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}

const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Cameras: { screen: CameraScreen },
});

