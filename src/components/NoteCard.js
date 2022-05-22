import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {Avatar, IconButton} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import {blue, green, red, yellow} from "@mui/material/colors";

// 自定义样式的Avatar组件
const CustomAvatar = styled(Avatar)(({theme}) => ({
    backgroundColor: (note) => {
        if(note.category === 'work')
            return yellow[700]
        if(note.category === 'money')
            return green[500]
        if(note.category === 'reminders')
            return red[500]
        return blue[500]
    }
}))

const customStyles = {
    avatar: {
        backgroundColor: (note) => {
            if(note.category === 'work')
                return yellow[700]
            if(note.category === 'money')
                return green[500]
            if(note.category === 'reminders')
                return red[500]
            return blue[500]
        }
    }
}

const NoteCard = ({note, handleDelete}) => {
    const {title, details, id, category} = note


    return (
        // elevation属性设置"飘起来"的效果，也就是于box-shadow
        <Card elevation={1}>
            <CardHeader
                avatar={<Avatar sx={customStyles.avatar}>{category.substring(0,1).toUpperCase()}</Avatar>} // 设置头像
                action={<IconButton onClick={()=>handleDelete(id)}>
                        <DeleteOutlined />
                    </IconButton>}          // 设置可以交互的按钮
                title={title}
                subheader={category}
            />
            <CardContent>
                <Typography variant='body2' color='textSecondary'>{details}</Typography>
            </CardContent>
        </Card>
    );
};

export default NoteCard;
