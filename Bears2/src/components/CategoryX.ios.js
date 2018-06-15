import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Heart, StarRating } from './common'
// import { connect } from 'react-redux';
// import { employeeUpdate, employeeCreate } from '../actions';
// onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}

class CategoryX extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title : props.title,
      expanded : false,
      animation : new Animated.Value(15),
      liked: false,
      scale: new Animated.Value(0),
      animations: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
      ]
    }
    this.triggerLike = this.triggerLike.bind(this);
  }

  triggerLike() {
    this.setState({
      liked: !this.state.liked
    })
    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.scale.setValue(0);
    });
  }

  _setMaxHeight(event){
    this.setState({
        maxHeight   : event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event){
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  hideOnExpand() {
    console.log('hits function')
    this.state.expanded ? { height:0, width: 0 } : { display: 'block' }
  }

  toggle() {
    let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
    finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
    this.setState({
        expanded : !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();
  }

  render() {
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, .8, 1]
    })
    const heartButtonStyle = {
      transform: [
        { scale: bouncyHeart }
      ]
    }
    return (
      <View
        style={styles.fakeOverflowCard}
      >
        <View style={styles.plate}>
          <Text style={styles.plateText}>IMG</Text>
        </View>
        <View style={styles.card}>
          <TouchableWithoutFeedback
          onPress={this.toggle.bind(this)}
          >
            <View style={{paddingTop: 22, paddingHorizontal: '15%',}}>
              <Animated.View style={{height: this.state.animation}}>
                <Text style={styles.cardTitle} onLayout={this._setMinHeight.bind(this)}>{this.props.title}</Text>
                <Text style={[styles.cardDescription, this.hideOnExpand.bind(this)]} onLayout={this._setMaxHeight.bind(this)}>
                {this.props.description}
                </Text>
              </Animated.View>
              <View style={styles.cardReview}>
                <StarRating
                  ratings={2}
                />
                <Text >
                  15mg fat
                </Text>
              </View>
              <View style={styles.heartContainer}>
                <TouchableWithoutFeedback onPress={this.triggerLike}>
                  <Animated.View style={heartButtonStyle}>
                    <Heart filled={this.state.liked} />
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>

        </View>
        <TouchableWithoutFeedback>
          <View style={styles.addCart}>
            <Text style={styles.addCartText}>+</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 2,
    minHeight: 100,
  },
  cardTitle: {
    color: '#000',
  },
  cardDescription: {
    width: 150,
    paddingVertical: 20,
    color: '#000',
  },
  cardReview: {
    width: 150,
    paddingVertical: 20,
    color: '#000',
    backgroundColor: 'white',
  },
  plate: {
    position: 'absolute',
    top: 20,
    left: 50,
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  plateText: {
    color: '#000',
  },
  addCart: {
    position: 'absolute',
    right: 55,
    bottom: 36,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addCartText: {
    color: '#000',
  },
  fakeOverflowCard: {
    // fakes overflow but requires more markup
    backgroundColor: "transparent",
    width: '100%',
    marginVertical: 10,
    position: "relative",
    paddingVertical: 5,
  },
  heartContainer: {
    position: 'absolute',
    bottom: 50,
    left: 18,
  }
});

// const mapStateToProps = (state) => {
//   const { name, phone, shift } = state.employeeForm;

//   return { name, phone, shift };
// };

export default(CategoryX);
// export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);