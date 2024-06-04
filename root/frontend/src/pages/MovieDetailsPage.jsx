import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import MovieDetails from '../components/MovieDetails'

const MovieDetailsPage = () => {
    const { id } = useParams()
  return (
    <>
    <Layout>
        <MovieDetails id={id} />
    </Layout>
    </>
  )
}

export default MovieDetailsPage