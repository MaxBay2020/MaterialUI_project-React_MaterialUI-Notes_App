import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
// 引包
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {purple} from "@mui/material/colors";
import Layout from "./components/Layout";

// 创建自定义的theme
// 在createTheme函数里面的对象中写想要自定义的属性
// 默认的theme在这里：https://mui.com/material-ui/customization/default-theme/#main-content
const theme = createTheme({
  // 自定义颜色
  palette: {
    primary: {
      main: '#3186e7', // 复写方式一：使用颜色的十六进制
    },
    // 复写方式二，直接使用MUI包里提供的颜色的对象，上面需要引包；
    // 这种方式会将main, light, dark, contrastText颜色都复写掉
    secondary: purple
  },
  // 自定义与文字相关的样式，如字体，字号，字的粗细等
  typography: {
    // 我们可以从google font中选择字体，之后在index.css文件中引入这种字体，即可使用了
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
      // 使用ThemeProvider组件将最顶层的组件包裹起来，并通过theme属性指定我们自定义的theme即可
      <ThemeProvider theme={theme}>
        <Router>
          {/*用Layout布局组件将内容包裹起来，注意Layout组件是写在Router内的*/}
          <Layout>
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>

  );
}

export default App;
