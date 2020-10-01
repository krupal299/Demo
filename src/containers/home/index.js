import React, {Component} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import AlbumMiddleware from '../../store/middleware/albumMiddleware';
import AlbumActions from '../../store/actions/albumActions';
import Loader from '../../components/loader';
import {height, width, totalSize} from 'react-native-dimension';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    this.props.startLoading();
    this.props.getList();
  }

  _renderItem = ({item}) => {
    return (
      <View style={{margin: 10, flexDirection: 'row'}}>
        <View style={{flex: 0.5}}>
          <Image
            source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
            style={{width: width(40), height: 100}}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{fontSize: 16}}>{item.title}</Text>
          <Text style={{fontSize: 12, marginTop: 10}}>Lemane graham</Text>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  goToAlbums = () => {
    this.props.navigation.navigate('Albums');
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.error !== prevProps.error) {
      // this.refs.toast.show('Something went wrong, Please try again.', 2000);
      console.log('something went wrong');
    } else if (this.props.fav !== prevProps.fav) {
      var responseData = this.props.fav;

      this.setState({data: responseData});
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.myFavorites}>My Favorites</Text>
        <View style={styles.view} />

        <FlatList
          contentContainerStyle={styles.flatList}
          ListEmptyComponent={
            <Text numberOfLines={1} style={styles.emptyText}>
              Aww... You Don't have any Favorites yet!
            </Text>
          }
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this.keyExtractor}
        />

        <TouchableOpacity style={{marginBottom: 20}} onPress={this.goToAlbums}>
          <ImageBackground
            source={require('../../assets/images/button.png')}
            style={styles.background}>
            <View style={styles.seeAllView}>
              <Text style={styles.seeAll}>See all albums</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {this.props.isLoading ? <Loader /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fav: state.AlbumReducer.fav,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
