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

class MoviesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            : this.state.Year

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
        }catch{
            window.alert(`Insertion-Error: Check if the Input is complete and make sure that all Types are correct`)
        }
    }

    render() {
        const { Name, Year, Poster, Videofile, Duration, Description } = this.state
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
