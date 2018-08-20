
import React from "react";
import { AsyncStorage, Button, StyleSheet, View, StatusBar, Animated, ScrollView, CameraRoll, Image, Dimensions, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import ImageOverlay from "react-native-image-overlay";
// import Gallery from "react-photo-gallery";

const xOffset = new Animated.Value(0);

const transitionAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class PhotoVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      touched: false
    };
  }

  onTouch = () => {
    this.setState({ touched: true })
  }

  offTouch = () => {
    this.setState({ touched: false })
  }
  
  photoGet = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
       console.log('No Images Found ', err)
    });
  }

  componentDidMount() {
    this.photoGet();
  }
  static navigationOptions = {
    title: "Photos & Videos"
  };

  render() {
    return (
      <View styles={styles.container}>
           <Animated.ScrollView scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true } 
        )}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
       {this.state.photos.map((p, i) => {
      if (this.state.touched === false) { 
       return (
        <TouchableHighlight key={i} onPress={ () => this.onTouch() } >
        <Image
           key={i}
           style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            // resizeMode: Image.resizeMode.contain
           }}
           source={{ uri: p.node.image.uri }}
         />
      </TouchableHighlight>
       );
      } else {
        return (
        <TouchableWithoutFeedback key={i} onPress={ () => this.offTouch() } >
        <ImageOverlay
           overlayAlpha={ 0.25 }
           blurRadius={ 10 }
           contentPosition={ "top" }
           title={ "Your Photo" }
           key={i}
           height={ SCREEN_HEIGHT }
          source={{ uri: p.node.image.uri }}
         />
        </TouchableWithoutFeedback>
       );
      }
     })} 
     </Animated.ScrollView>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
   
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}


const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <Text style={styles.text}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};
//Styles
const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  text: {
    fontSize: 45,
    fontWeight: "bold"
  }
});



