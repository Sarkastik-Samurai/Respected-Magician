import React from 'react';
import { Dimensions, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
//alternate coloring so the entries in list show as green, lightcyan, green, lightcyan to differentiate

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const JournalEntry = (props) => {
  if (props.id < props.entries.length-1) {
    return (
    <View>
      <Text style={{ padding: 1 }}>
      </Text>
      <TouchableOpacity
      onPress={props.changeView.bind(props.id)}
      >
        <View style={styles.titleRow}>
          <Entypo
            name="chevron-with-circle-right"
            size={26}
            color="#ffffff"
          />
          <Text style={{ 
            fontFamily: 'Avenir-Medium',
            paddingLeft: 15,
            paddingBottom: 4,
            color: '#ffffff',
            fontSize: 22
            }} >
            {props.data.title}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.changeView.bind(props.id)}>
        <View style={styles.descriptionContainer}>
            <Text style={{ fontFamily: 'Avenir-Medium', color: '#ffffff', fontSize: 16 }}>
              {props.data.description}
            </Text>
        </View>
      </TouchableOpacity>
      {/* <Entypo
        name="dots-three-horizontal"
        size={20}
        color="#ffffff"
        style={{ textAlign: 'center' }}
      /> */}
    </View>
    );  
  } else {
    return (
      <View>
      <Text style={{ padding: 1 }}>
      </Text>
      <TouchableOpacity
      onPress={props.changeView.bind(props.id)}
      >
        <View style={styles.titleRow}>
        <Entypo
            name="chevron-with-circle-right"
            size={26}
            color="#ffffff"
          />
          <Text style={{ 
            fontFamily: 'Avenir-Medium',
            paddingLeft: 15,
            paddingBottom: 4,
            color: '#ffffff',
            fontSize: 22
            }} >
            {props.data.title}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.changeView.bind(props.id)}>
        <View style={styles.descriptionContainer}>
            <Text style={{ fontFamily: 'Avenir-Medium', color: '#ffffff', fontSize: 16 }}>
              {props.data.description}
            </Text>
        </View>
      </TouchableOpacity>
      {/* <Entypo
        name="dots-three-horizontal"
        size={20}
        color="#ffffff"
        style={{ textAlign: 'center' }}
      /> */}
    </View>
    )   
  }    
  //     <View>
  //       <Text style={{ padding: 1 }}>
  //       </Text>
  //       <TouchableOpacity
  //         onPress={props.changeView.bind(props.id)}
  //       >
  //         <View style={styles.titleRow}>
  //           <View style={styles.starIconContainer}>
  //             <Ionicons
  //               name="md-star-outline"
  //               size={36}
  //               color="#ffffff"
  //             />
  //           </View>

  //           <Text style={{ fontFamily: 'Avenir-Medium', paddingLeft: 15, color: '#ffffff', fontSize: 22 }} >
  //             {props.data.title}
  //           </Text>
  //         </View>
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         onPress={props.changeView.bind(props.id)}
  //       >
  //         <View style={styles.description}>
  //           <Text style={{ 
  //             fontFamily: 'Avenir-Medium',
  //             color: '#ffffff', 
  //             fontSize: 16,
  //             }}>
  //             {props.data.description}
  //           </Text>
  //         </View>
  //       </TouchableOpacity>

  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  titleRow: {
    height: 30,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  // starIconContainer: {
  //   paddingBottom: 7,
  // },
  descriptionContainer: {
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default JournalEntry;