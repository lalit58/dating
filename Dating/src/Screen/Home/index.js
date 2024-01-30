import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import commonStyle from '../Style/style';

const Home = props => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
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
          <Text style={styles.itemTitle}>{item.userId}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemBody}>{item.body}</Text>
        </TouchableOpacity>
      );
    },
    [posts, loading],
  );

  return (
    <SafeAreaView style={commonStyle.safeView}>
      <View style={commonStyle.container}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size={'large'} color={'#0000ff'} />}
        {error && (
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
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
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
    color: 'white',
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
