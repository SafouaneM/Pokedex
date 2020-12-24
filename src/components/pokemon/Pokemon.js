import React, {Component} from 'react';
import axios from "axios";

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

class Pokemon extends Component {



state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    stats: {
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        specialAttack: "",
        specialDefense: "",
    },
    abilities: ''
}

async componentDidMount() {
    const {pokemonIndex} = this.props.match.params;

    //urls for pokemon routes and info
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

        //get pokemon info
    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name
    const imageUrl = pokemonRes.data.sprites.front_shiny;


    let {hp,attack,defense,speed,specialAttack,specialDefense} = ''

    pokemonRes.data.stats.map(stat => {
        switch(stat.stat.name) {
            case 'hp':
                hp = stat['base_stat'];
                break;
            case 'attack':
                attack = stat['base_stat'];
                break;
            case 'defense':
                defense = stat['base_stat'];
                break;
            case 'speed':
                speed = stat['base_stat'];
                break;
            case 'special-attack':
                specialAttack = stat['base_stat'];
                break;
            case 'special-defense':
                specialDefense = stat['base_stat'];
                break;
        }
    })

    const types = pokemonRes.data.types.map(type => type.type.name)
    const abilities = pokemonRes.data.abilities.map(ability => {
        return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s => s.charAt(0)
                .toUpperCase() + s.substring(1))
            .join('')
    })

    await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                        description = flavor.flavor_text;
                        return;
                }
            })
        this.setState({
            description
        })
    })
    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

   this.setState({
       imageUrl,
       pokemonIndex,
       name,
       themeColor,
       types,
       stats: {
           hp,
           attack,
           defense,
           speed,
           specialAttack,
           specialDefense
       },
       abilities
   })

}

    render() {
        return (
            <div className="col">
<div className="card">
    <div className="card-header">
        <div className="row">
            <div className="col-5">
                <h5>{this.state.pokemonIndex}</h5>
            </div>
            <div className="col-7">
                    <div className="float-right">
                        {this.state.types.map(type =>(
                            <span key={type}
                                  className="badge badge-pill mr-1" style={{
                                      backgroundColor: `#${TYPE_COLORS[type]}`,
                                color: 'white'
                                  }}>
                                {type.toLowerCase() //setting word to lower case
                                .split(' ') //splitting up w a space
                                .map (
                                    letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                ).join('')}
                            </span>
                        ))}
                    </div>
            </div>
        </div>
    </div>
    <div className="card-body">
        <div className="row align-items-center">
<div className="col-md-3">
    <img src={this.state.imageUrl} className="card-img-top rounded mx-auto mt-2" alt=""/>
</div>
            <div className="col-md-9">
                <h4 className="mx-auto">
                    {this.state.name.toLowerCase()
                        .split('-')
                        .map(s => s.charAt(0)
                            .toUpperCase() + s.substring(1))
                        .join('')}
                </h4>
                <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                        <div className="progress">
                            <div className="progress-bar" role="progressBar" style={{
                                width: `${this.state.stats.hp}%`,
                                backgroundColor: `#${this.state.themeColor}`

                            }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
<small>{this.state.stats.hp}</small>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row align-items-center">
                    <div className="col-12 col-md-3">Defense</div>
                    <div className="col-12 col-md-9">
                        <div className="progress">
                            <div className="progress-bar" role="progressBar" style={{
                                width: `${this.state.stats.defense}%`,
                                backgroundColor: `#${this.state.themeColor}`



                            }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <small>{this.state.stats.defense}</small>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row align-items-center">
                    <div className="col-12 col-md-3">Speed</div>
                    <div className="col-12 col-md-9">
                        <div className="progress">
                            <div className="progress-bar" role="progressBar" style={{
                                width: `${this.state.stats.speed}%`,
                                backgroundColor: `#${this.state.themeColor}`

                            }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <small>{this.state.stats.speed}</small>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special attack</div>
                    <div className="col-12 col-md-9">
                        <div className="progress">
                            <div className="progress-bar" role="progressBar" style={{
                                width: `${this.state.stats.specialAttack}%`,
                                backgroundColor: `#${this.state.themeColor}`


                            }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <small>{this.state.stats.specialAttack}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Defense</div>
                    <div className="col-12 col-md-9">
                        <div className="progress">
                            <div className="progress-bar" role="progressBar" style={{
                                width: `${this.state.stats.specialDefense}%`,
                                backgroundColor: `#${this.state.themeColor}`

                            }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <small>{this.state.stats.specialDefense}</small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row mt-1">
                 <div className="col">
                     <p className="p-2">{this.state.description}</p>
                 </div>
            </div>

        </div>
        <hr/>
    </div>
    <div className="card-body">
        <h5 className="card-title text-center">Profile</h5>
<div className="row">
    <div className="col-md-6">
        <div className="row">
            <div className="col-md-6">
                <h6 className="float-right">Abilities: </h6>
            </div>
            <div className="col-md-6">
                <h6 className="float-left">
                    {this.state.abilities}

                </h6>
            </div>
        </div>
    </div>
</div>
    </div>
</div>
            </div>
        );
    }
}

export default Pokemon;