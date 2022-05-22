import React, {useState} from 'react'
// 引包
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import SendIcon from '@mui/icons-material/Send'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import TextField from '@mui/material/TextField';
// 使用FormControlLabel来设置单选框；且需要搭配RadioGroup一起使用
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// FormControl是用来包裹一个表格组件的，更美观
import FormControl from '@mui/material/FormControl';
// FormLabel用来显示文本
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import {useNavigate} from 'react-router-dom'


// 自定义样式
const customStyles = {
    btn: {
        fontSize: 'small',
        backgroundColor: 'violet',
        transition: 'all 0.2s ease-out',
        // 定义hover的样式
        '&:hover': {
            fontSize: 'large',
            backgroundColor: 'green',
        }
    },
    title: {
        textDecoration: 'underline',
        marginBottom: '20px',
    },
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    }
}



const Create = () => {

    const [post, setPost] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setPost({
            ...post,
            [name]:value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await axios.post('http://localhost:8000/notes', post)
        console.log(res)
        if(res.status === 201)
            navigate('/')
    }


    return (
        <Container>
            <Typography
                variant='h6'
                component='h2'
                color='textSecondary'
                gutterBottom
                // sx={customStyles.title} // 使用自定义样式
            >
            Create a New Note
            </Typography>

            <form onSubmit={(e)=>handleSubmit(e)}>
                {/*文本框*/}
                <TextField
                    label='Note Title'  // 是一个提示，提示这个框里应该填什么
                    variant='outlined'  // 有3个取值：outlined, filled和standard
                    color='secondary'   // 设置颜色
                    fullWidth           // 表示占据父容器宽度的100
                    required            // 表示这个字段必填，会有一个*出现在页面上
                    sx={customStyles.field} // 使用自定义样式
                    name='title'
                    onChange={e => handleChange(e)} // 设置onChange事件
                    error={!post.title}        // 如果error设置为true，则边框会显示为红色，我们可以使用error属性来提示用户，填写错误
                />
                {/*文本框*/}
                <TextField
                    label='Details'
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    required
                    multiline           // 表示设置成多行文本
                    rows={4}            // 多行文本占4行
                    sx={customStyles.field}
                    name='details'
                    onChange={e => handleChange(e)} // 设置onChange事件
                    error={!post.details}
                />

                {/*单选框，需要使用RadioGroup*/}
                <FormControl sx={customStyles.field}>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup
                        name='category'
                        defaultValue='money'            // 设置初始值
                        onChange={e => handleChange(e)} // 设置onChange事件
                    >
                        <FormControlLabel
                            control={<Radio />} // 指定这个表单元素具体是什么，这里是单选框，因此就是<Radio />
                            label='Money'       // 显示在页面上的文本
                            value='money'       // 需要指定value值，提交表单时候使用
                        />
                        <FormControlLabel
                            control={<Radio />}
                            label='todos'
                            value='Todos'
                        />
                        <FormControlLabel
                            control={<Radio />}
                            label='reminders'
                            value='Reminders'
                        />
                        <FormControlLabel
                            control={<Radio />}
                            label='work'
                            value='Work'
                        />
                    </RadioGroup>
                </FormControl>


                <Button
                    type='submit'
                    color='secondary'
                    variant='contained'
                    endIcon={<KeyboardArrowRightIcon />} // 在button里最右边设置一个icon
                    // sx={customStyles.btn} // 使用自定义样式
                >
                    Submit
                </Button>
            </form>
        </Container>
  )
}

export default Create
