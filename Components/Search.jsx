import React from 'react';
import { StyleSheet, Button, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmFromApiWithSearchText } from '../API/TMDBApi';
/**
 * On import la fonction qui permet de faire l'appel de l'API dans la fonction _loadFilm qui est relier a onPress du button recherché du component
 * un console.log() est neccessaire pour afficher les propriétés du resultat obtenue pour ensuite afficher les element voulu
 * On utilise les state pour afficher le redu de l'API (Le constructor est l'ancienne version des state)
 * pour faire appel au state, le this.NomDeLaVariable est obligatoire, sinon React ne sais pas ou cherche cette variable
 */
class Search extends React.Component {
    state = {
        _films: [],
        searchedText: "",
        isLoading: false
    }
    _loadFilm() {
        if (this.state.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmFromApiWithSearchText(this.state.searchedText).then(data => {
                this.setState({ 
                    _films: data.results,
                    isLoading: false })
            })
        }
    }
    _searchTextInputChanged(text) {
        this.state.searchedText = text;
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container} >
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
    /**
     * onSubmitEditing permet d'utiliser la touche entrer du clavier 
     */
    render() {
        console.log(this.state.isLoading)
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    placeholder="Titre du film" onSubmitEditing={() => this._loadFilm()}
                ></TextInput>
                <Button title="Rechercher" onPress={() => this._loadFilm()}></Button>
                <FlatList
                    data={this.state._films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>

        )
    }

}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 50
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: .75,
        paddingLeft: 5,
        borderRadius: 10
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Search;