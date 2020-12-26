import React, {Component} from 'react';
import PokemonCard from "./PokemonCard";
import axios from 'axios';

export default class PokemonList extends Component {q
    state= {
        url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
        pokemon: null
    };

    async componentDidMount() { //make async function, what does it do? : this will run in the background,
        // whilst other things are working.
    const res = await axios.get(this.state.url) //request gives me response. await wait till its loaded then show pokemon
        this.setState({pokemon: res.data['results']}) //will re run render function
    }

    render() {
        return (
            //kind of like a div but not really, gets removed after
            <React.Fragment>
            {this.state.pokemon ? (
                <div className="row">
                    {this.state.pokemon.map(pokemon =>( //this.state.pokemon ? () : () == if state is existing pass left and if it doesnt right
                        <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                        />
                    ))}
                </div>) : (<h1>Loading Pokemon</h1>) }
                {/*if null return this ^*/}
            </React.Fragment>
        );
    }
}

