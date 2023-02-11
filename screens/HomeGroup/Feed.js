import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Modal,
} from "react-native";
import Post from "../../components/Post";
import Avatar from "../../components/Avatar";
import { getPost, getListPosts } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../../context/AppContext";
const POSTS_PER_LOAD = 4;
const WIDTH_MODAL = Dimensions.get("window").width;
const PostErrModal = ({ setPostErrModal }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.ModalHeader}>
          Thêm bạn bè sẽ giúp hiện thị được nhiều bài viết hơn!
        </Text>
        <View style={styles.ModalDivider} />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => setPostErrModal(false)}
        >
          <Text style={{ fontSize: 17, color: "red" }}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const PostDirect = ({ avatar }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.Input}
      onPress={() =>
        navigation.navigate({ name: "Post", params: { userImage: avatar } })
      }
    >
      <Text>Bạn đang nghĩ gì?</Text>
    </TouchableOpacity>
  );
};
const PersonalNewsFeed = React.memo(function (props) {
  return (
    <View style={styles.subContainer}>
      <View style={styles.Row}>
        <Avatar source={props.avatarURL} online />
        <PostDirect />
      </View>
      <View style={styles.Divider}></View>
    </View>
  );
});
const Feed = ({ route }) => {
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefresing] = useState(false);
  const [data, setData] = useState([]);
  const [postErrModal, setPostErrModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [bottomMenu, setBottomMenu] = useState(false);
  const index = useRef(0);
  const last_id = useRef("");
  const newPostId = useRef("");
  const flatListRef = useRef();
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.post) {
        setRefresing(true);
        changeNewPostId(route.params.post_id);
        getNewPost();
        let a;
        route.params.post = a;
      }
    }, [route.params?.post])
  );

  const cache = useCallback(async () => {
    await AsyncStorage.setItem("posts", JSON.stringify(data));
    const output = await AsyncStorage.getItem("posts");
  }, [data]);

  const changeIndex = (newIndex) => {
    index.current = newIndex;
  };
  const changeLastId = (newLastId) => {
    last_id.current = newLastId;
  };
  const changeNewPostId = (PostId) => {
    newPostId.current = PostId;
  };

  const renderItem = ({ item }) => {
    return (
      <Post
        id={item.id}
        avatar={item.author.avatar}
        userName={item.author.username}
        user_id={item.author._id}
        timeCreated={item.created}
        description={item.described}
        numLike={item.like}
        numComment={item.comment}
        images={item.image}
        is_liked={item.is_liked}
        self_liked={item.self_liked}
        numLike2={item.numLike}
        samePer={item.samePer}
        setBottomMenu={setBottomMenu}
      />
    );
  };
  const getNewPost = async () => {
    getPost(newPostId.current, appContext.loginState.token)
      .then((res) => {
        setData([res.data.data, ...data]);
        setRefresing(false);
      })
      .catch((err) => {
        console.log(err.response);
        setRefresing(false);
      });
  };
  const getData = async () => {
    await getListPosts(
      index.current,
      POSTS_PER_LOAD,
      last_id.current,
      appContext.loginState.token
    )
      .then(function (response) {
        if (index.current) setData([...data, ...response.data.data.posts]);
        else {
          setData(response.data.data.posts);
        }
        changeLastId(response.data.data.last_id);
        setIsLoading(false);
        setRefresing(false);
        cache();
      })
      .catch(function (error) {
        setIsLoading(false);
        setRefresing(false);
        if (error.response) {
          if (error.response.data.code == "9994") setPostErrModal(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        flatListRef.current.scrollToIndex({
          index: 0,
          animated: true,
          viewPosition: 0,
        });
      });
  };
  const useCache = async () => {
    const cache = await AsyncStorage.getItem("posts");
    // console.log(cache);
    setData(JSON.parse(cache));
  };
  // use cache data in inital render
  useEffect(() => {
    useCache();
  }, []);
  useEffect(() => {
    if (!refreshing) setIsLoading(true);
    console.log("use effect call!");
    getData();
  }, [toggle]);
  return (
    <View style={[styles.container]}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<PersonalNewsFeed props={appContext.loginState} />}
        onEndReached={() => {
          changeIndex(index.current + POSTS_PER_LOAD);
          setToggle(!toggle);
        }}
        onEndReachedThreshold={0}
        ItemSeparatorComponent={() => {
          return <View style={styles.BottomDivider} />;
        }}
        onRefresh={() => {
          setRefresing(true);
          changeIndex(0);
          setToggle(!toggle);
        }}
        refreshing={refreshing}
        extraData={toggle}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={postErrModal}
        onRequestClose={() => {
          setPostErrModal(false);
        }}
      >
        <PostErrModal setPostErrModal={setPostErrModal} />
      </Modal>
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};
export default Feed;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {
    width: "100%",
    flexDirection: "column",
  },
  Row: {
    flexDirection: "row",
    background: "#ffffff",
    alignItems: "center",
    paddingLeft: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  Input: {
    marginLeft: 8,
    paddingLeft: 16,
    width: 300,
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#737272",
    justifyContent: "center",
  },
  Divider: {
    width: "100%",
    height: 5,
    backgroundColor: "#f0f2f5",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  BottomDivider: {
    width: "100%",
    height: 9,
    backgroundColor: "#f0f2f5",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    width: WIDTH_MODAL - 80,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "column",
  },
  ModalHeader: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  ModalDivider: {
    width: "100%",
    height: 0.3,
    backgroundColor: "#000000",
    marginTop: 16,
    marginBottom: 16,
  },
});
