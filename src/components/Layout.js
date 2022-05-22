import React from 'react';
import Typography from "@mui/material/Typography";
import Drawer from '@mui/material/Drawer';

// drawer
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AddCircleOutlined, SubjectOutlined} from "@mui/icons-material";
import {useNavigate, useLocation} from 'react-router-dom'
import { styled } from '@mui/material/styles';

// nav bar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

import { format } from 'date-fns'

const drawerWidth = '240px'

// 方法一：自定义样式
const customStyles = {
    page: {
        background: '#f9f9f9',
        width: '100vw'
    },
    drawer:{
        width: drawerWidth,
        // 因为drawer中，每一项都是一个paper，因此也需要设置paper的宽
        '& .MuiDrawer-paper': {
            width: drawerWidth
        }
    },
    root:{
        display: 'flex',
    },
    active: {
        background: '#f4f4f4'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth})`,
    },
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: '10px'
    }
}

// mixins的作用是：使用AppBar组件中的toolbar的属性，这里使用的是height
const MyToolBar = styled(Toolbar)(({theme}) => ({
    height: theme.mixins.toolbar.height
}))

// 方法二：自定义样式的组件
const TitleStyle = styled(Typography)(({ theme }) => ({
    background: '#f9f9f9',
    width: '100vw',
    color: theme.palette.secondary.main,
    padding: theme.spacing(3)
}));


const Layout = ({children}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlined color='secondary' />,
            path: '/create'
        }
    ]


    return (
        <Typography variant='div' sx={customStyles.root}>
            {/*导航栏*/}
            {/*AppBar组件是navbar的容器*/}
            <AppBar
                sx={customStyles.appBar}
                color='secondary'
                elevation={1} // 要很小的阴影
            >
                {/*Toolbar组件会撑开AppBar，我们把图标和文字放在Toolbar里*/}
                <Toolbar>
                    <Typography sx={customStyles.date}>
                        {
                            format(new Date(), 'yyyy-MM-dd')
                        }
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    {/*设置头像*/}
                    <Avatar
                        sx={customStyles.avatar}
                        src='https://www.pinclipart.com/picdir/middle/200-2003814_mario-avatar-for-all-your-mario-avataring-needs.png'
                    />
                </Toolbar>
            </AppBar>

            {/*左侧的菜单栏*/}
            <Drawer
                sx={customStyles.drawer} // 使用自定义样式
                variant='permanent'      // 使用永久显示的侧边栏
                anchor='left'            // 位置在左侧
            >
                <div>
                    <TitleStyle variant='h5'>Max Notes</TitleStyle>
                </div>

                <List>
                    {
                        menuItems.map(item => (
                            <ListItem
                                key={item.text}
                                button          // 让这个ListItem可以点击
                                onClick={() => navigate(item.path)}
                                sx={location.pathname === item.path? customStyles.active: null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>

                {/*/!*List组件就相当于ul标签*!/*/}
                {/*<List>*/}
                {/*    /!*ListItem组件就相当于li标签*!/*/}
                {/*    <ListItem>*/}
                {/*        <ListItemText*/}
                {/*            primary='hello' // 设置显示的文本*/}
                {/*        />*/}
                {/*    </ListItem>*/}
                {/*    <ListItem>*/}
                {/*        <ListItemText*/}
                {/*            primary='hello'*/}
                {/*        />*/}
                {/*    </ListItem>*/}
                {/*</List>*/}

            </Drawer>

            <Typography sx={customStyles.page}>
                {/*MyToolBar的高度是AppBar组件里Toolbar的高度*/}
                <MyToolBar />
                {children}
            </Typography>
        </Typography>
    );
};

export default Layout
