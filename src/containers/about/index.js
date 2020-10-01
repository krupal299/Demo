import React, {Component} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import AlbumMiddleware from '../../store/middleware/albumMiddleware';
import AlbumActions from '../../store/actions/albumActions';
import Loader from '../../components/loader';
import {height, width, totalSize} from 'react-native-dimension';
import Globals from '../../utils/Globals';

var item;
var index = -1;
class About extends Component {
  constructor(props) {
    super(props);
    item = this.props.route.params.item;
    index = this.props.route.params.index;

    this.state = {
      isFav: this.props.route.params.isFav,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{margin: 10}}>
          <View>
            <Image
              source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
              style={{width: width(100), height: 240}}
            />
            <TouchableOpacity
              onPress={() => {
                if (index !== -1) {
                  this.setState({isFav: !this.state.isFav});
                  this.props.addFav(index);
                }
              }}
              style={{position: 'absolute', bottom: 20, right: 10}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    this.state.isFav === true
                      ? require('../../assets/images/heart.png')
                      : require('../../assets/images/heart-grey.png')
                  }
                  resizeMode="contain"
                  style={{width: 20, height: 20, alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{fontSize: 12}}>Lemane graham</Text>
          <Text style={{fontSize: 16, marginTop: 10}}>{Globals.dummy}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    isLoading: state.AlbumReducer.isLoading,
    error: state.AlbumReducer.error,
    data: state.AlbumReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (ind) => dispatch(AlbumActions.addToFav(ind)),
    removeFav: (ind) => dispatch(AlbumActions.removeFromFav(ind)),
    getList: (data) => dispatch(AlbumMiddleware.getListMiddleware(data)),
    startLoading: () => dispatch(AlbumActions.startLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
