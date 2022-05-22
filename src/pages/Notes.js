import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// grid
import Grid from '@mui/material/Grid';
// paper组件就像卡片一样，比较美观
import Paper from '@mui/material/Paper';
import NoteCard from "../components/NoteCard";
import Masonry from 'react-masonry-css'

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const res = await axios.get('http://localhost:8000/notes')
        if(res.status === 200)
            setNotes(res.data)
    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:8000/notes/${id}`)
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <Container>
            {/*grid*/}
            {/*设置外层的grid容器；里面放grid item*/}
            {/*<Grid container>*/}
            {/*    <Grid item xs={12} sm={6} md={3} >*/}
            {/*        <Paper>1</Paper>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12} sm={6} md={3}>*/}
            {/*        <Paper>2</Paper>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12} sm={6} md={3}>*/}
            {/*        <Paper>3</Paper>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={12} sm={6} md={3}>*/}
            {/*        <Paper>4</Paper>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}


            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    notes.map( note =>(
                        <div key={note.id}>
                            <NoteCard
                                note={note}
                                handleDelete={handleDelete}
                            />
                            </div>
                    ) )
                }
            </Masonry>
        </Container>
    )
}

export default Notes;

