import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = async event => {
        event.preventDefault()

        try{
            if (
                window.confirm(
                    `Do tou want to delete the movie ${this.props.id} permanently?`,
                )
            ) {
                await api.deleteMovieById(this.props.id)
                window.location.reload()
            }
        }catch(e){
            window.alert("Deletion-Error: Check console for further information.")
            console.error(e);
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        try{
            this.setState({ isLoading: true })

            await api.getAllMovies().then(movies => {
                this.setState({
                    movies: movies.data.data,
                    isLoading: false,
                })
            })
        }catch(e) {
            this.setState({
                isLoading: false,
            })
            window.alert(`Error while loading List: List is probably empty.`);
            console.error(e);
        }
    }

    render() {
        const { movies, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'Name',
                filterable: true,
            },
            {
                Header: 'Year',
                accessor: 'Year',
                filterable: true,
            },
            {
                Header: 'Poster',
                accessor: 'Poster',
                filterable: true,
            },
            {
                Header: 'Videofile',
                accessor: 'Videofile',
                filterable: true,
            },
            {
                Header: 'Duration',
                accessor: 'Duration',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'Description',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MoviesList
