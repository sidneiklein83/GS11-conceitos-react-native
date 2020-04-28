import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {

  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setDados(response.data);
    });
  }, []);


  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    let url = `repositories/${id}/like`;
    //console.log('url: ' + url);
    const response = await api.post(url);
    const dado = response.data;
    let repositories = [...dados]; //Busca os dados anteriores
    const index = repositories.findIndex(repository => repository.id === id);
    if (index >= 0) { //Achou...
      repositories[index] = dado;
    }
    //
    setDados(repositories);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.repositoryContainer}>
        <FlatList
          data={dados}
          keyExtractor={dados => dados.id}
          renderItem={({ item }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>

              <View style={styles.techsContainer}>
                <FlatList
                  data={item.techs}
                  keyExtractor={techs => techs}
                  renderItem={({ item }) => (
                    <Text style={styles.tech}>
                      {`${item}`}
                    </Text>
                  )}
                />
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${item.id}`}
                >
                  {`${item.likes} curtidas`}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
