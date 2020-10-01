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

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  static navigationOptions = {
    headerTitle: 'Alblammo',
    headerLeft: (
      <TouchableOpacity
        style={{width: 50, backgroundColor: 'red'}}
        onPress={() => {
          this.props.navigation.goBack();
        }}>
        <Image
          source={require('../../assets/images/backward-arrow.png')}
          style={{width: width(100), height: 240}}
        />
      </TouchableOpacity>
    ),
  };

  async componentDidMount() {
    // this.props.startLoading();
    // this.props.getList();
    this.setState({data: this.props.data});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.error !== prevProps.error) {
      // this.refs.toast.show('Something went wrong, Please try again.', 2000);
      console.log('something went wrong');
    } else if (this.props.data !== prevProps.data) {
      var responseData = this.props.data;

      this.setState({data: responseData});
    }
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('About', {
            item: item,
            index: index,
            isFav: item.isFav,
          });
        }}>
        <View style={{marginVertical: 10}}>
          <View>
            <Image
              source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
              style={{width: width(100), height: 240}}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.addFav(index);
              }}
              style={{position: 'absolute', bottom: 20, right: 20}}>
              <View style={styles.imageView}>
                <Image
                  source={
                    item.isFav === true
                      ? require('../../assets/images/heart.png')
                      : require('../../assets/images/heart-grey.png')
                  }
                  resizeMode="contain"
                  style={{width: 20, height: 20, alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 20}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
        />

        {this.props.isLoading ? <Loader /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  background: {
    overflow: 'hidden',
    borderRadius: 25,
    width: 150,
    height: 40,
    alignSelf: 'center',
  },
  seeAllView: {
    borderRadius: 25,
    justifyContent: 'center',
    width: 150,
    height: 40,
  },
  seeAll: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
  },
  myFavorites: {
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
  },
  view: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    alignSelf: 'center',
  },
  flatList: {
    margin: 10,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
