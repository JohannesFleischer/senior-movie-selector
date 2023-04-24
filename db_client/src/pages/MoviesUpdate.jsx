import React, { Component } from 'react'
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

class MoviesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            Name: '',
            Year: '',
            Poster: '',
            Videofile: '',
            Duration: '',
            Description: ''
        }
    }

    handleChangeInputName = async event => {
        const Name = event.target.value
        this.setState({ Name })
    }

    handleChangeInputYear = async event => {
        const Year = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ Year })
    }

    handleChangeInputPoster = async event => {
        const Poster = event.target.value
        this.setState({ Poster })
    }

    handleChangeInputVideofile = async event => {
        const Videofile = event.target.value
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

    handleUpdateMovie = async () => {
        const { id, Name, Year, Poster, Videofile, Duration, Description } = this.state
        const payload = { Name, Year, Poster, Videofile, Duration, Description }

        try{
            await api.updateMovieById(id, payload).then(res => {
                window.alert(`Movie updated successfully`)
                this.setState({
                    Name: '',
                    Year: '',
                    Poster: '',
                    Videofile: '',
                    Duration: '',
                    Description: ''
                })
            })
        }catch(e){
            window.alert(`Update-Error: Check if the Input is complete and make sure that all Types are correct`);
            console.error(e);
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const movie = await api.getMovieById(id)

        this.setState({
            Name: movie.data.data.Name,
            Year: movie.data.data.Year,
            Poster: movie.data.data.Poster,
            Videofile: movie.data.data.Videofile,
            Duration: movie.data.data.Duration,
            Description: movie.data.data.Description,
        })
    }

    render() {
        const { Name, Year, Poster, Videofile, Duration, Description } = this.state
        return (
            <Wrapper>
                <Title>Update Movie</Title>

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
                <InputText
                    type="text"
                    value={Poster}
                    onChange={this.handleChangeInputPoster}
                />

                <Label>Video (filename): </Label>
                <InputText
                    type="text"
                    value={Videofile}
                    onChange={this.handleChangeInputVideofile}
                />
                
                <Label>Duration (min): </Label>
                <InputText
                    type="number"
                    value={Duration}
                    onChange={this.handleChangeInputDuration}
                />

                <Label>Description: </Label>
                <InputText
                    type="text"
                    value={Description}
                    onChange={this.handleChangeInputDescription}
                />
                <Button onClick={this.handleUpdateMovie}>Update Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MoviesUpdate
