import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CartItem from './CartItem';


class Cart extends Component {

  renderItem = ({ item, index }) => {
    return (
      <CartItem  item={item} key={item.id}category={item.category} actions={this.props.actions}/>
    );
  };
  render() {
    const cartQuantity = this.props.cart.reduce((acumulator,currentVal)=>{
      return acumulator + currentVal.quantity
    },0);
    const total = this.props.cart.reduce((acumulator,currentVal)=>{
       return acumulator + (currentVal.price.adult * currentVal.quantity)
      },0)
    return (
      <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>CART</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.backButton} onPress={()=>this.props.actions.toggleCart()}>
      <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      </View>
      </View>
        <View style={{flex:1,width:'100%',alignItems:'center'}}>
     <View style={styles.listContainer}>
     
          <FlatList
            inverted
            style={{flex:1 }}
            data={  this.props.cart}
            renderItem={this.renderItem}
          />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalTop}>{total.toFixed(2)}</Text>
          <Text  style={styles.totalTax}>Tax +${(tax * cartQuantity).toFixed(2)}</Text>
        </View>
          <Text style={{alignContent:'flex-end'}} > Total: ${((tax * cartQuantity) + total).toFixed(2)}</Text>
        </View>
    </View>
    );
  }
}
const tax = .85;
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backButton:{
    backgroundColor:'#5A66D1',
    width:60,
    height:35,
    borderRadius: 3,
    justifyContent:'center',
    alignItems: 'center',
    left:15,
    top:13
  },
  backButtonText:{
    color:'white',
    textAlign:'center',
    fontSize: 18,

  },
  header:{
    width:'100%',
    height:50,
    flexDirection: 'row',
    position:'relative',
    marginBottom: 40,
},
  headerText:{
    position:'absolute',
    left:'41%',
    top:10,
    fontSize:25
  },

  listContainer:{
    width:'95%',
    height:'50%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#DEDEDE',
  
  },
  totalContainer:{
    borderBottomWidth: 2,
    borderBottomColor:'black',
    width:'95%',
    position:'relative',
    flexDirection: 'column',
    height:40

  },
  totalTop:{
    position:'absolute',
    right:2
  },
  totalTax:{
    position:'absolute',
    right:2,
    top:18
  }

})


export default (Cart);