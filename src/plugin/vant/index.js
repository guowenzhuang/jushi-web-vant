import {
  Button,
  Tabbar, TabbarItem,
  Popup,
  Cell, CellGroup,
  List,
  Icon,
  Tab, Tabs,
  Field,
  Image,
  Row, Col,
  PasswordInput, NumberKeyboard,
  Notify,
  Swipe, SwipeItem,
  Lazyload,
  Panel,
  Toast
} from 'vant'
import Vue from 'vue'

Vue.use(Image)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Popup)
Vue.use(Button)
Vue.use(List)
Vue.use(Icon)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Tab).use(Tabs)
Vue.use(Row).use(Col)
Vue.use(PasswordInput).use(NumberKeyboard)
Vue.use(Notify)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Panel)
Vue.use(Toast)
