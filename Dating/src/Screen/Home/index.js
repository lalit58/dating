import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import commonStyle from '../Style/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/constants';
import ImageView from '../../components/imageView';

const Home = props => {
  // const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  // const apiUrl =
  //   'https://serpapi.com/search.json?q=Apple&engine=google_images&ijn=0';
  // const apiUrl = 'https://picsum.photos/v2/list';

  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  const itemsPerPage = 5;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiUrl}?_page=${page}&_limit=${itemsPerPage}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setPosts(prevPosts => [...prevPosts, ...result]);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setPosts([]);
    fetchData();
  }, []);

  const onEndReached = useCallback(() => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
      fetchData();
    }
  }, [loading]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [page]);

  const renderItem = useCallback(
    ({item, index}) => {
      // Check if the item is the last one and show the activity indicator
      if (index === posts.length - 1 && loading) {
        return (
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }

      return (
        <TouchableOpacity style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{index}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemBody}>{item.body}</Text>
          <View style={{}}>
            <ImageView
              uri={item?.url || null}
              style={{
                height: 200,
                width: SCREEN_WIDTH - 40,
                borderRadius: 10,
              }}
              resizeMode={'cover'}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [posts, loading],
  );

  return (
    <SafeAreaView style={commonStyle.safeView}>
      <TouchableOpacity
        onPress={() => props.navigation.push('map')}
        style={{
          backgroundColor: 'red',
          margin: 10,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Go To Map Section</Text>
      </TouchableOpacity>
      <View style={commonStyle.container}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <View
              style={{
                height: SCREEN_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>NO DATA FOUND</Text>
            </View>
          }
        />
        {loading && (
          <ActivityIndicator
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={'large'}
            color={'#0000ff'}
          />
        )}
        {!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    // marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    margin: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  itemBody: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  errorText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
};

export default Home;
