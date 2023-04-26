import React, { Component } from 'react'
import Select from 'react-select';

import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class MoviesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            Year: '',
            Poster: '',
            Videofile: '',
            Duration: '',
            Description: '',
            poster_options: [],
            film_options: []
        }
    }

    handleChangeInputName = async event => {
        const Name = event.target.value
        this.setState({ Name })
    }

    handleChangeInputYear = async event => {
        const Year = event.target.validity.valid
            ? event.target.value
            : this.state.Year

        this.setState({ Year })
    }

    handleChangeInputPoster = async value => {
        const Poster = value;
        this.setState({ Poster })
    }

    handleChangeInputVideofile = async value => {
        const Videofile = value;
        this.setState({ Videofile })
    }

    handleChangeInputDuration = async event => {
        const Duration = event.target.value
        this.setState({ Duration })
    }

    handleChangeInputDescription = async event => {
        const Description = event.target.value
        this.setState({ Description })
    }

    handleIncludeMovie = async () => {
        const { Name, Year, Poster, Videofile, Duration, Description} = this.state
        const payload = { Name, Year, Poster, Videofile, Duration, Description }
        
        try{
            await api.insertMovie(payload).then(res => {
                window.alert(`Movie inserted successfully`)
                this.setState({
                    Name: '',
                    Year: '',
                    Poster: '',
                    Videofile: '',
                    Duration: '',
                    Description: ''
                })
            })
            .then( () => window.location.reload(false))
        }catch(e){
            window.alert(`Insertion-Error: Check if the Input is complete and make sure that all Types are correct`);
            console.error(e);
        }
    }

    componentDidMount = async () => {
        const poster_names = await fetch('http://localhost:1337/poster')
            .then(response => response.json())
            .then(data => data.map(item => ({ value: item.name, label: item.name })))
            .catch(error => console.error(error));
        
        const film_names = await fetch('http://localhost:1337/poster')
            .then(response => response.json())
            .then(data => data.map(item => ({ value: item.name, label: item.name })))
            .catch(error => console.error(error));
            
            this.setState({
                poster_options: poster_names,
                film_options: film_names
            })
    }

    render() {
        const { Name, Year, Duration, Description, poster_options, film_options } = this.state
        return (
            <Wrapper>
                <Title>Create Movie</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={Name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Year: </Label>
                <InputText
                    type="number"
                    step="1"
                    value={Year}
                    onChange={this.handleChangeInputYear}
                />
                
                <Label>Poster (filename): </Label>
                <Select
                    options={poster_options}
                    onChange={(choice) => this.handleChangeInputPoster(choice.value)}
                />
            
                <Label>Video (filename): </Label>
                <Select
                    options={film_options}
                    onChange={(choice) => this.handleChangeInputVideofile(choice.value)}
                />

                <Label>Duration (min): </Label>
                <InputText
                    type="number"
                    step="1"
                    value={Duration}
                    onChange={this.handleChangeInputDuration}
                />

                <Label>Description: </Label>
                <InputText
                    type="text"
                    value={Description}
                    onChange={this.handleChangeInputDescription}
                />

                <Button onClick={this.handleIncludeMovie}>Add Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MoviesInsert
